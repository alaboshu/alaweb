//
//  BMConfigManager.h
//  WeexDemo
//
//  Created by XHY on 2017/1/10.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "BMPlatformModel.h"

@interface BMConfigManager : NSObject

@property (nonatomic, readonly) BMPlatformModel *platform;

@property (nonatomic,strong) NSDictionary *envInfo; /**< 环境信息 */

+ (instancetype)shareInstance;

/** app启动时候配置一些参数 */
+ (void)configDefaultData;

/** 其他app掉起app回调方法 */
- (BOOL)applicationOpenURL:(NSURL *)url;

@end
