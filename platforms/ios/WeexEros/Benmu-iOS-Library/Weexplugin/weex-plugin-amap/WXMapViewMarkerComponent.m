//
//  WXMapViewMarkerComponent.m
//  Pods
//
//  Created by yangshengtao on 17/2/6.
//
//

#import "WXMapViewMarkerComponent.h"
#import "WXMapViewComponent.h"
#import "NSDictionary+WXMap.h"
#import "WXConvert+AMapKit.h"

@implementation WXMapViewMarkerComponent

@synthesize clickEvent = _clickEvent;
@synthesize icon = _icon;
@synthesize title = _title;
@synthesize location = _location;
@synthesize offset = _offset;
@synthesize hideCallout = _hideCallout;
@synthesize zIndex = _zIndex;
@synthesize subTitle = _subTitle;

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        if ([events containsObject:@"click"]) {
            _clickEvent = @"click";
        }
        NSArray *offset = attributes[@"offset"];
        if ([WXConvert isValidatedArray:offset]) {
            _offset = CGPointMake([WXConvert CGFloat:offset[0]],
                                  [WXConvert CGFloat:offset[1]]);//[WXConvert sizeToWXPixelType:attributes[@"offset"] withInstance:self.weexInstance];
        }
        if (styles[@"zIndex"]) {
            _zIndex = [styles[@"zIndex"] integerValue];
        }
        _hideCallout = [[attributes wxmap_safeObjectForKey:@"hideCallout"] boolValue];
        NSArray *position = [attributes wxmap_safeObjectForKey:@"position"];
        if ([WXConvert isValidatedArray:position]) {
            _location = [attributes wxmap_safeObjectForKey:@"position"];
        }
    
        _title = [attributes wxmap_safeObjectForKey:@"title"];
        _icon = [attributes wxmap_safeObjectForKey:@"icon"];
        _subTitle = [attributes wxmap_safeObjectForKey:@"subTitle"];
        
        
        if ([attributes wxmap_safeObjectForKey:@"pinWidth"]) {
            _pinWidth = [[attributes wxmap_safeObjectForKey:@"pinWidth"] floatValue];
        }
        
        if ([attributes wxmap_safeObjectForKey:@"pinHeight"]) {
            _pinHeight = [[attributes wxmap_safeObjectForKey:@"pinHeight"] floatValue];
        }
    }
    return self;
}
-(void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
 

}
- (void)updateAttributes:(NSDictionary *)attributes
{
    WXMapViewComponent *mapComponent = (WXMapViewComponent *)self.supercomponent;
    if (attributes[@"title"]) {
        _title = attributes[@"title"];
        [mapComponent updateTitleMarker:self];
    }
    
    if ([attributes wxmap_safeObjectForKey:@"icon"]) {
        _icon = attributes[@"icon"];
        [mapComponent updateIconMarker:self];
    }
    
    if (attributes[@"subTitle"]) {
        _subTitle = attributes[@"_subTitle"];
         [mapComponent updateSubTitleMarker:self];
    }
    
    if (attributes[@"pinWidth"] || attributes[@"pinHeight"]) {
        
        if ([attributes wxmap_safeObjectForKey:@"pinWidth"]) {
            _pinWidth = [[attributes wxmap_safeObjectForKey:@"pinWidth"] floatValue];
        }
        
        if ([attributes wxmap_safeObjectForKey:@"pinHeight"]) {
            _pinHeight = [[attributes wxmap_safeObjectForKey:@"pinHeight"] floatValue];
        }

        [mapComponent updateIconMarker:self];
    }
    
    NSArray *position = [attributes wxmap_safeObjectForKey:@"position"];
    if ([WXConvert isValidatedArray:position]) {
        _location = position;
        [mapComponent updateLocationMarker:self];
        
    }
}

- (void)removeFromSuperview;
{
    [super removeFromSuperview];
    [super removeFromSuperview];
    WXMapViewComponent *parentComponent = (WXMapViewComponent *)self.supercomponent;
    [parentComponent removeMarker:self];
}

- (void)dealloc
{
    
}

@end
