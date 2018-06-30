//
//  BMAxiosNetworkModule.m
//  WeexDemo
//
//  Created by XHY on 2017/1/13.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMAxiosNetworkModule.h"
#import "BMAxiosRequestModel.h"
#import "BMCommonRequest.h"
#import "BMBaseViewController.h"
#import "BMUserInfoModel.h"
#import "BMImageManager.h"

@implementation BMAxiosNetworkModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(fetch:callback:))
WX_EXPORT_METHOD(@selector(uploadImage::))


- (void)fetch:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    /* 添加判断 */
    if (![info isKindOfClass:[NSDictionary class]]) {
        WXLogError(@"js request info Error");
        return;
    }
    
    WXLogInfo(@"js request info: %@",info);
    
    BMAxiosRequestModel *requestModel = [BMAxiosRequestModel yy_modelWithJSON:info];
    
    BMCommonRequest *api = [[BMCommonRequest alloc] initWithRequestModel:requestModel];
    
    [((BMBaseViewController *)weexInstance.viewController) addRequest:api];
    
    [api startRequestResult:^(id data) {
       
        WXLogInfo(@"request data: %@",data);
        
        if (callback) {
            callback(data);
        }
        
    }];
    
    WXLogInfo(@"%@",api.originalRequest);
}

- (void)uploadImage:(NSDictionary *)info :(WXModuleCallback)callback
{
    BMUploadImageModel *model = [BMUploadImageModel yy_modelWithJSON:info];
    NSArray *images = info[@"images"];
    if (!images || !images.count) {
        if (callback) {
            NSDictionary *resData = [NSDictionary configCallbackDataWithResCode:BMResCodeError msg:@"上传图片参数错误" data:nil];
            callback(resData);
        }
        return;
    }
    [BMImageManager uploadImage:images uploadImageModel:model callback:callback];
}

@end
