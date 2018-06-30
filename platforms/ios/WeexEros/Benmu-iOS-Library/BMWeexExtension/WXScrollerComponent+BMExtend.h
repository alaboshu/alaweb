//
//  WXScrollerComponent+BMExtend.h
//  BM-JYT
//
//  Created by XHY on 2017/3/20.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <WeexSDK/WeexSDK.h>
#import <WeexSDK/WXScrollerComponent.h>

@interface WXScrollerComponent (BMExtend)

- (instancetype)bmScroller_initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance;

- (void)bmScroller_scrollViewDidScroll:(UIScrollView *)scrollView;

- (UIView *)bmScroller_loadView;

- (UIView *)bmList_loadView;

- (void)bmScroller_viewDidLoad;

@end
