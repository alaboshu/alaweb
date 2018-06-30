//
//  WXSVGPath.m
//  Pods
//
//  Created by yangshengtao on 17/2/22.
//
//

#import "WXSVGPath.h"

@implementation WXSVGPath

- (void)setD:(CGPathRef)d
{
    if (d == _d) {
        return;
    }
    
    [self invalidate];
    CGPathRelease(_d);
    _d = CGPathRetain(d);
}

- (CGPathRef)getPath:(CGContextRef)context
{
    return self.d;
}

- (void)dealloc
{
    CGPathRelease(_d);
}

@end
