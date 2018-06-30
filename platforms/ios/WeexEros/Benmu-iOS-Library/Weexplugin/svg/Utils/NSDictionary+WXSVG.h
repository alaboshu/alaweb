//
//  NSDictionary+WXMap.h
//  Pods
//
//  Created by yangshengtao on 17/3/2.
//
//

#import <Foundation/Foundation.h>

@interface NSDictionary (WXSVG)

- (id)wxmap_safeObjectForKey:(id)aKey;

@end

@interface NSMutableDictionary (WXSVG)

- (void)wxmap_safeSetObject:(id)anObject forKey:(id)aKey;

- (void)wxmap_safeRemoveObjectForKey:(id)aKey;

@end
