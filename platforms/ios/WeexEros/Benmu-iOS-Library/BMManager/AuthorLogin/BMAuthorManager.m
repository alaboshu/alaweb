//
//  BMAuthorManager.m
//  Pods
//
//  Created by 窦静轩 on 2017/5/5.
//
//

#import "BMAuthorManager.h"
#import <YYModel/YYModel.h>
#import "BMDefine.h"

@interface BMAuthorManager()


@end

@implementation BMAuthorManager

+ (instancetype)shareInstance
{
    static BMAuthorManager *_instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[BMAuthorManager alloc] init];
    });
    
    return _instance;
}

- (BOOL)applicationOpenURL:(NSURL *)url
{
    return [WXApi handleOpenURL:url delegate:self];
}

- (void)onResp:(BaseResp *)resp {
    
}

@end
