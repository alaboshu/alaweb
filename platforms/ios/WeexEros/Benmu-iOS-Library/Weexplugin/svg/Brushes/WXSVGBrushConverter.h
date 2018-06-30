//
//  WXSVGBrushConverter.h
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>

typedef enum {
    kWXSVGLinearGradient,
    kWXSVGRadialGradient,
    kWXSVGPattern
} WXSVGBrushType;

@interface WXSVGBrushConverter : NSObject

@property (nonatomic, copy) NSArray<NSString *> *points;
@property (nonatomic, copy) NSArray<NSNumber *> *colors;
@property (nonatomic, assign) CGFloat stopOpacity;
@property (nonatomic, copy) NSString *offet;
@property (nonatomic, assign) WXSVGBrushType type;

- (void) drawLinearGradient:(CGContextRef)context;

- (void) drawRidialGradient:(CGContextRef)context;

@end
