//
//  HYAlertViewManager.m
//  JingYitong
//
//  Created by XHY on 16/9/29.
//  Copyright © 2016年 京医通. All rights reserved.
//

#import "HYAlertViewManager.h"
@implementation HYAlertViewManager

- (void)setCurrentAlertView:(HYAlertView *)currentAlertView
{
    if (_currentAlertView) {
        [_currentAlertView dismiss];
    }
    _currentAlertView = currentAlertView;
}

+ (instancetype)shareInstance
{
    static HYAlertViewManager *_instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (!_instance) {
            _instance = [[HYAlertViewManager alloc] init];
        }
    });
    return _instance;
}

@end
