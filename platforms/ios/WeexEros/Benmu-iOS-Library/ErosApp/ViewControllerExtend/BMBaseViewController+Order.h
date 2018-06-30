//
//  BMBaseViewController+Order.h
//  Pods
//
//  Created by XHY on 2017/5/22.
//
//

#import <BMBaseViewController.h>

@interface BMBaseViewController (Order)

/** 判断当前页面路径 */
- (BOOL)currentVcIs:(NSString *)url;

/** 判断是否隐藏导航栏 */
- (BOOL)isHideNavbar;

/** 设置状态栏样式 */
- (void)bmSetStatusBarStyle;

/** 获取weex页面可用高度 */
- (CGFloat)weexViewHeight;

@end
