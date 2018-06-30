//
//  WXSVGLinearGradientComponent.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/22.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGLinearGradientComponent.h"
#import "WXSVGLinearGradient.h"
#import <WeexSDK/WeexSDK.h>

@implementation WXSVGLinearGradientComponent
{
    NSString *_name;
    NSString *_x1;
    NSString *_y1;
    NSString *_x2;
    NSString *_y2;
    
    WXSVGLinearGradient *_linearView;
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
        _x1 = attributes[@"x1"] ? : @"0";
        _x2 = attributes[@"x2"] ? : @"0";
        _y1 = attributes[@"y1"] ? : @"0";
        _y2 = attributes[@"y2"] ? : @"0";
    }
    return self;
}

- (WXSVGNode *)node
{
    if (!_linearView) {
        _linearView = [WXSVGLinearGradient new];
        _linearView.name = _name;
        _linearView.x1 = [self formatterPoint:_x1];
        _linearView.x2 = [self formatterPoint:_x2];
        _linearView.y1 = [self formatterPoint:_y1];
        _linearView.y2 = [self formatterPoint:_y2];
        [self syncViewAttributes:_linearView];
    }
    return _linearView;
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"id"]) {
        _name = attributes[@"id"];
        _linearView.name = _name;
    }
    if (attributes[@"x1"]) {
        _x1 = attributes[@"x1"];
        _linearView.x1 = [self formatterPoint:_x1];
    }
    if (attributes[@"x2"]) {
        _x2 = attributes[@"x2"];
        _linearView.x2 = [self formatterPoint:_x2];
    }
    if (attributes[@"y1"]) {
        _y1 = attributes[@"y1"];
        _linearView.y1 = [self formatterPoint:_y1];
    }
    if (attributes[@"y2"]) {
        _y2 = attributes[@"y2"];
        _linearView.y2 = [self formatterPoint:_y2];
    }
    
    [super updateAttributes:attributes];
}
@end
