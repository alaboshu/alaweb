//
//  WXEditComponent+BMExtend.h
//  Pods
//
//  Created by XHY on 2017/4/24.
//
//

#import <WeexSDK/WeexSDK.h>
#import <WXEditComponent.h>

@interface WXEditComponent (BMExtend)

- (instancetype)bmEdit_initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance;

- (void)bmEdit_viewDidLoad;

- (void)setAutofocus:(BOOL)b;
- (void)bmEdit_setAutofocus:(BOOL)b;

- (BOOL)bmEdit_textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text;

- (void)setType;
-(void)bmSetType;

- (void)setViewMovedUp:(BOOL)movedUp;
- (void)keyboardWasShown:(NSNotification*)notification;
- (void)bmEdit_keyboardWasShown:(NSNotification*)notification;

@end
