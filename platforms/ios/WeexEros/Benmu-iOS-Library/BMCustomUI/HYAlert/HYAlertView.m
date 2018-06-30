//
//  HYAlertView.m
//  JingYitong
//
//  Created by XHY on 16/6/21.
//  Copyright © 2016年 京医通. All rights reserved.
//

#import "HYAlertView.h"
#import "JYTLevel2Button.h"
#import "BMConfigManager.h"
#import "JYTBoldTitleLabel.h"
#import "JYTTitleLabel.h"
#import "HYAlertViewManager.h"

// 弹窗的宽度
#define kDefaultCenterPopupViewWidth ([UIScreen mainScreen].bounds.size.width - 80.0)
#define kDefaultPopupViewRowHeight 55.0
#define kDefaultPopupFooterViewHeight 50.0
#define kDefaultPopupViewAnimationDuration 0.25

#define kMaxHeight ([UIScreen mainScreen].bounds.size.height * 1/2)
#define kTopPadding 20.0
#define kTopSpace 15.0
// 文字标题、内容两边的留白宽度
#define kPadding 20.0

#import "BMDefine.h"

@interface HYAlertView () <UITableViewDataSource, UITableViewDelegate>
{
    NSString *_title;
    NSString *_message;
    NSString *_cancelButtonTitle;
    NSString *_otherButtonTitle;
    CGFloat _height4Message;
    CGFloat _height4HeaderView;
    CGFloat _height4Title;
}

@property (nonatomic, strong) UITableView *mTableView;
@property (nonatomic, assign) BOOL mIsShowing;

@end

@implementation HYAlertView

- (void)dealloc
{
    WXLogInfo(@"HYAlertView dealloc");
}

+ (instancetype)shareInstance
{
    return [[[self class] alloc] init];
}

- (instancetype)init
{
    if (self = [super init]) {
        CGRect screenBounds = [[UIScreen mainScreen] bounds];
        CGRect frame = CGRectMake(0.0, 0.0, screenBounds.size.width, screenBounds.size.height);
        self.frame = frame;
        [[HYAlertViewManager shareInstance] setCurrentAlertView:self];
    }
    return self;
}

+ (HYAlertView *)configWithTitle:(NSString *)title message:(NSString *)message cancelButtonTitle:(NSString *)cancelTitle otherButtonTitle:(NSString *)otherTitle clickedButtonAtIndexBlock:(HYAlertViewClickedButtonAtIndexBlock)block
{
    HYAlertView *alert = [HYAlertView shareInstance];
    [alert configWithTitle:title message:message cancelButtonTitle:cancelTitle otherButtonTitle:otherTitle clickedButtonAtIndexBlock:block];
    return alert;
}

- (void)configWithTitle:(NSString *)title message:(NSString *)message cancelButtonTitle:(NSString *)cancelTitle otherButtonTitle:(NSString *)otherTitle clickedButtonAtIndexBlock:(HYAlertViewClickedButtonAtIndexBlock)block
{
    self.clickedButtonAtIndexBlock = block;
    [self configWithTitle:title message:message cancelButtonTitle:cancelTitle otherButtonTitle:otherTitle];
}

- (void)configWithTitle:(NSString *)title message:(NSString *)message cancelButtonTitle:(NSString *)cancelTitle otherButtonTitle:(NSString *)otherTitle
{
    _title = title;
    _message = message;
    _cancelButtonTitle = cancelTitle;
    _otherButtonTitle = otherTitle;
    
    _titleTextAlignment = NSTextAlignmentCenter;
    _messageTextAlignment = NSTextAlignmentCenter;
    
    /* 根据当前字体计算 title 高度 */
    _height4Title = 0.0;
    if (_title != nil && _title.length > 0) {
        CGRect rect4Message = [title boundingRectWithSize:CGSizeMake(kDefaultCenterPopupViewWidth - kPadding * 2, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName: [JYTBoldTitleLabel currentFont]} context:nil];
        _height4Title = rect4Message.size.height;
    }
    
    CGFloat messageTopHeight = 0.0;
    
    /* 根据当前字体计算message高度 */
    _height4Message = 0.0;
    if (_message != nil && _message.length > 0) {
        
        if (_title != nil && _title.length > 0) {
            messageTopHeight = kTopSpace;
        }
    
        CGRect rect4Message = [message boundingRectWithSize:CGSizeMake(kDefaultCenterPopupViewWidth - kPadding * 2, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName: [UIFont currentTitleFont]} context:nil];
        _height4Message = rect4Message.size.height;
    }
    
    // 计算header总高度
    CGFloat headerHeight = kTopPadding * 2 + messageTopHeight + _height4Title + _height4Message;
    
    /* 控制最大高度 */
    _height4HeaderView = headerHeight > kMaxHeight ? kMaxHeight : headerHeight;
    
    
    self.mIsShowing = NO;
    
    [self initTableView];
    
    // 背景遮罩颜色
    self.backgroundColor = [UIColor colorWithRed:.16 green:.17 blue:.21 alpha:.5];
}

//- (instancetype)initWithTitle:(NSString *)title message:(NSString *)message cancelButtonTitle:(NSString *)cancelTitle otherButtonTitle:(NSString *)otherTitle
//{
//    CGRect screenBounds = [[UIScreen mainScreen] bounds];
//    CGRect frame = CGRectMake(0.0, 0.0, screenBounds.size.width, screenBounds.size.height);
//    
//    if (self = [super initWithFrame:frame]) {
//        
//        _title = title;
//        _message = message;
//        _cancelButtonTitle = cancelTitle;
//        _otherButtonTitle = otherTitle;
//        
//        _titleTextAlignment = NSTextAlignmentCenter;
//        _messageTextAlignment = NSTextAlignmentCenter;
//        
//        
//        /* 根据当前字体计算 title 高度 */
//        _height4Title = 0.0;
//        if (_title != nil) {
//            CGRect rect4Message = [title boundingRectWithSize:CGSizeMake(kDefaultCenterPopupViewWidth - kPadding * 2, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName: [JYTBoldTitleLabel currentFont]} context:nil];
//            _height4Title = rect4Message.size.height;
//        }
//        
//        
//        /* 根据当前字体计算message高度 */
//        _height4Message = 0.0;
//        if (_message != nil) {
//            CGRect rect4Message = [message boundingRectWithSize:CGSizeMake(kDefaultCenterPopupViewWidth - kPadding * 2, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName: [JYTConfigManager shareInstans].currentTitleFont} context:nil];
//            _height4Message = rect4Message.size.height;
//        }
//        
//        CGFloat headerHeight = kTopPadding * 2 + kPadding + _height4Title + _height4Message;
//        
//        /* 控制最大高度 */
//        _height4HeaderView = headerHeight > kMaxHeight ? kMaxHeight : headerHeight;
//        
//        
//        self.mIsShowing = NO;
//        
//        [self initTableView];
//        
//        // 背景遮罩颜色
//        self.backgroundColor = [UIColor colorWithRed:.16 green:.17 blue:.21 alpha:.5];
//    }
//    
//    return self;
//}

- (void)initTableView
{
    if (!self.mTableView) {
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
}

#pragma mark - HYPopupViewDelegate & HYPopupViewDataSource
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return [[UITableViewCell alloc] init];
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return _height4HeaderView;
}

- (CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section
{
    return kDefaultPopupFooterViewHeight;
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    UIView *headView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, kDefaultCenterPopupViewWidth, _height4HeaderView)];
    UIScrollView *scrollView = [[UIScrollView alloc] initWithFrame:CGRectMake(kPadding, kTopPadding, headView.width - kPadding * 2, _height4HeaderView - kTopPadding * 2)];
    [headView addSubview:scrollView];
    scrollView.contentInset = UIEdgeInsetsZero;
    
    CGFloat originY = 0.0;
    
    if (_title != nil && _title.length > 0) {
        JYTBoldTitleLabel *titleLbl = [[JYTBoldTitleLabel alloc] initWithFrame:CGRectMake(0, originY, scrollView.width, _height4Title)];
        titleLbl.textColor = K_TITLE_COLOR;
        titleLbl.text = _title;
        titleLbl.numberOfLines = 0;
        titleLbl.textAlignment = _titleTextAlignment;
        [scrollView addSubview:titleLbl];
        
        originY = titleLbl.maxY;
    }
    
    if (_message != nil && _message.length > 0) {
        
        if (_title && _title.length > 0) {
            originY += kTopSpace;
        }
        
        JYTTitleLabel *messageLbl = [[JYTTitleLabel alloc] initWithFrame:CGRectMake(0, originY, scrollView.width, _height4Message)];
        messageLbl.textColor = K_TITLE_COLOR;
        messageLbl.text = _message;
        messageLbl.textAlignment = _messageTextAlignment;
        messageLbl.numberOfLines = 0;
        [scrollView addSubview:messageLbl];
        originY = messageLbl.maxY;
    }
    
    scrollView.bounces = NO;
    scrollView.alwaysBounceVertical = NO;
    scrollView.contentSize = CGSizeMake(scrollView.width, originY);
    return headView;
}

- (UIView *)tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section
{
    UIView *footerView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, kDefaultCenterPopupViewWidth, kDefaultPopupFooterViewHeight)];
    
    [footerView addSubviewWithFrame:CGRectMake(0, 0, footerView.width, 0.5) color:K_LINE_COLOR];
    
    CGFloat originX = 0.0;
    CGFloat width4Btn = footerView.width;
    CGFloat height4Btn = footerView.height;
    
    if (_cancelButtonTitle != nil) {
        
        width4Btn = footerView.width / 2.0;
        
        JYTLevel2Button *btn1 = [[JYTLevel2Button alloc] initWithFrame:CGRectMake(originX, 0, width4Btn, height4Btn)];
        [btn1 setTitle:_cancelButtonTitle forState:UIControlStateNormal];
        [btn1 setTitleColor:K_TEXT_LINK_COLOR forState:UIControlStateNormal];
        [btn1 addTarget:self action:@selector(cancelBtnClicked) forControlEvents:UIControlEventTouchUpInside];
        [footerView addSubview:btn1];
        
        [footerView addSubviewWithFrame:CGRectMake(footerView.width / 2 - 0.5, 0, 0.5, footerView.height) color:K_LINE_COLOR];
        
        originX = width4Btn;
    }
    
    if (_otherButtonTitle) {
        JYTLevel2Button *btn2 = [[JYTLevel2Button alloc] initWithFrame:CGRectMake(originX, 0, width4Btn, height4Btn)];
        [btn2 setTitle:_otherButtonTitle forState:UIControlStateNormal] ;
        [btn2 setTitleColor:K_TEXT_LINK_COLOR forState:UIControlStateNormal];
        [btn2 addTarget:self action:@selector(otherBtnClicked) forControlEvents:UIControlEventTouchUpInside];
        [footerView addSubview:btn2];
    }
    
    return footerView;
}

- (void)cancelBtnClicked
{
    if (_clickedButtonAtIndexBlock) {
        _clickedButtonAtIndexBlock(0);
    }
    
    [self dismiss];
}

- (void)otherBtnClicked
{

    if (_clickedButtonAtIndexBlock) {
        _clickedButtonAtIndexBlock(1);
    }
    
    [self dismiss];
}

#pragma mark - Public method
- (void)show
{
    if (self.mIsShowing) {
        return;
    }
    
    self.mIsShowing = YES;
    
    UIWindow *__kewWindow = [self findVisibleWindow];
    [__kewWindow addSubview:self];
    CGSize __winSize = [UIScreen mainScreen].bounds.size;
    
    CGFloat __popupViewHeight = _height4HeaderView + kDefaultPopupFooterViewHeight;
    
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
        CGPoint pt = tableView.contentOffset;
        CGRect rect4Self = self.frame;
        rect4Self.origin = pt;
        self.frame = rect4Self;
    }
    
    self.mIsShowing = YES;
    
    [view addSubview:self];
    CGSize __winSize = view.size;
    
    CGFloat __popupViewHeight = _height4HeaderView + kDefaultPopupViewRowHeight;
    
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
    self.mIsShowing = NO;
    
    [self.mTableView removeFromSuperview];
    self.clickedButtonAtIndexBlock = nil;
    [self removeFromSuperview];

    /* 取消隐藏时的动画 */
//    [UIView animateWithDuration:0.15
//                     animations:^{
//                         self.mTableView.transform = CGAffineTransformMakeScale(1.2, 1.2);
//                         self.mTableView.alpha = .0;
//                     }
//                     completion:^(BOOL finished) {
//                         self.mTableView.transform = CGAffineTransformMakeScale(1.0, 1.0);
//                         [self.mTableView removeFromSuperview];
//                         self.clickedButtonAtIndexBlock = nil;
//                         [self removeFromSuperview];
//                     }];
}

- (UIWindow *)findVisibleWindow {
    UIWindow *visibleWindow = nil;
    
    // if the rootViewController property (available >= iOS 4.0) of the main window is set, we present the modal view controller on top of the rootViewController
    NSArray *windows = [[UIApplication sharedApplication] windows];
    for (UIWindow *window in windows) {
        if (!window.hidden && !visibleWindow) {
            visibleWindow = window;
        }
        if ([UIWindow instancesRespondToSelector:@selector(rootViewController)]) {
            if ([window rootViewController]) {
                visibleWindow = window;
                break;
            }
        }
    }
    
    return visibleWindow?:[[UIApplication sharedApplication].delegate window];
}

@end
