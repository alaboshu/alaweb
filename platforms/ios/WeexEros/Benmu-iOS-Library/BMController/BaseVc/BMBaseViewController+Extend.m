//
//  BMBaseViewController+Extend.m
//  BM-JYT
//
//  Created by XHY on 2017/3/16.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMBaseViewController+Extend.h"
#import "BMMediatorManager.h"
#import <BMPresentLikeQQTransition.h>
#import <BMInteractiveTransition.h>
#import <BMPresentTranslationTransition.h>

@implementation BMBaseViewController (Extend)

- (BOOL)currentVcIs:(NSString *)url
{
    return [self.url.absoluteString rangeOfString:url].location != NSNotFound;
}

- (void)addBackBarbuttonItem
{
    if (!self.routerModel.navShow ) {
        return;
    }
    
    UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"NavBar_BackItemIcon"] style:UIBarButtonItemStylePlain target:self action:@selector(dismissVC)];
    self.navigationItem.leftBarButtonItem = item;
}

- (void)dismissVC
{
    /* 如果存在 backCallback 则回调 callback方法*/
    if (self.routerModel.isRunBackCallback && self.routerModel.backCallback) {
        self.routerModel.backCallback(nil);
        return;
    }
    
    if ([self.routerModel.type isEqualToString:K_ANIMATE_PRESENT] ||
        [self.routerModel.type isEqualToString:K_ANIMATE_TRANSLATION]) {
        [self dismissViewControllerAnimated:YES completion:nil];
    } else {
        [self.navigationController popViewControllerAnimated:YES];
    }
}

#pragma mark - UIViewControllerTransitioningDelegate
- (id<UIViewControllerAnimatedTransitioning>)animationControllerForPresentedController:(UIViewController *)presented presentingController:(UIViewController *)presenting sourceController:(UIViewController *)source
{
    if ([self.routerModel.type isEqualToString:K_ANIMATE_TRANSLATION]) {
        return [BMPresentTranslationTransition transitionWithTransitionType:BMPresentTranslationTransitionTypePresent];
//        return [BMPresentLikeQQTransition transitionWithTransitionType:BMPresentLikeQQTransitionTypePresent];
    }
    return nil;
}

- (id<UIViewControllerAnimatedTransitioning>)animationControllerForDismissedController:(UIViewController *)dismissed
{
    if ([self.routerModel.type isEqualToString:K_ANIMATE_TRANSLATION]) {
        return [BMPresentTranslationTransition transitionWithTransitionType:BMPresentTranslationTransitionTypeDismiss];
//        return [BMPresentLikeQQTransition transitionWithTransitionType:BMPresentLikeQQTransitionTypeDismiss];
    }
    return nil;
}

- (id<UIViewControllerInteractiveTransitioning>)interactionControllerForDismissal:(id<UIViewControllerAnimatedTransitioning>)animator
{
    /** 手势控制动画 */
//    if ([self.routerModel.animateType isEqualToString:K_ANIMATE_TRANSLATION]) {
//        BMInteractiveTransition *interactiveDismiss = objc_getAssociatedObject(self, "bmInteractive");
//        if (interactiveDismiss && interactiveDismiss.interation) {
//            return interactiveDismiss;
//        }
//    }
    return nil;
}

@end
