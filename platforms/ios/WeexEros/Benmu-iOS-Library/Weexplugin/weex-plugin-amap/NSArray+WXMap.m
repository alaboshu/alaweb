//
//  NSArray+WXMap.m
//  Pods
//
//  Created by yangshengtao on 17/3/2.
//
//

#import "NSArray+WXMap.h"

@implementation NSArray (WXMap)

- (id)wxmap_safeObjectForKey:(NSInteger)index
{
    if (index < self.count) {
        id object = self[index];
        if (object == [NSNull null]) {
            return nil;
        }
        return object;
    }
    return nil;
}

@end

@implementation NSMutableArray (Weex)

- (void)wxmap_safeAddObject:(id)object
{
    if (object) {
        [self addObject:object];
    }
}

@end
