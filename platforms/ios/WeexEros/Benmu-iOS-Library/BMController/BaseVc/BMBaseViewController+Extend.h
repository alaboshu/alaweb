//
//  BMBaseViewController+Extend.h
//  BM-JYT
//
//  Created by XHY on 2017/3/16.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMBaseViewController.h"

@interface BMBaseViewController (Extend) <UIViewControllerTransitioningDelegate>

/* 添加返回按钮 */
- (void)addBackBarbuttonItem;

/* dismiss 页面 */
- (void)dismissViewController;

@end
