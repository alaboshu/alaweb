//
//  WXWebViewModule+Private.m
//  Pods
//
//  Created by 窦静轩 on 2017/5/3.
//
//

#import "WXWebViewModule+Private.h"
#import <objc/runtime.h>

const char * webViewKey = "webview";


@implementation WXWebViewModule(BMExtend)

WX_EXPORT_METHOD(@selector(evaluateScriptEleRef:jsCode:callback:))

-(void)evaluateScriptEleRef:(NSString*)elemRef jsCode:(NSString*)jsCode callback:(WXModuleCallback)callback
{
    [self performBlockWithWebView:elemRef block:^void (WXWebComponent *webCoponent) {
        
        objc_property_t webViewProperty = class_getProperty([WXWebComponent class], webViewKey);
        
        NSString *webViewPName = [[NSString alloc] initWithCString:property_getName(webViewProperty) encoding:NSUTF8StringEncoding];
        
        id webViewValue = [webCoponent valueForKey:webViewPName];
        if ([webViewValue isKindOfClass:[UIWebView class]]) {
            NSString * callbackString = [(UIWebView*)webViewValue stringByEvaluatingJavaScriptFromString:jsCode];
            if (callbackString) {
                if (callback) {
                    callback(callbackString);
                }
            }
        }
    
    }];
}

@end
