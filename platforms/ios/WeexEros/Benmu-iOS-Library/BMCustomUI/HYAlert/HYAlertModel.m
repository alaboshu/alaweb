//
//  HYAlertModel.m
//  BM-JYT
//
//  Created by XHY on 2017/3/3.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "HYAlertModel.h"

@implementation HYAlertModel

- (BOOL)modelCustomTransformFromDictionary:(NSDictionary *)dic {
    
    NSString *titleAlign = dic[@"titleAlign"];
    if ([titleAlign isEqualToString:@"right"]) {
        _titleAlign = NSTextAlignmentRight;
    } else if ([titleAlign isEqualToString:@"left"]) {
        _titleAlign = NSTextAlignmentLeft;
    } else {
        _titleAlign = NSTextAlignmentCenter;
    }
    
    NSString *messageAlign = dic[@"messageAlign"];
    if ([messageAlign isEqualToString:@"right"]) {
        _messageAlign = NSTextAlignmentRight;
    } else if ([messageAlign isEqualToString:@"left"]) {
        _messageAlign = NSTextAlignmentLeft;
    } else {
        _messageAlign = NSTextAlignmentCenter;
    }
    
    return YES;
}

@end
