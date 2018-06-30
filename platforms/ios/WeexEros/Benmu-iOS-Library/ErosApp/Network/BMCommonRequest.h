//
//  BMCommonRequest.h
//  WeexDemo
//
//  Created by XHY on 2017/1/13.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMBaseRequest.h"
@class BMAxiosRequestModel;

@interface BMCommonRequest : BMBaseRequest

- (instancetype)initWithRequestModel:(BMAxiosRequestModel *)model;

@end
