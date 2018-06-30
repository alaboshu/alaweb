//
//  WXMapPolygon.m
//  Pods
//
//  Created by yangshengtao on 17/3/3.
//
//

#import "WXMapPolygonComponent.h"
#import "NSDictionary+WXMap.h"

@implementation WXMapPolygonComponent

@synthesize fillColor = _fillColor;
@synthesize fillOpacity = _fillOpacity;

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _fillColor = [attributes wxmap_safeObjectForKey:@"fillColor"];
        _fillOpacity = [attributes wxmap_safeObjectForKey:@"fillOpacity"];
    }
    return self;
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if ([attributes wxmap_safeObjectForKey:@"fillColor"]) {
        _fillColor = [attributes wxmap_safeObjectForKey:@"fillColor"];
    }else if ([attributes wxmap_safeObjectForKey:@"fillOpacity"]) {
        _fillOpacity = [attributes wxmap_safeObjectForKey:@"fillOpacity"];
    }else {
        [super updateAttributes:attributes];
    }
}

@end
