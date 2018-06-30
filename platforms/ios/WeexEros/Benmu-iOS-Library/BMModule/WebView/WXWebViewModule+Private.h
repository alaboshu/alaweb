//
//  WXWebViewModule+Private.h
//  Pods
//
//  Created by 窦静轩 on 2017/5/3.
//
//

#import <Foundation/Foundation.h>

#import <WeexSDK/WXWebViewModule.h>
#import <WeexSDK/WXWebComponent.h>
@class WXWebComponent;

@interface WXWebViewModule(BMExtend)


- (void)performBlockWithWebView:(NSString *)elemRef block:(void (^)(WXWebComponent *))block;

@end
