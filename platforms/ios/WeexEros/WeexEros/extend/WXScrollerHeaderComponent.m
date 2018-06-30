//
//  WXScrollerHeaderComponent.m
//  WeexEros
//
//  Created by lfg on 2018/2/27.
//  Copyright © 2018年 lfg. All rights reserved.
//
#import "WXScrollerHeaderComponent.h"
#import "WXComponent_internal.h"

@interface WXScrollerHeaderComponent ()
@end

@implementation WXScrollerHeaderComponent
- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    _positionType = WXPositionTypeSticky;
    return self;
}
@end
