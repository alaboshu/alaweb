//
//  WXSVGRectComponent.m
//  Pods
//
//  Created by yangshengtao on 17/2/21.
//
//

#import "WXSVGRectComponent.h"
#import "WXSVGRect.h"

@implementation WXSVGRectComponent
{
    NSString *_x;
    NSString *_y;
    NSString *_width;
    NSString *_height;
    NSString *_rx;
    NSString *_ry;
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
        _x = attributes[@"x"] ? : @"0";
        _y = attributes[@"y"] ? : @"0";
        _width = attributes[@"width"] ? : @"0";
        _height = attributes[@"height"] ? : @"0";
        _rx = attributes[@"rx"] ? : @"0";
        _ry = attributes[@"ry"] ? : @"0";
    }
    
    return self;
}

- (WXSVGRect *)node
{
    WXSVGRect *rectView = [WXSVGRect new];
    rectView.x = [WXConvert WXPixelType:_x scaleFactor:self.weexInstance.pixelScaleFactor];
    rectView.y = [WXConvert WXPixelType:_y scaleFactor:self.weexInstance.pixelScaleFactor];
    rectView.width = [WXConvert WXPixelType:_width scaleFactor:self.weexInstance.pixelScaleFactor];
    rectView.height = [WXConvert WXPixelType:_height scaleFactor:self.weexInstance.pixelScaleFactor];;
    rectView.rx = [WXConvert WXPixelType:_rx scaleFactor:self.weexInstance.pixelScaleFactor];
    rectView.ry = [WXConvert WXPixelType:_ry scaleFactor:self.weexInstance.pixelScaleFactor];
    [self syncViewAttributes:rectView];
    return rectView;
}
    
- (void)updateAttributes:(NSDictionary *)attributes
{
    WXSVGRect *rectView = (WXSVGRect *)self.view;
    if (attributes[@"x"]) {
        _x = attributes[@"x"];
        rectView.x = [WXConvert WXPixelType:_x scaleFactor:self.weexInstance.pixelScaleFactor];
    }
    if (attributes[@"y"]) {
        _y = attributes[@"y"];
        rectView.y = [WXConvert WXPixelType:_y scaleFactor:self.weexInstance.pixelScaleFactor];
    }
    if (attributes[@"width"]) {
        _width = attributes[@"width"];
        rectView.width = [WXConvert WXPixelType:_width scaleFactor:self.weexInstance.pixelScaleFactor];
    }
    if (attributes[@"height"]) {
        _height = attributes[@"height"];
        rectView.height = [WXConvert WXPixelType:_height scaleFactor:self.weexInstance.pixelScaleFactor];;
    }
    if (attributes[@"rx"]) {
        _rx = attributes[@"rx"];
        rectView.rx = [WXConvert WXPixelType:_rx scaleFactor:self.weexInstance.pixelScaleFactor];
    }
    if (attributes[@"ry"]) {
        _ry = attributes[@"ry"];
        rectView.ry = [WXConvert WXPixelType:_ry scaleFactor:self.weexInstance.pixelScaleFactor];
    }
    [super updateAttributes:attributes];
}

@end
