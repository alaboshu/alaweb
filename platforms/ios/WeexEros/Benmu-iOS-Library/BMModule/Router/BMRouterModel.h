//
//  BMRouterModel.h
//  WeexDemo
//
//  Created by XHY on 2017/1/16.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <YYModel.h>
#import <WeexSDK/WXModuleProtocol.h>

#define K_ANIMATE_PRESENT @"PRESENT"
#define K_ANIMATE_PUSH @"PUSH"
#define K_ANIMATE_TRANSLATION @"TRANSLATION"

@interface BMRouterModel : NSObject

@property (nonatomic, copy) NSString *url;                      // 下一个页面路径
@property (nonatomic, copy) NSString *type;                     // 页面出现方式：push ， present
@property (nonatomic, strong) NSDictionary *params;             // 需要传到下一个页面的数据
@property (nonatomic, assign) BOOL canBack;                     // 是否禁止返回 true 禁止 手势返回 和 按钮返回都会屏蔽
@property (nonatomic, assign) BOOL gesBack;                     // 是否开启手势返回 默认开启
@property (nonatomic, assign) NSInteger vLength;                // 页面返回多少级
@property (nonatomic, assign) BOOL isRunBackCallback;           // 点击返回按钮时是否响应 backCallback 回调方法 👇
@property (nonatomic, copy) WXModuleCallback backCallback;      // 点击返回时的回调方法
@property (nonatomic, assign) BOOL navShow;                     // 是否显示导航栏
@property (nonatomic, copy) NSString *navTitle;                 // 导航栏title
@property (nonatomic, copy) NSString *statusBarStyle;           // Default:黑色 LightContent:白色

@property (nonatomic,copy) NSString * pageName;                 //页面名 可以用作Router 更易读
@end
