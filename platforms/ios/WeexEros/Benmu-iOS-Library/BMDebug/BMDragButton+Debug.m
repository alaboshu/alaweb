//
//  BMDragButton+Debug.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/10.
//  Copyright © 2017年 XHY. All rights reserved.
//

#ifdef DEBUG
#import "BMDragButton+Debug.h"
#import "DebugSettingVC.h"
#import "BMBaseViewController.h"
#import "BMMediatorManager.h"
#import <UIKit/UIKit.h>
#import "BMResourceManager.h"
#import "Masonry.h"
#import "BMNavigationController.h"
#import <TBWXDevTool/WXDevTool.h>
#import "WXScannerVC.h"
#import "BMDebugManager.h"


@interface BMDragButton()<UIActionSheetDelegate>

@end


@implementation BMDragButton(Debug)

- (void)dealloc
{
    self.controller = nil;
}

+ (instancetype)debugButton
{
    CGRect rect  = [UIScreen mainScreen].bounds;
    
    CGRect frame = CGRectMake(10, CGRectGetHeight(rect) - 140, 80, 60);
    
    BMDragButton *btn = [[BMDragButton alloc] initWithFrame:frame];
    btn.backgroundColor = [UIColor blackColor];
    btn.alpha = 0.6;
    UILabel *lbl = [[UILabel alloc] init];
    lbl.textColor = K_WHITE_COLOR;
    lbl.text = @"Debug";
    lbl.font = K_FONT_14;
    btn.layer.cornerRadius = 8;
    [btn addSubview:lbl];
    
    [lbl mas_makeConstraints:^(MASConstraintMaker *make) {
        make.center.mas_equalTo(btn);
    }];
    
    [btn setDragEnable:YES];
    [btn setAdsorbEnable:YES];
    
    UITapGestureRecognizer *oneTap = [[UITapGestureRecognizer alloc] initWithTarget:btn action:@selector(showDebug)];
    [btn addGestureRecognizer:oneTap];
    
    UITapGestureRecognizer *twoTap = [[UITapGestureRecognizer alloc] initWithTarget:btn action:@selector(refreshWeex)];
    twoTap.numberOfTapsRequired = 2;
    twoTap.numberOfTouchesRequired = 1;
    [btn addGestureRecognizer:twoTap];
    
    [oneTap requireGestureRecognizerToFail:twoTap];
    
    return btn;
}

- (void)showDebug
{
    UIActionSheet *actionSheet = [[UIActionSheet alloc]
                                  initWithTitle:nil
                                  delegate:self
                                  cancelButtonTitle:@"Cancel"
                                  destructiveButtonTitle:nil
                                  otherButtonTitles:@"Setting",@"Refresh",@"Debug",
                                  nil];
    actionSheet.actionSheetStyle = UIActionSheetStyleBlackOpaque;
    
    
    UIViewController* topVC =  [[BMMediatorManager shareInstance] currentViewController];
    [actionSheet showInView:topVC.view];
    
}

- (void)refreshWeex
{
    [[BMDebugManager shareInstance] refreshWeex];
}

- (void)actionSheet:(UIActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex
{
    switch (buttonIndex) {
        case 0:
        {
            BMNavigationController * nav = [[BMNavigationController alloc] initWithRootViewController:[[DebugSettingVC alloc] init]];
            UIViewController* controller =  [[BMMediatorManager shareInstance] currentViewController];
            [controller presentViewController:nav animated:YES completion:nil];
        }
            break;
        case 1:
        {
            //刷新
            [self refreshWeex];
        }
            break;

        case 2:
        {
            if (TARGET_IPHONE_SIMULATOR) {
                UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil message:@"模拟器不支持此项功能，请使用真机调试" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles: nil];
                [alert show];
                return;
            }
            //扫一扫调试
            WXScannerVC *scanVc = [[WXScannerVC alloc] init];
            [[BMMediatorManager shareInstance].currentViewController.navigationController pushViewController:scanVc animated:YES];
//            UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"" message:@"开始调试之前请确保您已正确配置‘debugUrl’并已开启‘weex debug’调试窗口" preferredStyle:UIAlertControllerStyleAlert];
//            UIAlertAction *cancel = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:nil];
//            UIAlertAction *ok = [UIAlertAction actionWithTitle:@"Debug" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
//                [WXDevTool launchDevToolDebugWithUrl:TK_PlatformInfo().url.debugServer];
//            }];
//            [alert addAction:cancel];
//            [alert addAction:ok];
//            [[BMMediatorManager shareInstance].currentViewController presentViewController:alert animated:YES completion:nil];
     }
            break;
        default:
            break;
    }
}
@end
#endif
