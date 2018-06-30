//
//  BMResourceManager.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/10.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMResourceManager.h"
#import <SSZipArchive/SSZipArchive.h>
#import "BMCheckJsVersionRequest.h"
#import "BMJSVersionModel.h"
#import <YYModel.h>
#import "BMUpdateBundlejsRequest.h"
#import <SVProgressHUD.h>
#import "NSData+bsdiff.h"
#import "BMResourceCheck.h"
#import "BMMediatorManager.h"
#import "BMConfigManager.h"


#define JS_VERSION @"jsVersion"

#define TIMESTAMP @"timestamp"


static NSString * bundle = @"bundle";

static NSString * zip = @"zip";

static NSString * configFileName = @"bundle.config";

static NSString * fileName = @"bundle.zip";


#define K_VERSION           @"version"
#define K_CACHE_FINISH      @"cache_finish"


typedef NS_ENUM(NSUInteger, BMResourceVersion) {
    BMPagesVersion = 0,
    BMBundleVersion,
    BMCacheVersion
};


typedef NS_ENUM(NSUInteger, BMResourceCheckUpdateCode) {
    BMResourceCheckUpdateSuccess= 0,  //查询成功
    BMResourceCheckUpdateFail = 4001,
    BMResourceCheckUpdateLasted = 4000
};




@interface BMResourceManager()


@property (nonatomic, strong) BMJSVersionModel *jsVModel;
@property (nonatomic,readwrite) BMResourceVersion lastVerionType;

@property (nonatomic,weak)BMUpdateBundlejsRequest * updateBundleRequest;
@property (nonatomic, copy) NSString *updateBundleJsUrl;
@end



@implementation BMResourceManager

+ (instancetype)sharedInstance
{
    static BMResourceManager *_instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[BMResourceManager alloc] init];
    });
    return _instance;
}

- (instancetype)init
{
    if (self = [super init]) {
        
        //必要时创建存放数据的路径
        [self checkJSBundlePath];
        [self checkJSCachePath];
        
        self.lastVerionType = BMPagesVersion;
        
        /** app 即将进入后台的通知 */
        //        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(appWillResignActive) name:UIApplicationWillResignActiveNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(appDidBecomeActive) name:UIApplicationDidBecomeActiveNotification object:nil];
    }
    return self;
}

/** app即将进入后台的通知 */
- (void)appWillResignActive
{
    //    if (self.updateBundleRequest) {
    //        [self.updateBundleRequest saveIncompleteDownloadTempData];
    //    }
}

/** app进入激活状态 */
- (void)appDidBecomeActive
{
    /** 检查js更新 */
    [self checkNewVersion:YES];
    
}

/** 检查js资源文件是否有新版本 */
- (void)checkNewVersion:(BOOL)isDiff
{
    if (![BMConfigManager shareInstance].platform.url.bundleUpdate.length) return;
    
    NSDictionary * currentConfig = [self loadConfigData:K_JS_VERSION_PATH];
    NSString * jsVersion = currentConfig[JS_VERSION]?currentConfig[JS_VERSION]:@"";
    
    __weak typeof(self) weakSelf = self;
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    // app版本
    NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    // app build版本
    NSString *app_build = [infoDictionary objectForKey:@"CFBundleVersion"];
    /* 线上js版本 */
    BMCheckJsVersionRequest *checkVersionApi = [[BMCheckJsVersionRequest alloc] initWithAppName];
    [checkVersionApi startWithCompletionBlockWithSuccess:^(__kindof YTKBaseRequest * _Nonnull request) {
        
        WXLogInfo(@"%@ Request_Success >>>>>>>>>>>>>>>>:%@",NSStringFromClass([self class]),request.requestTask.originalRequest);
        
        NSDictionary *result = [request responseObject];
        NSArray *iOS = result[@"iOS"];
        for (int i = 0; i< iOS.count; i++) {
            if([app_Version isEqualToString:iOS[i][@"version"]] && [app_build isEqualToString:iOS[i][@"versionCode"]]) {
                if ([jsVersion isEqualToString:iOS[i][@"jsVersion"]]) {
                    WXLogInfo(@"Js Bundle已是最新版本");
                } else {
                    NSString* patchName = [WXUtility md5:[jsVersion stringByAppendingString:iOS[i][@"jsVersion"]]];
                    NSString* url = [NSString stringWithFormat:@"%@jsVersion/%@.zip",iOS[i][@"path"], patchName];
                    [weakSelf downloadRemoteJSResource:url downloadDict:iOS[i] isDiff:true];
                }
            }
        }
        
        //        NSString *resCode = [NSString stringWithFormat:@"%@",result[@"resCode"]];
        //        NSDictionary *data = result[@"data"];
        
        //        if ([resCode intValue] == BMResourceCheckUpdateSuccess && data) {
        //
        //            // 有更新版本
        //            [weakSelf downloadRemoteJSResource:data];
        //
        //        }
        //        else if([resCode intValue] == BMResourceCheckUpdateFail){
        //
        //            // 检测失败无对应版本
        //
        //        }else if ([resCode intValue] == BMResourceCheckUpdateLasted){
        //
        //            // 已是最新版本
        //        }
        //        else{
        //
        //
        //        }
        
    } failure:^(__kindof YTKBaseRequest * _Nonnull request) {
        
        WXLogError(@"%@ Request_Error >>>>>>>>>>>>>>>>:%@",NSStringFromClass([request class]),request.requestTask.originalRequest);
        
    }];
    
}

#pragma mark 添加不同步iCould属性
- (BOOL)addSkipBackupAttributeToItemAtPath:(NSString *)filePathString
{
    NSURL* URL= [NSURL fileURLWithPath: filePathString];
    //    assert([[NSFileManager defaultManager] fileExistsAtPath: [URL path]]);
    
    NSError *error = nil;
    BOOL success = [URL setResourceValue: [NSNumber numberWithBool: YES]
                                  forKey: NSURLIsExcludedFromBackupKey error: &error];
    if(!success){
        WXLogError(@"Error excluding %@ from backup %@", [URL lastPathComponent], error);
    }
    return success;
}


#pragma mark - Private Method
- (void)checkJSBundlePath
{
    NSFileManager *fm = [NSFileManager defaultManager];
    
    BOOL isDir = false;
    BOOL isDirExist = [fm fileExistsAtPath:K_JS_BUNDLE_PATH isDirectory:&isDir];
    
    if (!(isDir && isDirExist)) {
        [fm removeItemAtPath:K_JS_BUNDLE_PATH error:nil];
        [fm createDirectoryAtPath:K_JS_BUNDLE_PATH withIntermediateDirectories:YES attributes:nil error:nil];
        
        BOOL skipSuccess = [self addSkipBackupAttributeToItemAtPath:K_JS_BUNDLE_PATH];
        if (skipSuccess) {
            WXLogInfo(@"add skip attribute for directory success");
        }
    }
}

- (void)checkJSCachePath
{
    NSFileManager *fm = [NSFileManager defaultManager];
    
    BOOL isDir = false;
    BOOL isDirExist = [fm fileExistsAtPath:K_JS_CACHE_PATH isDirectory:&isDir];
    
    if (!(isDir && isDirExist)) {
        [fm removeItemAtPath:K_JS_CACHE_PATH error:nil];
        [fm createDirectoryAtPath:K_JS_CACHE_PATH withIntermediateDirectories:YES attributes:nil error:nil];
    }
}
#pragma mark 版本比较
-(void)compareVersion
{
    /* 读取当前工程包的js版本信息 */
    NSString *configFile = [[NSBundle mainBundle] pathForResource:configFileName ofType:nil];
    
    NSDictionary * info = [self loadConfigData:configFile];
    
    if ([info isKindOfClass:[NSDictionary class]]) {
        
        /* 首次运行将工程目录中js包解压到page目录下 */
        if (NO == [[NSFileManager defaultManager] fileExistsAtPath:K_JS_PAGES_PATH] && NO == [[NSFileManager defaultManager] fileExistsAtPath:K_JS_VERSION_PATH]) {
            
            [self copyBundleResourceToLibrary];
        }
        else{
            
            NSDictionary * bundleConfig = [self loadConfigData:configFile];
            NSDictionary * currentConfig = [self loadConfigData:K_JS_VERSION_PATH];
            NSDictionary * cacheConfig = [self loadConfigData:K_JS_CACHE_VERSION_PATH];
            
            NSString * bundleVersion = [NSString stringWithFormat:@"%@",bundleConfig?bundleConfig[TIMESTAMP]:@""];
            NSString * currentVersion = [NSString stringWithFormat:@"%@",currentConfig?currentConfig[TIMESTAMP]:@""];
            NSString * cacheVersion = [NSString stringWithFormat:@"%@",cacheConfig?cacheConfig[TIMESTAMP]:@""];
            
            NSString * lasetVersion = currentVersion;
            
            if (bundleVersion && currentVersion) {
                /* 如果当前工程里面的js版本大于当前本地的js版本 则 将工程里面的js资源解压到本地 */
                if ([lasetVersion compare:bundleVersion] == NSOrderedAscending) {
                    self.lastVerionType = BMBundleVersion;
                    lasetVersion = bundleVersion;
                }
            }
            
            if(lasetVersion && cacheVersion){
                if ([lasetVersion compare:cacheVersion] == NSOrderedAscending) {
                    self.lastVerionType = BMCacheVersion;
                    lasetVersion = cacheVersion;
                }
            }
            
            //得到版本目前最新的版本
            switch (self.lastVerionType) {
                case BMBundleVersion:
                {
                    [self copyBundleResourceToLibrary];
                    
                }
                    break;
                    
                case BMCacheVersion:
                {
                    [self copyDownloadResourceToLibrary];
                    
                }
                    break;
                    
                default:
                    break;
            }
        }
    }
}

-(NSDictionary*)loadConfigData:(NSString*)configPath
{
    NSData * data = [NSData dataWithContentsOfFile:configPath];
    if (data.length > 0) {
        id info = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
        if ([info isKindOfClass:[NSDictionary class]]) {
            return info;
        }
    }
    return nil;
}

-(void)copyBundleResourceToLibrary
{
    /* 读取当前工程包的js版本信息 */
    NSString *zipFile = [[NSBundle mainBundle] pathForResource:bundle ofType:zip];
    NSString *configFile = [[NSBundle mainBundle] pathForResource:configFileName ofType:nil];
    BOOL copySuccess = [self copyZipAndConfigFiles:zipFile configPath:configFile];
    WXLogInfo(@"从bundle 拷贝到 Library下 成功 %d",copySuccess);
    
}
-(void)copyDownloadResourceToLibrary
{
    
    /* 读取当前工程包的js版本信息 */
    NSString *zipFile = [K_JS_CACHE_PATH stringByAppendingFormat:@"/%@.%@",bundle,zip];
    NSString *configFile = K_JS_CACHE_VERSION_PATH;
    
    
    BOOL copySuccess = [self copyZipAndConfigFiles:zipFile configPath:configFile];
    WXLogInfo(@"从Download 拷贝到 Library下 成功 %d",copySuccess);
    
}
-(BOOL)copyZipAndConfigFiles:(NSString*)zipPath configPath:(NSString*)configPath
{
    BOOL success = NO;
    
    //拷贝源zip包 或者 config文件 不存在时 停止拷贝
    if (NO == [[NSFileManager defaultManager] fileExistsAtPath:zipPath] || NO == [[NSFileManager defaultManager] fileExistsAtPath:configPath]) {
        return success;
    }
    
    //这里采用数据写入的方式 虽然有点耗内存 但是能保证文件的 原子性  如果文件的删除 拷贝 可能会出现极端丢数据的情况
    
    NSData * zipData = [NSData dataWithContentsOfFile:zipPath];
    
    NSData * configData = [NSData dataWithContentsOfFile:configPath];
    
    
    if (configData.length > 0) {
        
        BOOL configReplaceSuccess = [configData writeToFile:K_JS_VERSION_PATH atomically:YES];
        
        if (zipData.length > 0) {
            NSString * resourcePath = [K_JS_BUNDLE_PATH stringByAppendingPathComponent:fileName];
            BOOL zipReplaceSuccess = [zipData writeToFile:resourcePath atomically:YES];
            if (zipReplaceSuccess && configReplaceSuccess) {
                WXLogInfo(@"拷贝config文件和zip包成功");
                
                if ([SSZipArchive unzipFileAtPath:resourcePath toDestination:K_JS_PAGES_PATH]) {
                    WXLogInfo(@"文件解压成功");
                    success = YES;
                }
            }
        }
        
    }
    return success;
}

/* 下载远程js文件 */
- (void)downloadRemoteJSResource:(NSString*)urlString downloadDict:(NSDictionary*)downloadDict isDiff: (Boolean)isDiff
{
    if (urlString.length == 0) {
        return;
    }
    
    /** 判断 如果 self.updateBundleJsUrl 等于 urlString 则说明当前已存在下载任务 */
    if ([self.updateBundleJsUrl isEqualToString:urlString]) {
        return;
    }
    if (isDiff) {
        self.updateBundleJsUrl = urlString;
    } else {
        self.updateBundleJsUrl = [NSString stringWithFormat:@"%@jsVersion/%@.zip", downloadDict[@"path"], downloadDict[@"jsVersion"]];
        urlString = self.updateBundleJsUrl;
    }
    WXLog(self.updateBundleJsUrl);
    __weak typeof(self) weakSelf = self;
    
    /* 下载最新版本 */
    BMUpdateBundlejsRequest *updateJsApi = [[BMUpdateBundlejsRequest alloc] initWithDownloadJSUrl:urlString];
    
    self.updateBundleRequest = updateJsApi;
    
    updateJsApi.resumableDownloadProgressBlock = ^(NSProgress *progress) {
        
        WXLogInfo(@"\n 下载进度>>>> 文件总大小：%lld 已下载：%lld",progress.totalUnitCount,progress.completedUnitCount);
        
#ifdef DEBUG
        [SVProgressHUD showProgress:((float)progress.completedUnitCount / (float)progress.totalUnitCount) status:NSLocalizedString(@"js资源文件更新中...", nil)];
#endif
        
    };
    [updateJsApi startWithCompletionBlockWithSuccess:^(__kindof YTKBaseRequest * _Nonnull request) {
        
        WXLogInfo(@"%@ 下载js文件成功 Request_URL>>>>>>>>>>>>>>>>:%@",NSStringFromClass([request class]),request.requestTask.originalRequest);
        
        [SVProgressHUD dismiss];
        
        /* 标记js文件缓存成功 */
        //判断是否是diff文件 如果是 需要bsdiff 如果不是 直接校验
        if (isDiff) {
            NSData * oldData = [NSData dataWithContentsOfFile:[K_JS_BUNDLE_PATH stringByAppendingFormat:@"/%@.%@",bundle,zip]];
            
            NSURL * url = [NSURL URLWithString:urlString];
            NSString * fileName = [url lastPathComponent];
            NSString * downloadPath = [K_JS_CACHE_PATH stringByAppendingFormat:@"/%@",fileName];
            
            
            
            NSData * patchData = [NSData dataWithContentsOfFile:downloadPath];
            NSLog(@"patchData is %lu",(unsigned long)patchData.length);
            
            
            NSData * newData = [NSData dataWithData:oldData andPatch:patchData];
            NSLog(@"newData is %lu",(unsigned long)newData.length);
            if (newData.length == 0) {
                NSLog(@"BSDIFF 数据失败 记录");
                
                [weakSelf checkNewVersion:NO];
                return;
            }
            
            
            NSString * newZipPath = [K_JS_CACHE_PATH stringByAppendingFormat:@"/%@.%@",bundle,zip];
            
            
            if ([[NSFileManager defaultManager] fileExistsAtPath:newZipPath]) {
                [[NSFileManager defaultManager] removeItemAtPath:newZipPath error:nil];
            }
            
            
            BOOL diffPathZip = [newData writeToFile:newZipPath atomically:YES];
            
            if (diffPathZip){
                WXLogInfo(@"DIFF 数据成功");
                [weakSelf checkDownloadZips:newZipPath downloadPath:downloadPath];
            }
        } else {
            WXLogInfo(@"解析全量包");
            
            
            
            NSString * newZipPath = [K_JS_CACHE_PATH stringByAppendingFormat:@"/%@.%@",bundle,zip];
            
            NSURL * url = [NSURL URLWithString:urlString];
            NSString * fileName = [url lastPathComponent];
            NSString * downloadPath = [K_JS_CACHE_PATH stringByAppendingFormat:@"/%@",fileName];
            
            if ([[NSFileManager defaultManager] fileExistsAtPath:newZipPath]) {
                [[NSFileManager defaultManager] removeItemAtPath:newZipPath error:nil];
            }
            
            [[NSFileManager defaultManager] copyItemAtPath:downloadPath toPath:newZipPath error:nil];
            
            
            [weakSelf checkDownloadZips:newZipPath downloadPath:downloadPath];
        }
    } failure:^(__kindof YTKBaseRequest * _Nonnull request) {
        
        WXLogError(@"%@ Request_URL>>>>>>>>>>>>>>>>:%@",NSStringFromClass([request class]),request.requestTask.originalRequest);
        
#ifdef DEBUG
        [SVProgressHUD dismiss];
#endif
        
        /** 下载失败将之前记录的下载地址清除掉 */
        weakSelf.updateBundleJsUrl = nil;
        
        if (isDiff) {
            //如果diff 包下载失败,下载全量包
            [weakSelf downloadRemoteJSResource:@"complete" downloadDict:downloadDict isDiff:false];
        }
    }];
}

-(void)cleanAndSaveData:(NSDictionary*)dict zipPath:(NSString*)zipPath  pagesPath:(NSString*)pagesPath check:(BOOL)check
{
    //1.删除下载的patch包
    if ([[NSFileManager defaultManager] fileExistsAtPath:zipPath]) {
        [[NSFileManager defaultManager] removeItemAtPath:zipPath error:nil];
    }
    
    
    //2.删除校验的临时目录 check
    if ([[NSFileManager defaultManager] fileExistsAtPath:[K_JS_CACHE_PATH stringByAppendingPathComponent:@"check"]]) {
        [[NSFileManager defaultManager] removeItemAtPath:[K_JS_CACHE_PATH stringByAppendingPathComponent:@"check"] error:nil];
    }
    
    //3.根据校验结果 分别处理事件
    if (check) {
        //写入config文件
        if ([dict isKindOfClass:[NSDictionary class]]) {
            
            NSData * configData = [NSJSONSerialization dataWithJSONObject:dict options:NSJSONWritingPrettyPrinted error:nil];
            if (configData.length > 0) {
                
                BOOL writeSuccess = [configData writeToFile:K_JS_CACHE_VERSION_PATH atomically:YES];
                if (writeSuccess) {
                    WXLogInfo(@"写入配置文件成功");
                    
                    [[BMMediatorManager shareInstance] showJsResourceUpdatedAlert];
                    
                }
            }
        }
    }
    else{
        
#ifdef DEBUG
        [SVProgressHUD showInfoWithStatus:@"js资源文件更新完毕但是校验失败，请程序员哥哥查一下有啥Bug"];
#endif
        
        //校验失败  删除下载的全量包或者patch出的全量包
        if ([[NSFileManager defaultManager] fileExistsAtPath:pagesPath]) {
            [[NSFileManager defaultManager] removeItemAtPath:pagesPath error:nil];
        }
    }
}
#pragma mark 校验包
-(void)checkDownloadZips:(NSString*)zipPath downloadPath:(NSString*)downloadPath
{
    
    __weak typeof(self) weakSelf = self;
    WXLogInfo(@"校验开始");
    [BMResourceCheck checkLocalResourceByZipPath:zipPath result:^(BOOL check, NSDictionary *info) {
        WXLogInfo(@"校验结束");
        
        [weakSelf cleanAndSaveData:info zipPath:downloadPath pagesPath:zipPath check:check];
    }];
}

- (NSString *)bmWidgetJs
{
    if (!_bmWidgetJs) {
        NSString *widgetJs = nil;
        // 拦截器开启从本地读取widget 关闭从服务器读取
        if (BM_InterceptorOn()) {
            NSString *widgetFile = [K_JS_PAGES_PATH stringByAppendingPathComponent:TK_PlatformInfo().appBoard];
            widgetJs = [NSString stringWithContentsOfFile:widgetFile encoding:NSUTF8StringEncoding error:nil];
        }
        else
        {
            // 拦截器关闭app不再拼接 widget，起服务的时候js端会自动拼接
            return @"";
//            widgetJs = [NSString stringWithContentsOfURL:[BMAppResource configJSFullURLWithPath:TK_PlatformInfo().appBoard] encoding:NSUTF8StringEncoding error:nil];
        }
        _bmWidgetJs = widgetJs;
    }
    return _bmWidgetJs;
}
+ (NSString*)getJsVersion
{
    NSData * data = [NSData dataWithContentsOfFile:K_JS_VERSION_PATH];
    if (data.length > 0) {
        id info = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
        if ([info isKindOfClass:[NSDictionary class]]) {
            return info[JS_VERSION]?info[JS_VERSION]:@"";
        }
    }
    return @"";
}
@end

