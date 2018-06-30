//
//  NSArray+WXMap.m
//  Pods
//
//  Created by yangshengtao on 17/3/2.
//
//

#import "NSArray+WXSVG.h"

@implementation NSArray (WXSVG)

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

@implementation NSMutableArray (WXSVG)

- (void)wxmap_safeAddObject:(id)object
{
    if (object) {
        [self addObject:object];
    }
}

@end
