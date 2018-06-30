//
//  BMRouterModel.m
//  WeexDemo
//
//  Created by XHY on 2017/1/16.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMRouterModel.h"

@implementation BMRouterModel

- (instancetype)init
{
    if (self = [super init]) {
        _canBack = YES;
        _navShow = YES;
        _gesBack = YES;
    }
    return self;
}

+ (NSDictionary *)modelCustomPropertyMapper
{
    return @{@"vLength" : @"length"};
}



@end
