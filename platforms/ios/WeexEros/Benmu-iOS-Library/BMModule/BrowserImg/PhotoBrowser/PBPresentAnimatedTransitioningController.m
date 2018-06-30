//
//  PBPresentAnimatedTransitioningController.m
//  PhotoBrowser
//
//  Created by Moch Xiao on 5/17/16.
//  Copyright © 2016 Moch Xiao (http://mochxiao.com).
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

#import "PBPresentAnimatedTransitioningController.h"

@interface PBPresentAnimatedTransitioningController ()
@property (nonatomic, assign) BOOL isPresenting;
@end

@implementation PBPresentAnimatedTransitioningController

#pragma mark - Public methods

- (nonnull PBPresentAnimatedTransitioningController *)prepareForPresent {
    self.isPresenting = YES;
    return self;
}

- (nonnull PBPresentAnimatedTransitioningController *)prepareForDismiss {
    self.isPresenting = NO;
    return self;
}

#pragma mark - Private methods

- (UIViewAnimationOptions)_animationOptions {
    return 7 << 16;
}

- (void)_animateWithTransition:(nullable id <UIViewControllerContextTransitioning>)transitionContext
                    animations:(void (^)(void))animations
                    completion:(void (^)(BOOL flag))completion {
    // Prevent other interactions disturb.
    [[UIApplication sharedApplication] beginIgnoringInteractionEvents];
    [UIView animateWithDuration:[self transitionDuration:transitionContext]
                          delay:0
                        options:[self _animationOptions]
                     animations:animations
                     completion:^(BOOL finished) {
                         completion(finished);
                         [[UIApplication sharedApplication] endIgnoringInteractionEvents];
                     }];
}

- (void)_presentWithTransition:(id <UIViewControllerContextTransitioning>)transitionContext
                     container:(UIView *)container
                          from:(UIView *)fromView
                            to:(UIView *)toView
                    completion:(void (^)(BOOL flag))completion {
    self.coverView.frame = container.frame;
    self.coverView.alpha = 0;
    [container addSubview:self.coverView];
    toView.frame = container.bounds;
    [container addSubview:toView];
    
    if (self.willPresentActionHandler) {
        self.willPresentActionHandler(fromView, toView);
    }
    __weak typeof(self) weak_self = self;
    [self _animateWithTransition:transitionContext
                      animations:^{
                          __strong typeof(weak_self) strong_self = weak_self;
                          strong_self.coverView.alpha = 1;
                          if (strong_self.onPresentActionHandler) {
                              strong_self.onPresentActionHandler(fromView, toView);
                          }
                      }
                      completion:^(BOOL flag) {
                          __strong typeof(weak_self) strong_self = weak_self;
                          if (strong_self.didPresentActionHandler) {
                              strong_self.didPresentActionHandler(fromView, toView);
                          }
                          completion(flag);
                      }];
}

- (void)_dismissWithTransition:(id <UIViewControllerContextTransitioning>)transitionContext
                     container:(UIView *)container
                          from:(UIView *)fromView
                            to:(UIView *)toView
                    completion:(void (^)(BOOL flag))completion {
    [container addSubview:fromView];
    if (self.willDismissActionHandler) {
        self.willDismissActionHandler(fromView, toView);
    }
    __weak typeof(self) weak_self = self;
    [self _animateWithTransition:transitionContext
                      animations:^{
                          __strong typeof(weak_self) strong_self = weak_self;
                          strong_self.coverView.alpha = 0;
                          if (strong_self.onDismissActionHandler) {
                              strong_self.onDismissActionHandler(fromView, toView);
                          }
                      }
                      completion:^(BOOL flag) {
                          __strong typeof(weak_self) strong_self = weak_self;
                          if (strong_self.didDismissActionHandler) {
                              strong_self.didDismissActionHandler(fromView, toView);
                          }
                          completion(flag);
                      }];

}

#pragma mark - UIViewControllerAnimatedTransitioning

- (NSTimeInterval)transitionDuration:(nullable id <UIViewControllerContextTransitioning>)transitionContext {
    return 0.25f;
}

- (void)animateTransition:(id <UIViewControllerContextTransitioning>)transitionContext {
    UIView *container = [transitionContext containerView];
    if (!container) {
        return;
    }
    UIViewController *fromController = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
    if (!fromController) {
        return;
    }
    UIViewController *toController = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
    if (!toController) {
        return;
    }
    
    if (self.isPresenting) {
        [self _presentWithTransition:transitionContext
                           container:container
                                from:fromController.view
                                  to:toController.view
                          completion:^(BOOL flag) {
                              [transitionContext completeTransition:![transitionContext transitionWasCancelled]];
                          }];
    } else {
        [self _dismissWithTransition:transitionContext
                           container:container
                                from:fromController.view
                                  to:toController.view
                          completion:^(BOOL flag) {
                              [transitionContext completeTransition:![transitionContext transitionWasCancelled]];
                          }];
    }
}

#pragma mark - Accessor

- (UIView *)coverView {
    if (!_coverView) {
        _coverView = [UIView new];
        _coverView.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.5];
        _coverView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _coverView.clipsToBounds = YES;
        _coverView.multipleTouchEnabled = NO;
        _coverView.userInteractionEnabled = NO;
    }
    return _coverView;
}

@end
