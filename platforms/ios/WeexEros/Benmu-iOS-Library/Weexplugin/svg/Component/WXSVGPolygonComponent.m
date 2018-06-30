//
//  WXSVGPolygonComponent.m
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/24.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGPolygonComponent.h"
#import "WXSVGPolygon.h"

@implementation WXSVGPolygonComponent

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
        
    }
    
    return self;
}

#pragma mark -
#pragma mark -
- (WXSVGRenderable *)node
{
    WXSVGPolygon *polygonView = [WXSVGPolygon new];
    [self formatterPointStr:self.attributes[@"points"]];
    polygonView.points = self.points;
    [self syncViewAttributes:polygonView];
    return polygonView;
}

- (void)formatterPointStr:(NSString *)pointStr
{
    if (!pointStr) {
        self.points = [NSArray array];
        return;
    }
    NSArray *tmpArr = [pointStr componentsSeparatedByString:@" "];
    NSMutableArray *polygonArr = [NSMutableArray arrayWithArray:tmpArr];
    if (![tmpArr.lastObject isEqualToString:tmpArr.firstObject]) {
        [polygonArr addObject:tmpArr.firstObject];
    }
    NSUInteger count = polygonArr.count;
    NSMutableArray *points = [[NSMutableArray alloc] initWithCapacity:count];
    for (int idx = 0; idx < count; idx++) {
        NSArray *pointArr = [polygonArr[idx] componentsSeparatedByString:@","];
        CGPoint point = [WXConvert CGPoint:pointArr withScale:self.weexInstance.pixelScaleFactor];
        [points addObject:@[@(point.x),@(point.y)]];
    }
    self.points = [NSArray arrayWithArray:points];
}
    
- (void)updateAttributes:(NSDictionary *)attributes
{
    [self formatterPointStr:attributes[@"points"]];
    if (attributes[@"points"]) {
        WXSVGPolygon *polygonView = (WXSVGPolygon *)self.view;
        polygonView.points = self.points;
    }
    [super updateAttributes:attributes];
}
@end
