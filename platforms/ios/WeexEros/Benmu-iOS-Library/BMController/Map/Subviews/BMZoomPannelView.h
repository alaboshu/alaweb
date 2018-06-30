//
//  BMZoomPannelView.h
//  Pods
//
//  Created by XHY on 2017/5/27.
//
//

#import <UIKit/UIKit.h>

#define K_ZoomPannelView_Width 53
#define K_ZoomPannelView_Height 98

/**
 缩放面板点击的类型
 
 - BMZoomTypePlus: 放大
 - BMZoomTypeMinus: 缩小
 */
typedef NS_ENUM(NSInteger,BMZoomType){
    BMZoomTypePlus = 0,
    BMZoomTypeMinus
};

typedef void(^BMZoomPannelHandle)(BMZoomType zoomType);

@interface BMZoomPannelView : UIView

+ (void)showInView:(UIView *)mapView center:(CGPoint)pt zoomType:(BMZoomPannelHandle)zoomPannelHandle;

@end
