//
//  WXConvert+AMapKit.m
//  Pods
//
//  Created by yangshengtao on 17/3/3.
//
//

#import "WXConvert+AMapKit.h"
#import "NSArray+WXMap.h"

@implementation WXConvert (AMapKit)


#define WX_JSON_CONVERTER(type)           \
+ (type *)type:(id)json { return json; }

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"
WX_JSON_CONVERTER(NSArray)
WX_JSON_CONVERTER(NSDictionary)
#pragma clang diagnostic pop


+ (CLLocationCoordinate2D)CLLocationCoordinate2D:(id)json
{
    json = [self NSArray:json];
    return (CLLocationCoordinate2D){
        [[json wxmap_safeObjectForKey:1] doubleValue],
        [[json wxmap_safeObjectForKey:0] doubleValue]
    };
}

+ (BOOL)isLineDash:(id)json
{
    json = [self NSString:json];
    if ([json isEqualToString:@"dashed"]) {
        return YES;
    }
    return NO;
}

+ (CGSize)offsetToContainRect:(CGRect)innerRect inRect:(CGRect)outerRect
{
    CGFloat nudgeRight = fmaxf(0, CGRectGetMinX(outerRect) - (CGRectGetMinX(innerRect)));
    CGFloat nudgeLeft = fminf(0, CGRectGetMaxX(outerRect) - (CGRectGetMaxX(innerRect)));
    CGFloat nudgeTop = fmaxf(0, CGRectGetMinY(outerRect) - (CGRectGetMinY(innerRect)));
    CGFloat nudgeBottom = fminf(0, CGRectGetMaxY(outerRect) - (CGRectGetMaxY(innerRect)));
    return CGSizeMake(nudgeLeft ?: nudgeRight, nudgeTop ?: nudgeBottom);
}

+ (CGPoint)sizeToWXPixelType:(id)json withInstance:(WXSDKInstance *)instance
{
    json = [self NSArray:json];
    return CGPointMake([WXConvert WXPixelType:[json wxmap_safeObjectForKey:0] scaleFactor:instance.pixelScaleFactor],
                      [WXConvert WXPixelType:[json wxmap_safeObjectForKey:1] scaleFactor:instance.pixelScaleFactor]);
}

+ (BOOL)isValidatedArray:(id)json
{
    NSArray *convertedjson = [self NSArray:json];
    if (convertedjson && convertedjson.count > 1) {
        return YES;
    }
    return NO;
}

@end
