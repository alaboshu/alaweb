//
//  WXSVGBrush.m
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import "WXSVGBrush.h"

@implementation WXSVGBrush

- (instancetype)initWithArray:(NSArray *)data
{
    if (self = [super init]) {
        
    }
    return self;
}

- (instancetype)initWithColor:(id)value
{
    if (self = [super init]) {
        
    }
    return self;
}

- (BOOL)applyFillColor:(CGContextRef)context opacity:(CGFloat)opacity
{
    return NO;
}

- (BOOL)applyStrokeColor:(CGContextRef)context opacity:(CGFloat)opacity
{
    return NO;
}

- (void)paint:(CGContextRef)context opacity:(CGFloat)opacity brushConverter:(WXSVGBrushConverter *)brushConverter
{
    // abstract
}

@end
