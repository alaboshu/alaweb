//
//  BMRouterModule.m
//  WeexDemo
//
//  Created by XHY on 2017/1/11.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMRouterModule.h"
#import "BMRouterModel.h"

#import "HYAlertView.h"

#import "BMMediatorManager.h"
#import "BMBaseViewController.h"

#import "BMUserInfoModel.h"
#import "BMDB.h"
#import <YYModel.h>
#import "BMMapViewController.h"

#import "BMWebViewRouterModel.h"

@implementation BMRouterModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(open:callback:))
WX_EXPORT_METHOD(@selector(getParams:))
WX_EXPORT_METHOD(@selector(back:callback:))
WX_EXPORT_METHOD(@selector(refreshWeex))
WX_EXPORT_METHOD(@selector(toMap:))
WX_EXPORT_METHOD(@selector(toWebView:))
WX_EXPORT_METHOD(@selector(callPhone:))
WX_EXPORT_METHOD(@selector(openBrowser:))
WX_EXPORT_METHOD(@selector(setHomePage:))

- (void)open:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    /* 解析info */
    BMRouterModel *routerModel = [BMRouterModel yy_modelWithJSON:info];
    
    if (callback)  routerModel.backCallback = callback;
    
    /* 通过中介者跳转页面 */
    [[BMMediatorManager shareInstance] openViewControllerWithRouterModel:routerModel weexInstance:weexInstance];
    
}

- (void)getParams:(WXModuleCallback)callback
{
    if (callback) {
        BMBaseViewController *currentVc = (BMBaseViewController *)weexInstance.viewController;
        id params = currentVc.routerModel.params ?: @"";
        callback(params);
    }
}

- (void)back:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    /* 解析info */
    BMRouterModel *routerModel = [BMRouterModel yy_modelWithJSON:info];
    [[BMMediatorManager shareInstance] backVcWithRouterModel:routerModel weexInstance:weexInstance];
}

/** 刷新当前weexInstance */
- (void)refreshWeex
{
    if ([weexInstance.viewController respondsToSelector:@selector(refreshWeex)]) {
        [(BMBaseViewController *)weexInstance.viewController refreshWeex];
    }
}

- (void)toMap:(NSDictionary *)info
{
    /** 解析map info */
    BMMapInfoModel *mapInfo = [BMMapInfoModel yy_modelWithJSON:info];
    BMMapViewController *mapViewController = [[BMMapViewController alloc] initWithMapViewInfo:mapInfo];
    [[BMMediatorManager shareInstance].currentViewController.navigationController pushViewController:mapViewController animated:YES];
    
    return;
}

/** 打开app内置webview */
- (void)toWebView:(NSDictionary *)info
{
    BMWebViewRouterModel *model = [BMWebViewRouterModel yy_modelWithJSON:info];
    [[BMMediatorManager shareInstance] toWebViewWithRouterInfo:model];
}

/** 使用iOS系统自带浏览器打开 url */
- (void)openBrowser:(NSString *)url
{
    NSURL *openUrl = [NSURL URLWithString:url];
    [[UIApplication sharedApplication] openURL:openUrl];
}

/** 拨打电话 */
- (void)callPhone:(NSDictionary *)info
{
    if (!info[@"phone"]) {
        WXLogError(@"电话号码错误");
        return;
    }
    
    /* ios10 以后会弹系统弹窗 */
    if (K_SYSTEM_VERSION > 10.2) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[NSString stringWithFormat:@"tel://%@",info[@"phone"]]]];
    } else {
        HYAlertView *alert = [HYAlertView configWithTitle:nil message:info[@"phone"] cancelButtonTitle:NSLocalizedString(@"取消", nil) otherButtonTitle:NSLocalizedString(@"呼叫", nil) clickedButtonAtIndexBlock:^(NSInteger index) {
            if (index == 1) [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[NSString stringWithFormat:@"tel://%@",info[@"phone"]]]];
        }];
        [alert show];
    }
}

/** 刷新app */
- (void)setHomePage:(NSString *)path
{
    if (![path isKindOfClass:[NSString class]]) {
        WXLogError(@"setHomePage Error: %@",path);
        return;
    }
    BM_SetUserDefaultData(K_HomePagePath, path);
    [[NSNotificationCenter defaultCenter] postNotificationName:K_BMAppReStartNotification object:nil];
}

@end
