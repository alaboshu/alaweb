//
//  BMNavigationUseOtherMap.m
//  Pods
//
//  Created by XHY on 2017/6/1.
//
//

#import "BMNavigationUseOtherMap.h"
#import "BMMediatorManager.h"
#import "TransformCLLocation.h"


@implementation BMNavigationUseOtherMap

#pragma mark - Public Method
- (void)navigationUseOtherMapWithDestinationName:(NSString *)destinationName endLocation:(CLLocationCoordinate2D)endLocation
{
    NSArray *maps = [self getInstalledMapAppWithDestinationName:destinationName withEndLocation:endLocation];
    if (!maps.count) {
        return;
    }
    
    UIAlertController *alertVc = [UIAlertController alertControllerWithTitle:nil message:nil preferredStyle:UIAlertControllerStyleActionSheet];
    
    for (NSDictionary *dic in maps) {
        
        if ([dic[@"title"] isEqualToString:@"苹果地图"]) {
            @weakify(self);
            UIAlertAction *action = [UIAlertAction actionWithTitle:dic[@"title"] style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
                @strongify(self);
                [self navAppleMapWithDestinationName:destinationName endLocation:endLocation];
            }];
            [alertVc addAction:action];
            
        } else {
            
            UIAlertAction *action = [UIAlertAction actionWithTitle:dic[@"title"] style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
                [[UIApplication sharedApplication] openURL:[NSURL URLWithString:dic[@"url"]]];
            }];
            [alertVc addAction:action];
            
        }
        
    }
    
    UIAlertAction *action = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
    [alertVc addAction:action];
    
    [[BMMediatorManager shareInstance].currentViewController presentViewController:alertVc animated:YES completion:nil];
}

#pragma mark - Private Method
- (NSArray *)getInstalledMapAppWithDestinationName:(NSString *)destinationName withEndLocation:(CLLocationCoordinate2D)endLocation
{
    
    NSMutableArray *maps = [NSMutableArray array];
    
    NSString *appStr = NSLocalizedString(@"app_name", nil);
    
    //高德地图
    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"iosamap://"]]) {
        
        NSMutableDictionary *gaodeMapDic = [NSMutableDictionary dictionary];
        
        gaodeMapDic[@"title"] = @"高德地图";
        
        NSString *urlString = [[NSString stringWithFormat:@"iosamap://path?sourceApplication=%@&sid=BGVIS1&did=BGVIS2&dname=%@&dev=0&t=0",appStr ,destinationName] stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet  URLQueryAllowedCharacterSet]];
        
        gaodeMapDic[@"url"] = urlString;
        
        [maps addObject:gaodeMapDic];
        
    }
    
    //百度地图
    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"baidumap://"]]) {
        
        NSMutableDictionary *baiduMapDic = [NSMutableDictionary dictionary];
        
        baiduMapDic[@"title"] = @"百度地图";
        
        NSString *urlString = [[NSString stringWithFormat:@"baidumap://map/direction?origin=我的位置&destination=%@&mode=driving&src=%@",destinationName ,appStr] stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet  URLQueryAllowedCharacterSet]];
        
        baiduMapDic[@"url"] = urlString;
        
        [maps addObject:baiduMapDic];
        
    }
    
    //腾讯地图
    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"qqmap://"]]) {
        
        NSMutableDictionary *qqMapDic = [NSMutableDictionary dictionary];
        
        qqMapDic[@"title"] = @"腾讯地图";
        
        CLLocationCoordinate2D wgs84Location = [TransformCLLocation gcj02ToWgs84:endLocation];
        
        NSString *urlString = [[NSString stringWithFormat:@"qqmap://map/routeplan?from=我的位置&type=drive&to=%@&tocoord=%f,%f&cord_type=1",destinationName,wgs84Location.latitude,wgs84Location.longitude]stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet  URLQueryAllowedCharacterSet]];
        
        qqMapDic[@"url"] = urlString;
        
        [maps addObject:qqMapDic];
        
    }
    
    //苹果地图
    NSMutableDictionary *iosMapDic = [NSMutableDictionary dictionary];
    
    iosMapDic[@"title"] = @"苹果地图";
    
    [maps addObject:iosMapDic];
    
    return maps;
    
}

#pragma mark - System Delegate & DataSource
- (void)navAppleMapWithDestinationName:(NSString *)destinationName endLocation:(CLLocationCoordinate2D)endLocation
{
    MKMapItem *currentLoc = [MKMapItem mapItemForCurrentLocation];
    
    CLLocationCoordinate2D wgs84Location = [TransformCLLocation gcj02ToWgs84:endLocation];
    
    MKMapItem *toLocation = [[MKMapItem alloc] initWithPlacemark:[[MKPlacemark alloc] initWithCoordinate:wgs84Location addressDictionary:nil]];
    toLocation.name = destinationName;
    NSArray *items = @[currentLoc,toLocation];
    
    NSDictionary *dic = @{
                          
                          MKLaunchOptionsDirectionsModeKey: MKLaunchOptionsDirectionsModeDriving,
                          
                          MKLaunchOptionsMapTypeKey: @(MKMapTypeStandard),
                          
                          MKLaunchOptionsShowsTrafficKey: @(YES)
                          
                          };
    
    [MKMapItem openMapsWithItems:items launchOptions:dic];
    
}

@end
