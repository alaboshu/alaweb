//
//  WXSVGRenderable.m
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import "WXSVGRenderable.h"
#import "WXSVGPercentageConverter.h"

@implementation WXSVGRenderable
{
    NSMutableDictionary *_originProperties;
    NSArray *_lastMergedList;
    WXSVGPercentageConverter *_widthConverter;
    WXSVGPercentageConverter *_heightConverter;
    CGFloat _contextWidth;
    CGFloat _contextHeight;
    CGRect _boundingBox;
}

- (id)init
{
    if (self = [super init]) {
        _fillOpacity = 1;
        _strokeOpacity = 1;
        _strokeWidth = 0;
    }
    return self;
}

- (void)dealloc
{
    if (_hitArea) {
        CGPathRelease(_hitArea);
    }
    if (_strokeDasharray.array) {
        free(_strokeDasharray.array);
    }
}

#pragma mark -
#pragma mark - override methods
- (void)renderTo:(CGContextRef)context
{
    // This needs to be painted on a layer before being composited.
    CGContextSaveGState(context);
    CGContextConcatCTM(context, self.matrix);
    CGContextSetAlpha(context, self.opacity);
    
    [self beginTransparencyLayer:context];
    [self renderLayerTo:context];
//    [self drawLine:context];
    [self endTransparencyLayer:context];
    
    CGContextRestoreGState(context);
}

- (void)renderLayerTo:(CGContextRef)context
{
    // todo: add detection if path has changed since last update.
    CGPathRef path = [self getPath:context];
    if ((!self.fill && !self.stroke) || !path) {
        return;
    }
    
    if ([self getSvgView].responsible) {
        // Add path to hitArea
        CGMutablePathRef hitArea = CGPathCreateMutableCopy(path);
        if (self.stroke && self.strokeWidth) {
            // Add stroke to hitArea
            CGPathRef strokePath = CGPathCreateCopyByStrokingPath(hitArea, nil, self.strokeWidth, self.strokeLinecap, self.strokeLinejoin, self.strokeMiterlimit);
            CGPathAddPath(hitArea, nil, strokePath);
            CGPathRelease(strokePath);
        }
        
        self.hitArea = CFAutorelease(CGPathCreateCopy(hitArea));
        CGPathRelease(hitArea);
    }
    
    if (self.opacity == 0) {
        return;
    }
    
    CGPathDrawingMode mode = kCGPathStroke;
    BOOL fillColor = YES;
    
    if (self.fill) {
        mode = self.fillRule == kWXSVGCGFCRuleEvenodd ? kCGPathEOFill : kCGPathFill;
        fillColor = [self.fill applyFillColor:context opacity:self.fillOpacity];
        
        if (!fillColor) {
            [self clip:context];
            
            CGContextSaveGState(context);
            CGContextAddPath(context, path);
            CGContextClip(context);
            WXSVGBrushConverter *brushConverter = [[self getSvgView] getDefinedBrushConverter:[self.fill brushRef]];
            [self.fill paint:context opacity:self.fillOpacity brushConverter:brushConverter];
            CGContextRestoreGState(context);
            if (!self.stroke) {
                return;
            }
        }
    }
    
    if (self.stroke && self.strokeWidth) {
        CGContextSetLineWidth(context, self.strokeWidth);
        CGContextSetLineCap(context, self.strokeLinecap);
        CGContextSetLineJoin(context, self.strokeLinejoin);
        WXSVGCGFloatArray dash = self.strokeDasharray;
        
        if (dash.count) {
            CGContextSetLineDash(context, self.strokeDashoffset, dash.array, dash.count);
        }
        
        if (!fillColor) {
            CGContextAddPath(context, path);
            CGContextReplacePathWithStrokedPath(context);
            CGContextClip(context);
        }
        
        if ([self.stroke applyStrokeColor:context opacity:self.strokeOpacity]) {
            if (mode == kCGPathFill) {
                mode = kCGPathFillStroke;
            } else if (mode == kCGPathEOFill) {
                mode = kCGPathEOFillStroke;
            }
        } else {
            // draw fill
            [self clip:context];
            CGContextAddPath(context, path);
            CGContextDrawPath(context, mode);
            
            // draw stroke
            CGContextAddPath(context, path);
            CGContextReplacePathWithStrokedPath(context);
            CGContextClip(context);
            WXSVGBrushConverter *brushConverter = [[self getSvgView] getDefinedBrushConverter:[self.stroke brushRef]];
            [self.stroke paint:context opacity:self.strokeOpacity brushConverter:brushConverter];
            return;
        }
    }
    
    [self clip:context];
    CGContextAddPath(context, path);
    CGContextDrawPath(context, mode);
}

#pragma mark -
#pragma mark - setPros
- (void)setFill:(WXSVGBrush *)fill
{
    if (fill == _fill) {
        return;
    }
    [self invalidate];
    _fill = fill;
}

- (void)setFillOpacity:(CGFloat)fillOpacity
{
    if (fillOpacity == _fillOpacity) {
        return;
    }
    [self invalidate];
    _fillOpacity = fillOpacity;
}

- (void)setFillRule:(WXSVGCGFCRule)fillRule
{
    if (fillRule == _fillRule) {
        return;
    }
    [self invalidate];
    _fillRule = fillRule;
}

- (void)setStroke:(WXSVGBrush *)stroke
{
    if (stroke == _stroke) {
        return;
    }
    [self invalidate];
    _stroke = stroke;
}

- (void)setStrokeOpacity:(CGFloat)strokeOpacity
{
    if (strokeOpacity == _strokeOpacity) {
        return;
    }
    [self invalidate];
    _strokeOpacity = strokeOpacity;
}

- (void)setStrokeWidth:(CGFloat)strokeWidth
{
    if (strokeWidth == _strokeWidth) {
        return;
    }
    [self invalidate];
    _strokeWidth = strokeWidth;
}

- (void)setStrokeLinecap:(CGLineCap)strokeLinecap
{
    if (strokeLinecap == _strokeLinecap) {
        return;
    }
    [self invalidate];
    _strokeLinecap = strokeLinecap;
}

- (void)setStrokeJoin:(CGLineJoin)strokeLinejoin
{
    if (strokeLinejoin == _strokeLinejoin) {
        return;
    }
    [self invalidate];
    _strokeLinejoin = strokeLinejoin;
}

- (void)setStrokeMiterlimit:(CGFloat)strokeMiterlimit
{
    if (strokeMiterlimit == _strokeMiterlimit) {
        return;
    }
    [self invalidate];
    _strokeMiterlimit = strokeMiterlimit;
}

- (void)setStrokeDasharray:(WXSVGCGFloatArray)strokeDasharray
{
    if (strokeDasharray.array == _strokeDasharray.array) {
        return;
    }
    if (_strokeDasharray.array) {
        free(_strokeDasharray.array);
    }
    [self invalidate];
    _strokeDasharray = strokeDasharray;
}

- (void)setStrokeDashoffset:(CGFloat)strokeDashoffset
{
    if (strokeDashoffset == _strokeDashoffset) {
        return;
    }
    [self invalidate];
    _strokeDashoffset = strokeDashoffset;
}

- (void)setHitArea:(CGPathRef)hitArea
{
    if (hitArea == _hitArea) {
        return;
    }
    
    [self invalidate];
    CGPathRelease(_hitArea);
    _hitArea = CGPathRetain(hitArea);
}

- (void)setPropList:(NSArray<NSString *> *)propList
{
    if (propList == _propList) {
        return;
    }
    _attributeList = [propList copy];
    _propList = propList;
    [self invalidate];
}

- (void)setBoundingBox:(CGRect)boundingBox
{
    _boundingBox = boundingBox;
    _widthConverter = [[WXSVGPercentageConverter alloc] initWithRelativeAndOffset:boundingBox.size.width offset:0];
    _heightConverter = [[WXSVGPercentageConverter alloc] initWithRelativeAndOffset:boundingBox.size.height offset:0];
}


- (CGFloat)getWidthRelatedValue:(NSString *)string
{
    if (string) {
        return [_widthConverter stringToFloat:string];
    }
    return 0;
}

- (CGFloat)getHeightRelatedValue:(NSString *)string
{
    if (string) {
        return [_heightConverter stringToFloat:string];
    }
    return 0;
}

- (CGFloat)getContextWidth
{
    return CGRectGetWidth(_boundingBox);
}

- (CGFloat)getContextHeight
{
    return CGRectGetHeight(_boundingBox);
}

- (CGFloat)getContextX
{
    return CGRectGetMinX(_boundingBox);
}

- (CGFloat)getContextY
{
    return CGRectGetMinY(_boundingBox);
}

- (void)mergeProperties:(__kindof WXSVGNode *)target mergeList:(NSArray<NSString *> *)mergeList
{
    
    [self mergeProperties:target mergeList:mergeList inherited:NO];
}

- (void)mergeProperties:(__kindof WXSVGNode *)target mergeList:(NSArray<NSString *> *)mergeList inherited:(BOOL)inherited
{
    _lastMergedList = mergeList;
    
    if (mergeList.count == 0) {
        return;
    }
    
    NSMutableArray* attributeList = [self.propList mutableCopy];
    
    _originProperties = [[NSMutableDictionary alloc] init];
    
    for (NSString *key in mergeList) {
        if (inherited) {
            if (![attributeList containsObject:key]) {
                [attributeList addObject:key];
                [_originProperties setValue:[self valueForKey:key] forKey:key];
                [self setValue:[target valueForKey:key] forKey:key];
            }
        } else {
            [_originProperties setValue:[self valueForKey:key] forKey:key];
            [self setValue:[target valueForKey:key] forKey:key];
        }
    }
    
    _attributeList = [attributeList copy];
}

- (void)resetProperties
{
    for (NSString *key in _lastMergedList) {
        [self setValue:[_originProperties valueForKey:key] forKey:key];
    }
    _attributeList = [_propList copy];
}

#pragma mark 绘制直线
- (void)drawLine:(CGContextRef)context
{
    //提示 使用ref的对象不用使用*
    //1.获取上下文.-UIView对应的上下文
    //    CGContextRef context = UIGraphicsGetCurrentContext();
    //2.创建可变路径并设置路径
    //当我们开发动画的时候，通常制定对象运动的路线，然后由动画负责动画效果
    CGMutablePathRef path = CGPathCreateMutable();
    //2-1.设置起始点
    CGPathMoveToPoint(path, NULL, 0, 0);
    //2-2.设置目标点
    CGPathAddLineToPoint(path, NULL, 200, 200);
    
    CGPathAddLineToPoint(path, NULL, 50, 200);
    //封闭路径
    //第一种方法
    //CGPathAddLineToPoint(path, NULL, 50, 50);
    //第二张方法
    CGPathCloseSubpath(path);
    //3.将路径添加到上下文
    CGContextAddPath(context, path);
    //4.设置上下文属性
    //4.1.设置线条颜色
    /*
     red 0～1.0  red / 255
     green 0～1.0  green / 255
     blue 0～1.0  blue / 255
     plpha   透明度  0 ～ 1.0
     0 完全透明
     1.0 完全不透明
     提示：在使用rgb设置颜色时。最好不要同时指定rgb和alpha,否则会对性能造成影响。
     
     线条和填充默认都是黑色
     */
    CGContextSetRGBStrokeColor(context, 1.0, 0, 0, 1.0);
    //设置填充颜色
    CGContextSetRGBFillColor(context, 0, 1.0, 0, 1.0);
    //4.2 设置线条宽度
    CGContextSetLineWidth(context, 3.0f);
    //设置线条顶点样式
    CGContextSetLineCap(context, kCGLineCapRound);
    //设置连接点的样式
    CGContextSetLineJoin(context, kCGLineJoinRound);
    //设置线条的虚线样式
    /*
     虚线的参数：
     phase：相位，虚线的起始位置＝通常使用 0 即可，从头开始画虚线
     lengths:长度的数组
     count ： lengths 数组的个数
     */
    CGFloat lengths[2] = {20.0,10.0};
    CGContextSetLineDash(context, 0, lengths, 3);
    //5.绘制路径
    /*
     kCGPathStroke:划线（空心）
     kCGPathFill: 填充（实心）
     kCGPathFillStroke：即划线又填充
     */
    CGContextDrawPath(context, kCGPathFillStroke);
    //6.释放路径
    CGPathRelease(path);
}

@end
