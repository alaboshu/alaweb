//
//  WXSVGNode.h
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import <UIKit/UIKit.h>
#import "WXSVGSvgView.h"
#import "WXSVGNode.h"

typedef CF_ENUM(int32_t, WXSVGCGFCRule) {
    kWXSVGCGFCRuleEvenodd,
    kWXSVGCGFCRuleNonzero
};

typedef struct {
    size_t count;
    CGFloat *array;
} WXSVGCGFloatArray;

@interface WXSVGNode : UIView

@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) CGFloat opacity;
@property (nonatomic, assign) WXSVGCGFCRule clipRule;
@property (nonatomic, strong) NSString *clipPath;
@property (nonatomic, assign) BOOL responsible;
@property (nonatomic, assign) CGAffineTransform matrix;
@property (nonatomic, assign) BOOL active;

@property (nonatomic, strong) NSMutableArray *gradient;
@property (nonatomic, copy) NSString *offet;
@property (nonatomic, assign) CGFloat stopOpacity;

- (void)invalidate;

- (void)renderTo:(CGContextRef)context;

/**
 * renderTo will take opacity into account and draw renderLayerTo off-screen if there is opacity
 * specified, then composite that onto the context. renderLayerTo always draws at opacity=1.
 * @abstract
 */
- (void)renderLayerTo:(CGContextRef)context;

- (CGPathRef)getClipPath;

- (CGPathRef)getClipPath:(CGContextRef)context;

/**
 * clip node by clipPath or clipPathRef.
 */
- (void)clip:(CGContextRef)context;

/**
 * getPath will return the path inside node as a ClipPath.
 */
- (CGPathRef)getPath:(CGContextRef) context;


/**
 * run hitTest
 */
- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event withTransform:(CGAffineTransform)transfrom;

- (WXSVGSvgView *)getSvgView;

/**
 * save element`s defination into svg element.
 */
- (void)saveDefinition;

- (void)addGradientStopColor:(NSString *)stopColor;

/**
 * just for template node to merge target node`s properties into owned properties
 */
- (void)mergeProperties:(__kindof WXSVGNode *)target mergeList:(NSArray<NSString *> *)mergeList;

- (void)mergeProperties:(__kindof WXSVGNode *)target mergeList:(NSArray<NSString *> *)mergeList inherited:(BOOL)inherited;

/**
 * just for template node to reset all owned properties once after rendered.
 */
- (void)resetProperties;

- (void)beginTransparencyLayer:(CGContextRef)context;

- (void)endTransparencyLayer:(CGContextRef)context;

- (void)traverseSubviews:(BOOL (^)(WXSVGNode *node))block;

@end
