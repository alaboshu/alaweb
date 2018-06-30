//
//  BMUpdateBundlejsRequest.m
//  WeexDemo
//
//  Created by XHY on 2017/1/10.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMUpdateBundlejsRequest.h"
#import "BMDefine.h"
#import "YTKNetworkPrivate.h"

@implementation BMUpdateBundlejsRequest
{
    NSString *_downloadUrl;
}

- (instancetype)initWithDownloadJSUrl:(NSString *)downloadUrl
{
    if (self = [super init]) {
        _downloadUrl = downloadUrl;
    }
    
    return self;
}

- (NSString *)requestURLPath
{
    return [NSURL URLWithString:_downloadUrl].path;
}

- (NSString *)baseUrl
{
    return nil;
}

- (NSString *)requestUrl
{
    return _downloadUrl;
}

- (NSString *)resumableDownloadPath
{
    WXLogInfo(@"%@",K_JS_CACHE_PATH);
    return K_JS_CACHE_PATH;
}

/**
 将当前下载的临时文件信息保存到指定目录 以便下次继续断点续传
 */
- (void)saveIncompleteDownloadTempData
{
    if ([self.requestTask isKindOfClass:[NSURLSessionDownloadTask class]]) {
        
        NSURLSessionDownloadTask *downloadTask = (NSURLSessionDownloadTask *)self.requestTask;
        
//        __weak typeof(self) weakSelf = self;
        [downloadTask cancelByProducingResumeData:^(NSData * _Nullable resumeData) {
//            [resumeData writeToURL:[weakSelf incompleteDownloadTempPath] atomically:YES];
//            
//            [downloadTask resume];
        }];
        
    }
}

- (NSURL *)incompleteDownloadTempPath
{
    NSString *tempPath = nil;
    NSString *md5URLString = [YTKNetworkUtils md5StringFromString:[self resumableDownloadPath]];
    tempPath = [[self incompleteDownloadTempCacheFolder] stringByAppendingPathComponent:md5URLString];
    return [NSURL fileURLWithPath:tempPath];
}

- (NSString *)incompleteDownloadTempCacheFolder
{
    NSFileManager *fileManager = [NSFileManager new];
    static NSString *cacheFolder;
    
    if (!cacheFolder) {
        NSString *cacheDir = NSTemporaryDirectory();
        cacheFolder = [cacheDir stringByAppendingPathComponent:@"Incomplete"];
    }
    
    NSError *error = nil;
    if(![fileManager createDirectoryAtPath:cacheFolder withIntermediateDirectories:YES attributes:nil error:&error]) {
        YTKLog(@"Failed to create cache directory at %@", cacheFolder);
        cacheFolder = nil;
    }
    return cacheFolder;
}

@end
