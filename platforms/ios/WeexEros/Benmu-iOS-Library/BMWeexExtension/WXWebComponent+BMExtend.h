//
//  WXWebComponent+BMExtend.h
//  Pods
//
//  Created by XHY on 2017/5/5.
//
//

#import <WeexSDK/WeexSDK.h>
#import <WXWebComponent.h>

@interface WXWebComponent (BMExtend)

- (void)bm_webViewDidFinishLoad:(UIWebView *)webView;

- (void)bm_viewDidLoad;

- (void)setUrl:(NSString *)url;
- (void)bm_setUrl:(NSString *)url;

@end
