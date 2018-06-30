//
//  BMCheckJsVersionRequest.h
//  WeexDemo
//
//  Created by XHY on 2017/1/10.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMBaseRequest.h"

@interface BMCheckJsVersionRequest : BMBaseRequest

- (instancetype)initWithAppName;

@property (nonatomic,readonly)NSString * appName;

@property (nonatomic,readonly)NSString * appVersion;

@property (nonatomic,readonly)NSString * jsVersion;

@property (nonatomic,readonly)BOOL isDiff;

@end

