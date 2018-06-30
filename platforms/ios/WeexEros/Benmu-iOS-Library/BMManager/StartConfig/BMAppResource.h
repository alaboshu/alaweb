//
//  BMAppResource.h
//  BM-JYT
//
//  Created by XHY on 2017/3/1.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BMAppResource : NSObject

/* 根据当前环境拼接完整的js加载路径url */
+ (NSURL *)configJSFullURLWithPath:(NSString *)path;

@end
