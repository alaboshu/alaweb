//
//  BMMediatorManager.h
//  WeexDemo
//
//  Created by XHY on 2017/2/3.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <WeexSDK/WeexSDK.h>
#import "BMRouterModel.h"

@class BMWebViewRouterModel;

@interface BMMediatorManager : NSObject

+ (instancetype)shareInstance;

@property (nonatomic, assign) BOOL isLogin; // 是否已经登录

@property (nonatomic, weak) WXSDKInstance *currentWXInstance;           // 当前栈顶的WXSDKInstance
@property (nonatomic, weak) UIViewController *currentViewController;    // 当前栈顶的ViewController
@property (nonatomic, weak) UITabBarController *baseTabBarController;

/* app启动后加载页面 */
- (void)loadViewControllerWithWindow:(UIWindow *)_window;

/**
 打开新的控制器方法

 @param routerModel 跳转页面所需参数信息等
 @param weexInstance 当前weexInstance实例
 */
- (void)openViewControllerWithRouterModel:(BMRouterModel *)routerModel weexInstance:(WXSDKInstance *)weexInstance;

/**
 回退页面方法

 @param routerModel 回退页面信息
 @param weexInstance weexInstance
 */
- (void)backVcWithRouterModel:(BMRouterModel *)routerModel weexInstance:(WXSDKInstance *)weexInstance;

/* 返回首页 */
- (void)backToHomeIndex:(NSUInteger)index;

/* 打开webview页面 */
- (void)toWebViewWithRouterInfo:(BMWebViewRouterModel *)routerInfo;

/* 当业务流程中弹出登录页面，但是用户没有登录点击返回，调用此方法清除之前缓存的router信息 */
- (void)clearRouterInfo;

/** js资源更新完毕提示 */
- (void)showJsResourceUpdatedAlert;

/**
 加载一个常驻内存的WeexInstance作为js端的中介者
 
 @param reload 是否重新加载 当reload为 ture 时，强制重新加载一个新的
 */
- (void)loadJSMediator:(BOOL)reload;

@end
