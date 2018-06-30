//
//  NSDictionary+WXMap.m
//  Pods
//
//  Created by yangshengtao on 17/3/2.
//
//

#import "NSDictionary+WXSVG.h"

@implementation NSDictionary (WXSVG)

- (id)wxmap_safeObjectForKey:(id)aKey
{
    id object = [self objectForKey:aKey];
    if (object == [NSNull null]) {
        return nil;
    }
    return object;

}

@end

@implementation NSMutableDictionary (WXSVG)

- (void)wxmap_safeSetObject:(id)anObject forKey:(id)aKey
{
    if(!aKey) {
        return;
    }
    if(anObject) {
        [self setObject:anObject forKey:aKey];
    }
}

- (void)wxmap_safeRemoveObjectForKey:(id)aKey
{
    if(aKey) {
        [self removeObjectForKey:aKey];
    }
}

@end
