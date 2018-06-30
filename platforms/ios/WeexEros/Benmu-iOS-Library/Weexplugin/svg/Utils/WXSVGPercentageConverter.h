//
//  WXSVGPercentageConverter.h
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import <Foundation/Foundation.h>
#import <QuartzCore/QuartzCore.h>

@interface WXSVGPercentageConverter : NSObject

- (NSRegularExpression *) getPercentageRegularExpression;

- (instancetype) initWithRelativeAndOffset:(CGFloat)relative offset:(CGFloat)offset;

- (CGFloat) percentageToFloat:(NSString *)percentage relative:(CGFloat)relative offset:(CGFloat)offset;

- (CGFloat) percentageToFloat:(NSString *)percentage;

- (CGFloat) stringToFloat:(NSString *)string relative:(CGFloat)relative offset:(CGFloat)offset;

- (CGFloat) stringToFloat:(NSString *)string;

- (BOOL) isPercentage:(NSString *) string;

@end
