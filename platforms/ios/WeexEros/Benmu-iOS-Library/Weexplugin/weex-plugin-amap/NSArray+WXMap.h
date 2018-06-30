//
//  NSArray+WXMap.h
//  Pods
//
//  Created by yangshengtao on 17/3/2.
//
//

#import <Foundation/Foundation.h>

@interface NSArray (WXMap)

- (id)wxmap_safeObjectForKey:(NSInteger)index;

@end

@interface NSMutableArray (WXMap)

- (void)wxmap_safeAddObject:(id)object;

@end
