//
//  WeexMarketPlugins.m
//  Pods
//
//  Created by 窦静轩 on 2017/5/9.
//
//

#import "WeexMarketPlugins.h"
#import <WeexSDK/WXSDKEngine.h>

@implementation WeexMarketPlugins


+(void)registerWeexMarketPlugins
{
    [[self class] registerAMap];
}
+(void)registerSvg
{
    [WXSDKEngine registerComponent:@"svg" withClass:NSClassFromString(@"WXSVGComponent")];
    [WXSDKEngine registerComponent:@"path" withClass:NSClassFromString(@"WXSVGPathComponent")];
    [WXSDKEngine registerComponent:@"line" withClass:NSClassFromString(@"WXSVGLineComponent")];
    [WXSDKEngine registerComponent:@"rect" withClass:NSClassFromString(@"WXSVGRectComponent")];
    [WXSDKEngine registerComponent:@"ellipse" withClass:NSClassFromString(@"WXSVGEllipseComponent")];
    [WXSDKEngine registerComponent:@"polygon" withClass:NSClassFromString(@"WXSVGPolygonComponent")];
    [WXSDKEngine registerComponent:@"polyline" withClass:NSClassFromString(@"WXSVGPolylineComponent")];
    [WXSDKEngine registerComponent:@"stop" withClass:NSClassFromString(@"WXSVGStopComponent")];
    [WXSDKEngine registerComponent:@"defs" withClass:NSClassFromString(@"WXSVGDefsComponent")];
    [WXSDKEngine registerComponent:@"linearGradient" withClass:NSClassFromString(@"WXSVGLinearGradientComponent")];
    [WXSDKEngine registerComponent:@"radialGradient" withClass:NSClassFromString(@"WXSVGRadialGradientComponent")];
    [WXSDKEngine registerComponent:@"circle" withClass:NSClassFromString(@"WXSVGCircleComponent")];
}

+(void)registerAMap
{
    [WXSDKEngine registerComponent:@"weex-amap" withClass:NSClassFromString(@"WXMapViewComponent")];
    [WXSDKEngine registerComponent:@"weex-amap-marker" withClass:NSClassFromString(@"WXMapViewMarkerComponent")];
    [WXSDKEngine registerComponent:@"weex-amap-polyline" withClass:NSClassFromString(@"WXMapPolylineComponent")];
    [WXSDKEngine registerComponent:@"weex-amap-polygon" withClass:NSClassFromString(@"WXMapPolygonComponent")];
    [WXSDKEngine registerComponent:@"weex-amap-circle" withClass:NSClassFromString(@"WXMapCircleComponent")];
    [WXSDKEngine registerComponent:@"weex-amap-info-window" withClass:NSClassFromString(@"WXMapInfoWindowComponent")];
    
    [WXSDKEngine registerModule:@"amap" withClass:NSClassFromString(@"WXMapViewModule")];
}


@end
