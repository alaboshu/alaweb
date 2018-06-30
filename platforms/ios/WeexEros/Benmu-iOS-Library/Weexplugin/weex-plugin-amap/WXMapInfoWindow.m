//
//  WXMapCustomInfoWindow.m
//  Pods
//
//  Created by yangshengtao on 17/3/7.
//
//

#import "WXMapInfoWindow.h"

@implementation WXMapInfoWindow

- (id)initWithAnnotation:(id<MAAnnotation>)annotation reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithAnnotation:annotation reuseIdentifier:reuseIdentifier];
    
    if (self){}
    
    return self;
}

- (void)addCustomInfoWindow:(UIView *)view;
{
    [self addSubview:view];
}

@end
