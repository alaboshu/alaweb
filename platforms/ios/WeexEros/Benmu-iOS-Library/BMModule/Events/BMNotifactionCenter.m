//
//  BMNotifactionCenter.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/28.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMNotifactionCenter.h"

const static NSString * bmNotifaction = @"bmNotifaction";

const static NSString * eventParamsKey = @"eventParams";

const static NSString * onceKey = @"once";

const static NSString * callbackKey = @"callback";

const static NSString * instanceIDKey = @"instanceId";

@interface BMNotifactionCenter()
{
    NSMutableDictionary * eventsMaps;
    NSMutableArray * instanceArrays;
}
@end


@implementation BMNotifactionCenter

+(instancetype)defaultCenter
{
    static BMNotifactionCenter *_instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[BMNotifactionCenter alloc] init];
    });
    return _instance;
}

-(instancetype)init
{
    if (self = [super init]) {
        eventsMaps = [NSMutableDictionary dictionaryWithCapacity:0];
        instanceArrays = [NSMutableArray arrayWithCapacity:0];
    }
    return self;
}
-(void)on:(NSString*)event callback:(WXModuleKeepAliveCallback)callback instance:(WXSDKInstance *)instance
{
    if (nil == callback) {
        return;
    }
    
    if (event.length > 0) {
       
        NSString * eventName = [NSString stringWithFormat:@"%@_%@",bmNotifaction,event];
         id callbacks = [eventsMaps objectForKey:eventName];
        
        if (nil == callbacks) {

            callbacks = [[NSMutableArray alloc] initWithCapacity:0];
            [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onEvent:) name:eventName object:nil];
        }
        
        if([callbacks isKindOfClass:[NSArray class]]){
            NSMutableArray * newCallbacks = [NSMutableArray arrayWithArray:callbacks];
            if (callback) {
                NSNumber * once = [NSNumber numberWithBool:NO];
                NSDictionary * dict = [NSDictionary dictionaryWithObjectsAndKeys:once,onceKey,callback,callbackKey,instance.instanceId?instance.instanceId:@"",instanceIDKey,nil];
                [newCallbacks addObject:dict];
                
                [eventsMaps setObject:newCallbacks forKey:eventName];
                
                if (NO == [instanceArrays containsObject:instance.instanceId]) {
                    [instanceArrays addObject:instance.instanceId];
                }
            }
        }
    }
}


-(void)once:(NSString*)event callback:(WXModuleKeepAliveCallback)callback instance:(WXSDKInstance *)instance
{
    if (nil == callback) {
        return;
    }
    
    if (event.length > 0) {
        
        NSString * eventName = [NSString stringWithFormat:@"%@_%@",bmNotifaction,event];
        id callbacks = [eventsMaps objectForKey:eventName];
        
        if (nil == callbacks) {
        
            callbacks = [[NSMutableArray alloc] initWithCapacity:0];
            [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onEvent:) name:eventName object:nil];
        }
        
        if([callbacks isKindOfClass:[NSArray class]]){
            NSMutableArray * newCallbacks = [NSMutableArray arrayWithArray:callbacks];
            if (callback) {
                NSNumber * once = [NSNumber numberWithBool:YES];
                NSDictionary * dict = [NSDictionary dictionaryWithObjectsAndKeys:once,onceKey,callback,callbackKey,instance.instanceId?instance.instanceId:@"",instanceIDKey, nil];
                [newCallbacks addObject:dict];
                [eventsMaps setObject:newCallbacks forKey:eventName];
                
                if (NO == [instanceArrays containsObject:instance.instanceId]) {
                    [instanceArrays addObject:instance.instanceId];
                }
            }
        }
    }
}


-(void)off:(NSString*)event callback:(WXModuleCallback)callback
{
    if (event.length > 0) {
        id callbacks = [eventsMaps objectForKey:event];
        
        if([callbacks isKindOfClass:[NSArray class]]){
            NSString * eventName = [NSString stringWithFormat:@"%@_%@",bmNotifaction,event];
            [eventsMaps removeObjectForKey:eventName];
            
            [[NSNotificationCenter defaultCenter] removeObserver:self name:eventName object:nil];
        }
    }
}


-(void)emit:(NSString*)event info:(id)info
{
    NSString * eventName = [NSString stringWithFormat:@"%@_%@",bmNotifaction,event];
    
    [[NSNotificationCenter defaultCenter] postNotificationName:eventName object:nil userInfo:info];
}

-(void)offAll
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
    [eventsMaps removeAllObjects];
}


#pragma mark  注册事件

-(void)onEvent:(NSNotification*)notification
{
    NSString * name = notification.name;
    NSDictionary * userinfo = notification.userInfo;
    
    id callbacks = [eventsMaps objectForKey:name];
    
    if ([callbacks isKindOfClass:[NSArray class]]) {
        
        NSMutableArray * tmpCallbacks = [[NSMutableArray alloc] initWithArray:callbacks];
        
        
        for (id callbackInfo in (NSArray*)callbacks) {
            if ([callbackInfo isKindOfClass:[NSDictionary class]]) {
                NSNumber * once = [callbackInfo objectForKey:onceKey];
                WXKeepAliveCallback callback = [callbackInfo objectForKey:callbackKey];
                NSString * instanceId = [callbackInfo objectForKey:instanceIDKey];
                if ([instanceId isKindOfClass:[NSString class]]) {
                    if ([instanceArrays containsObject:instanceId]) {
                        if(callback){
                            BOOL keep = YES;
                            if (YES == [once boolValue]) {
                                [tmpCallbacks removeObject:callbackInfo];
                                keep = NO;
                            }
                            
                            callback(userinfo,keep);
                        }
                    }
                    else{
                         //移除callbackInfo
                        [tmpCallbacks removeObject:callbackInfo];
                    }
                }
            }
        }
        
        [eventsMaps setObject:tmpCallbacks forKey:name];
    }
}
-(void)destroyObserver:(NSString *)instanceId
{
    if (YES == [instanceArrays containsObject:instanceId]) {
        [instanceArrays removeObject:instanceId];
    }
}
@end
