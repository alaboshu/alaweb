//
//  CommonMacro.h
//  JingYitong
//
//  Created by XHY on 15/7/15.
//  Copyright (c) 2015年 京医通. All rights reserved.
//

#ifndef JingYitong_CommonMacro_h
#define JingYitong_CommonMacro_h

/* release 屏蔽 log */
#ifdef DEBUG
#define NSLog(...) NSLog(__VA_ARGS__)
#else
#define NSLog(...) {};
#endif




#ifndef    weakify
#if __has_feature(objc_arc)

#define weakify( x ) \
_Pragma("clang diagnostic push") \
_Pragma("clang diagnostic ignored \"-Wshadow\"") \
autoreleasepool{} __weak __typeof__(x) __weak_##x##__ = x; \
_Pragma("clang diagnostic pop")

#else

#define weakify( x ) \
_Pragma("clang diagnostic push") \
_Pragma("clang diagnostic ignored \"-Wshadow\"") \
autoreleasepool{} __block __typeof__(x) __block_##x##__ = x; \
_Pragma("clang diagnostic pop")

#endif
#endif

#ifndef    strongify
#if __has_feature(objc_arc)

#define strongify( x ) \
_Pragma("clang diagnostic push") \
_Pragma("clang diagnostic ignored \"-Wshadow\"") \
try{} @finally{} __typeof__(x) x = __weak_##x##__; \
_Pragma("clang diagnostic pop")

#else

#define strongify( x ) \
_Pragma("clang diagnostic push") \
_Pragma("clang diagnostic ignored \"-Wshadow\"") \
try{} @finally{} __typeof__(x) x = __block_##x##__; \
_Pragma("clang diagnostic pop")

#endif
#endif




/** 颜色库 */
#define K_TEST_COLOR            [UIColor purpleColor]
#define K_GRADIENT_COLOR(alpha) [UIColor colorWithRed:233.0/255.0 green:233.0/255.0 blue:233.0/255.0 alpha:(alpha)]
#define K_CLEAR_COLOR           [UIColor clearColor]
#define K_RED_COLOR             [UIColor redColor]
#define K_YELLOW_COLOR          [UIColor yellowColor]
#define K_GREEN_COLOR           [UIColor greenColor]
#define K_WHITE_COLOR           [UIColor whiteColor]
#define K_BLACK_COLOR           [UIColor blackColor]
#define K_PURPLE_COLOR          [UIColor purpleColor]
#define K_DARK_GRAY_COLOR       [UIColor darkGrayColor]
#define K_LIGHT_GRAY_COLOR      [UIColor lightGrayColor]
#define K_DARK_TEXT_COLOR       [UIColor darkTextColor]

#define K_NAV_BAR_COLOR         UIColorFromValue(0x07ae9c)
#define K_BACKGROUND_COLOR      UIColorFromValue(0xeff3f4)
#define K_LINE_COLOR            UIColorFromValue(0xdfe1eb)
#define K_BUTTON_COLOR          UIColorFromValue(0x16d4b8)
#define K_TITLE_COLOR           UIColorFromValue(0x666666)
#define K_SUBTITLE_COLOR        UIColorFromValue(0x999999)
#define K_PLACEHOLDER_COLOR     UIColorFromValue(0xbfbfbf)
#define K_TEXT_LINK_COLOR       UIColorFromValue(0x45c4dd)
#define K_BUTTON_PURPLE_COLOR   UIColorFromValue(0xf37986)
#define K_PROGRESSBAR_COLOR     UIColorFromValue(0xffffff)



/** 字号 */
#define K_FONT_SMALL    [UIFont systemFontOfSize:10]
#define K_FONT_MIDDLE   [UIFont systemFontOfSize:12]
#define K_FONT_BIG      [UIFont systemFontOfSize:15]

#define K_FONT_10       [UIFont systemFontOfSize:10]
#define K_FONT_11       [UIFont systemFontOfSize:11]
#define K_FONT_12       [UIFont systemFontOfSize:12]
#define K_FONT_13       [UIFont systemFontOfSize:13]
#define K_FONT_14       [UIFont systemFontOfSize:14]
#define K_FONT_15       [UIFont systemFontOfSize:15]
#define K_FONT_16       [UIFont systemFontOfSize:16]
#define K_FONT_17       [UIFont systemFontOfSize:17]
#define K_FONT_18       [UIFont systemFontOfSize:18]
#define K_FONT_19       [UIFont systemFontOfSize:19]
#define K_FONT_20       [UIFont systemFontOfSize:20]
#define K_FONT_21       [UIFont systemFontOfSize:21]
#define K_FONT_22       [UIFont systemFontOfSize:22]
#define K_FONT_23       [UIFont systemFontOfSize:23]
#define K_FONT_24       [UIFont systemFontOfSize:24]
#define K_FONT_25       [UIFont systemFontOfSize:25]

/* 快速设置颜色 */
#define UIColorFromRGB(r,g,b) [UIColor colorWithRed:(float)r/255.0 green:(float)g/255.0 blue:(float)b/255.0 alpha:1.0]
#define UIColorFromValue(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

/** 获取屏幕物理高度 */
#define K_SCREEN_HEIGHT             [[UIScreen mainScreen]bounds].size.height
#define K_SCREEN_WIDTH              [[UIScreen mainScreen]bounds].size.width
#define K_STATUSBAR_HEIGHT (isIphoneX ? 44 : 20)
#define K_NAVBAR_HEIGHT 44
#define K_TOPBAR_HEIGHT (K_NAVBAR_HEIGHT + K_STATUSBAR_HEIGHT)
#define K_TABBAR_HEIGHT (isIphoneX ? 89 : 55)
#define K_TOUCHBAR_HEIGHT (isIphoneX ? 34 : 0)

/** 屏幕尺寸 */
#define isRetina  [[UIScreen mainScreen] scale] == 2
#define isIphone4 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] currentMode].size) : NO)
#define isIphone5 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size) : NO)
#define isIphone6 ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? (CGSizeEqualToSize(CGSizeMake(750, 1334), [[UIScreen mainScreen] currentMode].size) || CGSizeEqualToSize(CGSizeMake(640, 1136), [[UIScreen mainScreen] currentMode].size)) : NO)
#define isIphone6Plus ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? (CGSizeEqualToSize(CGSizeMake(1125, 2001), [[UIScreen mainScreen] currentMode].size) || CGSizeEqualToSize(CGSizeMake(1242, 2208), [[UIScreen mainScreen] currentMode].size)) : NO)
#define isIphoneX ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO)
#define isIpad ([[UIDevice currentDevice].model rangeOfString:@"iPad"].location != NSNotFound)

/** 当前设备版本号 */
#define K_SYSTEM_VERSION      [[[UIDevice currentDevice] systemVersion] floatValue]

/* 当前app版本信息 */
#define K_APP_VERSION         [[NSBundle mainBundle].infoDictionary objectForKey:@"CFBundleShortVersionString"]
/* app build version */
#define K_AppBuild_VERSION    [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"]


CG_INLINE void BM_SetUserDefaultData(NSString *key,id value) {
    
    if (!key || !value) {
        return;
    }
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:key];
    [[NSUserDefaults standardUserDefaults] synchronize];
}
CG_INLINE id BM_GetUserDefaultData(NSString *key) {
    if (!key) {
        return nil;
    }
    return [[NSUserDefaults standardUserDefaults] objectForKey:key];
}

#endif
