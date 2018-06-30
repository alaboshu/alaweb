//
//  BMPopActionViewManager.m
//  Pods
//
//  Created by XHY on 2017/6/29.
//
//

#import "BMPopActionViewManager.h"
#import "BMShareView.h"
#import "BMWebViewChangeFontSizeView.h"
#import "BMPopActionViewDelegate.h"
#import "UIWindow+Util.h"

@interface BMPopActionViewManager ()<BMPopActionViewDelegate>

@property (nonatomic, strong) UIControl *maskView;
@property (nonatomic, strong) UIView *popView;

@end

@implementation BMPopActionViewManager

- (void)dealloc
{
    NSLog(@"dealloc >>>>>>>>> BMPopActionViewManager ");
}

#pragma mark - Public Method
/** 弹出分享面板 */
- (void)showShareViewWithInfo:(BMShareModel *)shareModel successCallback:(WXModuleCallback)successCallback failedCallback:(WXModuleCallback)failedCallback
{
    if (!shareModel) {
        WXLogError(@"分享信息为空");
        return;
    }
    
    if (_popView) [self.popView removeFromSuperview];
    if (_maskView) [self.maskView removeFromSuperview];

    self.popView = [[BMShareView alloc] initShareViewWithFrame:CGRectMake(0, self.maskView.height, K_SCREEN_WIDTH, K_ShareView_Height)
                                                     shareInfo:shareModel
                                               successCallback:successCallback
                                                failedCallback:failedCallback];
    [(BMShareView *)self.popView setDelegate:self];
    [self showActionView];
}

/** 弹出webview功能面板 */
- (void)showWebViewActionViewWithWebView:(UIWebView *)webView shareInfo:(BMShareModel *)shareModel
{
    if (_popView) [self.popView removeFromSuperview];
    if (_maskView) [self.maskView removeFromSuperview];

    self.popView = [[BMShareView alloc] initWebActionViewWithFrame:CGRectMake(0, self.maskView.height, K_SCREEN_WIDTH, K_ShareView_Height)
                                                           webView:webView
                                                         shareInfo:shareModel];
    [(BMShareView *)self.popView setDelegate:self];
    [self showActionView];
}

/** 弹出设置webview字体大小的面板 */
- (void)showChangeFontSizeViewTargetWebView:(UIWebView *)webView
{
    if (_popView) [self.popView removeFromSuperview];
    if (_maskView) [self.maskView removeFromSuperview];
    
    self.maskView.backgroundColor = K_CLEAR_COLOR;
    self.popView = [[BMWebViewChangeFontSizeView alloc] initWithFrame:CGRectMake(0, self.maskView.height, K_SCREEN_WIDTH, K_ChangeFontSizeView_Height)
                                                        targetWebView:webView];
    [self showActionView];
}

#pragma mark - Private Method
- (void)showActionView
{
    UIView *keyWindow = [UIWindow findVisibleWindow];
    
    [keyWindow addSubview:self.maskView];
    [keyWindow addSubview:self.popView];
    
    self.maskView.alpha = 0;
    
    /* 动画 展示 */
    CGRect rect4PopView = self.popView.frame;
    rect4PopView.origin.y -= self.popView.height;
    [UIView animateWithDuration:0.25 animations:^{
        self.maskView.alpha = 0.25;
        self.popView.frame = rect4PopView;
    }];
}

/** 移除弹出视图 */
- (void)hideActionView
{
    CGRect rect4PopView = self.popView.frame;
    rect4PopView.origin.y += self.popView.height;
    
    [UIView animateWithDuration:0.25 animations:^{
        self.popView.frame = rect4PopView;
        self.maskView.alpha = 0;
    } completion:^(BOOL finished) {
        [self.maskView removeFromSuperview];
        [self.popView removeFromSuperview];
    }];
}

#pragma mark - Getter

- (UIControl *)maskView
{
    if (!_maskView) {
        UIView *keyWindow = [[UIApplication sharedApplication].delegate window];
        
        /* 背景遮罩 */
        _maskView = [[UIControl alloc] initWithFrame:keyWindow.bounds];
        _maskView.backgroundColor = K_BLACK_COLOR;
        _maskView.alpha = 0;
        
        [_maskView addTarget:self action:@selector(hideActionView) forControlEvents:UIControlEventTouchUpInside];
        
    }
    return _maskView;
}

@end
