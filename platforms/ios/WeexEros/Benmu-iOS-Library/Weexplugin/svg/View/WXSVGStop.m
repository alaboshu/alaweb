//
//  WXSVGStop.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/27.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGStop.h"
#import "WXSVGLinearGradient.h"

@implementation WXSVGStop

- (void)setStopColor:(NSString *)stopColor
{
    if (_stopColor == stopColor) {
        return;
    }
    [self invalidate];
    _stopColor = stopColor;
    WXSVGNode *linearGradient = (WXSVGNode *)self.superview;
    [linearGradient addGradientStopColor:stopColor];
}

@end
