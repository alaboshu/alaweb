//
//  WXSVGBaseBrush.h
//  Pods
//
//  Created by yangshengtao on 17/2/20.
//
//

#import <WeexSDK/WeexSDK.h>
#import "WXSVGBrush.h"

@interface WXSVGBaseBrush : WXSVGBrush

- (instancetype)initWithArray:(NSArray *)array;

- (void)paint:(CGContextRef)context opacity:(CGFloat)opacity brushConverter:(WXSVGBrushConverter *)brushConverter;

@end
