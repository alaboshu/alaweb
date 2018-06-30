//
//  BMPayModule.m
//  WeexDemo
//
//  Created by XHY on 2017/2/7.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMPayModule.h"
#import "BMPayManager.h"

@implementation BMPayModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(payByWechat:callback:))

- (void)payByWechat:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    [[BMPayManager shareInstance] payByWechat:info callback:callback];
}

@end
