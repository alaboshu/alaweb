//
//  BMShareModel.m
//  BM-JYT
//
//  Created by XHY on 2017/2/27.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMShareModel.h"

@implementation BMShareModel

- (BOOL)modelCustomTransformFromDictionary:(NSDictionary *)dic {
    
    /* 如果js没有传平台，添加默认分享平台：
     1.剪切板、
     2.微信聊天、
     3.微信朋友圈
     后续根据需求在扩展 */
    if (!_platforms) {
        _platforms = @[K_SharePlarformPasteboard,K_SharePlarformWechatSession,K_SharePlarformWechatTimeLine];
    }
    
    return YES;
}

+ (NSDictionary *)allPlarform
{
    return @{
             K_SharePlarformSina: @(BMSharePlarformType_Sina),
             K_SharePlarformWechatSession: @(BMSharePlarformType_WechatSession),
             K_SharePlarformWechatTimeLine: @(BMSharePlarformType_WechatTimeLine),
             K_SharePlarformWechatFavorite: @(BMSharePlarformType_WechatFavorite),
             K_SharePlarformQQ: @(BMSharePlarformType_QQ),
             K_SharePlarformQzone: @(BMSharePlarformType_Qzone),
             K_SharePlarformPasteboard: @(BMSharePlarformType_Pasteboard),
             K_SharePlarformFontSize: @(BMSharePlarformType_FontSize)
             };
}

@end
