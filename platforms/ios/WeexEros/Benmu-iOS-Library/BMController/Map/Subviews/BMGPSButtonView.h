//
//  BMGPSButtonView.h
//  Pods
//
//  Created by XHY on 2017/5/27.
//
//

#import <UIKit/UIKit.h>

#define K_GPSButtonView_Width 40
#define K_GPSButtonView_Height K_GPSButtonView_Width

typedef void(^BMGPSButtonViewHandle)();

@interface BMGPSButtonView : UIView

+ (void)showInView:(UIView *)mapView center:(CGPoint)center clickedHandle:(BMGPSButtonViewHandle)clickedHandle;

@end
