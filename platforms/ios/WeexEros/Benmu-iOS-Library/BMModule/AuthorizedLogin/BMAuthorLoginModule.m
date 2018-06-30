//
//  BMAuthorLoginModule.m
//  Pods
//
//  Created by XHY on 2017/5/5.
//
//

#import "BMAuthorLoginModule.h"
#import <UMengUShare/WXApi.h>
#import <UMSocialCore/UMSocialCore.h>
#import <LocalAuthentication/LocalAuthentication.h>

@interface BMAuthorLoginModule()<WXApiDelegate>

@end

@implementation BMAuthorLoginModule
@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(login:callback:))
WX_EXPORT_METHOD(@selector(unAuth:callback:))
WX_EXPORT_METHOD(@selector(share:callback:))
WX_EXPORT_METHOD_SYNC(@selector(canUseTouchId))

WX_EXPORT_METHOD(@selector(touchId:callback:))

/** 调用微信登录 */
- (void)login:(NSDictionary *)info callback:(WXModuleCallback)success
{
    UMSocialPlatformType type = [self getPlatformType: info];
    if (type == UMSocialPlatformType_UnKnown) {
        if (success) {
            success([NSDictionary configCallbackDataWithResCode:9 msg:@"unkownPlantform" data:nil]);
        }
    }
    [[UMSocialManager defaultManager] getUserInfoWithPlatform:type currentViewController:weexInstance.viewController completion:^(id result, NSError *error) {
       
        if (error) {
            WXLogError(@"%@",error);
            NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:BMResCodeError msg:@"授权失败" data:nil];
            if (success) {
                success(resDic);
            }
        } else {
            UMSocialUserInfoResponse *resp = result;
            
            if (success) {
                NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
                [userInfo setValue:resp.uid?:@"" forKey:@"openid"];
                [userInfo setValue:resp.accessToken?:@"" forKey:@"accessToken"];
                NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:@"授权成功" data:userInfo];
                success(resDic);
            }
            
        }
        
    }];
}
- (void)unAuth:(NSString*)platform callback:(WXModuleCallback)success {
    UMSocialPlatformType type = [self getPlatformType: platform];
    if (type == UMSocialPlatformType_UnKnown) {
        if (success) {
            success([NSDictionary configCallbackDataWithResCode:9 msg:@"unkownPlantform" data:nil]);
        }
    }
    [[UMSocialManager defaultManager] cancelAuthWithPlatform:type completion:^(id result, NSError *error) {
        if (error) {
            NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:9 msg:@"取消授权失败" data:nil];
            if (success) {
                success(resDic);
            }
        } else {
            if (success) {
                NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:0 msg:@"" data:nil];
                success(resDic);
            }
        }
    } ];
}
- (void)share:(NSDictionary *)info callback:(WXModuleCallback)callback {
    
    if ([@"copy" isEqualToString: info[@"platform"]]) {
        UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
        pasteboard.string = info[@"url"] ?:@"";
        /* 成功回调 */
        if (callback) {
            NSDictionary *data = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:@"复制链接成功" data:nil];
            callback(data);
        }
        return;
    }
    UMSocialPlatformType type = [self getPlatformType: info[@"platform"]];
    if (type == UMSocialPlatformType_UnKnown) {
        if (callback) {
            callback([NSDictionary configCallbackDataWithResCode:9 msg:@"unkownPlantform" data:nil]);
        }
    }
    UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
    messageObject.text = info[@"content"];
    
    UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:info[@"title"] descr:info[@"content"] thumImage:info[@"image"]];
    shareObject.webpageUrl = info[@"url"];
    messageObject.shareObject = shareObject;
    
    //设置分享内容
    [[UMSocialManager defaultManager] shareToPlatform:type
                                        messageObject:messageObject
                                currentViewController:[BMMediatorManager shareInstance].currentViewController
                                           completion:^(id result, NSError *error) {
                                               if (error) {
                                                   WXLogError(@"%@",error);
                                                   
                                                   /* 失败回调 */
                                                   if (callback) {
                                                       NSDictionary *data = [NSDictionary configCallbackDataWithResCode:BMResCodeError msg:@"分享失败" data:nil];
                                                       callback(data);
                                                   }
                                               } else {
                                                   /* 成功回调 */
                                                   if (callback) {
                                                       NSDictionary *data = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:@"分享成功" data:nil];
                                                       callback(data);
                                                   }
                                               }
                                           }];
    
}
- (UMSocialPlatformType)getPlatformType:(NSString*)platform {
    if ([@"wechat" isEqual:platform]) {
        return UMSocialPlatformType_WechatSession;
    } else if ([@"qq" isEqual:platform]) {
        return UMSocialPlatformType_QQ;
    } else if ([@"weibo" isEqual:platform]) {
        return UMSocialPlatformType_Sina;
    } else if ([@"wechatCircle" isEqual:platform]) {
        return UMSocialPlatformType_WechatTimeLine;
    } else if ([@"qqSpace" isEqual:platform]) {
        return UMSocialPlatformType_Qzone;
    } else {
        return UMSocialPlatformType_UnKnown;
    }
}

- (NSDictionary *)canUseTouchId
{
    LAContext *context = [[LAContext alloc] init];
    NSError *error = nil;
    
    BMResCode code = BMResCodeSuccess;
    NSString *msg = @"此设备支持使用 Touch ID";
    
    if (![context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
        
        code = BMResCodeError;
        //不支持指纹识别
        switch (error.code) {
            case LAErrorTouchIDNotEnrolled:
            {
                msg = @"TouchID is not enrolled";
                break;
            }
            case LAErrorPasscodeNotSet:
            {
                msg = @"A passcode has not been set";
                break;
            }
            default:
            {
                msg = @"TouchID not available";
                break;
            }
        }
    }
    
    WXLogInfo(@"%@",msg);
    
    return [NSDictionary configCallbackDataWithResCode:code msg:msg data:nil];
}

- (void)touchId:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    NSDictionary *resData = [self canUseTouchId];
    if ([[resData objectForKey:@"resData"] integerValue] == 9) {
        if (callback) {
            callback(resData);
        }
        return;
    }
    
    LAContext *context = [[LAContext alloc] init];
    NSError *error = nil;
    
    NSString *title = [info objectForKey:@"title"];
    
    [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
            localizedReason: title?:@"指纹解锁" reply:^(BOOL success, NSError * _Nullable error) {
                if (success) {
                    if (callback) {
                        NSDictionary *resData = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:@"指纹验证成功" data:nil];
                        callback(resData);
                    }
                }else{
                    NSString *msg = @"";
                    switch (error.code) {
                        case LAErrorSystemCancel:
                        {
                            msg = @"系统取消授权";
                            break;
                        }
                        case LAErrorUserCancel:
                        {
                            msg = @"用户取消验证";
                            break;
                        }
                        case LAErrorAuthenticationFailed:
                        {
                            msg = @"授权失败";
                            break;
                        }
                        case LAErrorPasscodeNotSet:
                        {
                            msg = @"系统未设置密码";
                            break;
                        }
                        default:
                        {
                            msg = @"设备Touch ID不可用";
                            break;
                        }
                    }
                    if (callback) {
                        NSDictionary *resData = [NSDictionary configCallbackDataWithResCode:BMResCodeError msg:msg data:nil];
                        callback(resData);
                    }
                }
            }];
    
    
}


@end
