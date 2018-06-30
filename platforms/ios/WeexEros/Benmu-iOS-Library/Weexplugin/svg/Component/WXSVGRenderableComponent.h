//
//  WXSVGRenderableComponent.h
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import <WeexSDK/WeexSDK.h>
#import "WXSVGNodeComponent.h"
#import "WXSVGRenderable.h"

@interface WXSVGRenderableComponent : WXSVGNodeComponent

- (WXSVGRenderable *)node;

@property (nonatomic, strong) WXSVGBrush *fill;
@property (nonatomic, assign) CGFloat fillOpacity;
@property (nonatomic, assign) WXSVGCGFCRule fillRule;
@property (nonatomic, strong) WXSVGBrush *stroke;
@property (nonatomic, assign) CGFloat strokeOpacity;
@property (nonatomic, assign) CGFloat strokeWidth;
@property (nonatomic, assign) CGLineCap strokeLinecap;
@property (nonatomic, assign) CGLineJoin strokeLinejoin;
@property (nonatomic, assign) WXSVGCGFloatArray strokeDasharray;
@property (nonatomic, assign) CGFloat strokeDashoffset;
@property (nonatomic, assign) CGFloat strokeMiterlimit;
@property (nonatomic, strong) NSArray<NSString *> *propList;


@end
