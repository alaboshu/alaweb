//
//  UIFont+Util.m
//  Pods
//
//  Created by XHY on 2017/5/17.
//
//

#import "UIFont+Util.h"

@implementation UIFont (Util)

+ (instancetype)scaleSizeWithSize:(CGFloat)size
{
    NSString *currentFontSize = [[NSUserDefaults standardUserDefaults] valueForKey:K_FONT_SIZE_KEY];
   
    if ([currentFontSize isEqualToString:K_FONT_SIZE_BIG]) {
        size = size * K_FontSizeBig_Scale;
    } else if ([currentFontSize isEqualToString:k_FONT_SIZE_EXTRALARGE]) {
        size = size * K_FontSizeExtralarge_Scale;
    }
    
    return [UIFont systemFontOfSize:size];
}

+ (UIFont *)currentTitleFont
{
    NSString *fontSize = [[NSUserDefaults standardUserDefaults] objectForKey:K_FONT_SIZE_KEY];
    // 标准字体
    if ([fontSize isEqualToString:K_FONT_SIZE_BIG])
    {
        return K_FONT_18;
    }
    else if ([fontSize isEqualToString:k_FONT_SIZE_EXTRALARGE])
    {
        return K_FONT_21;
    }
    
    return K_FONT_15;
}

+ (UIFont *)currentContentFont
{
    NSString *fontSize = [[NSUserDefaults standardUserDefaults] objectForKey:K_FONT_SIZE_KEY];
    // 标准字体
    if ([fontSize isEqualToString:K_FONT_SIZE_BIG])
    {
        return K_FONT_14;
    }
    else if ([fontSize isEqualToString:k_FONT_SIZE_EXTRALARGE])
    {
        return K_FONT_17;
    }
    return K_FONT_12;
}

@end
