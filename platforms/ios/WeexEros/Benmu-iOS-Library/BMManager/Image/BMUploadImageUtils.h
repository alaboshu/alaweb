//
//  BMUploadImageUtils.h
//  WeexDemo
//
//  Created by XHY on 2017/2/10.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>
#import "BMUploadImageModel.h"

@interface BMUploadImageUtils : NSObject

/** 拍照后返回本地的图片地址 */
- (void)camera:(BMUploadImageModel *)info weexInstance:(WXSDKInstance *)weexInstance callback:(WXModuleCallback)callback;

/** 从相册选择照片返回本地的地址 */
- (void)pick:(BMUploadImageModel *)info weexInstance:(WXSDKInstance *)weexInstance callback:(WXModuleCallback)callback;

/** 拍照或者从相册选择图片后直接上传服务器后返回 url */
- (void)uploadImageWithInfo:(BMUploadImageModel *)info weexInstance:(WXSDKInstance *)weexInstance callback:(WXModuleCallback)callback;


/**
 上传图片 支持多张

 @param images 图片
 @param callback 回调
 */
- (void)uploadImage:(NSArray *)images uploadImageModel:(BMUploadImageModel *)info callback:(WXModuleCallback)callback;

@end
