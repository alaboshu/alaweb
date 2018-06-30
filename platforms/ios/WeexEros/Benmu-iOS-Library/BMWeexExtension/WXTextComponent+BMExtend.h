//
//  WXTextComponent+BMExtend.h
//  BM-JYT
//
//  Created by XHY on 2017/3/20.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <WeexSDK/WeexSDK.h>
#import <WeexSDK/WXTextComponent.h>

@interface WXTextComponent (BMExtend)

- (instancetype)bmText_initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance;

@end
