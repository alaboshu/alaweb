//
//  WXSVGStopComponent.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/24.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGStopComponent.h"
#import "WXSVGStop.h"


@implementation WXSVGStopComponent

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _stopColor = attributes[@"stopColor"] ? : @"";
//        _offet = attributes[@"offset"];
//        _stopOpacity = [attributes[@"stopOpacity"] floatValue];
    }
    
    return self;
}

- (WXSVGNode *)node
{
    return [WXSVGStop new];
}

- (void)viewDidLoad
{
    if (!_stopColor || [_stopColor isEqualToString:@""]) {
        return;
    }
    WXSVGNodeComponent *component = (WXSVGNodeComponent *)self.supercomponent;
    WXSVGNode *gradientNode = (WXSVGNode *)[component node];
    [gradientNode addGradientStopColor:_stopColor];
}

@end
