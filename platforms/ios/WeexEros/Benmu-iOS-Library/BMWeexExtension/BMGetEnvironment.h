//
//  BMGetEnvironment.h
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/23.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BMGetEnvironment : NSObject

+ (NSDictionary *)bm_getEnvironment;
+ (void)setLocale:(NSString *)locale;
+ (NSString *)getLanguageInjector;
@end
