//
//  BMPresentLikeQQTransition.h
//  Pods
//
//  Created by XHY on 2017/5/16.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef NS_ENUM(NSUInteger,BMPresentLikeQQTransitionType) {
    BMPresentLikeQQTransitionTypePresent = 0,   /* present方式 */
    BMPresentLikeQQTransitionTypeDismiss        /* dismiss方式 */
};

@interface BMPresentLikeQQTransition : NSObject <UIViewControllerAnimatedTransitioning>

+ (instancetype)transitionWithTransitionType:(BMPresentLikeQQTransitionType)type;
- (instancetype)initWithTransitionType:(BMPresentLikeQQTransitionType)type;

@end
