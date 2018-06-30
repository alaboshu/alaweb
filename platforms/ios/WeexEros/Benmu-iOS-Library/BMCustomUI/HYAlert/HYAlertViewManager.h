//
//  HYAlertViewManager.h
//  JingYitong
//
//  Created by XHY on 16/9/29.
//  Copyright © 2016年 京医通. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HYAlertView.h"

@interface HYAlertViewManager : NSObject

@property (nonatomic, weak) HYAlertView *currentAlertView;

+ (instancetype)shareInstance;

@end
