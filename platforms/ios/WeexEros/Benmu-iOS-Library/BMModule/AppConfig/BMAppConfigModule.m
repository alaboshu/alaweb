//
//  BMAppConfigModule.m
//  BM-JYT
//
//  Created by XHY on 2017/3/13.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMAppConfigModule.h"

@implementation BMAppConfigModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(changeFontSize:callback:))
WX_EXPORT_METHOD(@selector(getFontSize:))

- (void)changeFontSize:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    NSString *fontSize = info[@"fontSize"];
    NSString *scale = @"1";
    
    if (!fontSize || [fontSize isEqualToString:@"NORM"]) {
        [self _changeFontSizeWithSize:K_FONT_SIZE_NORM];
    } else if ([fontSize isEqualToString:@"BIG"]) {
        [self _changeFontSizeWithSize:K_FONT_SIZE_BIG];
        scale = [NSString stringWithFormat:@"%f",K_FontSizeBig_Scale];
    } else if ([fontSize isEqualToString:@"EXTRALARGE"]) {
        [self _changeFontSizeWithSize:k_FONT_SIZE_EXTRALARGE];
        scale = [NSString stringWithFormat:@"%f",K_FontSizeExtralarge_Scale];
    } else {
        WXLogError(@"fontSize 字段错误 %@",info[@"fontSize"]);
    }
    
    if (callback) {
        NSDictionary *data = @{@"fontSize": fontSize, @"scale": scale};
        NSDictionary *resultDic = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:nil data:data];
        callback(resultDic);
    }
    
}

- (void)getFontSize:(WXModuleCallback)callback
{
    NSString *currentFontSize = [[NSUserDefaults standardUserDefaults] valueForKey:K_FONT_SIZE_KEY];
    NSString *fontSize = @"NORM";
    NSString *scale = @"1";
    if ([currentFontSize isEqualToString:K_FONT_SIZE_BIG]) {
        fontSize = @"BIG";
        scale = [NSString stringWithFormat:@"%f",K_FontSizeBig_Scale];
    } else if ([currentFontSize isEqualToString:k_FONT_SIZE_EXTRALARGE]) {
        fontSize = @"EXTRALARGE";
        scale = [NSString stringWithFormat:@"%f",K_FontSizeExtralarge_Scale];
    }
    
    NSDictionary *data = @{@"fontSize": fontSize, @"scale": scale};
    NSDictionary *resultDic = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:nil data:data];
    if (callback) {
        callback(resultDic);
    }
}

- (void)_changeFontSizeWithSize:(NSString *)size
{
    [[NSUserDefaults standardUserDefaults] setValue:size forKey:K_FONT_SIZE_KEY];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    [[NSNotificationCenter defaultCenter] postNotificationName:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
}

@end
