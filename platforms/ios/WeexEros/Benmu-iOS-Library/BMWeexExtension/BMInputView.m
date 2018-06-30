//
//  BMInputView.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/11.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMInputView.h"
#import <UIKit/UIKit.h>
#import "UIColor+Util.h"

#define SCREEN_SIZE [UIScreen mainScreen].bounds.size

#define  DELETE_KEY @"删除"


#define kLineWidth 0.5
#define kNumFont [UIFont systemFontOfSize:28]

@interface BMInputView()
{
    NSArray * _arrLetter;
    CGFloat _keyboardHeight;

}

@property (nonatomic,copy)NSString * leftBottomString;

@end


@implementation BMInputView

-(instancetype)initWithInputType:(BMInputTextType)type
{
    
   _keyboardHeight =  ([[UIScreen mainScreen] bounds].size.height > 667) ? (226) : (216);
    
    self = [super init];
    if (self) {
        self.bounds = CGRectMake(0, 0, SCREEN_SIZE.width, _keyboardHeight);
        //
       _arrLetter = [NSArray arrayWithObjects:@"ABC",@"DEF",@"GHI",@"JKL",@"MNO",@"PQRS",@"TUV",@"WXYZ", nil];
        
        
        switch (type) {
                case BMInputIDCardType:{
                        _leftBottomString = @"X";
                }
                
                break;
                
            default:
                break;
        }
        
        //
        for (int i=0; i<4; i++)
        {
            for (int j=0; j<3; j++)
            {
                UIButton *button = [self creatButtonWithX:i Y:j];
                [self addSubview:button];
            }
        }
        
        UIColor *color = [UIColor colorWithRed:188/255.0 green:192/255.0 blue:199/255.0 alpha:1];
//        //
        UIView *line1 = [[UIView alloc] initWithFrame:CGRectMake((SCREEN_SIZE.width/3)-2, 0, kLineWidth, _keyboardHeight)];
        line1.backgroundColor = color;
        [self addSubview:line1];
        
        UIView *line2 = [[UIView alloc] initWithFrame:CGRectMake((SCREEN_SIZE.width/3)*2 -kLineWidth+2, 0, kLineWidth, _keyboardHeight)];
        line2.backgroundColor = color;
        [self addSubview:line2];
        
        for (int i=0; i<3; i++)
        {
            UIView *line = [[UIView alloc] initWithFrame:CGRectMake(0, (_keyboardHeight/4)*(i+1), SCREEN_SIZE.width, kLineWidth)];
            line.backgroundColor = color;
            [self addSubview:line];
        }
        
    }
    return self;
}

-(UIButton *)creatButtonWithX:(NSInteger) x Y:(NSInteger) y
{
    
    NSInteger num = y+3*x+1;
    
    CGFloat frameW = SCREEN_SIZE.width/3;
    
    CGFloat frameY = (_keyboardHeight/4) * x;
    
    CGFloat frameH = (_keyboardHeight/4);
    
    UIButton *button =  [[UIButton alloc] initWithFrame:CGRectZero];
    CGFloat tmpWidth = 0;
    
    //键盘布局需要
    switch (y) {
        case 2:
        {
            button.frame = CGRectMake(frameW*2+2, frameY, frameW -2, frameH);
            tmpWidth = frameW -2;
            
            WXLogDebug(@"2  button.frame is %@",button);
        }
            break;
        case 1:
        {
            button.frame = CGRectMake(frameW-2 , frameY, frameW+4, frameH);
            WXLogDebug(@"1  button.frame is %@",button);
            tmpWidth = frameW +4;
        }
            break;
        case 0:
        {
            button.frame = CGRectMake(0, frameY, frameW -2, frameH);
            tmpWidth = frameW -2;
              WXLogDebug(@"0  button.frame is %@",button);
        }
            break;
            
        default:
            break;
    }
    
    button.tag = num;
    [button addTarget:self action:@selector(clickButton:) forControlEvents:UIControlEventTouchUpInside];
    
    UIColor *colorNormal = [UIColor colorWithRed:255/255.0 green:255/255.0 blue:255/255.0 alpha:1];
    
    
    UIColor *colorHightlighted = [UIColor colorWithHexString:@"#cfd4dd"];
    
    
    if (num == 10 || num == 12)
    {
        UIColor *colorTemp = colorNormal;
        colorNormal = colorHightlighted;
        colorHightlighted = colorTemp;
    }
    button.backgroundColor = colorNormal;
    CGSize imageSize = CGSizeMake(frameW, (_keyboardHeight/4));
    UIGraphicsBeginImageContextWithOptions(imageSize, 0, [UIScreen mainScreen].scale);
    [colorHightlighted set];
    UIRectFill(CGRectMake(0, 0, imageSize.width, imageSize.height));
    UIImage *pressedColorImg = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    [button setImage:pressedColorImg forState:UIControlStateHighlighted];
    
    
    
    if (num<10)
    {
        UILabel *labelNum = [[UILabel alloc] initWithFrame:CGRectMake(0, 7, tmpWidth, 28)];
        labelNum.text = [NSString stringWithFormat:@" %ld",(long)num];
        
        
        if (num == 2 || num == 5 || num == 8) {
             labelNum.text = [NSString stringWithFormat:@"%ld",(long)num];
        }
        
        
        labelNum.textColor = [UIColor blackColor];

        labelNum.textAlignment = NSTextAlignmentCenter;
        
        labelNum.font = kNumFont;
        
        [button addSubview:labelNum];
        
        
        if (num != 1)
        {
            UILabel *labelLetter = [[UILabel alloc] initWithFrame:CGRectMake(0, 34, tmpWidth, 16)];
            
            
            NSString *labelText = [NSString stringWithFormat:@"  %@",[_arrLetter objectAtIndex:num-2]];
            
            if (num == 2 || num == 5 || num == 8) {
                labelText = [_arrLetter objectAtIndex:num-2];
            }
            
            
            NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:labelText attributes:@{NSKernAttributeName:@(1)}];
            NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
            [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:NSMakeRange(0, [labelText length])];
            labelLetter.attributedText = attributedString;

            labelLetter.textColor = [UIColor blackColor];
           labelLetter.textAlignment = NSTextAlignmentCenter;
            
            labelLetter.font = [UIFont systemFontOfSize:11];
            
            [button addSubview:labelLetter];
            
            
            WXLogDebug(@"labelNum x is %f,labelNum y is %f",labelNum.centerX,labelNum.centerY);
            
            WXLogDebug(@"labelLetter x is %f,labelLetter y is %f",labelLetter.centerX,labelLetter.centerY);
            
            WXLogDebug(@"button x is %f,button y is %f",button.centerX,button.centerY);
            
            
            
            
        }
        
        
        
        
        
        
        
    }
    else if (num == 11)
    {
        UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 15, frameW, 28)];
        label.text = @"0";
        label.textColor = [UIColor blackColor];
        label.textAlignment = NSTextAlignmentCenter;
        label.font = kNumFont;
        [button addSubview:label];
    }
    else if (num == 10)
    {
        UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 15, frameW, 28)];
        label.text = _leftBottomString;
        label.textColor = [UIColor blackColor];
        label.font = kNumFont;
        label.textAlignment = NSTextAlignmentCenter;
        [button addSubview:label];
    }
    else
    {
        CGFloat arrowWidth = 24;
        CGFloat arrowHeight = 24;
        
        
        UIImageView *arrow = [[UIImageView alloc] initWithFrame:CGRectMake(frameW/2 -  arrowWidth/2, (_keyboardHeight/4)/2 - arrowHeight/2, arrowWidth, arrowHeight)];
        arrow.image = [UIImage imageNamed:@"arrowInKeyboard"];
        [button addSubview:arrow];
        
    }
    
    return button;
}


-(void)clickButton:(UIButton *)sender
{
    if (self.textFiled) {
        
        NSMutableString * string = [NSMutableString stringWithString:self.textFiled.text];
        
        if (sender.tag == 10)
        {
            [string appendString:_leftBottomString];
        }
        else if(sender.tag == 12)
        {
            if (string.length > 0) {
                [string deleteCharactersInRange:NSMakeRange(string.length-1, 1)];
            }
        }
        else
        {
            
            NSInteger num = sender.tag;
            if (sender.tag == 11)
            {
                num = 0;
            }
            
            [string appendString:[NSString stringWithFormat:@"%ld",(long)num]];
            
        }
        
        self.textFiled.text = string;
       
            [[NSNotificationCenter defaultCenter] postNotificationName:UITextFieldTextDidChangeNotification object:self.textFiled];

    }
}
@end
