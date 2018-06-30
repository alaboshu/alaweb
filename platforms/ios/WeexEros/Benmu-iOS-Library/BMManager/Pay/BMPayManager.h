//
//  BMPayManager.h
//  WeexDemo
//
//  Created by XHY on 2017/2/7.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>

@interface BMPayManager : NSObject

+ (instancetype)shareInstance;

/* 调用微信支付 */
- (void)payByWechat:(NSDictionary *)payInfo callback:(WXModuleCallback)callback;

/* 从其他app掉起次app时调用 */
- (BOOL)applicationOpenURL:(NSURL *)url;

@end
