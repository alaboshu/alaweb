//
//  BMPresentTranslationTransition.h
//  Pods
//
//  Created by XHY on 2017/5/24.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef NS_ENUM(NSUInteger,BMPresentTranslationTransitionType) {
    BMPresentTranslationTransitionTypePresent = 0,   /* present方式 */
    BMPresentTranslationTransitionTypeDismiss        /* dismiss方式 */
};

@interface BMPresentTranslationTransition : NSObject <UIViewControllerAnimatedTransitioning>

+ (instancetype)transitionWithTransitionType:(BMPresentTranslationTransitionType)type;
- (instancetype)initWithTransitionType:(BMPresentTranslationTransitionType)type;

@end
