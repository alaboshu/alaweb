//
//  BMAddRuleManager.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/8.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMAddRuleManager.h"
#import <WeexSDK/WXRuleManager.h>
#import <WeexSDK/WeexSDK.h>
#import "WXHandlerFactory.h"
#import "WXURLRewriteProtocol.h"

#define BM_LOCAL @"bmlocal"

#define BM_FONT_DOWNLOAD_DIR [[WXUtility libraryDirectory] stringByAppendingPathComponent:[NSString stringWithFormat:@"bm-iconfont"]]


const char * fontStorageKey = "_fontStorage";

@interface BMAddRuleManager()

@end


@implementation BMAddRuleManager

+(void)addRule:(NSString*)type rule:(NSDictionary *)rule
{
    WXRuleManager * ruleManager = [WXRuleManager sharedInstance];
    
//    @property (nonatomic, strong) WXThreadSafeMutableDictionary *fontStorage;
    
    Ivar ivar = class_getInstanceVariable([WXRuleManager class], fontStorageKey);
    
    id fontStorage = object_getIvar(ruleManager, ivar);
    if (NO == [fontStorage isKindOfClass:[WXThreadSafeMutableDictionary class]]){
        WXLogError(@"取值错误");
        return;
    }
    WXThreadSafeMutableDictionary * _fontStorage = fontStorage;
    

    if ([type isEqualToString:@"fontFace"] && [rule[@"src"] isKindOfClass:[NSString class]]) {
        if (rule[@"src"] && rule[@"fontFamily"] && ![WXUtility isBlankString:rule[@"src"]]) {
            NSString *ruleSrc = [WXConvert NSString:rule[@"src"]];
            if (!ruleSrc) {
                WXLogError(@"%@ is illegal for font src",rule[@"src"]);
                return;
            }
            NSUInteger start = [rule[@"src"] rangeOfString:@"url('"].location + @"url('".length;
            NSUInteger end  = [rule[@"src"] rangeOfString:@"')" options:NSBackwardsSearch].location;
            if (end <= start || start == NSNotFound || end == NSNotFound) {
                WXLogWarning(@"font url is not specified");
                return;
            }
            
            NSString *fontSrc = [rule[@"src"] substringWithRange:NSMakeRange(start, end-start)];
            NSMutableString *newURL = [fontSrc copy];
            WX_REWRITE_URL(fontSrc, WXResourceTypeFont, ruleManager.instance)
            
            if (!newURL) {
                return;
            }
            
            fontSrc = newURL;
            NSMutableDictionary * fontFamily = [_fontStorage objectForKey:rule[@"fontFamily"]];
            if (fontFamily && [fontFamily[@"src"] isEqualToString:fontSrc]) {
                // if the new src is same as src in dictionary , ignore it, or update it
                return;
            }
            if (!fontFamily) {
                fontFamily = [NSMutableDictionary dictionary];
            }
            NSURL *fontURL = [NSURL URLWithString:fontSrc];
            if (!fontURL) {
                // if the fontSrc string is illegal, the fontURL will be nil
                return;
            }
            if([fontURL isFileURL]){
                [fontFamily setObject:fontSrc forKey:@"src"];
            }else {
                [fontFamily setObject:fontSrc forKey:@"tempSrc"];
            }
            
            [_fontStorage setObject:fontFamily forKey:rule[@"fontFamily"]];
            
            
            //创建 bm-iconfont 目录
            [BMAddRuleManager createIconfontDownloadPath];
            
            if ([fontURL.scheme isEqualToString:BM_LOCAL]) {
                // 拦截器
                if (BM_InterceptorOn()) {
                    // 从本地读取
                    NSString *locaFilePath = [NSString stringWithFormat:@"%@/%@%@",K_JS_PAGES_PATH,fontURL.host,fontURL.path];
                    if ([WXUtility isFileExist:locaFilePath]) {
                        [fontFamily setObject:[NSURL fileURLWithPath:locaFilePath] forKey:@"localSrc"];
                    } else {
                        WXLogError(@"iconfont 文件不存在:%@",fontSrc);
                    }
                    return;
                } else {
                    fontSrc = [NSString stringWithFormat:@"%@/dist/%@%@",TK_PlatformInfo().url.jsServer,fontURL.host,fontURL.path];
                    fontURL = [NSURL URLWithString:fontSrc];
                    [fontFamily setObject:fontSrc forKey:@"tempSrc"];
                }
            }
            
            // remote font file
            NSString *fontfile = [NSString stringWithFormat:@"%@/%@",BM_FONT_DOWNLOAD_DIR,[WXUtility md5:[fontURL absoluteString]]];
    
            if ([WXUtility isFileExist:fontfile]) {
                // if has been cached, load directly
                [fontFamily setObject:[NSURL fileURLWithPath:fontfile] forKey:@"localSrc"];
                return;
            }
            
            
            [WXUtility getIconfont:fontURL completion:^(NSURL * _Nonnull url, NSError * _Nullable error) {
                if (!error && url) {
                    
                    //拷贝下载好的iconfont到指定文件夹
                    [BMAddRuleManager copyIconfontDirectory:url];
                    
                    // load success
                    NSMutableDictionary * dictForFontFamily = [_fontStorage objectForKey:rule[@"fontFamily"]];
                    NSString *fontSrc = [dictForFontFamily objectForKey:@"tempSrc"];
                    if (fontSrc) {
                        [dictForFontFamily setObject:fontSrc forKey:@"src"];
                    }
                    [dictForFontFamily setObject:[NSURL fileURLWithPath:fontfile] forKey:@"localSrc"];
                    
                    [[NSNotificationCenter defaultCenter] postNotificationName:WX_ICONFONT_DOWNLOAD_NOTIFICATION object:nil userInfo:@{@"fontFamily":rule[@"fontFamily"]}];
                } else {
                    //there was some errors during loading
                    WXLogError(@"load font failed %@",error.description);
                }
            }];
        }
    }
}

#pragma mark 添加不同步iCould属性
+(BOOL)addSkipBackupAttributeToItemAtPath:(NSString *)filePathString
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

#pragma mark 创建iconfont下载路径
+(void)createIconfontDownloadPath
{
    if (NO == [WXUtility isFileExist:BM_FONT_DOWNLOAD_DIR]) {
        NSError * error = nil;
        BOOL createSuccess = [[NSFileManager defaultManager] createDirectoryAtPath:BM_FONT_DOWNLOAD_DIR withIntermediateDirectories:YES attributes:nil error:&error];
        if (NO == createSuccess || nil != error) {
            WXLogError(@"创建文件失败");
            return;
        }
    }
    BOOL addSkipSuccess = [[self class] addSkipBackupAttributeToItemAtPath:BM_FONT_DOWNLOAD_DIR];
    if (addSkipSuccess) {
        WXLogInfo(@"创建iconfont文件夹成功");
    }
}

+(void)copyIconfontDirectory:(NSURL*)cacheURL
{
    
//    file:///Users/doujingxuan/Library/Developer/CoreSimulator/Devices/84BEE3B5-47E3-4862-BA97-CBBE513041A8/data/Containers/Data/Application/BC223D6C-41A9-4A96-9B68-48166A53A16B/Library/Caches/wxdownload/2f5217a9967c7f3cdccad3530f0a645f
    
    NSString * cacheIconfontPath = [cacheURL path];
    if ([WXUtility isFileExist:cacheIconfontPath]) {
        NSString * pathComponent = [cacheIconfontPath lastPathComponent];
        WXLogInfo(@"pathComponent is %@",pathComponent);
        
        NSString * newPath = [BM_FONT_DOWNLOAD_DIR stringByAppendingPathComponent:pathComponent];
        WXLogInfo(@"newPath is %@",newPath);
        
        NSError * error = nil;
        
//        [[NSFileManager defaultManager] copyItemAtPath:cacheIconfontPath toPath:newPath error:&error];
        BOOL moveSuccess =  [[NSFileManager defaultManager] moveItemAtPath:cacheIconfontPath toPath:newPath error:&error];
        if (moveSuccess && nil == error) {
            WXLogInfo(@"移动文件成功");
        }
    }
    
}

@end
