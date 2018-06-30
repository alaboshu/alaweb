//
//  BMDB.m
//  RealmDome
//
//  Created by XHY on 2017/3/31.
//  Copyright © 2017年 本木医疗. All rights reserved.
//

#import "BMDB.h"
#import <Realm/Realm.h>
#import "BMDBBaseModel.h"
#import "BMMediatorManager.h"
#import "BMUserInfoModel.h"

#define K_LIBRARY_PATH [NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) objectAtIndex:0]
#define K_DB_PATH [K_LIBRARY_PATH stringByAppendingPathComponent:@"BMDB"]
// 数据库新增字段等需要数据迁移的操作时 版本号 需要 +1
#define K_DB_VERSION 0

@implementation BMDB
{
//    dispatch_queue_t _dbQueue;
}

#pragma mark - Private Method

- (instancetype)init
{
    if (self = [super init]) {
//        _dbQueue = dispatch_queue_create("com.benmu.dbqueue", DISPATCH_QUEUE_SERIAL);
    }
    return self;
}

#pragma mark 添加不同步iCould属性
- (BOOL)addSkipBackupAttributeToItemAtPath:(NSString *)filePathString
{
    NSURL* URL= [NSURL fileURLWithPath: filePathString];
    //    assert([[NSFileManager defaultManager] fileExistsAtPath: [URL path]]);
    
    NSError *error = nil;
    BOOL success = [URL setResourceValue: [NSNumber numberWithBool: YES]
                                  forKey: NSURLIsExcludedFromBackupKey error: &error];
    if(!success){
        WXLogError(@"【BMDB ERROR】excluding %@ from backup %@", [URL lastPathComponent], error);
    }
    return success;
}

- (NSURL *)dbFileURL
{
    NSFileManager *fm = [NSFileManager defaultManager];
    
    BOOL isDir = false;
    BOOL isDirExist = [fm fileExistsAtPath:K_DB_PATH isDirectory:&isDir];
    
    if (!(isDir && isDirExist)) {
        [fm removeItemAtPath:K_DB_PATH error:nil];
        [fm createDirectoryAtPath:K_DB_PATH withIntermediateDirectories:YES attributes:nil error:nil];
        
        BOOL skipSuccess = [self addSkipBackupAttributeToItemAtPath:K_DB_PATH];
        if (skipSuccess) {
            WXLogInfo(@"【BMDB Info】add skip attribute for directory success");
        }
    }
    
    NSString *dbFilePath = [[K_DB_PATH stringByAppendingPathComponent:@"bm"]
                            stringByAppendingPathExtension:@"realm"];
    return [NSURL fileURLWithPath:dbFilePath];
}

- (void)configDB
{
    
    RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
    config.schemaVersion = K_DB_VERSION;
    config.fileURL = [self dbFileURL];
    [RLMRealmConfiguration setDefaultConfiguration:config];

    [self dbMigration];
}

/* 数据迁移 */
- (void)dbMigration
{
    RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
    WXLogInfo(@"【BMDB Info】%@",config.fileURL);
    
    config.migrationBlock = ^(RLMMigration *migration, uint64_t oldSchemaversion) {
    
        [migration enumerateObjects:[BMDBBaseModel className] block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
            /* 判断数据库版本 给 BMDBBaseModel 做数据迁移工作 */
        }];
        
        // ...
    };
    
}


#pragma mark - Public Method

+ (instancetype)DB
{
    static BMDB *_instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[BMDB alloc] init];
    });
    
    return _instance;
}

- (void)addOrUpdateData:(NSString *)data primatyKey:(NSString *)key success:(BMDBHandleBlock)result
{
//    dispatch_async(_dbQueue, ^{
    
        NSError *error = nil;
        RLMRealm *realm = [RLMRealm defaultRealm];
        
        /* 根据主键查询数据 */
        BMDBBaseModel *model = [BMDBBaseModel objectForPrimaryKey:key];
        
        /* 数据不存在将 newModel 保存到数据库中 */
        if (!model) {
            model = [[BMDBBaseModel alloc] init];
            model.key = key;
            model.data = data;
            [realm transactionWithBlock:^{
                [realm addOrUpdateObject:model];
            } error:&error];
        }
        /* 更新数据 */
        else
        {
            [realm transactionWithBlock:^{
                model.data = data;
            } error:&error];
        }
        
        if (error) {
            WXLogError(@"【BMDB ERROR】:%@",error);
            if (result) result(NO);
        } else {
            if (result) result(YES);
        }
//    });
}

- (BOOL)addOrUpdateData:(NSString *)data primatyKey:(NSString *)key
{
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    /* 根据主键查询数据 */
    BMDBBaseModel *model = [BMDBBaseModel objectForPrimaryKey:key];
    
    /* 数据不存在将 newModel 保存到数据库中 */
    if (!model) {
        model = [[BMDBBaseModel alloc] init];
        model.key = key;
        model.data = data;
        [realm transactionWithBlock:^{
            [realm addOrUpdateObject:model];
        } error:&error];
    }
    /* 更新数据 */
    else
    {
        [realm transactionWithBlock:^{
            model.data = data;
        } error:&error];
    }
    
    if (error) {
        WXLogError(@"【BMDB ERROR】:%@",error);
        return NO;
    }
    return YES;
}

- (NSString *)queryWithPrimatyKey:(NSString *)key
{
    BMDBBaseModel *dataModel = [BMDBBaseModel objectForPrimaryKey:key];
    if (dataModel) {
        return dataModel.data;
    }
    return nil;
}

- (void)deleteWithPrimatyKey:(NSString *)key success:(BMDBHandleBlock)result
{
//    dispatch_async(_dbQueue, ^{
    
        BMDBBaseModel *model = [BMDBBaseModel objectForPrimaryKey:key];
        
        if (!model) {
//            WXLogInfo(@"【BMDB ERROR】: 主键为 %@ 的数据不存在",key);
            if (result) result(NO);
            
            return;
        }
        
        NSError *error = nil;
        RLMRealm *realm = [RLMRealm defaultRealm];
        
        [realm transactionWithBlock:^{
            [realm deleteObject:model];
        } error:&error];
        
        if (error) {
            WXLogError(@"【BMDB ERROR】:%@",error);
            if (result) result(NO);
        } else {
            if (result) result(YES);
        }
        
//    });
}

- (BOOL)deleteWithPrimatyKey:(NSString *)key
{
    BMDBBaseModel *model = [BMDBBaseModel objectForPrimaryKey:key];
    if (!model) {
//      WXLogInfo(@"【BMDB ERROR】: 主键为 %@ 的数据不存在",key);
        return NO;
    }
    
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^{
        [realm deleteObject:model];
    } error:&error];
    
    if (error) {
        WXLogError(@"【BMDB ERROR】:%@",error);
        return NO;
    }
    return YES;
}

- (void)deleteAllSuccess:(BMDBHandleBlock)result
{
//    dispatch_async(_dbQueue, ^{
    
        NSError *error = nil;
        RLMRealm *realm = [RLMRealm defaultRealm];
        
        [realm transactionWithBlock:^{
            [realm deleteAllObjects];
        } error:&error];
        
        if (error) {
            WXLogError(@"【BMDB ERROR】:%@",error);
            if (result) result(NO);
        } else {
            if (result) result(YES);
        }
        
//    });
}

- (BOOL)deleteAll
{
    NSError *error = nil;
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    [realm transactionWithBlock:^{
        [realm deleteAllObjects];
    } error:&error];
    
    if (error) {
        WXLogError(@"【BMDB ERROR】:%@",error);
        return NO;
    }
    return YES;
}

@end
