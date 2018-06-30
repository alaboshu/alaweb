//
//  WXEditComponent_Private.h
//  Pods
//
//  Created by 窦静轩 on 2017/4/24.
//
//

#import <WeexSDK/WeexSDK.h>

@interface WXEditComponent ()
-(void)setType;
-(void)setKeyboardType:(UIKeyboardType)keyboardType;
-(void)setSecureTextEntry:(BOOL)secureTextEntry;
- (BOOL)isDateType;
@end
