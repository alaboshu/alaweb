//
//  UIWebView+BMExtend.m
//  Pods
//
//  Created by XHY on 2017/6/30.
//
//

#import "UIWebView+BMExtend.h"

@implementation UIWebView (BMExtend)

- (void)checkCurrentFontSize
{
    NSNumber *level = [[NSUserDefaults standardUserDefaults] objectForKey:K_WebView_FontSize];
    if (!level) {
        return;
    }
    
    NSUInteger currentLevel = [level unsignedIntegerValue];
    
    NSInteger fontSize = 100 + currentLevel * 5 - 5;
    NSString *jsStr = [NSString stringWithFormat:@"document.getElementsByTagName('body')[0].style.webkitTextSizeAdjust= '%ld%%'",(long)fontSize];
    [self stringByEvaluatingJavaScriptFromString:jsStr];
}

@end
