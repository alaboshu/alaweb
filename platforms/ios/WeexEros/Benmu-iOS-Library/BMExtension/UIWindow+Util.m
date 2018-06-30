//
//  UIWindow+Util.m
//  Pods
//
//  Created by XHY on 2017/7/12.
//
//

#import "UIWindow+Util.h"

@implementation UIWindow (Util)

+ (UIWindow *)findVisibleWindow {
    
    UIWindow *visibleWindow = nil;
    
    // if the rootViewController property (available >= iOS 4.0) of the main window is set, we present the modal view controller on top of the rootViewController
    NSArray *windows = [[UIApplication sharedApplication] windows];
    for (UIWindow *window in windows) {
        if (!window.hidden && !visibleWindow) {
            visibleWindow = window;
        }
        if ([UIWindow instancesRespondToSelector:@selector(rootViewController)]) {
            if ([window rootViewController]) {
                visibleWindow = window;
                break;
            }
        }
    }
    
    return visibleWindow ?:[[UIApplication sharedApplication].delegate window];
}

@end
