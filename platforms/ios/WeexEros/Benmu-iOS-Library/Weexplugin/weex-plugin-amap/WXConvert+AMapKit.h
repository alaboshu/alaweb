//
//  WXConvert+AMapKit.h
//  Pods
//
//  Created by yangshengtao on 17/3/3.
//
//

#import <WeexSDK/WeexSDK.h>
#import <CoreLocation/CoreLocation.h>

@interface WXConvert (AMapKit)

+ (BOOL)isLineDash:(id)json;
+ (CLLocationCoordinate2D)CLLocationCoordinate2D:(id)json;
+ (CGPoint)sizeToWXPixelType:(id)json withInstance:(WXSDKInstance *)instance;
+ (CGSize)offsetToContainRect:(CGRect)innerRect inRect:(CGRect)outerRect;
+ (BOOL)isValidatedArray:(id)json;

@end
