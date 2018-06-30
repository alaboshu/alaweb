//
//  BMDB.h
//  RealmDome
//
//  Created by XHY on 2017/3/31.
//  Copyright © 2017年 本木医疗. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void(^BMDBHandleBlock)(BOOL success);

@interface BMDB : NSObject

+ (instancetype)DB;

/* 配置数据库 */
- (void)configDB;

/* 根据主键 添加 或者 修改数据 */
- (void)addOrUpdateData:(NSString *)data primatyKey:(NSString *)key success:(BMDBHandleBlock)result;
- (BOOL)addOrUpdateData:(NSString *)data primatyKey:(NSString *)key;

/* 根据主键读取 model */
- (NSString *)queryWithPrimatyKey:(NSString *)key;

/* 根据 主键 删除一数据 */
- (void)deleteWithPrimatyKey:(NSString *)key success:(BMDBHandleBlock)result;
- (BOOL)deleteWithPrimatyKey:(NSString *)key;

/* 删除所有数据 */
- (void)deleteAllSuccess:(BMDBHandleBlock)result;
- (BOOL)deleteAll;

@end
