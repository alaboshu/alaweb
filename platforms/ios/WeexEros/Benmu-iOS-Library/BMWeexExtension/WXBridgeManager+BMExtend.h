//
//  WXBridgeManager+BMExtend.h
//  BM-JYT
//
//  Created by XHY on 2017/3/30.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <WeexSDK/WeexSDK.h>

@interface WXBridgeManager (BMExtend)

- (void)bm_fireEvent:(NSString *)instanceId ref:(NSString *)ref type:(NSString *)type params:(NSDictionary *)params domChanges:(NSDictionary *)domChanges;

@end
