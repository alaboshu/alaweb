//
//  BMGlobalEventManager.m
//  BM-JYT
//
//  Created by XHY on 2017/3/3.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMGlobalEventManager.h"
#import "BMMediatorManager.h"

@implementation BMGlobalEventManager

#pragma mark - Setter / Getter

#pragma mark - Private Method

+ (instancetype)shaerInstance
{
    static BMGlobalEventManager *_instanc = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instanc = [[BMGlobalEventManager alloc] init];
        [_instanc addObserver];
    });
    return _instanc;
}

- (void)_sendGlobalEvent:(NSString *)event params:(NSDictionary *)params
{
    [[BMMediatorManager shareInstance].currentWXInstance fireGlobalEvent:event params:params];
}

- (void)addObserver
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationWillResignActive:) name:UIApplicationWillResignActiveNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationDidBecomeActive:) name:UIApplicationDidBecomeActiveNotification object:nil];
}

- (void)applicationWillResignActive:(NSNotification *)notification
{
    [self _sendGlobalEvent:@"appDeactive" params:nil];
}

- (void)applicationDidBecomeActive:(NSNotification *)notification
{
    [self _sendGlobalEvent:@"appActive" params:nil];
}

- (void)sendGlobalEventwithInstance:(WXSDKInstance *)instance event:(NSString *)event params:(NSDictionary *)params
{
    /** 首屏渲染成功发送一次通知 */
    if ([event isEqualToString:BMViewDidAppear]) {
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            [[NSNotificationCenter defaultCenter] postNotificationName:BMFirstScreenDidFinish object:nil];
        });
    }
    
    [instance fireGlobalEvent:event params:params];
}

#pragma mark - Api Request

#pragma mark - Custom Delegate & DataSource

#pragma mark - System Delegate & DataSource

#pragma mark - Public Method

+ (void)sendViewLifeCycleEventWithInstance:(WXSDKInstance *)instance event:(NSString *)event controllerState:(BMControllerState)state
{
    NSDictionary *params = @{@"type": BMControllerStateArray[state]};
    [[BMGlobalEventManager shaerInstance] sendGlobalEventwithInstance:instance event:event params:params];
}

+ (void)pushMessage:(NSDictionary *)info appLaunchedByNotification:(BOOL)isLaunchedByNotification
{
    NSMutableDictionary *date = [NSMutableDictionary dictionaryWithDictionary:info];
    [date setValue:[NSNumber numberWithBool:isLaunchedByNotification] forKey:@"trigger"];
    [[BMGlobalEventManager shaerInstance] _sendGlobalEvent:@"pushMessage" params:date];
}

+ (void)sendGlobalEvent:(NSString *)event params:(NSDictionary *)params
{
    [[BMGlobalEventManager shaerInstance] _sendGlobalEvent:event params:params];
}

@end
