//
//  WXSVGDefs.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/24.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGDefsComponent.h"
#import "WXSVGDefs.h"

@implementation WXSVGDefsComponent

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {}
    
    return self;
}

- (WXSVGNode *)node
{
    return [WXSVGDefs new];
}

- (UIView *)loadView
{
    return [self node];
}


@end
