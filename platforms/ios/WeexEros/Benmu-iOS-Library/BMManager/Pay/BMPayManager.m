//
//  BMPayManager.m
//  WeexDemo
//
//  Created by XHY on 2017/2/7.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMPayManager.h"
#import "BMConfigManager.h"
#import "BMWechatPayInfoModel.h"
#import <YYModel.h>
#import <SVProgressHUD.h>

#import "BMDefine.h"

#import "NSDictionary+Util.h"

#import <WXApi.h>

@interface BMPayManager () <WXApiDelegate, UIAlertViewDelegate>

@property (nonatomic, copy) WXModuleCallback wechatPayCallBack;     // 微信支付结果回调js方法

@end

@implementation BMPayManager

#pragma mark - Setter / Getter

#pragma mark - Private Method

/* 检验是否安装了微信 */
- (BOOL)checkInstallWX
{
    if ([WXApi isWXAppInstalled]) {
        return YES;
    } else {
        [SVProgressHUD dismiss];
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@""
                                                        message:NSLocalizedString(@"需要安装微信进行支付", nil)
                                                       delegate:self
                                              cancelButtonTitle:nil
                                              otherButtonTitles:NSLocalizedString(@"取消", nil),NSLocalizedString(@"安装", nil), nil];
        [alert show];
    }
    
    return NO;
}

/* 调用微信支付 */
- (void)wechatPayWithInfo:(BMWechatPayInfoModel *)payInfo
{
    if (![self checkInstallWX]) return;
    
    if (!payInfo.sign.length) {
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [SVProgressHUD showImage:nil status:NSLocalizedString(@"订单信息异常", nil)];
        });
        
        return;
    }
    
    // 注册微信id
    [WXApi registerApp:TK_PlatformInfo().wechat.appId];
    PayReq *payRequest = [[PayReq alloc] init];
    payRequest.partnerId = payInfo.partnerid;
    payRequest.prepayId =  payInfo.prepayid;
    payRequest.package = payInfo.packageValue;
    payRequest.nonceStr = payInfo.noncestr;
    payRequest.timeStamp = [payInfo.timestamp intValue];
    payRequest.sign = payInfo.sign;
    
    if ([WXApi sendReq:payRequest]) {
        [SVProgressHUD dismiss];
        WXLogInfo(@"调用微信成功");
    } else {
        WXLogError(@"调用微信失败");
    }
}

// 微信支付结果回调
- (void)onResp:(BaseResp *)resp
{
    if([resp isKindOfClass:[PayResp class]]){
        //支付返回结果，实际支付结果需要去微信服务器端查询
        
        if (self.wechatPayCallBack) {
            NSDictionary *resultData = [NSDictionary configCallbackDataWithResCode:resp.errCode msg:resp.errStr data:nil];
            self.wechatPayCallBack(resultData);
            self.wechatPayCallBack = nil;
        }
        
//        switch (resp.errCode) {
//            case WXSuccess:
//            {
//                NSLog(@"支付成功－PaySuccess，retcode = %d", resp.errCode);
//                
//            }
//                break;
//            default: {
//                NSLog(@"错误，retcode = %d, retstr = %@", resp.errCode,resp.errStr);
//                
//            }
//                break;
//        }
    }
}

//
//  处理支付结果
//
- (BOOL)applicationOpenURL:(NSURL *)url
{
    // 微信支付结果
    if ([url.host isEqualToString:@"pay"]) {
        return [WXApi handleOpenURL:url delegate:self];
    }
    
//    // 支付宝支付结果
//    if ([url.host isEqualToString:@"safepay"]) {
//        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
//            NSLog(@"result = %@",resultDic);
//            
//            NSString *resultStatus = [NSString stringWithFormat:@"%@",resultDic[@"resultStatus"]];
//            
//            if ([resultStatus isEqualToString:@"9000"])
//            {
//                [self paySuccessNext];
//            }
//            else if ([resultStatus isEqualToString:@"6001"])
//            {
//                [JYTProgressHUD showStatus:@"取消支付"];
//                [self payError];
//            }
//            else if ([resultStatus isEqualToString:@"4000"])
//            {
//                [JYTProgressHUD showStatus:@"支付失败"];
//                [self payError];
//            }
//            else if ([resultStatus isEqualToString:@"6002"])
//            {
//                [JYTProgressHUD showStatus:@"网络连接出错"];
//                [self payError];
//            }
//            
//            
//        }];
//    }
//    // 支付宝钱包快登授权返回处理
//    if ([url.host isEqualToString:@"platformapi"]) {
//        [[AlipaySDK defaultService] processAuthResult:url standbyCallback:^(NSDictionary *resultDic) {
//            NSLog(@"result = %@",resultDic);
//        }];
//    }
    
    return YES;
}

#pragma mark - Custom Delegate & DataSource

#pragma mark - System Delegate & DataSource

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (buttonIndex == 1) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[WXApi getWXAppInstallUrl]]];
    }
}


#pragma mark - Public Method

+ (instancetype)shareInstance
{
    static BMPayManager *_instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[BMPayManager alloc] init];
    });
    
    return _instance;
}

- (void)payByWechat:(NSDictionary *)payInfo callback:(WXModuleCallback)callback
{
    self.wechatPayCallBack = callback;
    
    BMWechatPayInfoModel *infoModel = [BMWechatPayInfoModel yy_modelWithJSON:payInfo];
    [self wechatPayWithInfo:infoModel];
}

@end
