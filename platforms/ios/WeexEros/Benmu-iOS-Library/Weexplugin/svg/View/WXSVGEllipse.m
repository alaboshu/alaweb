//
//  WXSVGEllipse.m
//  Pods
//
//  Created by yangshengtao on 17/2/21.
//
//

#import "WXSVGEllipse.h"

@implementation WXSVGEllipse

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

- (void)setRx:(CGFloat)rx
{
    if (rx == _rx) {
        return;
    }
    [self invalidate];
    _rx = rx;
}

- (void)setRy:(CGFloat)ry
{
    if (ry == _ry) {
        return;
    }
    [self invalidate];
    _ry = ry;
}

- (CGPathRef)getPath:(CGContextRef)context
{
    [self setBoundingBox:CGContextGetClipBoundingBox(context)];
    CGMutablePathRef path = CGPathCreateMutable();
    CGFloat cx = self.cx;//[self getWidthRelatedValue:self.cx];
    CGFloat cy = self.cy;//[self getHeightRelatedValue:self.cy];
    CGFloat rx = self.rx;//[self getWidthRelatedValue:self.rx];
    CGFloat ry = self.ry;//[self getHeightRelatedValue:self.ry];
    CGPathAddEllipseInRect(path, nil, CGRectMake(cx - rx, cy - ry, rx * 2, ry * 2));
    return (CGPathRef)CFAutorelease(path);
}

@end
