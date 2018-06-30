//
//  JYTBoldTitleLabel.m
//  JingYitong
//
//  Created by XHY on 15/9/21.
//  Copyright © 2015年 京医通. All rights reserved.
//

#import "JYTBoldTitleLabel.h"
#import "BMDefine.h"

@implementation JYTBoldTitleLabel

- (id)init
{
    if (self = [super init]) {
        
        [self changeFontSize];
        
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(changeFontSize) name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
        
    }
    
    return self;
}

- (id)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        
        [self changeFontSize];
        
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(changeFontSize) name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
    }
    return self;
}

- (id)initWithCoder:(NSCoder *)aDecoder
{
    if (self = [super initWithCoder:aDecoder]) {
        
        [self changeFontSize];
        
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(changeFontSize) name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
    }
    return self;
}

- (void)awakeFromNib
{
    [super awakeFromNib];
    
    [self changeFontSize];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(changeFontSize) name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
}

- (void)changeFontSize
{
    NSString *fontSize = [[NSUserDefaults standardUserDefaults] objectForKey:K_FONT_SIZE_KEY];
    // 标准字体
    if (!fontSize || [fontSize isEqualToString:K_FONT_SIZE_NORM])
    {
        self.font = [UIFont boldSystemFontOfSize:15];
    }
    else if ([fontSize isEqualToString:K_FONT_SIZE_BIG])
    {
        self.font = [UIFont boldSystemFontOfSize:18];
    }
    else if ([fontSize isEqualToString:k_FONT_SIZE_EXTRALARGE])
    {
        self.font = [UIFont boldSystemFontOfSize:21];
    }
}

+ (UIFont *)currentFont
{
    UIFont *font = K_FONT_15;
    NSString *fontSize = [[NSUserDefaults standardUserDefaults] objectForKey:K_FONT_SIZE_KEY];
    // 标准字体
    if (!fontSize || [fontSize isEqualToString:K_FONT_SIZE_NORM])
    {
        font = [UIFont boldSystemFontOfSize:15];
    }
    else if ([fontSize isEqualToString:K_FONT_SIZE_BIG])
    {
        font = [UIFont boldSystemFontOfSize:18];
    }
    else if ([fontSize isEqualToString:k_FONT_SIZE_EXTRALARGE])
    {
        font = [UIFont boldSystemFontOfSize:21];
    }
    return font;
}

- (void)dealloc
{
    // 销毁时移除通知
    [[NSNotificationCenter defaultCenter] removeObserver:self name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
}

@end
