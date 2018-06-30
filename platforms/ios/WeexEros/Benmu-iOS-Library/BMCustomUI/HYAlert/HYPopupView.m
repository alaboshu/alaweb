//
//  HYPopupView.m
//  HYAlertView
//
//  Created by XHY on 16/1/12.
//  Copyright © 2016年 XHY. All rights reserved.
//

#import "HYPopupView.h"
#import "BMDefine.h"

@interface HYPopupView () <UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, strong) UITableView *mTableView;
@property (nonatomic, assign) BOOL mIsShowing;

@end

@implementation HYPopupView

#pragma mark - Private method
- (instancetype)initWithDataSource:(id)dataSource
                          delegate:(id)delegate
{
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
    CGRect frame = CGRectMake(0.0, 0.0, screenBounds.size.width, screenBounds.size.height);
    
    if (self = [super initWithFrame:frame]) {
        
        self.dataSource = dataSource;
        self.delegate = delegate;
        self.mIsShowing = NO;
        
        [self initTableView];
        
        // 背景遮罩颜色
        if (self.delegate && [self.delegate respondsToSelector:@selector(maskTypeForPopupView:)]) {
            HYPopupViewMaskType maskType = [self.delegate maskTypeForPopupView:self];
            switch (maskType) {
                case HYPopupViewMaskClear: {
                    self.backgroundColor = [UIColor clearColor];
                    break;
                }
                case HYPopupViewMaskBlack: {
                    self.backgroundColor = [UIColor colorWithRed:.16 green:.17 blue:.21 alpha:.5];
                    break;
                }
            }
        } else {
            self.backgroundColor = [UIColor colorWithRed:.16 green:.17 blue:.21 alpha:.5];
        }
        
        
        // 是否添加背景点击手势
        if (self.delegate && [self.delegate respondsToSelector:@selector(canClickBackgroundView:)]) {
            if ([self.delegate canClickBackgroundView:self]) {
                [self addTarget:self action:@selector(dismiss) forControlEvents:UIControlEventTouchUpInside];
            }
        } else {
            [self addTarget:self action:@selector(dismiss) forControlEvents:UIControlEventTouchUpInside];
        }
    }
    
    return self;
}

- (void)initTableView
{
    self.mTableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStylePlain];
    self.mTableView.dataSource = self;
    self.mTableView.delegate = self;
    self.mTableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
    
    self.mTableView.separatorColor = [UIColor colorWithRed:222.0/255.0 green:222.0/255.0 blue:222.0/255.0 alpha:1.0];
    self.mTableView.bounces = NO;
    
    self.mTableView.layer.masksToBounds = NO;
    self.mTableView.layer.shadowOpacity = 1.0;
    self.mTableView.layer.shadowColor = [UIColor lightGrayColor].CGColor;
    [self.mTableView.layer setShadowOffset:CGSizeMake(1.0, 1.0)];
    self.mTableView.layer.shadowRadius = 5.0;
}

#pragma mark - UITableViewDataSource & UITableViewDelegate
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    if (self.dataSource && [self.dataSource respondsToSelector:@selector(numberOfRowInPopupView:)]) {
        return [self.dataSource numberOfRowInPopupView:self];
    }
    
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *__cellId = @"PopupViewCell";
    
    if (self.dataSource && [self.dataSource respondsToSelector:@selector(popupView:dequeueReusableCellInTableView:cellIdentifier:atRow:)]) {
       return [self.dataSource popupView:self dequeueReusableCellInTableView:self.mTableView cellIdentifier:__cellId atRow:indexPath.row];
    }
    
    return [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:__cellId];
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(popupView:heightForRowAtIndex:)]) {
        return [self.delegate popupView:self heightForRowAtIndex:indexPath.row];
    }
    
    return kDefaultPopupViewRowHeight;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(heightForHeaderViewInPopupView:)]) {
        return [self.delegate heightForHeaderViewInPopupView:self];
    }
    
    return 0.000001;
}

- (CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(heightForFooterViewInPopupView:)]) {
        return [self.delegate heightForFooterViewInPopupView:self];
    }
    return 0.000001;
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(headerViewForPopupView:)]) {
        return [self.delegate headerViewForPopupView:self];
    }
    return nil;
}

- (UIView *)tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(footerViewForPopupView:)]) {
        return [self.delegate footerViewForPopupView:self];
    }
    return nil;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
    if (self.delegate && [self.delegate respondsToSelector:@selector(popupView:didSelectedRowAtIndex:)]) {
        [self.delegate popupView:self didSelectedRowAtIndex:indexPath.row];
    }
}

#pragma mark - Public method
- (void)show
{
    if (self.mIsShowing) {
        return;
    }
    
    self.mIsShowing = YES;
    
    UIWindow *__kewWindow = [UIApplication sharedApplication].keyWindow;
    [__kewWindow addSubview:self];
    CGSize __winSize = [UIScreen mainScreen].bounds.size;
    
    CGFloat __rowHeight = kDefaultPopupViewRowHeight;
    if (self.delegate && [self.delegate respondsToSelector:@selector(popupView:heightForRowAtIndex:)]) {
        __rowHeight = [self.delegate popupView:self heightForRowAtIndex:0];
    }
    
    CGFloat __headerHeight = 0.0;
    if (self.delegate && [self.delegate respondsToSelector:@selector(heightForHeaderViewInPopupView:)]) {
        __headerHeight = [self.delegate heightForHeaderViewInPopupView:self];
    }
    
    CGFloat __footerHeight = 0.0;
    if (self.delegate && [self.delegate respondsToSelector:@selector(heightForFooterViewInPopupView:)]) {
        __footerHeight = [self.delegate heightForFooterViewInPopupView:self];
    }
    
    NSInteger __rowCount = 0;
    if (self.dataSource && [self.dataSource respondsToSelector:@selector(numberOfRowInPopupView:)]) {
        __rowCount = [self.dataSource numberOfRowInPopupView:self];
    }
    
    // 最大显示5行
    __rowCount = __rowCount > 5 ? 5 : __rowCount;
    
    CGFloat __popupViewHeight = __headerHeight + __rowHeight * __rowCount + __footerHeight;
    
    self.mTableView.frame = CGRectMake((__winSize.width - kDefaultCenterPopupViewWidth) / 2.0,
                                       (__winSize.height - __popupViewHeight) / 2.0,
                                       kDefaultCenterPopupViewWidth,
                                       __popupViewHeight);
    [self addSubview:self.mTableView];
    
    self.mTableView.transform = CGAffineTransformMakeScale(.5, .5);
    self.mTableView.alpha = .0;
    [UIView animateWithDuration:kDefaultPopupViewAnimationDuration
                     animations:^{
                         self.mTableView.alpha = 1.0;
                         self.mTableView.transform = CGAffineTransformMakeScale(1.0, 1.0);
                     }];
    
    self.mTableView.clipsToBounds = YES;
    self.mTableView.layer.cornerRadius = 4.0;
    
    [self.mTableView reloadData];
}

- (void)showInView:(UIView *)view
{
    if (self.mIsShowing) {
        return;
    }
    
    if ([view isKindOfClass:[UITableView class]]) {
        UITableView *tableView = (UITableView *)view;
        tableView.scrollEnabled = NO;
        CGPoint pt = tableView.contentOffset;
        pt.y -= K_TOPBAR_HEIGHT;
        CGRect rect4Self = self.frame;
        rect4Self.origin = pt;
        self.frame = rect4Self;
    }
    
    self.mIsShowing = YES;
    
    [view addSubview:self];
    CGSize __winSize = view.size;
    
    CGFloat __rowHeight = kDefaultPopupViewRowHeight;
    if (self.delegate && [self.delegate respondsToSelector:@selector(popupView:heightForRowAtIndex:)]) {
        __rowHeight = [self.delegate popupView:self heightForRowAtIndex:0];
    }
    
    CGFloat __headerHeight = 0.0;
    if (self.delegate && [self.delegate respondsToSelector:@selector(heightForHeaderViewInPopupView:)]) {
        __headerHeight = [self.delegate heightForHeaderViewInPopupView:self];
    }
    
    CGFloat __footerHeight = 0.0;
    if (self.delegate && [self.delegate respondsToSelector:@selector(heightForFooterViewInPopupView:)]) {
        __footerHeight = [self.delegate heightForFooterViewInPopupView:self];
    }
    
    NSInteger __rowCount = 0;
    if (self.dataSource && [self.dataSource respondsToSelector:@selector(numberOfRowInPopupView:)]) {
        __rowCount = [self.dataSource numberOfRowInPopupView:self];
    }
    
    // 最大显示5行
    __rowCount = __rowCount > 5 ? 5 : __rowCount;
    
    CGFloat __popupViewHeight = __headerHeight + __rowHeight * __rowCount + __footerHeight;
    
    self.mTableView.frame = CGRectMake((__winSize.width - kDefaultCenterPopupViewWidth) / 2.0,
                                       (__winSize.height - __popupViewHeight) / 2.0,
                                       kDefaultCenterPopupViewWidth,
                                       __popupViewHeight);
    [self addSubview:self.mTableView];
    
    self.mTableView.transform = CGAffineTransformMakeScale(.5, .5);
    self.mTableView.alpha = .0;
    [UIView animateWithDuration:kDefaultPopupViewAnimationDuration
                     animations:^{
                         self.mTableView.alpha = 1.0;
                         self.mTableView.transform = CGAffineTransformMakeScale(1.0, 1.0);
                     }];
    
    self.mTableView.clipsToBounds = YES;
    self.mTableView.layer.cornerRadius = 4.0;
    
    [self.mTableView reloadData];
}

- (void)dismiss
{
    if (!self.mIsShowing) {
        return;
    }
    
    self.mIsShowing = NO;
    
    [UIView animateWithDuration:kDefaultPopupViewAnimationDuration
                     animations:^{
                         self.mTableView.transform = CGAffineTransformMakeScale(.5, .5);
                         self.mTableView.alpha = .0;
                     }
                     completion:^(BOOL finished) {
                         
                         if ([self.superview isKindOfClass:[UITableView class]]) {
                             UITableView *tb = (UITableView *)self.superview;
                             tb.scrollEnabled = YES;
                         }
                         
                         self.mTableView.transform = CGAffineTransformMakeScale(1.0, 1.0);
                         [self.mTableView removeFromSuperview];
                         [self removeFromSuperview];
                     }];
}

@end
