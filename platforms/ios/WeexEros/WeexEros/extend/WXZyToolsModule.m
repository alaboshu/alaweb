//
//  WXzyToolsModule.m
//  WeexEros
//
//  Created by lfg on 2017/12/7.
//  Copyright © 2017年 benmu. All rights reserved.
//

#import "WXZyToolsModule.h"
#import <ifaddrs.h>
#import <arpa/inet.h>
#import <SystemConfiguration/CaptiveNetwork.h>
#import <NetworkExtension/NetworkExtension.h>
#import "BMDefine.h"
#import "BMGetEnvironment.h"
#import "NSBundle+language.h"



@implementation WXZyToolsModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(getConnectedWifi:));
WX_EXPORT_METHOD(@selector(openSettingWifi:));
WX_EXPORT_METHOD(@selector(send));
WX_EXPORT_METHOD(@selector(getJsVersion:));
WX_EXPORT_METHOD(@selector(setLocale:));
WX_EXPORT_METHOD(@selector(getUpdateInfo:));
WX_EXPORT_METHOD_SYNC(@selector(getSystemLanguage));

- (void)getConnectedWifi:(WXModuleCallback)callback
{
    CFArrayRef wifiInterface = CNCopySupportedInterfaces();
    if (!wifiInterface) {
        
    }
    NSArray *interfaces = (__bridge_transfer id)wifiInterface;
    NSDictionary *networkInfo;
    for (NSString *interfaceName in interfaces) {
        CFDictionaryRef dict = CNCopyCurrentNetworkInfo((__bridge CFStringRef)interfaceName);
        if (dict) {
            networkInfo = (__bridge NSDictionary *)dict;
            NSLog(@"network info-> %@", networkInfo);
        }
    }
    NSString *ip = [self getCurrentLocalIP];
    [self scanWifiInfos];
    if (callback) {
        if (networkInfo != NULL) {
            callback(@{@"status": @(0), @"data":@{@"ssid": networkInfo[@"SSID"], @"ip": ip}});
        } else {
            callback(@{@"status": @(9), @"errorMsg": @"null"});
        }
    }
}
- (nullable NSString*)getCurrentLocalIP
{
    NSString *address = nil;
    struct ifaddrs *interfaces = NULL;
    struct ifaddrs *temp_addr = NULL;
    int success = 0;
    // retrieve the current interfaces - returns 0 on success
    success = getifaddrs(&interfaces);
    if (success == 0) {
        // Loop through linked list of interfaces
        temp_addr = interfaces;
        while(temp_addr != NULL) {
            if(temp_addr->ifa_addr->sa_family == AF_INET) {
                // Check if interface is en0 which is the wifi connection on the iPhone
                if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
                    // Get NSString from C String
                    address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
                }
            }
            temp_addr = temp_addr->ifa_next;
        }
    }
    // Free memory
    freeifaddrs(interfaces);
    return address;
}
- (void)scanWifiInfos{
    NSLog(@"1.Start");
    
    NSMutableDictionary* options = [[NSMutableDictionary alloc] init];
    [options setObject:@"EFNEHotspotHelperDemo" forKey: kNEHotspotHelperOptionDisplayName];
    dispatch_queue_t queue = dispatch_queue_create("EFNEHotspotHelperDemo", NULL);
    
    NSLog(@"2.Try");
    BOOL returnType = [NEHotspotHelper registerWithOptions: options queue: queue handler: ^(NEHotspotHelperCommand * cmd) {
        
        NSLog(@"4.Finish");
        NEHotspotNetwork* network;
        if (cmd.commandType == kNEHotspotHelperCommandTypeEvaluate || cmd.commandType == kNEHotspotHelperCommandTypeFilterScanList) {
            // 遍历 WiFi 列表，打印基本信息
            for (network in cmd.networkList) {
                NSString* wifiInfoString = [[NSString alloc] initWithFormat: @"---------------------------\nSSID: %@\nMac地址: %@\n信号强度: %f\nCommandType:%ld\n---------------------------\n\n", network.SSID, network.BSSID, network.signalStrength, (long)cmd.commandType];
                NSLog(@"%@", wifiInfoString);
                
                // 检测到指定 WiFi 可设定密码直接连接
                if ([network.SSID isEqualToString: @"测试 WiFi"]) {
                    [network setConfidence: kNEHotspotHelperConfidenceHigh];
                    [network setPassword: @"123456789"];
                    NEHotspotHelperResponse *response = [cmd createResponse: kNEHotspotHelperResultSuccess];
                    NSLog(@"Response CMD: %@", response);
                    [response setNetworkList: @[network]];
                    [response setNetwork: network];
                    [response deliver];
                }
            }
        }
    }];
    
    // 注册成功 returnType 会返回一个 Yes 值，否则 No
    NSLog(@"3.Result: %@", returnType == YES ? @"Yes" : @"No");
}

- (void)openSettingWifi: (WXModuleCallback)callback
{
    bool iOS10 = [[UIDevice currentDevice].systemVersion doubleValue] >= 10.0;
    
    NSURL *url = [NSURL URLWithString: @"App-Prefs:root=WIFI"];
    if ([[UIApplication sharedApplication] canOpenURL:url]) {
        if (iOS10) {
            [[UIApplication sharedApplication] openURL: url options:@{} completionHandler:nil];
        } else {
            [[UIApplication sharedApplication] openURL: url];
        }
    } else {
        NSLog(@"不能打开该页面");
    }
}
- (void)send {
    
}
- (void)getJsVersion: (WXModuleCallback)callback {
    NSData * data = [NSData dataWithContentsOfFile:K_JS_VERSION_PATH];
    NSString* version = @"";
    if (data.length > 0) {
        id info = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
        if ([info isKindOfClass:[NSDictionary class]]) {
            version = info[@"jsVersion"]?info[@"jsVersion"]:@"";
        }
    }
    if (callback) {
        callback(version);
    }
}
- (NSString*)getSystemLanguage {
    NSArray *languages = [[NSUserDefaults standardUserDefaults] objectForKey:@"AppleLanguages"];
    NSArray *language = [languages[0] componentsSeparatedByString:@"-"];
    return language[0];
}

- (void)setLocale: (NSString*) language
{
    [BMGetEnvironment setLocale: language];
    NSString *lans ;
    if ([@"zh" isEqualToString: language]) {
        lans = @"zh-Hans";
    } else if ([@"en" isEqualToString: language]) {
        lans = @"en";
    }
    [NSBundle setLanguage: lans];
    [[NSUserDefaults standardUserDefaults] setObject: lans forKey: @"myLanguage"];
    [[NSUserDefaults standardUserDefaults] synchronize];
}
- (void)getUpdateInfo: (WXModuleCallback)callback {
    
}

@end
