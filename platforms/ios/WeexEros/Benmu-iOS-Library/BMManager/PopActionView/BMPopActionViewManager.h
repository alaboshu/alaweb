//
//  BMPopActionViewManager.h
//  Pods
//
//  Created by XHY on 2017/6/29.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <WeexSDK/WeexSDK.h>
#import "BMShareModel.h"

@interface BMPopActionViewManager : NSObject

/** 弹出分享面板 
    后面的两个 block 是js通过Module传过来的，可以为nil
 */
- (void)showShareViewWithInfo:(BMShareModel *)shareModel successCallback:(WXModuleCallback)successCallback failedCallback:(WXModuleCallback)failedCallback;

/** 弹出webview功能面板  
    如果存在 BMShareModel 则加上分享的选项
 */
- (void)showWebViewActionViewWithWebView:(UIWebView *)webView shareInfo:(BMShareModel *)shareModel;

/** 弹出设置webview字体大小的面板 */
- (void)showChangeFontSizeViewTargetWebView:(UIWebView *)webView;

@end
