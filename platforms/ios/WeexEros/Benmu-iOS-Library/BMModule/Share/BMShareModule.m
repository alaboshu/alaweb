//
//  BMShareModule.m
//  BM-JYT
//
//  Created by XHY on 2017/2/27.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMShareModule.h"
#import "BMShareModel.h"
#import <YYModel.h>
#import "BMPopActionViewManager.h"

@interface BMShareModule ()

@property (nonatomic, strong) BMPopActionViewManager *actionViewManager;

@end

@implementation BMShareModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(share:successCallback:failedCallback:))

- (BMPopActionViewManager *)actionViewManager
{
    if (!_actionViewManager) {
        _actionViewManager = [[BMPopActionViewManager alloc] init];
    }
    return _actionViewManager;
}

- (void)share:(NSDictionary *)info successCallback:(WXModuleCallback)successCallback failedCallback:(WXModuleCallback)failedCallback
{
    BMShareModel *model = [BMShareModel yy_modelWithJSON:info];
    [self.actionViewManager showShareViewWithInfo:model successCallback:successCallback failedCallback:failedCallback];
}


@end
