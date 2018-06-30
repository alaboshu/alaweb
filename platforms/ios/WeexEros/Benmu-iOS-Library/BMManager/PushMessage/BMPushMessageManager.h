//
//  BMPushMessageManager.h
//  BM-JYT
//
//  Created by XHY on 2017/3/2.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BMPushMessageManager : NSObject

@property (nonatomic, assign) BOOL isLaunchedByNotification;    // 是否点击推送信息进入app

+ (instancetype)shareInstance;

/* 获取cid */
+ (NSString *)getCid;

/* 配置推送服务 */
+ (void)configPushService;

/* 注册token */
+ (void)registerForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;

/* 后台更新 */
+ (void)performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

/* ios10之前 收到push消息回调方法 */
+ (void)receiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

/**
 用户点击推送消息打开app，会调用此方法注册一个监听首屏渲染完成的通知，然后再将推送内容 fire 给js
 
 @pushMessage userInfo 消息体
 */
+ (void)addPushNotification:(NSDictionary *)pushMessage;

@end
