//
//  WXSVGRenderable.h
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import "WXSVGNode.h"
#import "WXSVGBrush.h"
#import <WeexSDK/WeexSDK.h>

@interface WXSVGRenderable : WXSVGNode

@property (nonatomic, strong) WXSVGBrush *fill;
@property (nonatomic, assign) CGFloat fillOpacity;
@property (nonatomic, assign) WXSVGCGFCRule fillRule;
@property (nonatomic, strong) WXSVGBrush *stroke;
@property (nonatomic, assign) CGFloat strokeOpacity;
@property (nonatomic, assign) CGFloat strokeWidth;
@property (nonatomic, assign) CGLineCap strokeLinecap;
@property (nonatomic, assign) CGLineJoin strokeLinejoin;
@property (nonatomic, assign) CGFloat strokeMiterlimit;
@property (nonatomic, assign) WXSVGCGFloatArray strokeDasharray;
@property (nonatomic, assign) CGFloat strokeDashoffset;
@property (nonatomic, assign) CGPathRef hitArea;
@property (nonatomic, copy) NSArray<NSString *> *propList;
@property (nonatomic, strong) NSArray<NSString *> *attributeList;

- (void)setBoundingBox:(CGRect)boundingBox;
- (CGFloat)getWidthRelatedValue:(NSString *)string;
- (CGFloat)getHeightRelatedValue:(NSString *)string;
- (CGFloat)getContextWidth;
- (CGFloat)getContextHeight;
- (CGFloat)getContextX;
- (CGFloat)getContextY;

@end
