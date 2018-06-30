//
//  WXTextComponent+BMExtend.m
//  BM-JYT
//
//  Created by XHY on 2017/3/20.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "WXTextComponent+BMExtend.h"
#import <WeexSDK/WXComponent_internal.h>

const void * _defaultFontSizeKey = "bm_defaultFontSize";
const void * _fontSizeScale = "bm_fontSizeScale";

@implementation WXTextComponent (BMExtend)

- (instancetype)bmText_initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    /* 60001 ⬇️*/
    id changeFont = attributes[@"changeFont"];
    if ((!styles[@"fontFamily"] || ![styles[@"fontFamily"] isEqualToString:@"iconfont"]) &&
        (changeFont == nil || [WXConvert BOOL:changeFont])) {
        /* 注册修改字体通知 */
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(changeFontSize) name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
        
        NSMutableDictionary *dic4Styles = [NSMutableDictionary dictionaryWithDictionary:styles];
        
        /* 将css 定义的标准字体保存为属性 */
        NSNumber *cssFontSize = @32; // 默认字体
        if (dic4Styles[@"fontSize"]) {
            cssFontSize = [NSNumber numberWithFloat:[WXConvert CGFloat:dic4Styles[@"fontSize"]]];
        }
        CGFloat _defaultFontSize = [cssFontSize floatValue];
        objc_setAssociatedObject(self, "bm_defaultFontSize", [NSNumber numberWithFloat:_defaultFontSize], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        
        /* 判断 css 是否设置了 lineHeight，如果没有的话默认等于字体大小
         并将 lineHeight 保存为属性，方便修改字体时使用
         */
        CGFloat _defalutLineHeight = _defaultFontSize * 1.2;
        if (styles[@"lineHeight"]) _defalutLineHeight = [WXConvert CGFloat:styles[@"lineHeight"]];
        objc_setAssociatedObject(self, "bm_defaultLineHeight", [NSNumber numberWithFloat:_defalutLineHeight], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        
        
        /* 如果scale字段有值，则该标签在非标准字体下按照这个倍数放大字体 */
        if (attributes[@"scale"]) {
            objc_setAssociatedObject(self, "bm_fontSizeScale", [NSNumber numberWithFloat:[WXConvert CGFloat:attributes[@"scale"]]], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        }
        
        /* 如果fontScale字段有值，则该标签在任何字体模式下都按照这个倍数放大字体 */
        if (attributes[@"fontScale"]) {
            objc_setAssociatedObject(self, "bm_fontScale", [NSNumber numberWithFloat:[WXConvert CGFloat:attributes[@"fontScale"]]], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        }
        
        CGFloat changeFontSize = [self getChangeToFontSizeWithDefaultSize:_defaultFontSize];
        CGFloat changeLineHeight = [self getChangeToFontSizeWithDefaultSize:_defalutLineHeight];
        
        [dic4Styles setValue:[NSNumber numberWithFloat:changeFontSize] forKey:@"fontSize"];
        [dic4Styles setValue:[NSNumber numberWithFloat:changeLineHeight] forKey:@"lineHeight"];
        styles = [NSDictionary dictionaryWithDictionary:dic4Styles];
    }
    /* 60001 ⬆️ */
    
    return [self bmText_initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
}

/* 60001 ⬇️*/
/* 修改字体大小通知返回方法 */
- (void)changeFontSize
{
    NSNumber *defaultSize = objc_getAssociatedObject(self, "bm_defaultFontSize");
    if (!defaultSize) return;
    CGFloat changeFontSize = [self getChangeToFontSizeWithDefaultSize:[defaultSize floatValue]];
    
    NSNumber *defaultLineHeight = objc_getAssociatedObject(self, "bm_defaultLineHeight");
    if (!defaultLineHeight) return;
    CGFloat changeLineHeight = [self getChangeToFontSizeWithDefaultSize:[defaultLineHeight floatValue]];
    
    NSDictionary *styles = @{
                             @"fontSize": [NSNumber numberWithFloat:changeFontSize],
                             @"lineHeight": [NSNumber numberWithFloat:changeLineHeight]
                             };
    [self _updateStylesOnComponentThread:styles resetStyles:[NSMutableArray array] isUpdateStyles:YES];
}
/* 60001 ⬆️ */

/* 获取将要改变的字体size */
- (CGFloat)getChangeToFontSizeWithDefaultSize:(CGFloat)defaultSize
{
    NSString *currentFontSize = [[NSUserDefaults standardUserDefaults] valueForKey:K_FONT_SIZE_KEY];
    
    /* 如果fontScale字段有值，则该标签在任何字体模式下都按照这个倍数放大字体 */
    NSNumber *fontScale = objc_getAssociatedObject(self, "bm_fontScale");
    if (fontScale) {
        return defaultSize * [fontScale floatValue];
    }
    
    /* 如果scale字段有值，则该标签在非标准字体下按照这个倍数放大字体 */
    NSNumber *scale = objc_getAssociatedObject(self, "bm_fontSizeScale");
    if (scale && ![currentFontSize isEqualToString:K_FONT_SIZE_NORM]) {
        return defaultSize * [scale floatValue];
    }
    
    if ([currentFontSize isEqualToString:K_FONT_SIZE_BIG]) {
        return defaultSize * K_FontSizeBig_Scale;
    } else if ([currentFontSize isEqualToString:k_FONT_SIZE_EXTRALARGE]) {
        return defaultSize * K_FontSizeExtralarge_Scale;
    }
    return defaultSize;
}

@end
