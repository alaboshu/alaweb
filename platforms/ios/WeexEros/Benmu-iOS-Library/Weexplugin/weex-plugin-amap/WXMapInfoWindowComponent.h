//
//  WXMapInfoWindowComponent.h
//  Pods
//
//  Created by yangshengtao on 17/3/7.
//
//

#import "WXMapViewMarkerComponent.h"
#import <MAMapKit/MAMapKit.h>

@interface WXMapInfoWindowComponent : WXMapViewMarkerComponent

@property (nonatomic, strong) MAPointAnnotation *annotation;
@property (nonatomic, copy) NSString *identifier;

@property (nonatomic, assign) BOOL isOpen;

@end
