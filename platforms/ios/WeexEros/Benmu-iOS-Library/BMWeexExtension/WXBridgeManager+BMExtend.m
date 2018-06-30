//
//  WXBridgeManager+BMExtend.m
//  BM-JYT
//
//  Created by XHY on 2017/3/30.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "WXBridgeManager+BMExtend.h"
#import <WeexSDK/WXCallJSMethod.h>

@implementation WXBridgeManager (BMExtend)

- (void)bm_fireEvent:(NSString *)instanceId ref:(NSString *)ref type:(NSString *)type params:(NSDictionary *)params domChanges:(NSDictionary *)domChanges
{
    WXSDKInstance *instance = [WXSDKManager instanceForID:instanceId];
    if (!instance) return;
    
    [self bm_fireEvent:instanceId ref:ref type:type params:params domChanges:domChanges];
}



@end
