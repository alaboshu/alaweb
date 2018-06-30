//
//  BMResourceCheck.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/13.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMResourceCheck.h"
#import <SSZipArchive/SSZipArchive.h>
#import <WeexSDK/WeexSDK.h>

const char * BMResource_Check_Queue_1 = "BMResource_Check_Queue_1";

const char * BMResource_Check_Queue_2 = "BMResource_Check_Queue_2";

const char * BMResource_Check_Queue_3 = "BMResource_Check_Queue_3";


@implementation BMResourceCheck

+(void)checkLocalResourceByZipPath:(NSString*)zipPath result:(bmResourceCheckResult)result
{
    NSString * checkPath = [K_JS_CACHE_PATH stringByAppendingPathComponent:@"check"];
    if (NO == [[NSFileManager defaultManager] fileExistsAtPath:checkPath]) {
     BOOL createSuccess  =  [[NSFileManager defaultManager] createDirectoryAtPath:checkPath withIntermediateDirectories:YES attributes:nil error:nil];
        if (createSuccess) {
            WXLogInfo(@"创建校验文件夹成功");
        }
    }
    
    if ([[NSFileManager defaultManager] fileExistsAtPath:zipPath]) {
        if ([SSZipArchive unzipFileAtPath:zipPath toDestination:checkPath]) {
            
            WXLogInfo(@"解压缩成功");
            NSString * md5Path = [checkPath stringByAppendingPathComponent:@"/md5.json"];
            if ([[NSFileManager defaultManager] fileExistsAtPath:md5Path]) {
                NSDictionary * info = [[self class] loadConfigData:md5Path];
                if (info) {
                    [[self class] checkResourceByMd5Dict:info result:result];
                }
            }
            
        }
        else{
            WXLogError(@"解压缩失败");
        }
    }
}

+(void)checkResourceByMd5Dict:(NSDictionary*)md5Dict result:(bmResourceCheckResult)result
{
    NSArray * md5s = md5Dict[@"filesMd5"];
    
    NSString * jsVersion = md5Dict[@"jsVersion"];
    
    NSMutableArray * md5Array = [[NSMutableArray alloc] initWithCapacity:0];
    
  
     dispatch_queue_t queue1 = dispatch_queue_create(BMResource_Check_Queue_1, DISPATCH_QUEUE_SERIAL);
     dispatch_queue_t queue2 = dispatch_queue_create(BMResource_Check_Queue_1, DISPATCH_QUEUE_SERIAL);
     dispatch_queue_t queue3 = dispatch_queue_create(BMResource_Check_Queue_1, DISPATCH_QUEUE_SERIAL);
    
     dispatch_async(queue1, ^{
         for (int i = 0; i < md5s.count; i++) {
             id fileinfo = [md5s objectAtIndex:i];
             
             if ([fileinfo isKindOfClass:[NSDictionary class]]) {
                 NSString * md5 = fileinfo[@"md5"];
                 if (md5.length > 0) {
                     [md5Array addObject:md5];
                 }
             }
         }

         
         dispatch_async(queue2, ^{
             
             NSStringCompareOptions comparisonOptions = NSForcedOrderingSearch;
             NSComparator sort = ^(NSString *obj1,NSString *obj2){
                 NSRange range = NSMakeRange(0,obj1.length);
                 return [obj1 compare:obj2 options:comparisonOptions range:range];
             };
             NSArray *resultArray2 = [md5Array sortedArrayUsingComparator:sort];

             dispatch_async(queue3, ^{
                 
                 NSMutableString * md5String = [NSMutableString string];
                 for (int j = 0; j < resultArray2.count; j++) {
                     NSString * sortMd5 = [resultArray2 objectAtIndex:j];
                     WXLogInfo(@"sortMd5 is %@",sortMd5);
                     if (sortMd5.length > 0) {
                         [md5String appendString:sortMd5];
                     }
                 }

                 NSString * zipMd5 = [WXUtility md5:md5String];
                 WXLogInfo(@"zipMd5 is %@",zipMd5);
                 
                 if ([zipMd5 isEqualToString:jsVersion]) {
                     WXLogInfo(@"校验通过");
                     if (result) {
                         result(YES,md5Dict);
                     }
                 }
                 else{
                     WXLogError(@"校验失败");
                     if (result) {
                         result(NO,md5Dict);
                     }
                 }
             });
         });
    });
}

+(NSDictionary*)loadConfigData:(NSString*)configPath
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

@end
