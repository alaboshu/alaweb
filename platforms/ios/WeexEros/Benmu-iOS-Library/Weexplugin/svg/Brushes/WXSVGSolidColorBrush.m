//
//  WXSVGSolidColorBrush.m
//  Pods
//
//  Created by yangshengtao on 17/2/20.
//
//

#import "WXSVGSolidColorBrush.h"
#import "WXConvert+WXSVG.h"

@implementation WXSVGSolidColorBrush
{
    CGColorRef _color;
}

- (instancetype)initWithArray:(NSArray<NSNumber *> *)array
{
    if ((self = [super initWithArray:array])) {
        _color = CGColorRetain([WXConvert CGColor:array offset:1]);
    }
    return self;
}

- (instancetype)initWithColor:(id)value
{
    if (self = [super initWithColor:value]) {
        _color = [WXConvert CGColor:value];
    }
    return self;
}

- (void)dealloc
{
    
}

- (BOOL)applyFillColor:(CGContextRef)context opacity:(CGFloat)opacity
{
    CGFloat aplpha = CGColorGetAlpha(_color);
    CGColorRef color = CGColorCreateCopyWithAlpha(_color, opacity * aplpha);
    CGContextSetFillColorWithColor(context, color);
    CGColorRelease(color);
    return YES;
}

- (BOOL)applyStrokeColor:(CGContextRef)context opacity:(CGFloat)opacity
{
    CGFloat aplpha = CGColorGetAlpha(_color);
    CGColorRef color = CGColorCreateCopyWithAlpha(_color, opacity * aplpha);
    CGContextSetStrokeColorWithColor(context, color);
    
//    CGContextSetRGBStrokeColor(context, 0.0, 0, 0, 1.0);
    
    CGColorRelease(color);
    return YES;
}

@end
