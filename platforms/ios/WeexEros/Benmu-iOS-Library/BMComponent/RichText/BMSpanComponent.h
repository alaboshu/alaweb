//
//  BMSpanComponent.h
//  Pods
//
//  Created by XHY on 2017/6/14.
//
//

#import <WeexSDK/WeexSDK.h>

@interface BMSpanComponent : WXComponent

@property (nonatomic, copy) NSString *text;
@property (nonatomic, strong) UIColor *textColor;
@property (nonatomic, assign) CGFloat fontSize;
@property (nonatomic, copy) NSString *fontFamily;
@property (nonatomic, assign) CGFloat fontWeight;
@property (nonatomic, assign) WXTextStyle fontStyle;
@property (nonatomic, assign) WXTextDecoration textDecoration;

@property (nonatomic, assign) BOOL clickEvent;

@end
