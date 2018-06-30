//
//  WXSVGBaseBrush.m
//  Pods
//
//  Created by yangshengtao on 17/2/20.
//
//

#import "WXSVGBaseBrush.h"

@implementation WXSVGBaseBrush

- (instancetype)initWithArray:(NSArray *)array
{
    if ((self = [super initWithArray:array])) {
        if (array.count != 2) {
            
            return nil;
        }
        
        self.brushRef = [array objectAtIndex:1];
    }
    return self;
}

- (void)paint:(CGContextRef)context opacity:(CGFloat)opacity brushConverter:(WXSVGBrushConverter *)brushConverter
{
    BOOL transparency = opacity < 1;
    if (transparency) {
        CGContextSetAlpha(context, opacity);
        CGContextBeginTransparencyLayer(context, NULL);
    }
    
    if (brushConverter.type == kWXSVGLinearGradient) {
        [brushConverter drawLinearGradient:context];
    } else if (brushConverter.type == kWXSVGRadialGradient) {
        [brushConverter drawRidialGradient:context];
    } else if (brushConverter.type == kWXSVGPattern) {
        // todo:
    }
    
    if (transparency) {
        CGContextEndTransparencyLayer(context);
    }
}

@end
