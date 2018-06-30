//
//  HYPopupView.h
//  HYAlertView
//
//  Created by XHY on 16/1/12.
//  Copyright © 2016年 XHY. All rights reserved.
//

#ifndef HYPopupView_H
#define HYPopupView_H
#import <UIKit/UIKit.h>

#define kDefaultCenterPopupViewWidth ([UIScreen mainScreen].bounds.size.width - 30.0)
#define kDefaultPopupViewRowHeight 55.0
#define kDefaultCenterPopupViewHeight 300.0
//#define kDefaultPopupViewHeaderViewHeight 55.0
//#define kDefaultPopupViewFooterViewHeight 40.0

#define kDefaultPopupViewAnimationDuration 0.25

/**
 *  背景遮罩type
 */
typedef NS_ENUM(NSInteger, HYPopupViewMaskType) {
    /**
     *  透明遮罩 可点击移除弹框
     */
    HYPopupViewMaskClear = 0,
    /**
     *  半透明黑色遮罩 可点击移除弹窗
     */
    HYPopupViewMaskBlack
};

@class HYPopupView;

@protocol HYPopupViewDataSource <NSObject>

@optional
- (NSInteger)numberOfRowInPopupView:(HYPopupView *)popupView;
- (UITableViewCell *)popupView:(HYPopupView *)popupView dequeueReusableCellInTableView:(UITableView *)tableView cellIdentifier:(NSString *)identifier atRow:(NSInteger)row;

@end

@protocol HYPopupViewDelegate <NSObject>

@optional
- (CGFloat)popupView:(HYPopupView *)popupView heightForRowAtIndex:(NSInteger)index;
- (CGFloat)heightForHeaderViewInPopupView:(HYPopupView *)popupView;
- (CGFloat)heightForFooterViewInPopupView:(HYPopupView *)popupView;
- (UIView *)headerViewForPopupView:(HYPopupView *)popupView;
- (UIView *)footerViewForPopupView:(HYPopupView *)popupView;
- (void)popupView:(HYPopupView *)popupView didSelectedRowAtIndex:(NSInteger)index;
- (HYPopupViewMaskType)maskTypeForPopupView:(HYPopupView *)popupView;
- (BOOL)canClickBackgroundView:(HYPopupView *)popupView;

@end

@interface HYPopupView : UIControl

@property (nonatomic, weak) id<HYPopupViewDataSource> dataSource;
@property (nonatomic, weak) id<HYPopupViewDelegate> delegate;

- (instancetype)initWithDataSource:(id)dataSource
                          delegate:(id)delegate;

- (void)show;
- (void)showInView:(UIView *)view;
- (void)dismiss;

@end

#endif