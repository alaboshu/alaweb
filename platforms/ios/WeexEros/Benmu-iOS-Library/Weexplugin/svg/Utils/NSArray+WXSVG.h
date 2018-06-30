//
//  NSArray+WXMap.h
//  Pods
//
//  Created by yangshengtao on 17/3/2.
//
//

#import <Foundation/Foundation.h>

@interface NSArray (WXSVG)

- (id)wxmap_safeObjectForKey:(NSInteger)index;

@end

@interface NSMutableArray (WXSVG)

- (void)wxmap_safeAddObject:(id)object;

@end
