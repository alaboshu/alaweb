//
//  WXBMNetworkDefaultlpml.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/6.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "WXBMNetworkDefaultlpml.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXAppConfiguration.h"
#import <WeexSDK/WeexSDK.h>
#import <WeexSDK/WXResourceLoader.h>

#import <CommonCrypto/CommonDigest.h>

#define CC_MD5_DIGEST_LENGTH 16

const NSString * pageKey = @"page";

const NSString * md5Key = @"md5";

@interface WXBMNetworkDefaultlpml () <NSURLSessionDataDelegate>
{
    NSArray * _mimeTypes;   /**< 指定拦截器拦截的请求数据类型 */
    BOOL _interceptor;  /**< 拦截器开关 */
    NSMutableDictionary * _md5Maps;
    
    NSURLSession *_session;
    WXThreadSafeMutableDictionary<NSURLSessionDataTask *, id<WXResourceRequestDelegate>> *_delegates;
}
@end


@implementation WXBMNetworkDefaultlpml
-(instancetype)init
{
    self = [super init];
    if (self) {
        _mimeTypes = @[@"js"];
        _interceptor = YES;
    }
    return self;
}

-(void)sendRequest:(WXResourceRequest *)request withDelegate:(id<WXResourceRequestDelegate>)delegate
{
    NSString* const requestFiletype = [[[request URL] pathExtension] lowercaseString];
    
    _interceptor = BM_InterceptorOn();
    
    // 如果拦截器
    if (_interceptor && [_mimeTypes containsObject:requestFiletype]) {
        [self fliterResourceFromLocal:request withDelegate:delegate];
    }
    else{
        [self downloadResourceRemote:request withDelegate:delegate];
    }
    
}
- (void)cancelRequest:(WXResourceRequest *)request
{
    if ([request.taskIdentifier isKindOfClass:[NSURLSessionTask class]]) {
        NSURLSessionTask *task = (NSURLSessionTask *)request.taskIdentifier;
        [task cancel];
        [_delegates removeObjectForKey:task];
    }
}

#pragma mark - NSURLSessionTaskDelegate & NSURLSessionDataDelegate

- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
   didSendBodyData:(int64_t)bytesSent
    totalBytesSent:(int64_t)totalBytesSent
totalBytesExpectedToSend:(int64_t)totalBytesExpectedToSend
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    [delegate request:(WXResourceRequest *)task.originalRequest didSendData:bytesSent totalBytesToBeSent:totalBytesExpectedToSend];
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task
didReceiveResponse:(NSURLResponse *)response
 completionHandler:(void (^)(NSURLSessionResponseDisposition))completionHandler
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    [delegate request:(WXResourceRequest *)task.originalRequest didReceiveResponse:(WXResourceResponse *)response];
    completionHandler(NSURLSessionResponseAllow);
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task didReceiveData:(NSData *)data
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    [delegate request:(WXResourceRequest *)task.originalRequest didReceiveData:data];
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    if (error) {
        [delegate request:(WXResourceRequest *)task.originalRequest didFailWithError:error];
    }else {
        [delegate requestDidFinishLoading:(WXResourceRequest *)task.originalRequest];
    }
    [_delegates removeObjectForKey:task];
}

#ifdef __IPHONE_10_0
- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didFinishCollectingMetrics:(NSURLSessionTaskMetrics *)metrics
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    [delegate request:(WXResourceRequest *)task.originalRequest didFinishCollectingMetrics:metrics];
}
#endif

#pragma mark 替换链接
-(NSString*)path:(NSURL*)url
{
    //    fe.benmu-health.com/app-benmu-health/dist/js/pages/
    
    NSString * path  =[url path];
    WXLogInfo(@" path %@",path);
    
    NSString * replaceString = [NSString stringWithFormat:@"%@",K_JS_ADD_PATH];
    
    NSString * fileName = [path stringByReplacingOccurrencesOfString:replaceString withString:@""];
    WXLogInfo(@"fileName %@",fileName);
    return fileName;
}


-(NSString*)convertRemoteURLToLocal:(NSURL*)url
{
    NSString * fileName = [self path:url];
    NSString * realFilePath = [NSString stringWithFormat:@"%@%@",K_JS_PAGES_PATH,fileName];
    WXLogInfo(@"realFilePath is %@",realFilePath);
    
    
    return realFilePath;
}

#pragma mark md5
-(NSString*)md5byData:(NSData*)data
{
    if (data) {
        unsigned char digest[CC_MD5_DIGEST_LENGTH];
        CC_MD5(data.bytes, (CC_LONG)data.length, digest);
        
        NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
        
        for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++){
            [output appendFormat:@"%02x", digest[i]];
        }
        return [output lowercaseString];
    }
    return nil;
}
#pragma mark 远程下载
-(void)downloadResourceRemote:(WXResourceRequest *)request withDelegate:(id<WXResourceRequestDelegate>)delegate
{
    if (!_session) {
        NSURLSessionConfiguration *urlSessionConfig = [NSURLSessionConfiguration defaultSessionConfiguration];
        if ([WXAppConfiguration customizeProtocolClasses].count > 0) {
            NSArray *defaultProtocols = urlSessionConfig.protocolClasses;
            urlSessionConfig.protocolClasses = [[WXAppConfiguration customizeProtocolClasses] arrayByAddingObjectsFromArray:defaultProtocols];
        }
        _session = [NSURLSession sessionWithConfiguration:urlSessionConfig
                                                 delegate:self
                                            delegateQueue:[NSOperationQueue mainQueue]];
        _delegates = [WXThreadSafeMutableDictionary new];
    }
    
    NSURLSessionDataTask *task = [_session dataTaskWithRequest:request];
    request.taskIdentifier = task;
    [_delegates setObject:delegate forKey:task];
    [task resume];
}
#pragma mark 本地拦截
-(void)fliterResourceFromLocal:(WXResourceRequest *)request withDelegate:(id<WXResourceRequestDelegate>)delegate
{
    if (nil == _md5Maps) {
        _md5Maps = [[NSMutableDictionary alloc] initWithCapacity:0];
        NSString * md5Path = [NSString stringWithFormat:@"%@/%@",K_JS_PAGES_PATH,@"md5.json"];
        NSData * md5Data = [NSData dataWithContentsOfFile:md5Path];
        
        if (md5Data.length> 0) {
            id  json = [NSJSONSerialization JSONObjectWithData:md5Data options:NSJSONReadingMutableLeaves error:nil];
            if ([json isKindOfClass:[NSDictionary class]]) {
                NSArray * array = json[@"filesMd5"];
                if ([array isKindOfClass:[NSArray class]]) {
                    for (NSDictionary * dict in array) {
                        //TODO: 版本的判断
                        
                        //重新组合 数据 key为path value 为md5值
                        NSString * page = dict[pageKey];
                        NSString * md5 = dict[md5Key];
                        
                        if (page && md5) {
                            [_md5Maps setObject:md5 forKey:page];
                        }
                    }
                }
            }
        }
    }
    
    WXLogInfo(@"本木拦截器 类型 is %@",request.URL.absoluteString);
    NSString * localPath =  [self convertRemoteURLToLocal:request.URL];
    WXResourceLoader * loader = (WXResourceLoader*)delegate;
    if([WXUtility isFileExist:localPath]){
        
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            NSData *fileData = [NSData dataWithContentsOfFile:localPath];
            
            if ([delegate isKindOfClass:[WXResourceLoader class]]){
                
                if (fileData.length > 0) {
                    
                    
                    NSString * path = [self path:request.URL];
                
                    NSString * fileMD5 = [_md5Maps objectForKey:path];
                    
                    NSString * realMD5 = [self md5byData:[NSData dataWithContentsOfFile:localPath]];
                    
                    if ([fileMD5 isEqualToString:realMD5]) {
                        if (loader.onFinished) {
                            loader.onFinished(nil,fileData);
                        }
                    }
                    else{
                        if (loader.onFailed) {
                            
                            WXLogError(@"本地资源md5校验失败: %@",localPath);
                            
                            NSError * error  = [NSError errorWithDomain:@"BMNetWorkIntercepet" code:-500 userInfo:[NSDictionary dictionaryWithObjectsAndKeys:@"本地资源md5校验失败",@"reason", nil]];
                            loader.onFailed(error);
                        }
                        
                    }
                }
                else{
                    if (loader.onFailed) {
                        NSError * error  = [NSError errorWithDomain:@"BMNetWorkIntercepet" code:-400 userInfo:[NSDictionary dictionaryWithObjectsAndKeys:@"本地资源没有匹配到",@"reason", nil]];
                        loader.onFailed(error);
                    }
                }
            }
        });
    } else {
        
        WXLogError(@"\n\n\n【error】本地资源不存在: %@\n\n\n",localPath);
        
        if (loader.onFailed) {
            NSError * error  = [NSError errorWithDomain:@"BMNetWorkIntercepet" code:-400 userInfo:[NSDictionary dictionaryWithObjectsAndKeys:@"本地资源没有匹配到",@"reason", nil]];
            loader.onFailed(error);
        }
    }
}
@end
