//
//  WXSVGPathComponent.m
//  Pods
//
//  Created by yangshengtao on 17/2/22.
//
//

#import "WXSVGPathComponent.h"
#import "WXSVGPath.h"
#import "WXConvert+WXSVG.h"

@implementation WXSVGPathComponent
{
    NSString *_d;
}

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
        _d = attributes[@"d"];
    }
    
    return self;
}

- (WXSVGPath *)node
{
    WXSVGPath *pathView = [WXSVGPath new];
    pathView.d = [WXConvert CGPath:_d withScale:self.weexInstance.pixelScaleFactor];
    if (!self.attributes[@"fill"]) {
        pathView.fill = [WXConvert WXSVGCGColor:@"#000000"];
    }
    [self syncViewAttributes:pathView];
    return pathView;
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    WXSVGPath *pathView = (WXSVGPath *)self.view;
    if (attributes[@"d"]) {
        pathView.d = [WXConvert CGPath:_d withScale:self.weexInstance.pixelScaleFactor];
    }
    [super updateAttributes:attributes];
}

@end
