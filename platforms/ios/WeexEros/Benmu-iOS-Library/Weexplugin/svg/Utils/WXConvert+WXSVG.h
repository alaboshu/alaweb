//
//  WXConvert+WXSVG.h
//  Pods
//
//  Created by yangshengtao on 17/2/20.
//
//

#import <WeexSDK/WeexSDK.h>
#import <QuartzCore/QuartzCore.h>
#import "WXSVGNode.h"
#import "WXSVGRenderable.h"
#import "WXSVGBrush.h"

@interface WXConvert (WXSVG)


+ (CGPathRef)CGPath:(NSString *)d withScale:(CGFloat)scale;
//+ (CTTextAlignment)CTTextAlignment:(id)json;
//+ (WXSVGCGFCRule)RNSVGCGFCRule:(id)json;
//+ (WXSVGTextFrame)RNSVGTextFrame:(id)json;
+ (WXSVGCGFloatArray)WXSVGCGFloatArray:(id)json;
+ (WXSVGBrush *)WXSVGBrush:(id)json;


//+ (NSArray *)WXSVGBezier:(id)json;
+ (CGRect)CGRect:(id)json offset:(NSUInteger)offset;
+ (CGColorRef)CGColor:(id)json offset:(NSUInteger)offset;
+ (CGGradientRef)CGGradient:(id)json offset:(NSUInteger)offset;
+ (NSArray *) colorWithHex:(NSInteger)hexValue;
+ (CGPoint)CGPoint:(id)json;
+ (CGPoint)CGPoint:(id)json withScale:(CGFloat)scale;

+ (WXSVGBrush *)WXSVGCGColor:(id)value;
+ (WXSVGCGFloatArray)WXSVGConvertColor:(NSString *)color;

@end
