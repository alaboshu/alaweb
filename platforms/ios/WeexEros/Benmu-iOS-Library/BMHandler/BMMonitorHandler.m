//
//  BMMonitorHandler.m
//  BM-JYT
//
//  Created by XHY on 2017/3/29.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMMonitorHandler.h"

@implementation BMMonitorHandler

- (void)commitAppMonitorArgs:(NSDictionary *)args
{
    /** 这里可以统计页面渲染时间等信息 */
}

- (void)commitAppMonitorAlarm:(NSString *)pageName monitorPoint:(NSString *)monitorPoint success:(BOOL)success errorCode:(NSString *)errorCode errorMsg:(NSString *)errorMsg arg:(NSString *)arg
{
    /** 这里可以统计 js 报错信息*/
}

@end
