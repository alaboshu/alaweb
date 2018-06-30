//
//  BMInteractiveTransition.h
//  Pods
//
//  Created by XHY on 2017/5/23.
//
//

#import <UIKit/UIKit.h>

typedef void(^BMGestureConfig)();

/* 手势方向 */
typedef NS_ENUM(NSUInteger, BMInteractiveTransitionGestureDirection) {
    BMInteractiveTransitionGestureDirectionLeft = 0,
    BMInteractiveTransitionGestureDirectionRight,
    BMInteractiveTransitionGestureDirectionUp,
    BMInteractiveTransitionGestureDirectionDown
};

/* 手势控制哪种转场 */
typedef NS_ENUM(NSUInteger, BMInteractiveTransitionType) {
    BMInteractiveTransitionTypePresent = 0,
    BMInteractiveTransitionTypeDismiss,
    BMInteractiveTransitionTypePush,
    BMInteractiveTransitionTypePop,
};

@interface BMInteractiveTransition : UIPercentDrivenInteractiveTransition

@property (nonatomic, assign) BOOL interation;
@property (nonatomic, copy) BMGestureConfig presentConfig;
@property (nonatomic, copy) BMGestureConfig pushConfig;

/** 初始化方法 */
+ (instancetype)interactiveTransitionWithTransitionType:(BMInteractiveTransitionType)type GestureDirection:(BMInteractiveTransitionGestureDirection)direction;
- (instancetype)initWithTransitionType:(BMInteractiveTransitionType)type GestureDirection:(BMInteractiveTransitionGestureDirection)direction;

/** 给传入的控制器添加手势 */
- (void)addPanGestureForViewController:(UIViewController *)viewController;

- (void)addPanGestureForView:(UIView *)view handleViewController:(UIViewController *)viewController;

@end
