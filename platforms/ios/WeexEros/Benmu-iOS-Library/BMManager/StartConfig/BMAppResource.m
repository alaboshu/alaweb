//
//  BMAppResource.m
//  BM-JYT
//
//  Created by XHY on 2017/3/1.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMAppResource.h"
#import "BMConfigManager.h"

#define K_LOAD_JS_KEY @"load_js_resource"

@implementation BMAppResource

+ (NSURL *)configJSFullURLWithPath:(NSString *)path
{
    /* 拼接完整的路径 */
    NSString *urlPath = [NSString stringWithFormat:@"%@%@",[[BMConfigManager shareInstance].platform.url.jsServer stringByAppendingString:K_JS_ADD_PATH],path];
    return [NSURL URLWithString:urlPath];
}

@end
