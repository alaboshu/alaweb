//
//  WXMapCircleComponent.m
//  Pods
//
//  Created by yangshengtao on 17/3/6.
//
//

#import "WXMapCircleComponent.h"
#import "WXMapViewComponent.h"
#import "NSDictionary+WXMap.h"
#import "WXConvert+AMapKit.h"

@implementation WXMapCircleComponent

@synthesize center = _center;
@synthesize radius = _radius;

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        NSArray *centerArray = [attributes wxmap_safeObjectForKey:@"center"];
        if ([WXConvert isValidatedArray:centerArray]) {
            _center = centerArray;
        }
        _radius = [[attributes wxmap_safeObjectForKey:@"radius"] doubleValue];
    }
    return self;
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    NSArray *centerArray = [attributes wxmap_safeObjectForKey:@"center"];
    WXMapViewComponent *parentComponent = (WXMapViewComponent *)self.supercomponent;
    if ([WXConvert isValidatedArray:centerArray]) {
        _center = centerArray;
        [parentComponent removeOverlay:self];
        [parentComponent addOverlay:self];
    }else if ([[attributes wxmap_safeObjectForKey:@"radius"] doubleValue] >= 0) {
        _radius = [[attributes wxmap_safeObjectForKey:@"radius"] doubleValue];
        [parentComponent removeOverlay:self];
        [parentComponent addOverlay:self];
    }else {
        [super updateAttributes:attributes];
    }
}

@end
