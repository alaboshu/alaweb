//
//  BMImageManager.h
//  WeexDemo
//
//  Created by XHY on 2017/2/10.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>
#import "BMUploadImageModel.h"

@interface BMImageManager : NSObject

+ (void)camera:(BMUploadImageModel *)model weexInstance:(WXSDKInstance *)weexInstance callback:(WXModuleCallback)callback;

+ (void)pick:(BMUploadImageModel *)model weexInstance:(WXSDKInstance *)weexInstance callback:(WXModuleCallback)callback;

+ (void)uploadImageWithInfo:(BMUploadImageModel *)model weexInstance:(WXSDKInstance *)weexInstance callback:(WXModuleCallback)callback;

+ (void)uploadImage:(NSArray *)images uploadImageModel:(BMUploadImageModel *)model callback:(WXModuleCallback)callback;

@end
