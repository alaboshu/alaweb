//
//  BMShareModel.h
//  BM-JYT
//
//  Created by XHY on 2017/2/27.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <YYModel.h>

typedef NS_ENUM(NSInteger,BMSharePlarformType) {
    BMSharePlarformType_Sina = 0,
    BMSharePlarformType_WechatSession,
    BMSharePlarformType_WechatTimeLine,
    BMSharePlarformType_WechatFavorite,
    BMSharePlarformType_QQ,
    BMSharePlarformType_Qzone,
    
    BMSharePlarformType_Pasteboard = 1001,
    BMSharePlarformType_FontSize = 1002
};

#define K_SharePlarformSina                 @"Sina"
#define K_SharePlarformWechatSession        @"WechatSession"
#define K_SharePlarformWechatTimeLine       @"WechatTimeLine"
#define K_SharePlarformWechatFavorite       @"WechatFavorite"
#define K_SharePlarformQQ                   @"QQ"
#define K_SharePlarformQzone                @"Qzone"
#define K_SharePlarformPasteboard           @"Pasteboard"
#define K_SharePlarformFontSize             @"FontSize"

@interface BMShareModel : NSObject

@property (nonatomic, copy) NSString *image;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSString *content;
@property (nonatomic, copy) NSString *url;
@property (nonatomic, strong) NSArray *platforms;   // 分享的平台

+ (NSDictionary *)allPlarform;

@end
