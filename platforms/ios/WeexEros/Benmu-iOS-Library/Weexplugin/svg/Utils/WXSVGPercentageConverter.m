//
//  WXSVGPercentageConverter.m
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import "WXSVGPercentageConverter.h"

@implementation WXSVGPercentageConverter
{
    CGFloat _relative;
    CGFloat _offset;
    NSRegularExpression *_percentageRegularExpression;
}

- (instancetype) initWithRelativeAndOffset:(CGFloat)relative offset:(CGFloat)offset
{
    if (self = [super init]) {
        _relative = relative;
        _offset = offset;
        _percentageRegularExpression = [[NSRegularExpression alloc] initWithPattern:@"^(\\-?\\d+(?:\\.\\d+)?)%$" options:0 error:nil];
    }
    return self;
}

- (id)init
{
    if (self = [super init]) {
        _percentageRegularExpression = [[NSRegularExpression alloc] initWithPattern:@"^(\\-?\\d+(?:\\.\\d+)?)%$" options:0 error:nil];
    }
    return self;
}

- (NSRegularExpression *) getPercentageRegularExpression
{
    return _percentageRegularExpression;
}

- (CGFloat) stringToFloat:(NSString *)string
{
    return [self stringToFloat:string relative:_relative offset:_offset];
}

- (CGFloat) stringToFloat:(NSString *)string relative:(CGFloat)relative offset:(CGFloat)offset
{
    if ([self isPercentage:string] == NO) {
        return [string floatValue];
    } else {
        return [self percentageToFloat:string relative:relative offset:offset];
    }
}

- (CGFloat) percentageToFloat:(NSString *)percentage
{
    return [self percentageToFloat:percentage relative:_relative offset:_offset];
}

- (CGFloat) percentageToFloat:(NSString *)percentage relative:(CGFloat)relative offset:(CGFloat)offset
{
    __block CGFloat matched;
    
    [_percentageRegularExpression enumerateMatchesInString:percentage
                                                   options:0
                                                     range:NSMakeRange(0, percentage.length)
                                                usingBlock:^(NSTextCheckingResult *result, NSMatchingFlags flags, BOOL *stop)
     {
         
         matched = [[percentage substringWithRange:NSMakeRange(result.range.location, result.range.length)] floatValue];
         matched = matched / 100 * relative + offset;
     }];
    
    return matched;
}

- (BOOL) isPercentage:(NSString *) string
{
    return [_percentageRegularExpression firstMatchInString:string options:0 range:NSMakeRange(0, [string length])] != nil;
}

@end
