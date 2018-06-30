//
//  BMNavigationUseOtherMap.h
//  Pods
//
//  Created by XHY on 2017/6/1.
//
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>

@interface BMNavigationUseOtherMap : NSObject


/**
 调用已安装的第三方地图app导航

 @param destinationName 目的地名称
 @param endLocation 目的地经纬度
 */
- (void)navigationUseOtherMapWithDestinationName:(NSString *)destinationName endLocation:(CLLocationCoordinate2D)endLocation;

@end
