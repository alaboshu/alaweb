//
//  JYTLocationManager.h
//  JingYitong
//
//  Created by XHY on 16/5/26.
//  Copyright © 2016年 京医通. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void(^CurrentLocationBlock)(NSString *lon, NSString *lat);

@interface JYTLocationManager : NSObject

+ (instancetype)shareInstance;

/**
 *  获取当前坐标
 *
 *  @param block 返回经纬度
 */
- (void)getCurrentLocation:(CurrentLocationBlock)block;

/**
 *  获取上一次定位信息
 *
 *  @param block 返回上一次定位的信息
 */
- (void)getCacheLocation:(CurrentLocationBlock)block;

@end
