//
//  BMModalModule.m
//  WeexDemo
//
//  Created by XHY on 2017/1/23.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMModalModule.h"
#import "HYAlertView.h"
#import <SVProgressHUD.h>
#import "HYAlertModel.h"
#import <YYModel/YYModel.h>

@implementation BMModalModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(alert:callback:))
WX_EXPORT_METHOD(@selector(confirm:cancelCallback:okCallback:))
WX_EXPORT_METHOD(@selector(showLoading:))
WX_EXPORT_METHOD(@selector(toast:))
WX_EXPORT_METHOD(@selector(hideLoading))

- (void)showAlertWithModel:(HYAlertModel *)model cancelCallback:(WXModuleCallback)cancelCallback okCallback:(WXModuleCallback)okCallback
{
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:model.title message:model.message preferredStyle:UIAlertControllerStyleAlert];
    
    if (model.cancelTitle.length) {
        UIAlertAction *cancel = [UIAlertAction actionWithTitle:model.cancelTitle style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
           
            if (cancelCallback)
                cancelCallback(@"cancelCallback");
        }];
        
        [alert addAction:cancel];
    }
    
    if (model.okTitle.length) {
        UIAlertAction *ok = [UIAlertAction actionWithTitle:model.okTitle style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
            if (okCallback) {
                if (model.isPrompt) {
                    UITextField *textField = alert.textFields[0];
                    okCallback(textField.text);
                } else {
                    okCallback(@"okCallback");
                }
            }
        }];
        
        [alert addAction:ok];
    }
    if (model.isPrompt) {
        [alert addTextFieldWithConfigurationHandler: ^(UITextField *textField) {
            textField.placeholder = model.promptPlaceholder;
            if ([model.promptType isEqual: @"password"]) {
                textField.secureTextEntry = true;
                textField.clearButtonMode = UITextFieldViewModeWhileEditing;
            } else {
                textField.textContentType = UITextContentTypeName;
            }
        }];
    }
    [TK_CurrentVC() presentViewController:alert animated:YES completion:nil];
}

- (void)alert:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    HYAlertModel *model = [HYAlertModel yy_modelWithJSON:info];
    [self showAlertWithModel:model cancelCallback:nil okCallback:callback];
}

- (void)confirm:(NSDictionary *)info cancelCallback:(WXModuleCallback)cancelCallback okCallback:(WXModuleCallback)okCallback
{
    HYAlertModel *model = [HYAlertModel yy_modelWithJSON:info];
    [self showAlertWithModel:model cancelCallback:cancelCallback okCallback:okCallback];
}

- (void)showLoading:(NSDictionary *)info
{
    NSString *message = [NSString stringWithFormat:@"%@",info[@"message"]];
    
    message = message.length ? message : nil;
    
    [SVProgressHUD showWithStatus:message];
}

- (void)toast:(NSDictionary *)info
{
    NSString *message = [NSString stringWithFormat:@"%@",info[@"message"]];
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [SVProgressHUD showImage:nil status:message];
    });
}

- (void)hideLoading
{
    [SVProgressHUD dismiss];
}

@end
