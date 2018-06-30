//
//  WXConvert+WXSVG.m
//  Pods
//
//  Created by yangshengtao on 17/2/20.
//
//

#import "WXConvert+WXSVG.h"
#import "WXSVGPathParser.h"
#import "WXSVGSolidColorBrush.h"
#import "WXSVGBaseBrush.h"

@implementation WXConvert (WXSVG)
#define WX_JSON_ARRAY_CONVERTER(type) + (NSArray *)type##Array:(id)json { return json; }
#define WX_JSON_CONVERTER(type)           \
+ (type *)type:(id)json { return json; }

WX_JSON_ARRAY_CONVERTER(NSArray)
WX_JSON_ARRAY_CONVERTER(NSString)
WX_JSON_ARRAY_CONVERTER(NSStringArray)
WX_JSON_ARRAY_CONVERTER(NSDictionary)
WX_JSON_ARRAY_CONVERTER(NSNumber)


WX_JSON_CONVERTER(NSArray)
WX_JSON_CONVERTER(NSDictionary)
WX_JSON_CONVERTER(NSNumber)


+ (CGPathRef)CGPath:(NSString *)d withScale:(CGFloat)scale;
{
    return [[[WXSVGPathParser alloc] initWithPathString:d withScale:scale] getPath];
}

/*
RCT_ENUM_CONVERTER(CTTextAlignment, (@{
                                       @"auto": @(kCTTextAlignmentNatural),
                                       @"left": @(kCTTextAlignmentLeft),
                                       @"center": @(kCTTextAlignmentCenter),
                                       @"right": @(kCTTextAlignmentRight),
                                       @"justify": @(kCTTextAlignmentJustified),
                                       }), kCTTextAlignmentNatural, integerValue)

RCT_ENUM_CONVERTER(RNSVGCGFCRule, (@{
                                     @"evenodd": @(kRNSVGCGFCRuleEvenodd),
                                     @"nonzero": @(kRNSVGCGFCRuleNonzero),
                                     }), kRNSVGCGFCRuleNonzero, intValue)

RCT_ENUM_CONVERTER(RNSVGVBMOS, (@{
                                  @"meet": @(kRNSVGVBMOSMeet),
                                  @"slice": @(kRNSVGVBMOSSlice),
                                  @"none": @(kRNSVGVBMOSNone)
                                  }), kRNSVGVBMOSMeet, intValue)
*/

// This takes a tuple of text lines and a font to generate a CTLine for each text line.
// This prepares everything for rendering a frame of text in RNSVGText.
/*
+ (RNSVGTextFrame)RNSVGTextFrame:(id)json
{
    NSDictionary *dict = [self NSDictionary:json];
    RNSVGTextFrame frame;
    frame.count = 0;
    
    NSArray *lines = [self NSArray:dict[@"lines"]];
    NSUInteger lineCount = [lines count];
    if (lineCount == 0) {
        return frame;
    }
    
    NSDictionary *fontDict = dict[@"font"];
    NSString *fontFamily = fontDict[@"fontFamily"];
    
    BOOL fontFound = NO;
    NSArray *supportedFontFamilyNames = [UIFont familyNames];
    
    if ([supportedFontFamilyNames containsObject:fontFamily]) {
        fontFound = YES;
    } else {
        for (NSString *fontFamilyName in supportedFontFamilyNames) {
            if ([[UIFont fontNamesForFamilyName: fontFamilyName] containsObject:fontFamily]) {
                fontFound = YES;
                break;
            }
        }
    }
    
    fontFamily = fontFound ? fontFamily : nil;
    
    
    CTFontRef font = (__bridge CTFontRef)[RCTFont updateFont:nil withFamily:fontFamily size:fontDict[@"fontSize"] weight:fontDict[@"fontWeight"] style:fontDict[@"fontStyle"]
                                                     variant:nil scaleMultiplier:1.0];
    if (!font) {
        return frame;
    }
    
    // Create a dictionary for this font
    CFDictionaryRef attributes = (__bridge CFDictionaryRef)@{
                                                             (NSString *)kCTFontAttributeName: (__bridge id)font,
                                                             (NSString *)kCTForegroundColorFromContextAttributeName: @YES
                                                             };
    
    // Set up text frame with font metrics
    CGFloat size = CTFontGetSize(font);
    frame.count = lineCount;
    frame.baseLine = size; // estimate base line
    frame.lineHeight = size * 1.1; // Base on RNSVG canvas line height estimate
    frame.lines = malloc(sizeof(CTLineRef) * lineCount);
    frame.widths = malloc(sizeof(CGFloat) * lineCount);
    
    [lines enumerateObjectsUsingBlock:^(NSString *text, NSUInteger i, BOOL *stop) {
        
        CFStringRef string = (__bridge CFStringRef)text;
        CFAttributedStringRef attrString = CFAttributedStringCreate(kCFAllocatorDefault, string, attributes);
        CTLineRef line = CTLineCreateWithAttributedString(attrString);
        CFRelease(attrString);
        
        frame.lines[i] = line;
        frame.widths[i] = CTLineGetTypographicBounds(line, nil, nil, nil);
    }];
    
    return frame;
}
 */

+ (WXSVGCGFloatArray)WXSVGCGFloatArray:(id)json
{
    NSArray *arr = [self NSNumberArray:json];
    NSUInteger count = arr.count;
    
    WXSVGCGFloatArray array;
    array.count = count;
    array.array = nil;
    
    if (count) {
        // Ideally, these arrays should already use the same memory layout.
        // In that case we shouldn't need this new malloc.
        array.array = malloc(sizeof(CGFloat) * count);
        for (NSUInteger i = 0; i < count; i++) {
            array.array[i] = [arr[i] doubleValue];
        }
    }
    
    return array;
}

+ (WXSVGBrush *)WXSVGBrush:(id)json
{
    NSArray *arr = [self NSArray:json];
    NSUInteger type = [self NSUInteger:arr.firstObject];
    
    switch (type) {
        case 0: // solid color
            // These are probably expensive allocations since it's often the same value.
            // We should memoize colors but look ups may be just as expensive.
            return [[WXSVGSolidColorBrush alloc] initWithArray:arr];
        case 1: // brush
            return [[WXSVGBaseBrush alloc] initWithArray:arr];
        default:
            return nil;
    }
}

+ (WXSVGBrush *)WXSVGCGColor:(id)value
{
    NSArray *arr = [self parserColorPros:value];
    NSUInteger type = [self NSUInteger:arr.firstObject];
    switch (type) {
        case 0:
            return [[WXSVGSolidColorBrush alloc] initWithColor:value];
        case 1:
            return [[WXSVGBaseBrush alloc] initWithArray:arr];
        default:
            return nil;
    }
}

+ (WXSVGCGFloatArray)WXSVGConvertColor:(NSString *)color
{
    NSArray *arr = [color componentsSeparatedByString:@","];
    NSUInteger count = arr.count;
    
    WXSVGCGFloatArray array;
    array.count = count;
    array.array = nil;
    
    if (count) {
        // Ideally, these arrays should already use the same memory layout.
        // In that case we shouldn't need this new malloc.
        array.array = malloc(sizeof(CGFloat) * count);
        for (NSUInteger i = 0; i < count; i++) {
            array.array[i] = [arr[i] doubleValue];
        }
    }
    
    return array;
}

+ (NSArray *)parserColorPros:(NSString *)colorPros
{
    if ([colorPros hasPrefix:@"url"]) {
        NSString* formaterStr = [colorPros stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"()"]];
        if ([formaterStr length] > 3) {
            NSString *urlId = [formaterStr substringFromIndex:5];
            return @[@(1),urlId];
        }
    }
    return @[@(0),colorPros];
}

/*
+ (NSArray *)WXSVGBezier:(id)json
{
    NSArray *arr = [self NSNumberArray:json];
    
    NSMutableArray<NSArray *> *beziers = [[NSMutableArray alloc] init];
    
    NSUInteger count = [arr count];
    
#define NEXT_VALUE [self double:arr[i++]]
    @try {
        NSValue *startPoint = [NSValue valueWithCGPoint: CGPointMake(0, 0)];
        NSUInteger i = 0;
        while (i < count) {
            NSUInteger type = [arr[i++] unsignedIntegerValue];
            switch (type) {
                case 0:
                {
                    startPoint = [NSValue valueWithCGPoint: CGPointMake(NEXT_VALUE, NEXT_VALUE)];
                    [beziers addObject: @[startPoint]];
                    break;
                }
                case 1:
                    [beziers addObject: @[]];
                    break;
                case 2:
                {
                    double x = NEXT_VALUE;
                    double y = NEXT_VALUE;
                    NSValue * destination = [NSValue valueWithCGPoint:CGPointMake(x, y)];
                    [beziers addObject: @[
                                          destination,
                                          startPoint,
                                          destination
                                          ]];
                    break;
                }
                case 3:
                    [beziers addObject: @[
                                          [NSValue valueWithCGPoint:CGPointMake(NEXT_VALUE, NEXT_VALUE)],
                                          [NSValue valueWithCGPoint:CGPointMake(NEXT_VALUE, NEXT_VALUE)],
                                          [NSValue valueWithCGPoint:CGPointMake(NEXT_VALUE, NEXT_VALUE)],
                                          ]];
                    break;
                default:
                    RCTLogError(@"Invalid RNSVGBezier type %zd at element %zd of %@", type, i, arr);
                    return nil;
            }
        }
    }
    @catch (NSException *exception) {
        RCTLogError(@"Invalid RNSVGBezier format: %@", arr);
        return nil;
    }
    
    return beziers;
}
*/
+ (CGRect)CGRect:(id)json offset:(NSUInteger)offset
{
    NSArray *arr = [self NSArray:json];
    if (arr.count < offset + 4) {
        
        return CGRectZero;
    }
    return (CGRect){
        {[self CGFloat:arr[offset]], [self CGFloat:arr[offset + 1]]},
        {[self CGFloat:arr[offset + 2]], [self CGFloat:arr[offset + 3]]},
    };
}

+ (CGPoint)CGPoint:(id)json
{
    NSArray *arr = [self NSArray:json];
    if (arr.count <= 1) {
        return CGPointZero;
    }
    return CGPointMake([arr[0] floatValue], [arr[1] floatValue]);
}

+ (CGPoint)CGPoint:(id)json withScale:(CGFloat)scale
{
    NSArray *arr = [self NSArray:json];
    if (arr.count <= 1) {
        return CGPointZero;
    }
    return CGPointMake([WXConvert WXPixelType:arr[0] scaleFactor:scale],
                       [WXConvert WXPixelType:arr[1] scaleFactor:scale]);
}

+ (CGColorRef)CGColor:(id)json offset:(NSUInteger)offset
{
    NSArray *arr = [self NSArray:json];
    if (arr.count < offset + 4) {
        
        return nil;
    }
    return [self SVGUIColor:[arr subarrayWithRange:(NSRange){offset, 4}]].CGColor;
}

+ (UIColor *)SVGUIColor:(id)json
{
    if (!json) {
        return nil;
    }
    if ([json isKindOfClass:[NSArray class]]) {
        NSArray *components = [self NSNumberArray:json];
        CGFloat alpha = components.count > 3 ? [self CGFloat:components[3]] : 1.0;
        return [UIColor colorWithRed:[self CGFloat:components[0]]
                               green:[self CGFloat:components[1]]
                                blue:[self CGFloat:components[2]]
                               alpha:alpha];
    } else if ([json isKindOfClass:[NSNumber class]]) {
        NSUInteger argb = [self NSUInteger:json];
        CGFloat a = ((argb >> 24) & 0xFF) / 255.0;
        CGFloat r = ((argb >> 16) & 0xFF) / 255.0;
        CGFloat g = ((argb >> 8) & 0xFF) / 255.0;
        CGFloat b = (argb & 0xFF) / 255.0;
        return [UIColor colorWithRed:r green:g blue:b alpha:a];
    } else {
//        RCTLogConvertError(json, @"a UIColor. Did you forget to call processColor() on the JS side?");
        return nil;
    }
}

+ (CGGradientRef)CGGradient:(id)json offset:(NSUInteger)offset
{
    /*NSArray *arr = [self NSArray:json];
    if (arr.count < offset) {
        
        return nil;
    }
    arr = [arr subarrayWithRange:(NSRange){offset, arr.count - offset}];
    WXSVGCGFloatArray colorsAndOffsets = [self WXSVGCGFloatArray:arr];
    size_t stops = colorsAndOffsets.count / 5;
    CGColorSpaceRef rgb = CGColorSpaceCreateDeviceRGB();
    
    CGGradientRef gradient = CGGradientCreateWithColorComponents(
                                                                 rgb,
                                                                 colorsAndOffsets.array,
                                                                 colorsAndOffsets.array + stops * 4,
                                                                 stops
                                                                 );
    
    
    CGColorSpaceRelease(rgb);
    free(colorsAndOffsets.array);
    return (CGGradientRef)CFAutorelease(gradient);*/
    if (!json) {
        return nil;
    }
    NSArray *arr = [self NSArray:json];
    CGColorSpaceRef rgb = CGColorSpaceCreateDeviceRGB();
    CGFloat colors[arr.count];
    for (NSUInteger i = 0; i < arr.count; i++) {
        colors[i] = [arr[i] floatValue];
    }
    CGGradientRef gradient = CGGradientCreateWithColorComponents(rgb, colors, NULL, sizeof(colors)/(sizeof(colors[0])*4));
    CGColorSpaceRelease(rgb);
    return (CGGradientRef)CFAutorelease(gradient);
}

+ (NSArray *) colorWithHex:(NSInteger)hexValue alpha:(CGFloat)alphaValue
{
    NSNumber *r = [NSNumber numberWithDouble:((float)((hexValue & 0xFF0000) >> 16))/255.0];
    NSNumber *g = [NSNumber numberWithDouble:((float)((hexValue & 0xFF00) >> 8))/255.0];
    NSNumber *b = [NSNumber numberWithDouble:((float)(hexValue & 0xFF))/255.0];
    return @[@(0), r, g, b, @(alphaValue)];
}

+ (NSArray *) colorWithHex:(NSInteger)hexValue
{
    return [self colorWithHex:hexValue alpha:1.0];
}

@end
