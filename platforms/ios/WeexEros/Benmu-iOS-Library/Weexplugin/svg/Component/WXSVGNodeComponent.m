//
//  WXSVGNodeComponent.m
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import "WXSVGNodeComponent.h"
#import "WXSVGPercentageConverter.h"

@implementation WXSVGNodeComponent

@synthesize name = _name;
@synthesize opacity = _opacity;
@synthesize matrix = _matrix;
@synthesize clipPath = _clipPath;
@synthesize responsible = _responsible;
@synthesize attributes = _attributes;

#pragma mark -
#pragma mark - override methods
- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        if (!_attributes) {
            _attributes = [NSDictionary dictionaryWithDictionary:attributes];
        }
    }
    
    return self;
}

- (UIView *) loadView
{
    return [self node];
}


/*
- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    [super insertSubview:subcomponent atIndex:index];
}

- (void)layoutDidFinish
{
    
}

- (void)viewWillUnload
{
    
}

- (void)dealloc
{
    
}


- (void)addEvent:(NSString *)eventName
{
    
}

- (void)removeEvent:(NSString *)eventName
{
    
}
 */
- (void)willRemoveSubview:(WXComponent *)component
{
    [super willRemoveSubview:component];
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    [super updateAttributes:attributes];
}


#pragma mark -
#pragma mark - public methods
- (WXSVGNode *)node
{
    WXSVGNode *svgView = [WXSVGNode new];
    [self syncViewAttributes:svgView];
    return svgView;
}

- (void)syncViewAttributes:(WXSVGNode *)view
{
    view.matrix = CGAffineTransformMake(1, 0, 0, 1, 0, 0);
}

- (NSString *)formatterPoint:(NSString *)point
{
    NSString *formatterStr = nil;
    if (!point) {
        return @"";
    }
    WXSVGPercentageConverter* convert = [[WXSVGPercentageConverter alloc] init];
    if ([convert isPercentage:point] != NO) {
        formatterStr = point;
    }else {
        CGFloat x1 = [WXConvert WXPixelType:point scaleFactor:self.weexInstance.pixelScaleFactor];
        formatterStr = [NSString stringWithFormat:@"%f",x1];
    }
    return formatterStr ? : @"";
}

@end
