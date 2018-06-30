//
//  UIFont+Util.h
//  Pods
//
//  Created by XHY on 2017/5/17.
//
//

#import <UIKit/UIKit.h>

@interface UIFont (Util)


/**
 获取当前比例的字体字体大小

 @param size 标准字体大小
 @return UIFont
 */
+ (instancetype)scaleSizeWithSize:(CGFloat)size;

+ (UIFont *)currentTitleFont;

+ (UIFont *)currentContentFont;

@end
