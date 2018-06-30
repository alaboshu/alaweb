//
//  NSDictionary+Util.h
//  BM-JYT
//
//  Created by XHY on 2017/2/21.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_OPTIONS(NSInteger, BMResCode) {
    BMResCodeSuccess = 0,
    BMResCodeError = 9,
    BMResCodeOther = 3
};

@interface NSDictionary (Util)

/* 统一构建js callback 回调数据方法 */
+ (NSDictionary *)configCallbackDataWithResCode:(NSInteger)resCode msg:(NSString *)msg data:(id)data;

@end
