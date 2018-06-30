//
//  WXSVGBrush.h
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import <Foundation/Foundation.h>
#import "WXSVGPercentageConverter.h"
#import "WXSVGBrushConverter.h"

@interface WXSVGBrush : NSObject
{
    NSArray *_points;
}

@property (nonatomic, strong) NSString* brushRef;

/* @abstract */
- (instancetype)init NS_UNAVAILABLE;

- (instancetype)initWithArray:(NSArray *)data NS_DESIGNATED_INITIALIZER;

- (instancetype)initWithColor:(id)value NS_DESIGNATED_INITIALIZER;

/**
 * For certain brushes we can fast path a combined fill and stroke.
 * For those brushes we override applyFillColor which sets the fill
 * color to be used by those batch paints. Those return YES.
 * We can't batch gradient painting in CoreGraphics, so those will
 * return NO and paint gets called instead.
 */
- (BOOL)applyFillColor:(CGContextRef)context opacity:(CGFloat)opacity;

- (BOOL)applyStrokeColor:(CGContextRef)context opacity:(CGFloat)opacity;

/**
 * paint fills the context with a brush. The context is assumed to
 * be clipped.
 */
- (void)paint:(CGContextRef)context opacity:(CGFloat)opacity brushConverter:(WXSVGBrushConverter *)brushConverter;

@end
