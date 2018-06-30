//
//  BMToolsModule.m
//  BM-JYT
//
//  Created by XHY on 2017/4/17.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMToolsModule.h"
#import <UMengUShare/WXApi.h>
#import "BMPushMessageManager.h"
#import "WatermarkView.h"
#import "WXUtility.h"
#import "BMScanQRViewController.h"

@implementation BMToolsModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(scan:));
WX_EXPORT_METHOD(@selector(resignKeyboard:));
WX_EXPORT_METHOD(@selector(isInstallWXApp:));
WX_EXPORT_METHOD(@selector(getCid:));
WX_EXPORT_METHOD(@selector(copyString:callback:));
WX_EXPORT_METHOD(@selector(addWatermark:));
WX_EXPORT_METHOD(@selector(env:));

/** 调用扫一扫 */
- (void)scan:(WXModuleCallback)callback
{
    BMScanQRViewController *scanQrVc = [[BMScanQRViewController alloc] init];
    scanQrVc.hidesBottomBarWhenPushed = YES;
    scanQrVc.callback = callback;
    [weexInstance.viewController.navigationController pushViewController:scanQrVc animated:YES];
}

/** 辞退键盘 */
- (void)resignKeyboard:(WXModuleCallback)callback
{
    NSInteger resCode = [[[UIApplication sharedApplication].delegate window] endEditing:YES] ? BMResCodeSuccess : BMResCodeError;
    if (callback) {
        NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:resCode msg:nil data:nil];
        callback(resDic);
    }
}

/** 判断是否安装了微信 */
-(void)isInstallWXApp:(WXModuleCallback)callback
{
    BOOL isInstall = [WXApi isWXAppInstalled];
     NSInteger resCode = isInstall ? BMResCodeSuccess : BMResCodeError;
    if (callback) {
        NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:resCode msg:nil data:nil];
        callback(resDic);
    }
}

/** 获取 cid */
-(void)getCid:(WXModuleCallback)callback
{
    NSString * cid = [BMPushMessageManager getCid];
    NSInteger resCode = cid.length > 0 ? BMResCodeSuccess : BMResCodeError;
    
    if (callback) {
        NSMutableDictionary * dict = nil;
        if (cid.length > 0) {
            dict  = [NSMutableDictionary dictionaryWithObjectsAndKeys:cid,@"cid",nil];
        }
        NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:resCode msg:nil data:dict];
        callback(resDic);
    }
}

/** 复制到剪切板 */
- (void)copyString:(NSString *)info callback:(WXModuleCallback)callback
{
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    pasteboard.string = info ?:@"";
    NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:@"已复制到剪切板" data:nil];
    callback(resDic);
}

/** 在当前Window 添加文字水印 */
- (void)addWatermark:(NSString *)info
{
    if ([info isKindOfClass:[NSString class]] && info.length) {
        [WatermarkView addWatermarkWithText:info];
    }
}

/** 获取环境信息 */
- (void)env:(WXModuleCallback)callback
{
    NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:@"获取环境信息成功" data:[WXUtility getEnvironment]];
    if (callback) {
        callback(resDic);
    }
}

@end
