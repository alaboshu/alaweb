//
//  BMDebugWindow.h
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/10.
//  Copyright © 2017年 XHY. All rights reserved.
//

#ifdef DEBUG
#import <UIKit/UIKit.h>

#define BM_HotRefreshKey @"BM_HotRefreshKey"

@interface BMDebugManager : NSObject

//获得单例对象
+ (instancetype)shareInstance;

// 显示
- (void)show;
// 消失
- (void)dismiss;

// 连接 热刷新WS Server
- (void)hotRefreshWebSocketConnect;

// 关闭 热刷新WS 
- (void)hotRefreshWebSocketClose;

// 刷新当前 weex 页面
- (void)refreshWeex;

@end
#endif
