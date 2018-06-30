//
//  BMUserInfoModel.m
//  WeexDemo
//
//  Created by XHY on 2017/2/7.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMUserInfoModel.h"
#import <YYModel.h>

@implementation BMUserInfoModel

+ (instancetype)shareInstance
{
    static BMUserInfoModel *_instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[BMUserInfoModel alloc] init];
    });
    return _instance;
}

- (void)encodeWithCoder:(NSCoder *)aCoder
{
    [self yy_modelEncodeWithCoder:aCoder];
}

- (id)initWithCoder:(NSCoder *)aDecoder
{
    return [self yy_modelInitWithCoder:aDecoder];
}

- (void)clearData
{
    _name = nil;
    _phone = nil;
    _image = nil;
    _token = nil;
    _auth = NO;
    _existPwd = NO;
}

@end
