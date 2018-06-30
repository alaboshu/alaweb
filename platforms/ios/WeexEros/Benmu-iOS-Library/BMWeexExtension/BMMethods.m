//
//  BMMethods.m
//  BM-JYT
//
//  Created by XHY on 2017/3/8.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMMethods.h"

#import <WeexSDK/WeexSDK.h>
#import <WeexSDK/WXRuleManager.h>

#import "WXBridgeManager+BMExtend.h"

#import "BMAddRuleManager.h"
#import "WXTextComponent+BMExtend.h"
#import "WXScrollerComponent+BMExtend.h"
#import "WXListComponent+BMExtend.h"
#import "WXRecyclerComponent+BMExtend.h"

#import <WeexSDK/WXTextInputComponent.h>
#import "WXImageComponent+BMExtend.h"
#import "BMGetEnvironment.h"
#import "WXSDKInstance+BMExtend.h"
#import <WXEditComponent+BMExtend.h>
#import <WXSDKEngine+BMExtend.h>
#import <WXWebComponent+BMExtend.h>
#import "BMDefine.h"


@implementation BMMethods

+(void)load
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        //设置默认字体为 默认
        NSString * currentFontSize = [[NSUserDefaults standardUserDefaults] valueForKey:K_FONT_SIZE_KEY];
        if (nil == currentFontSize) {
            [[NSUserDefaults standardUserDefaults] setObject:K_FONT_SIZE_NORM forKey:K_FONT_SIZE_KEY];
            [[NSUserDefaults standardUserDefaults] synchronize];
        }

        
        [[self class] exchangeWeexDefault];
        [[self class] exchangeWeexAddRule];
        [[self class] exchangeWeexInputComponent];
        [[self class] exchangeWeexEditComponent];
        [[self class] exchangeWeexTextComponent];
        [[self class] exchangeWeexScrollerComponent];
        [[self class] exchangeWXWebComponent];
//        [[self class] exchangeRecyclerComponent];
        
        [[self class] exchangeWeexPlaceholderImageComponent];
        [[self class] exchangeWeexContentImageComponent];
        
        [[self class] exchangeWeexGetEnvironment];

        [[self class] exchangeSDKInstance];
        
        [[self class] exchangeWXBridgeManager];

    });
}


+(void)exchangeWeexDefault
{
    /** 获取原始_registerDefaultHandlers方法 */
    Method originalM = class_getClassMethod([WXSDKEngine class], @selector(_registerDefaultHandlers));
    
    /** 获取自定义的bm_registerDefaultHandlers方法 */
    Method exchangeM = class_getClassMethod([WXSDKEngine class], @selector(bm_registerDefaultHandlers));
    
    /** 交换方法 */
    method_exchangeImplementations(originalM, exchangeM);

    
//    /** 获取原始_registerDefaultModules方法 */
//    originalM = class_getClassMethod([WXSDKEngine class], @selector(_registerDefaultModules));
//    
//    /** 获取自定义的bm_registerDefaultModules方法 */
//    exchangeM = class_getClassMethod([WXSDKEngine class], @selector(bm_registerDefaultModules));
//    
//    /** 交换方法 */
//    method_exchangeImplementations(originalM, exchangeM);
    
}
+(void)exchangeWeexAddRule
{
    /** 获取原始addRule方法 */
    Method originalM = class_getInstanceMethod([WXRuleManager class], @selector(addRule:rule:));
    
    /** 获取自定义的addRule方法 */
    Method exchangeM = class_getClassMethod([BMAddRuleManager class], @selector(addRule:rule:));
    
    /** 交换方法 */
    method_exchangeImplementations(originalM, exchangeM);
}
+(void)exchangeWeexInputComponent
{
    /** 获取原始addRule方法 */
    Method originalM = class_getInstanceMethod([WXEditComponent class], @selector(setType));
    
    /** 获取自定义的addRule方法 */
    Method exchangeM = class_getClassMethod([WXEditComponent class], @selector(bmSetType));
    
    /** 交换方法 */
    method_exchangeImplementations(originalM, exchangeM);
}

+ (void)exchangeWeexEditComponent
{
    /* 替换 WXEditComponent 的 setAutofocus 方法*/
    Method originalM1 = class_getInstanceMethod([WXEditComponent class], @selector(setAutofocus:));
    Method exchangeM1 = class_getInstanceMethod([WXEditComponent class], @selector(bmEdit_setAutofocus:));
    method_exchangeImplementations(originalM1, exchangeM1);
    
    originalM1 = class_getInstanceMethod([WXEditComponent class], @selector(initWithRef:type:styles:attributes:events:weexInstance:));
    exchangeM1 = class_getInstanceMethod([WXEditComponent class], @selector(bmEdit_initWithRef:type:styles:attributes:events:weexInstance:));
    method_exchangeImplementations(originalM1, exchangeM1);
    
    originalM1 = class_getInstanceMethod([WXEditComponent class], @selector(viewDidLoad));
    exchangeM1 = class_getInstanceMethod([WXEditComponent class], @selector(bmEdit_viewDidLoad));
    method_exchangeImplementations(originalM1, exchangeM1);
    
    originalM1 = class_getInstanceMethod([WXEditComponent class], @selector(keyboardWasShown:));
    exchangeM1 = class_getInstanceMethod([WXEditComponent class], @selector(bmEdit_keyboardWasShown:));
    method_exchangeImplementations(originalM1, exchangeM1);
    
//    /** 替换 WXWXEditComponent 的 textView 代理方法 */
//    Method originalM2 = class_getInstanceMethod([WXEditComponent class], @selector(textView:shouldChangeTextInRange:replacementText:));
//    Method exchangeM2 = class_getInstanceMethod([WXEditComponent class], @selector(bmEdit_textView:shouldChangeTextInRange:replacementText:));
//    method_exchangeImplementations(originalM2, exchangeM2);
}

+ (void)exchangeWeexTextComponent
{
    /* 替换 WXTextComponent 的初始化方法 */
    SEL oriSEL = @selector(initWithRef:type:styles:attributes:events:weexInstance:);
    Method originalM = class_getInstanceMethod([WXTextComponent class], oriSEL);
    SEL exchSEL = @selector(bmText_initWithRef:type:styles:attributes:events:weexInstance:);
    Method exchangeM = class_getInstanceMethod([WXTextComponent class], exchSEL);
    
    BOOL addSucc = class_addMethod([WXTextComponent class], oriSEL, method_getImplementation(exchangeM), method_getTypeEncoding(exchangeM));
    if (addSucc) {
        class_replaceMethod([WXTextComponent class], exchSEL, method_getImplementation(originalM), method_getTypeEncoding(originalM));
    } else {
        method_exchangeImplementations(originalM, exchangeM);
    }
}

+ (void)exchangeWeexScrollerComponent
{
    /* 替换 WXScrollerComponent 的初始化方法 */
    Method originalM = class_getInstanceMethod([WXScrollerComponent class], @selector(initWithRef:type:styles:attributes:events:weexInstance:));
    Method exchangeM = class_getInstanceMethod([WXScrollerComponent class], @selector(bmScroller_initWithRef:type:styles:attributes:events:weexInstance:));
    method_exchangeImplementations(originalM, exchangeM);
    
    /** 替换 WXScrollerComponent 的 scrollViewDidScroll 方法 */
    Method originalM2 = class_getInstanceMethod([WXScrollerComponent class], @selector(scrollViewDidScroll:));
    Method exchangeM2 = class_getInstanceMethod([WXScrollerComponent class], @selector(bmScroller_scrollViewDidScroll:));
    method_exchangeImplementations(originalM2, exchangeM2);
    
    /** 替换 WXScrollerComponent 的 loadView 方法 */
    Method originalM3 = class_getInstanceMethod([WXScrollerComponent class], @selector(loadView));
    Method exchangeM3 = class_getInstanceMethod([WXScrollerComponent class], @selector(bmScroller_loadView));
    method_exchangeImplementations(originalM3, exchangeM3);
    
    /** 替换 WXListComponent 的 loadView 方法 */
    Method originalM4 = class_getInstanceMethod([WXListComponent class], @selector(loadView));
    Method exchangeM4 = class_getInstanceMethod([WXScrollerComponent class], @selector(bmList_loadView));
    method_exchangeImplementations(originalM4, exchangeM4);
    
    /** 替换 WXScrollerComponent 的 viewDidLoad 方法 */
    Method originalM5 = class_getInstanceMethod([WXScrollerComponent class], @selector(viewDidLoad));
    Method exchangeM5 = class_getInstanceMethod([WXScrollerComponent class], @selector(bmScroller_viewDidLoad));
    method_exchangeImplementations(originalM5, exchangeM5);
}


+(void)exchangeWeexPlaceholderImageComponent
{
    /* 替换 WXImageComponent 的 updatePlaceHolderWithFailedBlock 方法 */
    SEL oriSEL = @selector(updatePlaceHolderWithFailedBlock:);
    Method originalM = class_getInstanceMethod([WXImageComponent class], oriSEL);
    SEL exchSEL = @selector(bm_updatePlaceHolderWithFailedBlock:);
    Method exchangeM = class_getInstanceMethod([WXImageComponent class], exchSEL);
    
    BOOL addSucc = class_addMethod([WXImageComponent class], oriSEL, method_getImplementation(exchangeM), method_getTypeEncoding(exchangeM));
    if (addSucc) {
        class_replaceMethod([WXImageComponent class], exchSEL, method_getImplementation(originalM), method_getTypeEncoding(originalM));
    } else {
        method_exchangeImplementations(originalM, exchangeM);
    }
}
+(void)exchangeWeexContentImageComponent
{
    /* 替换 WXImageComponent 的  updateContentImageWithFailedBlock 方法 */
    SEL oriSEL = @selector(updateContentImageWithFailedBlock:);
    Method originalM = class_getInstanceMethod([WXImageComponent class], oriSEL);
    SEL exchSEL = @selector(bm_updateContentImageWithFailedBlock:);
    Method exchangeM = class_getInstanceMethod([WXImageComponent class], exchSEL);
    
    BOOL addSucc = class_addMethod([WXImageComponent class], oriSEL, method_getImplementation(exchangeM), method_getTypeEncoding(exchangeM));
    if (addSucc) {
        class_replaceMethod([WXImageComponent class], exchSEL, method_getImplementation(originalM), method_getTypeEncoding(originalM));
    } else {
        method_exchangeImplementations(originalM, exchangeM);
    }
}
+(void)exchangeWeexGetEnvironment
{
    /** 获取原始_registerDefaultHandlers方法 */
    Method originalM = class_getClassMethod([WXUtility class], @selector(getEnvironment));
    
    /** 获取自定义的bm_registerDefaultHandlers方法 */
    Method exchangeM = class_getClassMethod([BMGetEnvironment class], @selector(bm_getEnvironment));
    
    /** 交换方法 */
    method_exchangeImplementations(originalM, exchangeM);
}
+(void)exchangeSDKInstance
{
    SEL oriSEL = @selector(destroyInstance);
    Method originalM = class_getInstanceMethod([WXSDKInstance class], oriSEL);
    SEL exchSEL = @selector(bm_destroyInstance);
    Method exchangeM = class_getInstanceMethod([WXSDKInstance class], exchSEL);
    
    BOOL addSucc = class_addMethod([WXSDKInstance class], oriSEL, method_getImplementation(exchangeM), method_getTypeEncoding(exchangeM));
    if (addSucc) {
        class_replaceMethod([WXSDKInstance class], exchSEL, method_getImplementation(originalM), method_getTypeEncoding(originalM));
    } else {
        method_exchangeImplementations(originalM, exchangeM);
    }
    
    
    oriSEL = @selector(_renderWithMainBundleString:);
    originalM = class_getInstanceMethod([WXSDKInstance class], oriSEL);
    
    exchSEL = @selector(bm__renderWithMainBundleString:);
    exchangeM = class_getInstanceMethod([WXSDKInstance class], exchSEL);
    
    addSucc = class_addMethod([WXSDKInstance class], oriSEL, method_getImplementation(exchangeM), method_getTypeEncoding(exchangeM));
    if (addSucc) {
        class_replaceMethod([WXSDKInstance class], exchSEL, method_getImplementation(originalM), method_getTypeEncoding(originalM));
    } else {
        method_exchangeImplementations(originalM, exchangeM);
    }

}
+ (void)exchangeWXBridgeManager
{
    /* 替换 WXBridgeManager 的fire方法 */
    Method originalM = class_getInstanceMethod([WXBridgeManager class], @selector(fireEvent:ref:type:params:domChanges:));
    Method exchangeM = class_getInstanceMethod([WXBridgeManager class], @selector(bm_fireEvent:ref:type:params:domChanges:));
    method_exchangeImplementations(originalM, exchangeM);
}

+ (void)exchangeWXWebComponent
{
    /* 替换 WXBridgeManager 的fire方法 */
    Method originalM = class_getInstanceMethod([WXWebComponent class], @selector(webViewDidFinishLoad:));
    Method exchangeM = class_getInstanceMethod([WXWebComponent class], @selector(bm_webViewDidFinishLoad:));
    method_exchangeImplementations(originalM, exchangeM);
    
    
    /* 替换 WXWebComponent 的viewDidLoad方法 */
    Method originalMViewDidLoad = class_getInstanceMethod([WXWebComponent class], @selector(viewDidLoad));
    Method exchangeMViewDidLoad = class_getInstanceMethod([WXWebComponent class], @selector(bm_viewDidLoad));
    method_exchangeImplementations(originalMViewDidLoad, exchangeMViewDidLoad);
    
    /* 替换 WXWebComponent 的setUrl方法 */
    Method originalMSetUrl = class_getInstanceMethod([WXWebComponent class], @selector(setUrl:));
    Method exchangeMSetUrl = class_getInstanceMethod([WXWebComponent class], @selector(bm_setUrl:));
    method_exchangeImplementations(originalMSetUrl, exchangeMSetUrl);
    
}

+ (void)exchangeRecyclerComponent
{
    /* 替换 WXRecyclerComponent 的loadView方法 */
    Method originalM = class_getInstanceMethod([WXRecyclerComponent class], @selector(loadView));
    Method exchangeM = class_getInstanceMethod([WXRecyclerComponent class], @selector(bmRecycler_loadView));
    method_exchangeImplementations(originalM, exchangeM);
}

@end
