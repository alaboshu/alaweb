//
//  BMUserInfoModel.h
//  WeexDemo
//
//  Created by XHY on 2017/2/7.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BMUserInfoModel : NSObject <NSCoding>

+ (instancetype)shareInstance;

- (void)clearData;

@property (nonatomic, copy) NSString *phone;
@property (nonatomic, copy) NSString *name;           // 昵称
@property (nonatomic, copy) NSString *image;
@property (nonatomic, copy) NSString *token;
@property (nonatomic, assign) BOOL auth;              // 是否已经实名认证
@property (nonatomic, assign) BOOL existPwd;          // 是否存在密码

@end
