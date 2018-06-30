//
//  BMScreenshotEventManager.h
//  Pods
//
//  Created by XHY on 2017/5/12.
//
//

#import <Foundation/Foundation.h>

@interface BMScreenshotEventManager : NSObject

+ (instancetype)shareInstance;

/* 获取截屏的图片 */
- (UIImage *)snapshotImage;

/**
 开启监听截屏事件
 */
- (void)monitorScreenshotEvent;

@end
