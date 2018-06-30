//
//  BMPresentTranslationTransition.m
//  Pods
//
//  Created by XHY on 2017/5/24.
//
//

#import "BMPresentTranslationTransition.h"

@implementation BMPresentTranslationTransition
{
    BMPresentTranslationTransitionType _transitionType;
}

#pragma mark - Public Method

#pragma mark - Private Method

+ (instancetype)transitionWithTransitionType:(BMPresentTranslationTransitionType)type
{
    return [[[self class] alloc] initWithTransitionType:type];
}

- (instancetype)initWithTransitionType:(BMPresentTranslationTransitionType)type
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
        case BMPresentTranslationTransitionTypePresent:
            [self presentAnimation:transitionContext];
            break;
        case BMPresentTranslationTransitionTypeDismiss:
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
    
    
    [containerView addSubview:toVc.view];
    [containerView addSubview:fromVc.view];
    
    toVc.view.transform = CGAffineTransformMakeTranslation(-toVc.view.width, 0);
    
    [UIView animateWithDuration:[self transitionDuration:transitionContext] animations:^{
        
        fromVc.view.transform = CGAffineTransformMakeTranslation(toVc.view.width, 0);
        toVc.view.transform = CGAffineTransformIdentity;
        
    } completion:^(BOOL finished) {
        
        [transitionContext completeTransition:![transitionContext transitionWasCancelled]];
        
        fromVc.view.transform = CGAffineTransformIdentity;
        
        // 转场失败
        if ([transitionContext transitionWasCancelled]) {


        }
        
    }];
}

/* dismiss 动画逻辑 */
- (void)dismissAnimation:(id<UIViewControllerContextTransitioning>)transitionContext
{
    
    UIViewController *toVc = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
    UIViewController *fromVc = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
    
    UIView *containerView = [transitionContext containerView];
    
    
    [containerView addSubview:toVc.view];
    [containerView addSubview:fromVc.view];
    
    toVc.view.transform = CGAffineTransformMakeTranslation(toVc.view.width, 0);
    
    [UIView animateWithDuration:[self transitionDuration:transitionContext] animations:^{
        
        toVc.view.transform = CGAffineTransformIdentity;
        fromVc.view.transform = CGAffineTransformMakeTranslation(-fromVc.view.width, 0);
        
    } completion:^(BOOL finished) {
        
        if ([transitionContext transitionWasCancelled]) {
            
            [transitionContext completeTransition:NO];
            
        } else {
            
            [transitionContext completeTransition:YES];
            
        }
        
    }];
}
@end
