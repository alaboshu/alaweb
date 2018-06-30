//
//  BMShareView.h
//  Pods
//
//  Created by XHY on 2017/6/29.
//
//

#import <UIKit/UIKit.h>
#import "BMShareModel.h"
#import <WeexSDK/WeexSDK.h>
#import "BMPopActionViewDelegate.h"

#define K_ShareView_Height 179.0

@interface BMShareView : UIView

@property (nonatomic, weak) id<BMPopActionViewDelegate> delegate;

- (instancetype)initShareViewWithFrame:(CGRect)frame shareInfo:(BMShareModel *)shareModel successCallback:(WXModuleCallback)successCallback failedCallback:(WXModuleCallback)failedCallback;

- (instancetype)initWebActionViewWithFrame:(CGRect)frame webView:(UIWebView *)webView shareInfo:(BMShareModel *)shareModel;

@end
