//
//  BMRichTextComponent.m
//  Pods
//
//  Created by XHY on 2017/4/12.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMRichTextComponent.h"
#import <WeexSDK/WXSDKInstance_private.h>
#import <WeexSDK/WXComponent_internal.h>
#import <WeexSDK/WXLayer.h>
#import <WeexSDK/WXConvert.h>
#import <WeexSDK/WXRuleManager.h>
#import <WeexSDK/WXDefine.h>
#import <pthread/pthread.h>
#import "BMSpanComponent.h"
#import "YYText.h"

@interface BMRichTextComponent()

@property (nonatomic, copy) NSMutableAttributedString *currentAttributedString;
@property (nonatomic, copy) NSString *currentFullText;

@end

@implementation BMRichTextComponent
{
    UIEdgeInsets _border;
    UIEdgeInsets _padding;
    NSTextStorage *_textStorage;
    CGFloat _textStorageWidth;
    
    NSUInteger _lines;
    NSTextAlignment _textAlign;
    CGFloat _fontSize;
    UIColor *_color;
    NSString *_textOverflow;
    CGFloat _lineHeight;
    
    
    pthread_mutex_t _textStorageMutex;
    pthread_mutexattr_t _textStorageMutexAttr;
    
    NSInteger _subcomponentCount;
}

static BOOL _isUsingTextStorageLock = NO;

+ (void)useTextStorageLock:(BOOL)isUsingTextStorageLock
{
    _isUsingTextStorageLock = isUsingTextStorageLock;
}

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString *)type
                     styles:(NSDictionary *)styles
                 attributes:(NSDictionary *)attributes
                     events:(NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        
        /* 60001 ⬇️*/
        id changeFont = attributes[@"changeFont"];
        if ((!styles[@"fontFamily"] || ![styles[@"fontFamily"] isEqualToString:@"iconfont"]) &&
            (changeFont == nil || [WXConvert BOOL:changeFont])) {
            /* 注册修改字体通知 */
            [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(changeFontSize) name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
            
            NSMutableDictionary *dic4Styles = [NSMutableDictionary dictionaryWithDictionary:styles];
            
            
            /* 将css 定义的标准字体保存为属性 */
            NSNumber *cssFontSize = @30; // 默认给 15 号字体
            if (dic4Styles[@"fontSize"]) {
                cssFontSize = [NSNumber numberWithFloat:[WXConvert CGFloat:dic4Styles[@"fontSize"]]];
            }
            CGFloat _defaultFontSize = [cssFontSize floatValue];
            objc_setAssociatedObject(self, "bm_defaultFontSize", [NSNumber numberWithFloat:_defaultFontSize], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
            
            /* 判断 css 是否设置了 lineHeight，如果没有的话默认等于字体大小
             并将 lineHeight 保存为属性，方便修改字体时使用
             */
            CGFloat _defalutLineHeight = _defaultFontSize + 2.0;
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
        
        if (_isUsingTextStorageLock) {
            pthread_mutexattr_init(&_textStorageMutexAttr);
            pthread_mutexattr_settype(&_textStorageMutexAttr, PTHREAD_MUTEX_RECURSIVE);
            pthread_mutex_init(&_textStorageMutex, &_textStorageMutexAttr);
        }
        
        [self fillCSSStyles:styles];
        [self fillAttributes:attributes];
    }
    
    return self;
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

- (void)dealloc
{
    if (_isUsingTextStorageLock) {
        pthread_mutex_destroy(&_textStorageMutex);
        pthread_mutexattr_destroy(&_textStorageMutexAttr);
    }
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}



#define WX_STYLE_FILL_TEXT(key, prop, type, needLayout)\
do {\
id value = styles[@#key];\
if (value) {\
_##prop = [WXConvert type:value];\
[self setNeedsRepaint];\
if (needLayout) {\
[self setNeedsLayout];\
}\
}\
} while(0);

#define WX_STYLE_FILL_TEXT_PIXEL(key, prop, needLayout)\
do {\
id value = styles[@#key];\
if (value) {\
_##prop = [WXConvert WXPixelType:value scaleFactor:self.weexInstance.pixelScaleFactor];\
[self setNeedsRepaint];\
if (needLayout) {\
[self setNeedsLayout];\
}\
}\
} while(0);

- (void)fillCSSStyles:(NSDictionary *)styles
{
    WX_STYLE_FILL_TEXT(color, color, UIColor, NO)
    WX_STYLE_FILL_TEXT_PIXEL(fontSize, fontSize, YES)
    WX_STYLE_FILL_TEXT(lines, lines, NSUInteger, YES)
    WX_STYLE_FILL_TEXT(textAlign, textAlign, NSTextAlignment, NO)
    WX_STYLE_FILL_TEXT(textOverflow, textOverflow, NSString, NO)
    WX_STYLE_FILL_TEXT_PIXEL(lineHeight, lineHeight, YES)
    
    if (!_lineHeight) _lineHeight = 18;
    
    UIEdgeInsets padding = {
        WXFloorPixelValue(self.cssNode->style.padding[CSS_TOP] + self.cssNode->style.border[CSS_TOP]),
        WXFloorPixelValue(self.cssNode->style.padding[CSS_LEFT] + self.cssNode->style.border[CSS_LEFT]),
        WXFloorPixelValue(self.cssNode->style.padding[CSS_BOTTOM] + self.cssNode->style.border[CSS_BOTTOM]),
        WXFloorPixelValue(self.cssNode->style.padding[CSS_RIGHT] + self.cssNode->style.border[CSS_RIGHT])
    };
    
    if (!UIEdgeInsetsEqualToEdgeInsets(padding, _padding)) {
        _padding = padding;
        [self setNeedsRepaint];
    }
}

- (void)fillAttributes:(NSDictionary *)attributes
{
//    id text = attributes[@"value"];
//    if (text) {
//        _text = [WXConvert NSString:text];
//        [self setNeedsRepaint];
//        [self setNeedsLayout];
//    }
    
//    if (attributes[@"subcomponentCount"]) {
//        _subcomponentCount = [WXConvert NSInteger:attributes[@"subcomponentCount"]];
//    }
}

- (void)setNeedsRepaint
{
    if (_isUsingTextStorageLock) {
        pthread_mutex_lock(&_textStorageMutex);
    }
    _textStorage = nil;
    if (_isUsingTextStorageLock) {
        pthread_mutex_unlock(&_textStorageMutex);
    }
}

- (void)repaint
{
    YYLabel *lbl = (YYLabel *)self.view;
    lbl.numberOfLines = _lines;
    if (_textOverflow && [_textOverflow length] > 0) {
        if ([_textOverflow isEqualToString:@"ellipsis"])
            lbl.lineBreakMode = NSLineBreakByTruncatingTail;
    }
    
    if (_color) {
        lbl.textColor = _color;
    }
    
    if (_textAlign) {
        lbl.textAlignment = _textAlign;
    }
    
    lbl.attributedText = self.currentAttributedString;
}

- (CGSize)getComputedSizeWithConstrainedWidth:(CGFloat)width
{
    if (!self.currentAttributedString) {
        return CGSizeZero;
    }
    
    CGFloat linesHeight = _lines * _lineHeight;
//    CGRect rect4Text = [self.currentAttributedString  boundingRectWithSize:CGSizeMake(width - (_padding.left + _padding.right), MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin context:nil];
    
    YYTextLayout *layout = [YYTextLayout layoutWithContainerSize:CGSizeMake(width - (_padding.left + _padding.right), MAXFLOAT) text:self.currentAttributedString];
    CGSize size4Text = layout.textBoundingSize;
    
    if (size4Text.height < linesHeight) {
        size4Text.height = linesHeight;
    }
    
    if (_lines != 0) {
        size4Text.height = linesHeight;
    }
    
    CGSize computedSize = CGSizeMake(width, size4Text.height);
    
    return computedSize;
}


#pragma mark - Subclass

- (void)setNeedsLayout
{
    [super setNeedsLayout];
}

- (void)viewDidLoad
{
//    [self repaint];
    
//    [self setNeedsRepaint];
//    [self setNeedsDisplay];
//    [self setNeedsDisplay];
    
}

- (void)layoutDidFinish
{
    [super setNeedsLayout];
}

- (UIView *)loadView
{
    YYLabel *lbl = [YYLabel new];
    lbl.userInteractionEnabled = YES;
    return lbl;
}

- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    [super insertSubview:subcomponent atIndex:index];
}

- (CGSize (^)(CGSize))measureBlock
{
    __weak typeof(self) weakSelf = self;
    return ^CGSize (CGSize constrainedSize) {
        
        if (!self.currentAttributedString) {
            return CGSizeZero;
        }
        
        CGSize computedSize = [weakSelf getComputedSizeWithConstrainedWidth:constrainedSize.width];
        
        //TODO:more elegant way to use max and min constrained size
        if (!isnan(weakSelf.cssNode->style.minDimensions[CSS_WIDTH])) {
            computedSize.width = MAX(computedSize.width, weakSelf.cssNode->style.minDimensions[CSS_WIDTH]);
        }
        
        if (!isnan(weakSelf.cssNode->style.maxDimensions[CSS_WIDTH])) {
            computedSize.width = MIN(computedSize.width, weakSelf.cssNode->style.maxDimensions[CSS_WIDTH]);
        }
        
        if (!isnan(weakSelf.cssNode->style.minDimensions[CSS_HEIGHT])) {
            computedSize.height = MAX(computedSize.height, weakSelf.cssNode->style.minDimensions[CSS_HEIGHT]);
        }
        
        if (!isnan(weakSelf.cssNode->style.maxDimensions[CSS_HEIGHT])) {
            computedSize.height = MIN(computedSize.height, weakSelf.cssNode->style.maxDimensions[CSS_HEIGHT]);
        }
        
        WXPerformBlockOnMainThread(^{
            [self repaint];
        });
        
        return (CGSize) {
            WXCeilPixelValue(computedSize.width),
            WXCeilPixelValue(computedSize.height)
        };
    };
}

#pragma mark Text Building

- (NSAttributedString *)buildAttributeStringWithSpan:(BMSpanComponent *)span
{
    NSString *string = span.text ?: @"";
    
    NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:string];
    
    // set textColor
    span.textColor = span.textColor?:_color;
    if(span.textColor) {
        [attributedString addAttribute:NSForegroundColorAttributeName value:span.textColor range:NSMakeRange(0, string.length)];
    }
    
    if (span.fontFamily) {
        NSString * keyPath = [NSString stringWithFormat:@"%@.tempSrc", span.fontFamily];
        NSString * fontSrc = [[[WXRuleManager sharedInstance] getRule:@"fontFace"] valueForKeyPath:keyPath];
        keyPath = [NSString stringWithFormat:@"%@.localSrc", span.fontFamily];
        NSString * fontLocalSrc = [[[WXRuleManager sharedInstance] getRule:@"fontFace"] valueForKeyPath:keyPath];
    }
    
    // set font
    CGFloat curfontSize = _fontSize;
    if (span.fontSize) {
        curfontSize = [WXConvert WXPixelType:[NSString stringWithFormat:@"%f",[self getChangeToFontSizeWithDefaultSize:span.fontSize]] scaleFactor:self.weexInstance.pixelScaleFactor];
    }
    
    UIFont *font = [WXUtility fontWithSize:curfontSize textWeight:span.fontWeight textStyle:span.fontStyle fontFamily:span.fontFamily scaleFactor:self.weexInstance.pixelScaleFactor];
    if (font) {
        [attributedString addAttribute:NSFontAttributeName value:font range:NSMakeRange(0, string.length)];
    }
    
    if(span.textDecoration == WXTextDecorationUnderline){
        [attributedString addAttribute:NSUnderlineStyleAttributeName value:@(NSUnderlinePatternSolid | NSUnderlineStyleSingle) range:NSMakeRange(0, string.length)];
    } else if(span.textDecoration == WXTextDecorationLineThrough){
        [attributedString addAttribute:NSStrikethroughStyleAttributeName value:@(NSUnderlinePatternSolid | NSUnderlineStyleSingle) range:NSMakeRange(0, string.length)];
    }
    
    NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
    
    if (_textAlign) {
        paragraphStyle.alignment = _textAlign;
    }
    
    if (_lineHeight) {
        paragraphStyle.maximumLineHeight = _lineHeight;
        paragraphStyle.minimumLineHeight = _lineHeight;
    }
    
    
    if (_lineHeight || _textAlign) {
        [attributedString addAttribute:NSParagraphStyleAttributeName
                                 value:paragraphStyle
                                 range:(NSRange){0, attributedString.length}];
    }
//    if ([self adjustLineHeight]) {
//        if (_lineHeight > font.lineHeight) {
//            [attributedString addAttribute:NSBaselineOffsetAttributeName
//                                     value:@((_lineHeight - font.lineHeight)/ 2)
//                                     range:(NSRange){0, attributedString.length}];
//        }
//    }
    
    /** 点击事件 */
    __weak typeof(span) weakSpan = span;
    if (span.clickEvent) {
        [attributedString yy_setTextHighlightRange:NSMakeRange(0, string.length)
                                             color:span.textColor
                                   backgroundColor:nil
                                         tapAction:^(UIView * _Nonnull containerView, NSAttributedString * _Nonnull text, NSRange range, CGRect rect) {
                                            
                                             WXLogInfo(@"富文本点击文字：%@",string);
                                             
                                             [weakSpan fireEvent:@"click" params:nil];
                                             
                                         }];
    }
    
    return attributedString;
}

- (BOOL)adjustLineHeight
{
    return YES;
}

- (void)_frameDidCalculated:(BOOL)isChanged
{
    [super _frameDidCalculated:isChanged];
}

- (void)_updateStylesOnComponentThread:(NSDictionary *)styles resetStyles:(NSMutableArray *)resetStyles isUpdateStyles:(BOOL)isUpdateStyles
{
    [super _updateStylesOnComponentThread:styles resetStyles:(NSMutableArray *)resetStyles isUpdateStyles:isUpdateStyles];
    
    [self fillCSSStyles:styles];
    
    self.currentFullText = nil;
    
    [self updateRichText];
    
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    [self fillAttributes:attributes];
}

- (void)_updateAttributesOnComponentThread:(NSDictionary *)attributes
{
    [super _updateAttributesOnComponentThread:attributes];
    
    [self fillAttributes:attributes];
}

/** 更新 富文本 */
- (void)updateRichText
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    
        NSString *fullText = @"";
        NSMutableAttributedString *attStr = [[NSMutableAttributedString alloc] init];
        
        /** 遍历所有子组件，拿到所有bmspan组件，构建完整的富文本 */
        for (WXComponent *subcomponent in self.subcomponents) {
            
            BMSpanComponent *span = [self findSpanComponent:subcomponent];
            if (!span) continue;
            fullText = [fullText stringByAppendingString:span.text];
            [attStr appendAttributedString:[self buildAttributeStringWithSpan:span]];
        }
        
        self.currentFullText = fullText;
        self.currentAttributedString = attStr;
        
        WXPerformBlockOnMainThread(^{
            [self repaint];
            [self setNeedsRepaint];
            [self setNeedsLayout];
            [self setNeedsDisplay];
        });
        
    });
}

/** 递归遍历子组件拿返回 bmspan 组件 */
- (BMSpanComponent *)findSpanComponent:(WXComponent *)component
{
    if (component) {
        if ([component isKindOfClass:[BMSpanComponent class]]) {
            return (BMSpanComponent *)component;
        }
        
        for (WXComponent *subComponent in component.subcomponents) {
            return [self findSpanComponent:subComponent];
        }
    }
    return nil;
}

@end
