//
//  BMPointAnnotation.m
//  Pods
//
//  Created by XHY on 2017/5/31.
//
//

#import "BMPointAnnotation.h"

@interface BMPointAnnotation ()



@end

@implementation BMPointAnnotation

- (instancetype)initWithAnnotationType:(BMPointAnnotationType)type
{
    if (self = [super init]) {
        _annotationType = type;
    }
    return self;
}

@end
