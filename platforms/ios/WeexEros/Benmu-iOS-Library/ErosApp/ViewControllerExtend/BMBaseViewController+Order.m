//
//  BMBaseViewController+Order.m
//  Pods
//
//  Created by XHY on 2017/5/22.
//
//

#import "BMBaseViewController+Order.h"
#import "BMConfigManager.h"

@implementation BMBaseViewController (Order)

- (BOOL)currentVcIs:(NSString *)url
{
    return [self.url.absoluteString rangeOfString:url].location != NSNotFound;
}

/* 判断是否隐藏导航栏 */
- (BOOL)isHideNavbar
{
    if (!self.routerModel.navShow ||
        [self currentVcIs:[BMConfigManager shareInstance].platform.page.homePage]) {
        
        return YES;
    }
    
    return NO;
}

/* 设置状态栏样式 */
- (void)bmSetStatusBarStyle
{
    
    if (!self.routerModel.statusBarStyle) return;
    
    /* 设置状态栏 字体颜色 */
    if ([self.routerModel.statusBarStyle isEqualToString:@"Default"]) {
        [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault animated:NO];
        
    } else {
        [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent animated:NO];
    }
}

- (CGFloat)weexViewHeight
{
    /* 设置weex页面高度 */
    CGFloat height = K_SCREEN_HEIGHT;
    return height;
}

@end
