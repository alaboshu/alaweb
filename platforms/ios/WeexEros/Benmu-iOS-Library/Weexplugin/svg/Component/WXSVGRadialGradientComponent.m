//
//  WXSVGRadialGradientComponent.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/22.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGRadialGradientComponent.h"
#import "WXSVGRadialGradient.h"

@implementation WXSVGRadialGradientComponent
{
    NSString *_name;
    NSString *_fx;
    NSString *_fy;
    NSString *_rx;
    NSString *_ry;
    NSString *_cx;
    NSString *_cy;
    
    WXSVGRadialGradient *_radialView;
}

#pragma mark -
#pragma mark - override methods
- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _name = attributes[@"id"] ? : @"";
        _fx = attributes[@"fx"] ? : @"0";
        _fy = attributes[@"fy"] ? : @"0";
        _rx = attributes[@"r"] ? : @"0";
        _ry = attributes[@"r"] ? : @"0";
        _cx = attributes[@"cx"] ? : @"0";
        _cy = attributes[@"cy"] ? : @"0";
    }
    
    return self;
}

- (WXSVGRadialGradient *)node
{
    if (!_radialView) {
         _radialView = [WXSVGRadialGradient new];
        _radialView.name = _name;
        _radialView.fx = [self formatterPoint:_fx];
        _radialView.fy = [self formatterPoint:_fy];
        _radialView.rx = [self formatterPoint:_rx];
        _radialView.ry = [self formatterPoint:_ry];
        _radialView.cx = [self formatterPoint:_cx];
        _radialView.cy = [self formatterPoint:_cy];
        [self syncViewAttributes:_radialView];
    }
    return _radialView;
}
    
- (void)updateAttributes:(NSDictionary *)attributes
{
    if (_name = attributes[@"id"]) {
        _name = attributes[@"id"];
        _radialView.name = _name;
    }
    if (attributes[@"fx"]) {
        _fx = attributes[@"fx"];
        _radialView.fx = [self formatterPoint:_fx];
    }
    if (attributes[@"fy"]) {
        _fy = attributes[@"fy"];
        _radialView.fy = [self formatterPoint:_fy];
    }
    if (attributes[@"rx"]) {
        _rx = attributes[@"rx"];
        _radialView.rx = [self formatterPoint:_rx];
    }
    if (attributes[@"ry"]) {
        _ry = attributes[@"fy"];
        _radialView.ry = [self formatterPoint:_ry];
    }
    if (attributes[@"cx"]) {
        _cx = attributes[@"cx"];
        _radialView.cx = [self formatterPoint:_cx];
    }
    if (attributes[@"cy"]) {
        _cy = attributes[@"cy"];
        _radialView.cy = [self formatterPoint:_cy];
    }
    [super updateAttributes:attributes];
}

@end
