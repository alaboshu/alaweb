//
//  BMWechatPayInfoModel.h
//  WeexDemo
//
//  Created by XHY on 2017/2/7.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BMWechatPayInfoModel : NSObject

@property (nonatomic, copy) NSString *sign;
@property (nonatomic, copy) NSString *timestamp;
@property (nonatomic, copy) NSString *noncestr;
@property (nonatomic, copy) NSString *partnerid;
@property (nonatomic, copy) NSString *prepayid;
@property (nonatomic, copy) NSString *packageValue;
@property (nonatomic, copy) NSString *appid;

@end
