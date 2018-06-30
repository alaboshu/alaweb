//
//  BMGeolocationModule.m
//  WeexDemo
//
//  Created by XHY on 2017/1/19.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMGeolocationModule.h"
#import "JYTLocationManager.h"
#import "NSDictionary+Util.h"

@implementation BMGeolocationModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(getGeolocation:))

- (void)getGeolocation:(WXModuleCallback)callback
{
    
    [[JYTLocationManager shareInstance] getCurrentLocation:^(NSString *lon, NSString *lat) {
        if (callback) {
            
            NSInteger resCode = BMResCodeError;
            NSDictionary *data = nil;
            if (lon && lat) {
                resCode = BMResCodeSuccess;
                data = @{@"locationLat": lat,@"locationLng": lon};
            }
            
            /* 构建callback数据 */
            NSDictionary *resultData = [NSDictionary configCallbackDataWithResCode:resCode msg:nil data:data];
            
            callback(resultData);
            
        }
    }];
}

@end
