//
//  BMCheckJsVersionRequest.m
//  WeexDemo
//
//  Created by XHY on 2017/1/10.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMCheckJsVersionRequest.h"
#import "BMConfigManager.h"

@interface BMCheckJsVersionRequest()

@property (nonatomic,readwrite)NSString * appName;

@property (nonatomic,readwrite)NSString * appVersion;

@property (nonatomic,readwrite)NSString * jsVersion;

@property (nonatomic,readwrite)BOOL isDiff;
@end



@implementation BMCheckJsVersionRequest

- (instancetype)initWithAppName
{
    if (self = [super init]) {}
    return self;
}

- (NSString *)requestURLPath
{
    return [self requestUrl];
}

- (NSString *)requestUrl
{
    return [[BMConfigManager shareInstance].platform.url.bundleUpdate stringByAppendingString: @"version.json"];
}

- (id)requestArgument
{
    return @{};
}

@end

