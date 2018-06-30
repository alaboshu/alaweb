//
//  WXSvgView.m
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import "WXSVGSvgView.h"
#import "WXSVGNode.h"

@implementation WXSVGSvgView
{
    NSMutableDictionary<NSString *, WXSVGNode *> *clipPaths;
    NSMutableDictionary<NSString *, WXSVGNode *> *templates;
    NSMutableDictionary<NSString *, WXSVGBrushConverter *> *brushConverters;
    CGRect _boundingBox;
}

#pragma mark -
#pragma mark - public methods
- (void)invalidate
{
    [self setNeedsDisplay];
}

- (void)render
{
    [self setNeedsDisplay];
}

- (void)reactSetInheritedBackgroundColor:(UIColor *)inheritedBackgroundColor
{
    self.backgroundColor = inheritedBackgroundColor;
}

- (void)defineClipPath:(__kindof WXSVGNode *)clipPath clipPathRef:(NSString *)clipPathRef
{
    if (!clipPaths) {
        clipPaths = [[NSMutableDictionary alloc] init];
    }
    [clipPaths setObject:clipPath forKey:clipPathRef];
}

- (WXSVGNode *)getDefinedClipPath:(NSString *)clipPathRef
{
    return clipPaths ? [clipPaths objectForKey:clipPathRef] : nil;
}

- (void)defineTemplate:(WXSVGNode *)template templateRef:(NSString *)templateRef
{
    if (!templates) {
        templates = [[NSMutableDictionary alloc] init];
    }
    [templates setObject:template forKey:templateRef];
}

- (WXSVGNode *)getDefinedTemplate:(NSString *)tempalteRef
{
    return templates ? [templates objectForKey:tempalteRef] : nil;
}


- (void)defineBrushConverter:(WXSVGBrushConverter *)brushConverter brushConverterRef:(NSString *)brushConverterRef
{
    if (!brushConverterRef) {
        return;
    }
    if (!brushConverters) {
        brushConverters = [[NSMutableDictionary alloc] init];
    }
    [brushConverters setObject:brushConverter forKey:brushConverterRef];
}

- (WXSVGBrushConverter *)getDefinedBrushConverter:(NSString *)brushConverterRef
{
    return brushConverters ? [brushConverters objectForKey:brushConverterRef] : nil;
}

#pragma mark -
#pragma mark - private methods
- (void)drawRect:(CGRect)rect
{
    clipPaths = nil;
    templates = nil;
    brushConverters = nil;
    _boundingBox = rect;
    CGContextRef context = UIGraphicsGetCurrentContext();
    
    for (WXSVGNode *node in self.subviews) {
        if ([node isKindOfClass:[WXSVGNode class]]) {
            if (node.responsible && !self.responsible) {
                self.responsible = YES;
                break;
            }
        }
    }
    
    for (WXSVGNode *node in self.subviews) {
        if ([node isKindOfClass:[WXSVGNode class]]) {
            [node saveDefinition];
            [node renderTo:context];
        }
    }
}

@end
