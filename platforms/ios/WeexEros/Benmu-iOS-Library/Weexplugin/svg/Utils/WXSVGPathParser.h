//
//  WXSVGPathParser.h
//  Pods
//
//  Created by yangshengtao on 17/2/20.
//
//

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>

@interface WXSVGPathParser : NSObject

- (instancetype) initWithPathString:(NSString *)d withScale:(CGFloat)scale;
- (CGPathRef)getPath;

@end
