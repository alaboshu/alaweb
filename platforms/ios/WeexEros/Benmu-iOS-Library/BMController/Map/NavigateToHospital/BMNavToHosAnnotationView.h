//
//  BMNavToHosAnnotationView.h
//  Pods
//
//  Created by XHY on 2017/5/31.
//
//

#import <MAMapKit/MAMapKit.h>
#import "BMCalloutView.h"

typedef void(^NavigationAction)();

@interface BMNavToHosAnnotationView : MAAnnotationView

/** 名称 */
@property (nonatomic, copy) NSString *desTitle;
/** 地址 */
@property (nonatomic, copy) NSString *desAddress;
@property (nonatomic, strong) BMCalloutView *calloutView;
@property (nonatomic, copy) NavigationAction navigationAction;


@end
