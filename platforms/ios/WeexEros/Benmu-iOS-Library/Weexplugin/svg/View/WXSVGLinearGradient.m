//
//  WXSVGLinearGradient.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/22.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGLinearGradient.h"

@implementation WXSVGLinearGradient

- (void)setX1:(NSString *)x1
{
    if (x1 == _x1) {
        return;
    }
    [self invalidate];
    _x1 = x1;
}

- (void)setY1:(NSString *)y1
{
    if (y1 == _y1) {
        return;
    }
    [self invalidate];
    _y1 = y1;
}

- (void)setX2:(NSString *)x2
{
    if (x2 == _x2) {
        return;
    }
    [self invalidate];
    _x2 = x2;
}

- (void)setY2:(NSString *)y2
{
    if (y2 == _y2) {
        return;
    }
    [self invalidate];
    _y2 = y2;
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{
    return nil;
}

- (void)saveDefinition
{
    WXSVGBrushConverter *converter = [[WXSVGBrushConverter alloc] init];
    converter.colors = self.gradient;
    converter.points = @[self.x1, self.y1, self.x2, self.y2];
    converter.type = kWXSVGLinearGradient;
    [[self getSvgView] defineBrushConverter:converter brushConverterRef:self.name];
}

@end
