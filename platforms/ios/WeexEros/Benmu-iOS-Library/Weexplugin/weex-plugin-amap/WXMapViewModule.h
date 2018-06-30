//
//  WXMapViewModule.h
//  Pods
//
//  Created by yangshengtao on 17/1/23.
//
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>
#import <MAMapKit/MAMapKit.h>
#import "AMapSearchAPI.h"
#import "AMapLocationManager.h"

@interface WXMapViewModule : NSObject <WXModuleProtocol>

@property(nonatomic, strong) AMapSearchAPI *search;
@property (nonatomic, strong) AMapLocationManager *locationManager;

@end

