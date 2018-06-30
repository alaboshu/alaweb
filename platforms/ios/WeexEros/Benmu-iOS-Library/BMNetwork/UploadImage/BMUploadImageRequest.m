//
//  BMUploadImageRequest.m
//  WeexDemo
//
//  Created by XHY on 2017/2/10.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMUploadImageRequest.h"
#import <AFURLRequestSerialization.h>

@interface BMUploadImageRequest ()

@property (nonatomic, strong) BMUploadImageModel *imageModel;

@end

@implementation BMUploadImageRequest

- (instancetype)initWithImage:(UIImage *)image uploadImageModel:(BMUploadImageModel *)imageModel
{
    if (self = [super init]) {
        _image = image;
        _imageModel = imageModel;
    }
    return self;
}

- (YTKRequestMethod)requestMethod
{
    return YTKRequestMethodPOST;
}

- (NSString *)baseUrl
{
    return nil;
}

/** 添加自定义 Headers */
- (NSDictionary *)requestHeaderFieldValueDictionary
{
    if (self.imageModel.header) {
        return self.imageModel.header;
    }
    return nil;
}

- (NSString *)requestUrl
{
    return self.imageModel.url ?: TK_PlatformInfo().url.image;
}

- (AFConstructingBlock)constructingBodyBlock {
    return ^(id<AFMultipartFormData> formData) {
        NSData *data = UIImageJPEGRepresentation(_image, 0.8);
        NSString *name = @"picture.jpg";
        NSString *formKey = @"file";
        NSString *type = @"image/jpeg";
        [formData appendPartWithFileData:data name:formKey fileName:name mimeType:type];
    };
}

- (id)requestArgument
{
    return self.imageModel.params;
}

@end
