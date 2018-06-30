//
//  JYTLocationManager.m
//  JingYitong
//
//  Created by XHY on 16/5/26.
//  Copyright © 2016年 京医通. All rights reserved.
//

#import "JYTLocationManager.h"
#import <CoreLocation/CoreLocation.h>
#import "TransformCLLocation.h"
#import <UIKit/UIKit.h>
#import "AMapUtility.h"

@interface JYTLocationManager () <CLLocationManagerDelegate>
{
    CLLocationManager *_locationManager;
    NSTimer *_timer;
}
@property (nonatomic, strong) CLLocationManager *locationManager;
@property (nonatomic, copy) CurrentLocationBlock currentLocationBlock;

@property (nonatomic, copy) NSString *cacheLng;
@property (nonatomic, copy) NSString *cacheLat;

@end

@implementation JYTLocationManager


+ (instancetype)shareInstance
{
    static JYTLocationManager *_instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (!_instance) {
            _instance = [[JYTLocationManager alloc] init];
        }
    });
    return _instance;
}

- (CLLocationManager *)locationManager
{
    if (!_locationManager) {
        //定位管理器
        _locationManager=[[CLLocationManager alloc]init];
        //设置代理
        _locationManager.delegate = self;
        //设置定位精度
        _locationManager.desiredAccuracy=kCLLocationAccuracyBest;
        
        
        if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0) {
            [_locationManager requestWhenInUseAuthorization];
        }
    }
    return _locationManager;
}

- (void)updateCurrentLocation
{
    if (![CLLocationManager locationServicesEnabled]) {
        
        WXLogInfo(@"定位服务当前可能尚未打开，请设置打开！");
        
        [self callBackWithLongitude:nil latitude:nil];
        
        return;
    }
    
    /* 如果没有授权或者受限制返回nil */
    if ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusRestricted || [CLLocationManager authorizationStatus] == kCLAuthorizationStatusDenied) {
        
        [self callBackWithLongitude:nil latitude:nil];
        
        return;
    }
    
    //启动跟踪定位
    [self.locationManager startUpdatingLocation];
}

- (void)timerAction
{
    [self callBackWithLongitude:nil latitude:nil];
}

#pragma mark - CLLocationManagerDelegate
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations
{
    CLLocation *location = [locations firstObject]; //取出第一个位置
    
    /* 将gps坐标系转换成gcj-02坐标系 */
//    CLLocation *cll = [TransformCLLocation transformToMars:location];
//    //位置坐标
//    CLLocationCoordinate2D coordinate = cll.coordinate;
    
    CLLocationCoordinate2D coordinate = AMapCoordinateConvert(location.coordinate, AMapCoordinateTypeGPS);
    
    [self.locationManager stopUpdatingLocation];
    
    [self callBackWithLongitude:[NSString stringWithFormat:@"%f",coordinate.longitude] latitude:[NSString stringWithFormat:@"%f",coordinate.latitude]];
}


/**
 *  回调方法把经纬度通过block回传
 *
 *  @param lng 经度
 *  @param lat 纬度
 */
- (void)callBackWithLongitude:(NSString *)lng latitude:(NSString *)lat
{
    // 缓存位置信息
    self.cacheLng = lng;
    self.cacheLat = lat;
    
    if (_timer) {
        [_timer invalidate];
        _timer = nil;
    }
    if (self.currentLocationBlock) {
        self.currentLocationBlock(lng, lat);
        _currentLocationBlock = nil;
    }
}

#pragma mark Public Method
- (void)getCurrentLocation:(CurrentLocationBlock)block
{
    if (_timer) {
        [_timer invalidate];
        _timer = nil;
    }
    
    _timer = [NSTimer scheduledTimerWithTimeInterval:3.0 target:self selector:@selector(timerAction) userInfo:nil repeats:NO];
    
    self.currentLocationBlock = block;
    [self updateCurrentLocation];
}

- (void)getCacheLocation:(CurrentLocationBlock)block
{
    // 判断如果有缓存信息直接返回，无缓存则实时获取一次
    if (self.cacheLng && self.cacheLng.length > 0 && self.cacheLat && self.cacheLat.length > 0) {
        block(self.cacheLng,self.cacheLat);
    } else {
        [self getCurrentLocation:block];
    }
}

@end
