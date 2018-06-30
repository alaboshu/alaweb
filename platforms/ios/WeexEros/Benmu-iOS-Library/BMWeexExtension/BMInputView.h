//
//  BMInputView.h
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/11.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <UIKit/UIKit.h>

@class BMInputView;

typedef NS_ENUM(NSInteger, BMInputTextType) {
    BMInputIDCardType, //默认从0开始
    BMInputOtherType
};

@interface BMInputView : UIView

-(instancetype)initWithInputType:(BMInputTextType)type;

@property (nonatomic,assign)UITextField * textFiled;

@end

