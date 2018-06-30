//
//  BMPresentLikeQQTransition.m
//  Pods
//
//  Created by XHY on 2017/5/16.
//
//

#import "BMPresentLikeQQTransition.h"
#import "BMInteractiveTransition.h"
#import <objc/runtime.h>

@implementation BMPresentLikeQQTransition
{
    BMPresentLikeQQTransitionType _transitionType;
}

#pragma mark - Public Method

#pragma mark - Private Method

+ (instancetype)transitionWithTransitionType:(BMPresentLikeQQTransitionType)type
{
    return [[[self class] alloc] initWithTransitionType:type];
}

- (instancetype)initWithTransitionType:(BMPresentLikeQQTransitionType)type
{
    if (self = [super init]) {
        _transitionType = type;
    }
    
    return self;
}

#pragma mark - Api Request

#pragma mark - Custom Delegate & DataSource

#pragma mark - System Delegate & DataSource

- (NSTimeInterval)transitionDuration:(id<UIViewControllerContextTransitioning>)transitionContext
{
    return 0.25;
}

- (void)animateTransition:(id<UIViewControllerContextTransitioning>)transitionContext
{
    switch (_transitionType) {
        case BMPresentLikeQQTransitionTypePresent:
            [self presentAnimation:transitionContext];
            break;
        case BMPresentLikeQQTransitionTypeDismiss:
            [self dismissAnimation:transitionContext];
            break;
        default:
            break;
    }
}

/* present 动画逻辑 */
- (void)presentAnimation:(id<UIViewControllerContextTransitioning>)transitionContext
{
    UIViewController *toVc = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
    UIViewController *fromVc = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
    
    UIView *containerView = [transitionContext containerView];
    
    UIView *tempView = [fromVc.view snapshotViewAfterScreenUpdates:YES];
    tempView.frame = fromVc.view.frame;
    UIView *maskView = [[UIView alloc] initWithFrame:tempView.bounds];
    maskView.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.15];
    maskView.alpha = 0;
    [tempView addSubview:maskView];
    
    /** 初始化手势控制 */
    BMInteractiveTransition *interactiveDismiss = [BMInteractiveTransition interactiveTransitionWithTransitionType:BMInteractiveTransitionTypeDismiss GestureDirection:BMInteractiveTransitionGestureDirectionLeft];
    [interactiveDismiss addPanGestureForView:tempView handleViewController:toVc];
    /** 将手势控制添加到 将要出现的 Controller 上 */
    objc_setAssociatedObject(toVc, "bmInteractive", interactiveDismiss, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    
    UITapGestureRecognizer *tapGes = [[UITapGestureRecognizer alloc] initWithTarget:toVc action:@selector(dismissVC)];
    [tempView addGestureRecognizer:tapGes];
    
    fromVc.view.hidden = YES;
    
    [containerView addSubview:toVc.view];
    [containerView addSubview:tempView];
    
    
    //    CGAffineTransform transformTranslation = CGAffineTransformMakeTranslation(100, 0);
    //    CGAffineTransform transform = CGAffineTransformScale(transformTranslation, 0.85, 0.85);
    
    CGFloat trWidth = tempView.frame.size.width - tempView.frame.size.width / 4.0;
    toVc.view.transform = CGAffineTransformMakeTranslation(-trWidth, 0);
    
    [UIView animateWithDuration:[self transitionDuration:transitionContext] animations:^{
        
        tempView.transform = CGAffineTransformMakeTranslation(trWidth, 0);
        toVc.view.transform = CGAffineTransformIdentity;
        maskView.alpha = 1;
        
    } completion:^(BOOL finished) {
        
        [transitionContext completeTransition:![transitionContext transitionWasCancelled]];
        
        // 转场失败
        if ([transitionContext transitionWasCancelled]) {
            
            fromVc.view.hidden = NO;
            [tempView removeFromSuperview];
            
        }
        
    }];
}

/* dismiss 动画逻辑 */
- (void)dismissAnimation:(id<UIViewControllerContextTransitioning>)transitionContext
{
    
    UIViewController *toVc = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
    UIViewController *fromVc = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
    
    UIView *containerView = [transitionContext containerView];
    
    UIView *tempView = containerView.subviews.lastObject;
    UIView *maskView = tempView.subviews.lastObject;
    
    CGFloat trWidth = tempView.frame.size.width - tempView.frame.size.width / 4.0;
    
    [UIView animateWithDuration:[self transitionDuration:transitionContext] animations:^{
        
        tempView.transform = CGAffineTransformIdentity;
        fromVc.view.transform = CGAffineTransformMakeTranslation(-trWidth, 0);
        maskView.alpha = 0;
        
    } completion:^(BOOL finished) {
        
        if ([transitionContext transitionWasCancelled]) {
            
            [transitionContext completeTransition:NO];
            maskView.alpha = 1;
            
        } else {
            
            [transitionContext completeTransition:YES];
            
            toVc.view.hidden = NO;
            
            [tempView removeFromSuperview];
            
        }
        
    }];
}

#pragma mark - Setter

#pragma mark - Getter

@end
