//
//  HYAlertModel.h
//  BM-JYT
//
//  Created by XHY on 2017/3/3.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HYAlertModel : NSObject

@property (nonatomic, copy) NSString *title;                        // 标题
@property (nonatomic, copy) NSString *titleColor;                   // 标题颜色
@property (nonatomic, assign) NSTextAlignment titleAlign;           // 标题对齐方式
@property (nonatomic, copy) NSString *message;                      // 内容
@property (nonatomic, copy) NSString *messageColor;                 // 内容颜色
@property (nonatomic, assign) NSTextAlignment messageAlign;         // 内容对齐方式
@property (nonatomic, copy) NSString *okTitle;                      // 右边按钮文案
@property (nonatomic, copy) NSString *cancelTitle;                  // 左边按钮文案
@property (nonatomic, assign) Boolean isPrompt;
@property (nonatomic, copy) NSString *promptType;
@property (nonatomic, copy) NSString *promptPlaceholder;


@end
