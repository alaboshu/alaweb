//
//  WXEditComponent+BMExtend.m
//  Pods
//
//  Created by XHY on 2017/4/24.
//
//

#import "WXEditComponent+BMExtend.h"
#import "WXEditComponent_Private.h"
#import "BMInputView.h"
#import "WXTextInputComponent.h"
#import "WXTextAreaComponent.h"

const void *_tintColor = @"_tintColor";

const char *  inputTypeKey = "_inputType";
const char *  inputViewKey = "inputView";

NSString *_returnEventKey = @"returnEvent";
NSString *_returnKeyTypeKey = @"returnKeyType";



const char *  _datePickerManagerKey = "_datePickerManager";

const char *  _attrKey = "_attr";

@implementation WXEditComponent (BMExtend)

- (nullable id)valueForUndefinedKey:(NSString *)key
{
    return nil;
}

- (instancetype)bmEdit_initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    // 解析 tintColor
    if (styles[@"tintColor"]) {
        UIColor *tintColor = [WXConvert UIColor:styles[@"tintColor"]];
        if (tintColor) objc_setAssociatedObject(self, _tintColor, tintColor, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    
    return [self bmEdit_initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
}

- (void)bmEdit_viewDidLoad
{
    // 获取 tintColor
    id tintColor = objc_getAssociatedObject(self, _tintColor);
    if (tintColor && [tintColor isKindOfClass:[UIColor class]]) {
        UIView * view = self.view;
        view.tintColor = tintColor;
    }
    
    [self bmEdit_viewDidLoad];
}

- (void)bmEdit_setAutofocus:(BOOL)b
{
    /* autofocus 弹出键盘有个动画问题 延时 0.5 秒执行弹出键盘方法 */
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self bmEdit_setAutofocus:b];
    });
}

- (BOOL)bmEdit_textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text
{
    if ([text isEqualToString:@"\n"]) {
        NSString *typeStr = [WXUtility returnKeyType:[[self valueForKey:_returnKeyTypeKey] integerValue]];
        if ([[self valueForKey:_returnEventKey] boolValue]) {
            [self fireEvent:@"return" params:@{@"value":[textView text],@"returnKeyType":typeStr} domChanges:@{@"attrs":@{@"value":[textView text]}}];
        }
        if(typeStr.length > 0 && ![@"default" isEqualToString:typeStr]){
            if (self.view) {
                [self.view resignFirstResponder];
            }
            return NO;
        }
    }

    /* 60002 ⬇️*/
    NSInteger maxlength = [[self valueForKey:@"maxLength"] integerValue];
    if (maxlength <= 0) return YES;
    
    if ([text isEqualToString:@""] || text.length == 0) {
        return YES;
    }
    
    /* newText = 当前的text - 将要被替换的text */
    NSString *newText = [textView.text stringByReplacingOccurrencesOfString:[textView.text substringWithRange:range] withString:@""];
    /* 本次输入完完整的text */
    NSString *allText = [newText stringByAppendingString:text];
    
    return allText.length <= maxlength;
    
    /* 下面是按字符算的 */
    //    NSUInteger  character = 0;
    //    for (int i=0; i< [allText length]; i++) {
    //        int a = [allText characterAtIndex:i];
    //        if ( a >= 0x4e00 && a <= 0x9fa5) { //判断是否为中文
    //            character += 2;
    //        }else{
    //            character += 1;
    //        }
    //
    //        if (character > _maxlength) {
    //            return NO;
    //            break;
    //        }
    //    }
    //    
    //    return YES;
    
    /* 60002 ⬆️*/
}
+(void)bmSetType
{
//    [self setKeyboardType:UIKeyboardTypeDefault];
//    [self setSecureTextEntry:NO];
//    
//    if ([_inputType isEqualToString:@"text"]) {
//        [self setKeyboardType:UIKeyboardTypeDefault];
//    }else if ([_inputType isEqualToString:@"password"]) {
//        [self setSecureTextEntry:YES];
//    }else if ([_inputType isEqualToString:@"tel"]) {
//        [self setKeyboardType:UIKeyboardTypePhonePad];
//    }else if ([_inputType isEqualToString:@"email"]) {
//        [self setKeyboardType:UIKeyboardTypeEmailAddress];
//    }else if ([_inputType isEqualToString:@"url"]) {
//        [self setKeyboardType:UIKeyboardTypeURL];
//    }else if ([self isDateType]) {
//        if (!_datePickerManager) {
//            _datePickerManager = [[WXDatePickerManager alloc] init];
//            _datePickerManager.delegate = self;
//        }
//        [_datePickerManager updateDatePicker:_attr];
//    }

    
    
    
    
    
    WXEditComponent * inputComponent = (WXEditComponent*)self;
    [inputComponent setKeyboardType:UIKeyboardTypeDefault];
    [inputComponent setSecureTextEntry:NO];

    Ivar inputTypeIvar = class_getInstanceVariable([WXEditComponent class], inputTypeKey);
    
    NSString * _inputType  = object_getIvar(inputComponent, inputTypeIvar);
    
    
    Ivar dataPickerManagerIvar = class_getInstanceVariable([WXEditComponent class], _datePickerManagerKey);
    
    WXDatePickerManager * _datePickerManager  = object_getIvar(inputComponent, dataPickerManagerIvar);
    
    
    Ivar attrIvar = class_getInstanceVariable([WXEditComponent class], _attrKey);
    
    NSDictionary * _attr  = object_getIvar(inputComponent, attrIvar);
    

    
        if ([_inputType isEqualToString:@"text"]) {
            [inputComponent setKeyboardType:UIKeyboardTypeDefault];
        }else if ([_inputType isEqualToString:@"password"]) {
            [inputComponent setSecureTextEntry:YES];
        }else if ([_inputType isEqualToString:@"tel"]) {
            [inputComponent setKeyboardType:UIKeyboardTypePhonePad];
        }else if ([_inputType isEqualToString:@"email"]) {
            [inputComponent setKeyboardType:UIKeyboardTypeEmailAddress];
        }else if ([_inputType isEqualToString:@"url"]) {
            [inputComponent setKeyboardType:UIKeyboardTypeURL];
        }
        else if ([_inputType isEqualToString:@"number"]){
            [inputComponent setKeyboardType:UIKeyboardTypeDecimalPad];
        }
        else if ([_inputType isEqualToString:@"idCard"]){
            
            if ([inputComponent isKindOfClass:[WXTextInputComponent class]] || [inputComponent isKindOfClass:[WXTextAreaComponent class]]) {
                
                objc_property_t inputViewProperty = class_getProperty([WXTextInputComponent class], inputViewKey);
                
                NSString * inputViewPName = [[NSString alloc] initWithCString:property_getName(inputViewProperty) encoding:NSUTF8StringEncoding];
                
                UITextField * _inputView = [self valueForKey:inputViewPName];
                
                BMInputView * bmKeyboard = [[BMInputView alloc] initWithInputType:BMInputIDCardType];
                bmKeyboard.textFiled = _inputView;
                _inputView.inputView = bmKeyboard;
                
            }
        }
        else if ([inputComponent isDateType]) {
                if (!_datePickerManager) {
                    _datePickerManager = [[WXDatePickerManager alloc] init];
                    _datePickerManager.delegate = self;
                }
                [_datePickerManager updateDatePicker:_attr];
        }
}

- (void)bmEdit_keyboardWasShown:(NSNotification*)notification
{
    if(![self.view isFirstResponder]) {
        return;
    }
    CGRect begin = [[[notification userInfo] objectForKey:@"UIKeyboardFrameBeginUserInfoKey"] CGRectValue];
    
    CGRect end = [[[notification userInfo] objectForKey:@"UIKeyboardFrameEndUserInfoKey"] CGRectValue];
    
    CGSize keyboardSize = keyboardSize = end.size;
    [self setValue:[NSValue valueWithCGSize:keyboardSize] forKey:@"keyboardSize"];
    UIView * rootView = self.weexInstance.rootView;
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGRect keyboardRect = (CGRect){
        .origin.x = 0,
        .origin.y = CGRectGetMaxY(screenRect) - keyboardSize.height - 54,
        .size = keyboardSize
    };
    
    CGRect inputFrame = [self.view.superview convertRect:self.view.frame toView:rootView];
    if (keyboardRect.origin.y - inputFrame.size.height <= inputFrame.origin.y) {
        if ([self respondsToSelector:@selector(setViewMovedUp:)]) {
            [self setViewMovedUp:YES];
        }
        self.weexInstance.isRootViewFrozen = YES;
    }
    
    if ([[self valueForKey:@"keyboardEvent"] boolValue]) {
        [self fireEvent:@"keyboard" params:@{ @"isShow": @YES }];
    }
}

@end
