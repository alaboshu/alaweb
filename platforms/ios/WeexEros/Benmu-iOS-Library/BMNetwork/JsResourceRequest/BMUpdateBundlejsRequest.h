//
//  BMUpdateBundlejsRequest.h
//  WeexDemo
//
//  Created by XHY on 2017/1/10.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMBaseRequest.h"

@interface BMUpdateBundlejsRequest : BMBaseRequest

- (instancetype)initWithDownloadJSUrl:(NSString *)downloadUrl;


/**
 将当前下载的临时文件信息保存到指定目录 以便下次继续断点续传
 */
- (void)saveIncompleteDownloadTempData;

@end
