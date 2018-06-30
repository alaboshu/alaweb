//
//  WXSVGRect.m
//  Pods
//
//  Created by yangshengtao on 17/2/21.
//
//

#import "WXSVGRect.h"

@implementation WXSVGRect

- (void)setX:(CGFloat)x
{
    if (x == _x) {
        return;
    }
    [self invalidate];
    _x = x;
}

- (void)setY:(CGFloat)y
{
    if (y == _y) {
        return;
    }
    [self invalidate];
    _y = y;
}

- (void)setWidth:(CGFloat)width
{
    if (width == _width) {
        return;
    }
    [self invalidate];
    _width = width;
}

- (void)setHeight:(CGFloat)height
{
    if (height == _height) {
        return;
    }
    [self invalidate];
    _height = height;
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
    CGFloat x = self.x;//[self getWidthRelatedValue:self.x];
    CGFloat y = self.y;//[self getHeightRelatedValue:self.y];
    CGFloat width = self.width;
    CGFloat height = self.height;
    CGFloat rx = self.rx;//[self getWidthRelatedValue:self.rx];
    CGFloat ry = self.ry;//[self getHeightRelatedValue:self.ry];
    
    if (rx != 0 || ry != 0) {
        if (rx == 0) {
            rx = ry;
        } else if (ry == 0) {
            ry = rx;
        }
        
        if (rx > width / 2) {
            rx = width / 2;
        }
        
        if (ry > height / 2) {
            ry = height / 2;
        }
        
        CGPathAddRoundedRect(path, nil, CGRectMake(x, y, width, height), rx, ry);
    } else {
        CGPathAddRect(path, nil, CGRectMake(x, y, width, height));
    }
    
    return (CGPathRef)CFAutorelease(path);
}

@end
