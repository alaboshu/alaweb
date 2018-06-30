//
//  BMNotifactionCenter.h
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/28.
//  Copyright © 2017年 XHY. All rights reserved.
//

//WX_EXPORT_METHOD(@selector(on:callback:))
//WX_EXPORT_METHOD(@selector(once:callback:))
//WX_EXPORT_METHOD(@selector(off:callback:))
//WX_EXPORT_METHOD(@selector(emit:))


#import <Foundation/Foundation.h>
#import <WeexSDK/WXModuleProtocol.h>

@interface BMNotifactionCenter : NSObject

+(instancetype)defaultCenter;


-(void)on:(NSString*)event callback:(WXModuleKeepAliveCallback)callback instance:(WXSDKInstance*)instance;


-(void)once:(NSString*)event callback:(WXModuleKeepAliveCallback)callback instance:(WXSDKInstance*)instance;


-(void)off:(NSString*)event callback:(WXModuleCallback)callback;

-(void)emit:(NSString*)event info:(id)info;

-(void)offAll;

-(void) destroyObserver:(NSString*)instanceId;
@end
