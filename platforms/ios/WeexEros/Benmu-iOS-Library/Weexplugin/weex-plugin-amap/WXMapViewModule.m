//
//  WXMapViewModule.m
//  Pods
//
//  Created by yangshengtao on 17/1/23.
//
//

#import "WXMapViewModule.h"
#import "WXMapViewComponent.h"
#import "WXConvert+AMapKit.h"
//#import "AMapLocationKit.h"
#import "JYTLocationManager.h"

@implementation WXMapViewModule

@synthesize weexInstance;

//WX_EXPORT_METHOD(@selector(getUserLocation:callback:))
WX_EXPORT_METHOD(@selector(getLineDistance:marker:callback:))
WX_EXPORT_METHOD_SYNC(@selector(polygonContainsMarker:ref:callback:))

WX_EXPORT_METHOD(@selector(GetPoiSearch:city:callback:))
WX_EXPORT_METHOD(@selector(GetLiveWeather:callback:))
WX_EXPORT_METHOD(@selector(getUserLocation:))

WXModuleCallback searchCallback;


//增加定位函数
WX_EXPORT_METHOD(@selector(startCurrentLocation:callback:))


- (void)startCurrentLocation:(NSString *)elemRef callback:(WXModuleCallback)callback
{
    [self performBlockWithRef:elemRef block:^(WXComponent *component) {
        
        [[JYTLocationManager shareInstance] getCurrentLocation:^(NSString *lon, NSString *lat) {
            CLLocationCoordinate2D coordinate;
            coordinate.latitude = lat.floatValue;
            coordinate.longitude = lon.floatValue;
            
            
            [[(WXMapViewComponent *)component mapView] setCenterCoordinate:coordinate animated:YES];
            
        }];
    }];
}






//- (void)getUserLocation:(NSString *)elemRef callback:(WXModuleCallback)callback
//{
//    [self performBlockWithRef:elemRef block:^(WXComponent *component) {
//        callback([(WXMapViewComponent *)component getUserLocation] ? : nil);
//    }];
//}



- (void)getLineDistance:(NSArray *)marker marker:(NSArray *)anotherMarker callback:(WXModuleCallback)callback
{
    CLLocationCoordinate2D location1 = [WXConvert CLLocationCoordinate2D:marker];
    CLLocationCoordinate2D location2 = [WXConvert CLLocationCoordinate2D:anotherMarker];
    MAMapPoint p1 = MAMapPointForCoordinate(location1);
    MAMapPoint p2 = MAMapPointForCoordinate(location2);
    CLLocationDistance distance =  MAMetersBetweenMapPoints(p1, p2);
    NSDictionary *userDic;
    if (distance > 0) {
        userDic = @{@"result":@"success",@"data":@{@"distance":[NSNumber numberWithDouble:distance]}};
    }else {
        userDic = @{@"resuldt":@"false",@"data":@""};
    }
    callback(userDic);
}

- (void)polygonContainsMarker:(NSArray *)position ref:(NSString *)elemRef callback:(WXModuleCallback)callback
{
    [self performBlockWithRef:elemRef block:^(WXComponent *WXMapRenderer) {
        CLLocationCoordinate2D loc1 = [WXConvert CLLocationCoordinate2D:position];
        MAMapPoint p1 = MAMapPointForCoordinate(loc1);
        NSDictionary *userDic;
        
        if (![WXMapRenderer.shape isKindOfClass:[MAMultiPoint class]]) {
            userDic = @{@"result":@"false",@"data":[NSNumber numberWithBool:NO]};
            return;
        }
        MAMapPoint *points = ((MAMultiPoint *)WXMapRenderer.shape).points;
        NSUInteger pointCount = ((MAMultiPoint *)WXMapRenderer.shape).pointCount;
        
        if(MAPolygonContainsPoint(p1, points, pointCount)) {
            userDic = @{@"result":@"success",@"data":[NSNumber numberWithBool:YES]};
        } else {
            userDic = @{@"result":@"false",@"data":[NSNumber numberWithBool:NO]};
        }
        callback(userDic);
    }];
}

- (void)performBlockWithRef:(NSString *)elemRef block:(void (^)(WXComponent *))block {
    if (!elemRef) {
        return;
    }
    
    __weak typeof(self) weakSelf = self;
    
    WXPerformBlockOnComponentThread(^{
        WXComponent *component = (WXComponent *)[weakSelf.weexInstance componentForRef:elemRef];
        if (!component) {
            return;
        }
        
        [weakSelf performSelectorOnMainThread:@selector(doBlock:) withObject:^() {
            block(component);
        } waitUntilDone:NO];
    });
}

- (void)doBlock:(void (^)())block {
    block();
}

- (void)GetPoiSearch:(NSString*)keyword city:(NSString*)city callback:(WXModuleCallback)callback
{
    self.search = [[AMapSearchAPI alloc] init];
    self.search.delegate = self;
    
    AMapPOIKeywordsSearchRequest *request = [[AMapPOIKeywordsSearchRequest alloc] init];
    request.keywords = keyword;
    request.city = city;
    request.cityLimit = YES;
    searchCallback = callback;
    [self.search AMapPOIKeywordsSearch: request];
}
- (void)AMapSearchRequest: (id)request didFailWithError:(NSError *)error
{
    searchCallback([NSDictionary configCallbackDataWithResCode:error.code msg:nil data:nil]);
}
- (void)onPOISearchDone: (AMapPOIKeywordsSearchRequest *)request response:(AMapPOISearchResponse *)response
{
    NSMutableArray *array = [NSMutableArray array];
    for ( AMapPOI *poi in response.pois) {
        // 为了跟android统一。。。我也很无奈啊！！！
        NSDictionary *obj = @{@"title":poi.name, @"snippet": poi.address, @"cityName": poi.city,
                              @"provinceName": poi.province, @"adName": poi.district, @"typeCode": poi.typecode,
                              @"latLonPoint": @{@"longitude": @(poi.location.longitude), @"latitude": @(poi.location.latitude)}};
        [array addObject: obj];
    }
    searchCallback([NSDictionary configCallbackDataWithResCode:0 msg:nil data: array]);
}


- (void)GetLiveWeather: (NSString*)city callback:(WXModuleCallback)callback
{
    AMapWeatherSearchRequest *request = [[AMapWeatherSearchRequest alloc] init];
    request.city = city;
    request.type = AMapWeatherTypeLive;
    self.search = [[AMapSearchAPI alloc] init];
    self.search.delegate = self;
    [self.search AMapWeatherSearch: request];
    
    searchCallback = callback;
}

- (void)onWeatherSearchDone:(AMapWeatherSearchRequest *)request response:(AMapWeatherSearchResponse *)response
{
    if (request.type == AMapWeatherTypeLive && response.lives.count > 0) {
        NSDictionary *data = @{@"weather": response.lives[0].weather, @"temperature": response.lives[0].temperature,
                               @"humidity": response.lives[0].humidity, @"reportTime": response.lives[0].reportTime };
        searchCallback([NSDictionary configCallbackDataWithResCode:0 msg:nil data: data]);
    }
}

- (void)getUserLocation: (WXModuleCallback)callback
{
    if ([CLLocationManager authorizationStatus] ==kCLAuthorizationStatusDenied) {
        callback([NSDictionary configCallbackDataWithResCode:9 msg:nil data:nil]);
        UIAlertView * alert = [[UIAlertView alloc] initWithTitle:NSLocalizedString(@"无法获取定位服务", nil) message:NSLocalizedString(@"请在iPhone的\"设置-隐私-定位服务\"中允许访问定位服务", nil) delegate:self cancelButtonTitle:NSLocalizedString(@"取消", nil) otherButtonTitles:NSLocalizedString(@"设置", nil), nil];
        [alert show];
    }
    self.locationManager = [[AMapLocationManager alloc] init];
    [self.locationManager setDesiredAccuracy:kCLLocationAccuracyBest];
    //设置不允许系统暂停定位
    [self.locationManager setPausesLocationUpdatesAutomatically:NO];
    //设置允许在后台定位
    [self.locationManager setAllowsBackgroundLocationUpdates:NO];
    //设置定位超时时间
    [self.locationManager setLocationTimeout:6];
    //设置逆地理超时时间
    [self.locationManager setReGeocodeTimeout:3];
    //设置开启虚拟定位风险监测，可以根据需要开启
    [self.locationManager setDetectRiskOfFakeLocation:NO];
    [self.locationManager requestLocationWithReGeocode:YES completionBlock:^(CLLocation *location, AMapLocationReGeocode *regeocode, NSError *error) {
        if (error && !regeocode) {
            callback([NSDictionary configCallbackDataWithResCode:error.code msg:nil data: @{@"":@""}]);
            return ;
        }
        NSDictionary *data = @{@"latitude": @(location.coordinate.latitude),@"longitude": @(location.coordinate.longitude),
                               @"city": regeocode.city, @"address": regeocode.formattedAddress, @"province": regeocode.province, @"district": regeocode.district,
                               @"street": regeocode.street, @"streetNum": regeocode.number, @"poiName": regeocode.POIName
                               };
        callback([NSDictionary configCallbackDataWithResCode:0 msg:nil data:data]);
    }];
}
#pragma mark - UIAlertViewDelegate

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    if (buttonIndex == 1) { // 去设置界面，开启相机访问权限
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
    }
}

@end

