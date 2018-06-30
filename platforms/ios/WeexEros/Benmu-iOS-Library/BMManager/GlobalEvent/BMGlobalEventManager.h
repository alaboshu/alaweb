//
//  BMGlobalEventManager.h
//  BM-JYT
//
//  Created by XHY on 2017/3/3.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>

/**
 通知js当前页面的状态
 
 - BMControllerStateOpen: 首次打开
 - BMControllerStateBack: 从其他页面返回
 - BMControllerStateRefresh: 页面重新加载（refreshWeex）
 */
typedef NS_OPTIONS(NSUInteger, BMControllerState) {
    BMControllerStateOpen = 0,
    BMControllerStateBack,
    BMControllerStateRefresh
};

/* 页面生命周期相关事件 */
#define BMControllerStateArray  @[@"open",@"back",@"refresh"]
static NSString * const BMViewWillAppear = @"viewWillAppear";
static NSString * const BMViewDidAppear = @"viewDidAppear";
static NSString * const BMViewWillDisappear = @"viewWillDisappear";
static NSString * const BMViewDidDisappear = @"viewDidDisappear";

/* 截屏意见反馈事件 */
static NSString * const BMScreenshotFeedbackEvent = @"screenshotFeedback";

/** weex 首屏渲染完毕通知 */
static NSString * const BMFirstScreenDidFinish = @"BMFirstScreenDidFinish";

@interface BMGlobalEventManager : NSObject


/**
 发送全局时间

 @param event 时间名称
 @param params 参数
 */
+ (void)sendGlobalEvent:(NSString *)event params:(NSDictionary *)params;

/**
 发送页面生命周期事件

 @param instance WXSDKInstance实例
 @param event 事件名称（对应js方法名）
 @param state 页面状态
 */
+ (void)sendViewLifeCycleEventWithInstance:(WXSDKInstance *)instance event:(NSString *)event controllerState:(BMControllerState)state;

/* 收到推送通知后发送事件给js */
+ (void)pushMessage:(NSDictionary *)info appLaunchedByNotification:(BOOL)isLaunchedByNotification;

@end
