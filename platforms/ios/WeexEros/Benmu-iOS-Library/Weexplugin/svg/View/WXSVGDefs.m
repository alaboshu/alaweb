//
//  WXSVGDefs.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/27.
//  Copyright © 2017年 Taobao. All rights reserved.
//
#import "WXSVGDefs.h"
#import "WXSVGLinearGradient.h"
#import "WXSVGRadialGradient.h"

@implementation WXSVGDefs

- (void)renderTo:(CGContextRef)context
{
    [self traverseSubviews:^(WXSVGNode *node) {
        [node saveDefinition];
        return YES;
    }];
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{
    return nil;
}

@end
