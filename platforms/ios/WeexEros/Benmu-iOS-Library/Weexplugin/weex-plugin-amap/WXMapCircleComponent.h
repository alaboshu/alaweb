//
//  WXMapCircleComponent.h
//  Pods
//
//  Created by yangshengtao on 17/3/6.
//
//

#import "WXMapPolygonComponent.h"

@interface WXMapCircleComponent : WXMapPolygonComponent

@property (nonatomic, strong) NSArray *center;
@property (nonatomic, assign) double radius;

@end
