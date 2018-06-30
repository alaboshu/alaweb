//
//  NSString+Util.h
//  JingYitong
//
//  Created by XHY on 15/7/14.
//  Copyright (c) 2015年 京医通. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@interface NSString (Util)

/* 获取当前设备型号 */
+ (NSString*)deviceModelName;

- (NSString *)md5;

/** 去除两端空格和回车 */
- (NSString *)trimming;

/** 防止空字符串 */
- (NSString *)dNull;

/** 是否是空字符串 */
- (BOOL)isNull;

/** 是否联系人输入特殊字符 */
- (BOOL)isContainsSpecialCharacter;

/** 是否是手机号 只判断是否是1开头的11位数字 */
- (BOOL)isMobileNumber;

/** 判断是否包含中文*/
- (BOOL)isHasChinese;

/**
 *  判断是否为数字
 *
 */
- (BOOL)isDigit;


/**
 扩展方法方便生成属性字符串

 @param attrs 样式
 @param subString 需要添加样式的string
 @return 属性字符串
 */
- (NSMutableAttributedString *)addAttributes:(NSDictionary<NSString *, id> *)attrs subString:(NSString *)subString;

/* 判断是否包含子字符串 */
- (BOOL)isContainsSubString:(NSString *)subString;


/* 解析URL时 将a=a&b=b 等字符串转换为字典 */
- (NSDictionary*)dictionaryFromQuery;

-(NSString*)encodeString;

-(NSString *)decodeString;

+ (NSString*)getStatusText:(NSInteger)code;
@end
