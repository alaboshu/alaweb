//
//  WXSDKEngine+BMExtend.h
//  Pods
//
//  Created by 窦静轩 on 2017/5/5.
//
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>

@interface WXSDKEngine (BMExtend)

+(void)bm_registerDefaultHandlers;

+(void)bm_registerDefaultModules;

+ (void)registerModule:(NSString *)name withClass:(Class)clazz;

+(void)_registerDefaultHandlers;

+(void)_registerDefaultModules;
@end
