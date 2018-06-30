//
//  BMStoreManager.m
//  WeexDemo
//
//  Created by XHY on 2017/2/7.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMStoreManager.h"

@implementation BMStoreManager

+ (NSString *)getDataPathWithKey:(NSString *)key
{
    NSFileManager *fm = [NSFileManager defaultManager];
    if (![fm fileExistsAtPath:K_STORAGE_PATH]) {
        [fm createDirectoryAtPath:K_STORAGE_PATH withIntermediateDirectories:YES attributes:nil error:nil];
    }
    
    return [K_STORAGE_PATH stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.data",key]];
}

+ (BOOL)archiveObject:(id)obj toFilePath:(NSString *)filePath
{
    return [NSKeyedArchiver archiveRootObject:obj toFile:filePath];
}

+ (id)unarchiveObjectWithFilePath:(NSString *)filePath
{
    return [NSKeyedUnarchiver unarchiveObjectWithFile:filePath];
}

+ (BOOL)fileExistsAtPath:(NSString *)filePath
{
    NSFileManager *fm = [NSFileManager defaultManager];
    return [fm fileExistsAtPath:filePath];
}

+ (BOOL)deleteFileAtPath:(NSString *)filePath
{
    NSFileManager *fm = [NSFileManager defaultManager];
    return [fm removeItemAtPath:filePath
                          error:NULL];
}

@end
