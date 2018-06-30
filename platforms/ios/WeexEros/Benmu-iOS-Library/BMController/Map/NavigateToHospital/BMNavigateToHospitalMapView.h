//
//  BMNavigateToHospitalMapView.h
//  Pods
//
//  Created by XHY on 2017/5/27.
//
//

#import <UIKit/UIKit.h>
#import "BMMapInfoModel.h"

@interface BMNavigateToHospitalMapView : UIView


/**
 创建地图视图并显示

 @param view 显示mapView的父视图
 @param info 地图展示所需要的数据
 */
+ (void)showInView:(UIView *)view info:(BMMapInfoModel *)info;

@end
