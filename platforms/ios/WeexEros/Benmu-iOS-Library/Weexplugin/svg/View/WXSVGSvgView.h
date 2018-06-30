//
//  WXSvgView.h
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import <UIKit/UIKit.h>
#import "WXSVGBrushConverter.h"
#import "WXSVGContainer.h"

@class WXSVGNode;

@interface WXSVGSvgView : UIView <WXSVGContainer>

@property (nonatomic, assign) BOOL responsible;

/**
 * define <ClipPath></ClipPath> content as clipPath template.
 */
- (void)defineClipPath:(__kindof WXSVGNode *)clipPath clipPathRef:(NSString *)clipPathRef;
- (WXSVGNode *)getDefinedClipPath:(NSString *)clipPathRef;
- (void)defineTemplate:(__kindof WXSVGNode *)template templateRef:(NSString *)templateRef;
- (WXSVGNode *)getDefinedTemplate:(NSString *)tempalteRef;
- (void)defineBrushConverter:(WXSVGBrushConverter *)brushConverter brushConverterRef:(NSString *)brushConverterRef;
- (WXSVGBrushConverter *)getDefinedBrushConverter:(NSString *)brushConverterRef;
//- (NSString *)getDataURL;

- (void)render;

@end
