//
//  BMBaseRequest.m
//  WeexDemo
//
//  Created by XHY on 2017/1/13.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMBaseRequest.h"
#import "BMDeviceManager.h"
#import "NSString+Util.h"
#import "BMDefine.h"
#import "YYModel.h"
#import "BMUserInfoModel.h"

@implementation BMBaseRequest

- (YTKRequestMethod)requestMethod
{
    return YTKRequestMethodGET;
}

- (YTKRequestSerializerType)requestSerializerType
{
    return YTKRequestSerializerTypeJSON;
}

- (void)startRequestResult:(RequestResultBlock)resultBlock
{
    
    [self startWithCompletionBlockWithSuccess:^(YTKBaseRequest *request) {
        
        WXLogInfo(@"%@ Request_URL>>>>>>>>>>>>>>>>:%@",NSStringFromClass([self class]),request.requestTask.originalRequest);
        
        NSNumber *status = [NSNumber numberWithInteger:request.responseStatusCode ?: -1];
        NSString *errorMsg = @"";
        id data = request.responseObject ?: @{};
        NSDictionary *resData = @{
                                  @"status": status,
                                  @"errorMsg": errorMsg,
                                  @"data": data
                                  };
        if (resultBlock) {
            resultBlock(resData);
        }
        
    } failure:^(YTKBaseRequest *request) {
        
        WXLogError(@"%@ Request_URL>>>>>>>>>>>>>>>>:%@ \n\n\n",NSStringFromClass([self class]),request.requestTask.originalRequest);
        
        // 获取错误code
        NSNumber *errorCode = [NSNumber numberWithInteger:request.responseStatusCode ?: -1];
        NSString *msg = [NSString getStatusText:[errorCode integerValue]];
        NSDictionary *resData = @{
                                  @"status": errorCode,
                                  @"errorMsg": msg,
                                  @"data": @{}
                                  };
        
        if (resultBlock) {
            resultBlock(resData);
        }
        
    }];
}

@end
