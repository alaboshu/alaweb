//
//  BMAxiosRequestModel.h
//  WeexDemo
//
//  Created by XHY on 2017/1/13.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <YYModel.h>

@interface BMAxiosRequestModel : NSObject

@property (nonatomic, copy) NSString *method;               // 请求类型 GET or POST
@property (nonatomic, copy) NSString *url;                  // 请求路径
@property (nonatomic, strong) NSDictionary *header;         // 请求头
@property (nonatomic, strong) NSMutableDictionary *data;    // 请求参数
@property (nonatomic, strong) NSDictionary *params;         // post 请求 url 添加参数
@property (nonatomic, assign) CGFloat timeout;              // 请求超时时间

@end
