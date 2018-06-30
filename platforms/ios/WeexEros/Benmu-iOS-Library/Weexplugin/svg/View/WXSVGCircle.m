//
//  WXSVGCircle.m
//  Pods
//
//  Created by yangshengtao on 17/2/21.
//
//

#import "WXSVGCircle.h"

@implementation WXSVGCircle

- (void)setCx:(CGFloat)cx
{
    if (cx == _cx) {
        return;
    }
    [self invalidate];
    _cx = cx;
}

- (void)setCy:(CGFloat)cy
{
    if (cy == _cy) {
        return;
    }
    [self invalidate];
    _cy = cy;
}

- (void)setR:(NSString *)r
{
    if (r == _r) {
        return;
    }
    [self invalidate];
    _r = r;
}

- (CGPathRef)getPath:(CGContextRef)context
{
    [self setBoundingBox:CGContextGetClipBoundingBox(context)];
    CGMutablePathRef path = CGPathCreateMutable();
    WXSVGPercentageConverter* convert = [[WXSVGPercentageConverter alloc] init];
    CGFloat cx = self.cx;//[self getWidthRelatedValue:self.cx];
    CGFloat cy = self.cy;//[self getHeightRelatedValue:self.cy];
    CGFloat r;
    // radius percentage calculate formula:
    // radius = sqrt(pow((width*percent), 2) + pow((height*percent), 2)) / sqrt(2)
    
    if ([convert isPercentage:self.r]) {
        CGFloat radiusPercent = [convert percentageToFloat:self.r relative:1 offset:0];
        r = sqrt(pow(([self getContextWidth] * radiusPercent), 2) + pow(([self getContextHeight] * radiusPercent), 2)) / sqrt(2);
    } else {
        r = [self.r floatValue];
    }
    
    CGPathAddArc(path, nil, cx, cy, r, 0, 2*M_PI, NO);
    return (CGPathRef)CFAutorelease(path);
}

@end
