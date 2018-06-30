//
//  WXSDKInstance+BMExtend.h
//  BM-JYT
//
//  Created by XHY on 2017/3/29.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WeexSDK.h>

@interface WXSDKInstance (BMExtend)

-(void)bm_destroyInstance;


- (void)_renderWithMainBundleString:(NSString *)mainBundleString;
- (void)bm__renderWithMainBundleString:(NSString *)mainBundleString;


@end
