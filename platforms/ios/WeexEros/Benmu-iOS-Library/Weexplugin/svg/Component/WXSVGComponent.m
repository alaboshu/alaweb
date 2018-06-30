//
//  WXSvgComponent.m
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import "WXSVGComponent.h"
#import "WXSVGSvgView.h"

@implementation WXSVGComponent

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
        
    }
    
    return self;
}

- (UIView *) loadView
{
    return [WXSVGSvgView new];
}


- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    [super insertSubview:subcomponent atIndex:index];
    [self invalidate];
}

- (void)willRemoveSubview:(WXComponent *)component
{
    [super willRemoveSubview:component];
    [self invalidate];
}

- (void)dealloc
{
    
}


#pragma mark -
#pragma mark - private methods
- (void)invalidate
{
    [(WXSVGSvgView *)self.view render];
}

@end
