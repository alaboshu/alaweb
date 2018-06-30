//
//  WXSVGRadialGradient.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/22.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGRadialGradient.h"

@implementation WXSVGRadialGradient

- (void)setFx:(NSString *)fx
{
    if (fx == _fx) {
        return;
    }
    [self invalidate];
    _fx = fx;
}

- (void)setFy:(NSString *)fy
{
    if (fy == _fy) {
        return;
    }
    [self invalidate];
    _fy = fy;
}

- (void)setRx:(NSString *)rx
{
    if (rx == _rx) {
        return;
    }
    [self invalidate];
    _rx = rx;
}

- (void)setRy:(NSString *)ry
{
    if (ry == _ry) {
        return;
    }
    [self invalidate];
    _ry = ry;
}

- (void)setCx:(NSString *)cx
{
    if (cx == _cx) {
        return;
    }
    [self invalidate];
    _cx = cx;
}

- (void)setCy:(NSString *)cy
{
    if (cy == _cy) {
        return;
    }
    _cy = cy;
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{
    return nil;
}

- (void)saveDefinition
{
    WXSVGBrushConverter *converter = [[WXSVGBrushConverter alloc] init];
    converter.colors = self.gradient;
    converter.points = @[self.fx, self.fy, self.rx, self.ry, self.cx, self.cy];
    converter.type = kWXSVGRadialGradient;
    [[self getSvgView] defineBrushConverter:converter brushConverterRef:self.name];
}

@end
