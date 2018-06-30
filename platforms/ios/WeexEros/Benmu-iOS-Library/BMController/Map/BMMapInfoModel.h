//
//  BMMapInfoModel.h
//  Pods
//
//  Created by XHY on 2017/6/1.
//
//

#import <Foundation/Foundation.h>

/**
 展示地图功能的type
 
 - BMMapViewTypeNavigate: 导航
 */
typedef NS_ENUM(NSInteger,BMMapViewType) {
    BMMapViewTypeNavigate = 1
};

@interface BMMapNavigationInfo : NSObject

@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSString *address;
@property (nonatomic) double latitude;
@property (nonatomic) double longitude;

@end

@interface BMMapInfoModel : NSObject

@property (nonatomic) BMMapViewType type;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, strong) BMMapNavigationInfo *navigationInfo;


@end
