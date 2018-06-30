//
//  NSDictionary+Util.m
//  BM-JYT
//
//  Created by XHY on 2017/2/21.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "NSDictionary+Util.h"

@implementation NSDictionary (Util)

+ (NSDictionary *)configCallbackDataWithResCode:(NSInteger)resCode msg:(NSString *)msg data:(id)data
{
    NSMutableDictionary *resultDic = [[NSMutableDictionary alloc] init];
    
    msg = msg ? msg : @"";
    data = data ? data : @"";
    
    [resultDic setValue:[NSNumber numberWithInteger:resCode] forKey:@"status"];
    [resultDic setValue:msg forKey:@"errorMsg"];
    [resultDic setValue:data forKey:@"data"];
    
    return resultDic;
}

@end
