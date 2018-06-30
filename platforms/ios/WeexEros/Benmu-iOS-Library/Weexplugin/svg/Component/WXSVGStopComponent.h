//
//  WXSVGStopComponent.h
//  WeexSVGPlugin
//
//  Created by yangshengtao on 2017/3/24.
//  Copyright © 2017年 Taobao. All rights reserved.
//

#import "WXSVGRenderableComponent.h"

@interface WXSVGStopComponent : WXSVGRenderableComponent

@property (nonatomic, copy) NSString *stopColor;
@property (nonatomic, copy) NSString *offet;
@property (nonatomic, assign) CGFloat stopOpacity;

@end
