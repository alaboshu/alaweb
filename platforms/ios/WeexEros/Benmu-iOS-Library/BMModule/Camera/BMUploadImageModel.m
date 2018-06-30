//
//  BMUploadImageModel.m
//  BM-JYT
//
//  Created by XHY on 2017/3/8.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMUploadImageModel.h"

@implementation BMUploadImageModel

- (BOOL)modelCustomTransformFromDictionary:(NSDictionary *)dic {
    
    if (!_imageWidth) {
        _imageWidth = 800;
    }
    
    if ([_url isEqualToString:@""]) {
        _url = nil;
    }
    
    return YES;
}

@end
