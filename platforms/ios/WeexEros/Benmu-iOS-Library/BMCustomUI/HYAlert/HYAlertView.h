//
//  HYAlertView.h
//  JingYitong
//
//  Created by XHY on 16/6/21.
//  Copyright © 2016年 京医通. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void(^HYAlertViewClickedButtonAtIndexBlock)(NSInteger index);

@interface HYAlertView : UIControl

@property (nonatomic, assign) NSTextAlignment titleTextAlignment;
@property (nonatomic, assign) NSTextAlignment messageTextAlignment;
@property (nonatomic, copy) HYAlertViewClickedButtonAtIndexBlock clickedButtonAtIndexBlock;

+ (instancetype)shareInstance;

- (void)configWithTitle:(NSString *)title message:(NSString *)message cancelButtonTitle:(NSString *)cancelTitle otherButtonTitle:(NSString *)otherTitle;

- (void)configWithTitle:(NSString *)title message:(NSString *)message cancelButtonTitle:(NSString *)cancelTitle otherButtonTitle:(NSString *)otherTitle clickedButtonAtIndexBlock:(HYAlertViewClickedButtonAtIndexBlock)block;

+ (HYAlertView *)configWithTitle:(NSString *)title message:(NSString *)message cancelButtonTitle:(NSString *)cancelTitle otherButtonTitle:(NSString *)otherTitle clickedButtonAtIndexBlock:(HYAlertViewClickedButtonAtIndexBlock)block;

//- (instancetype)initWithTitle:(NSString *)title message:(NSString *)message cancelButtonTitle:(NSString *)cancelTitle otherButtonTitle:(NSString *)otherTitle;

- (void)show;
- (void)dismiss;

@end
