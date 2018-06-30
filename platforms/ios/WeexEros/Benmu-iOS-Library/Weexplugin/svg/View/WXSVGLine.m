//
//  WXSVGLine.m
//  Pods
//
//  Created by yangshengtao on 17/2/17.
//
//

#import "WXSVGLine.h"

@implementation WXSVGLine

- (void)setX1:(CGFloat)x1
{
    if (x1 == _x1) {
        return;
    }
    [self invalidate];
    _x1 = x1;
}

- (void)setY1:(CGFloat)y1
{
    if (y1 == _y1) {
        return;
    }
    [self invalidate];
    _y1 = y1;
}

- (void)setX2:(CGFloat)x2
{
    if (x2 == _x2) {
        return;
    }
    [self invalidate];
    _x2 = x2;
}

- (void)setY2:(CGFloat)y2
{
    if (y2 == _y2) {
        return;
    }
    [self invalidate];
    _y2 = y2;
}

- (CGPathRef)getPath:(CGContextRef)context
{
    [self setBoundingBox:CGContextGetClipBoundingBox(context)];
    CGMutablePathRef path = CGPathCreateMutable();
    CGFloat x1 = self.x1;//[self getWidthRelatedValue:self.x1];
    CGFloat y1 = self.y1;//[self getHeightRelatedValue:self.y1];
    CGFloat x2 = self.x2;//[self getWidthRelatedValue:self.x2];
    CGFloat y2 = self.y2;//[self getHeightRelatedValue:self.y2];
    CGPathMoveToPoint(path, nil, x1, y1);
    CGPathAddLineToPoint(path, nil, x2, y2);
    
    return (CGPathRef)CFAutorelease(path);
}

@end
