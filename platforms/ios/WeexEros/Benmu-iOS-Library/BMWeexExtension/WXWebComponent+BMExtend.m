//
//  WXWebComponent+BMExtend.m
//  Pods
//
//  Created by XHY on 2017/5/5.
//
//

#import "WXWebComponent+BMExtend.h"
#import <WeexSDK/WXUtility.h>
@class WXWebView;

@implementation WXWebComponent (BMExtend)

- (void)bm_webViewDidFinishLoad:(UIWebView *)webView
{
    [self bm_webViewDidFinishLoad:webView];
    
    CGFloat contentHeight = webView.scrollView.contentSize.height;
    
    CGFloat pixelScale = [WXUtility defaultPixelScaleFactor];
    
    contentHeight = contentHeight/(pixelScale*2);
    
    [self fireEvent:@"bmPageFinish" params:@{@"contentHeight": @(contentHeight)}];
}
- (void)bm_viewDidLoad
{
    [self bm_viewDidLoad];
    UIWebView * webview = (UIWebView *)self.view;
    webview.opaque = NO;
    webview.backgroundColor = [UIColor clearColor];
    
    if (self.attributes[@"scrollEnabled"] && NO == [self.attributes[@"scrollEnabled"] boolValue]) {
        webview.scrollView.scrollEnabled = NO;
    }

}

/** 修复如果url为 NSNull、或者nil的时候 崩溃的问题 weex没有做判断 */
- (void)bm_setUrl:(NSString *)url;
{
    if (![url isKindOfClass:[NSString class]]) {
        return;
    }
    
    [self bm_setUrl:url];
}

@end
