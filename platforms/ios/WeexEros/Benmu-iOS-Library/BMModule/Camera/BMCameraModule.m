//
//  BMCameraModule.m
//  WeexDemo
//
//  Created by XHY on 2017/2/4.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMCameraModule.h"

#import "BMScanQRViewController.h"

#import "BMImageManager.h"
#import <BMScreenshotEventManager.h>

#import "BMUploadImageModel.h"
#import <YYModel/YYModel.h>

#import <TZImagePickerController/TZImagePickerController.h>


@implementation BMCameraModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(scan:))
WX_EXPORT_METHOD(@selector(uploadImage:callback:))
WX_EXPORT_METHOD(@selector(uploadScreenshot:))


- (void)scan:(WXModuleCallback)callback
{
    BMScanQRViewController *scanQrVc = [[BMScanQRViewController alloc] init];
    scanQrVc.hidesBottomBarWhenPushed = YES;
    scanQrVc.callback = callback;
    [weexInstance.viewController.navigationController pushViewController:scanQrVc animated:YES];
}

- (void)uploadImage:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    BMUploadImageModel *model = [BMUploadImageModel yy_modelWithJSON:info];
    [BMImageManager uploadImageWithInfo:model weexInstance:weexInstance callback:callback];
}

- (void)uploadScreenshot:(WXModuleCallback)callback
{
    if (![[BMScreenshotEventManager shareInstance] snapshotImage]) {
        NSDictionary *resDic = [NSDictionary configCallbackDataWithResCode:BMResCodeError msg:@"截屏图片不存在" data:nil];
        if (callback) {
            callback(resDic);
        }
        return;
    }
    NSArray *images = @[[[BMScreenshotEventManager shareInstance] snapshotImage]];
    [BMImageManager uploadImage:images uploadImageModel:nil callback:callback];
}

@end
