//
//  BMNavigatorModule.m
//  Pods
//
//  Created by XHY on 2017/5/16.
//
//

#import "BMNavigatorModule.h"
#import <WXConvert.h>
#import <WXImgLoaderProtocol.h>
#import <WXHandlerFactory.h>
#import <WXUtility.h>

typedef NS_ENUM(NSUInteger,BMNavigationItemPosition) {
    BMNavigationItemPositionRight = 1,      /* 右边位置 */
    BMNavigationItemPositionLeft,           /* 左边位置 */
    BMNavigationItemPositionCenter          /* 中间位置 */
};

@interface BMNavigatorModule ()

@property (nonatomic, copy) WXModuleKeepAliveCallback rightItemCallback;    /* 导航栏右边按钮点击回调方法 */
@property (nonatomic, copy) WXModuleKeepAliveCallback leftItemCallback;     /* 导航栏左边按钮点击回调方法 */
@property (nonatomic, copy) WXModuleKeepAliveCallback centerItemCallback;   /* 中间的视图点击回调 */

@property (nonatomic, strong) UIButton *leftItem;
@property (nonatomic, strong) UIButton *rightItem;
@property (nonatomic, strong) UIButton *centerItem;

@end

@implementation BMNavigatorModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(setRightItem:callback:))
WX_EXPORT_METHOD(@selector(setLeftItem:callback:))
WX_EXPORT_METHOD(@selector(setCenterItem:callback:))
WX_EXPORT_METHOD(@selector(setNavigationInfo:callback:))


#pragma mark - Public Method
/* 设置导航栏右侧按钮 */
- (void)setRightItem:(NSDictionary *)info callback:(WXModuleKeepAliveCallback)callback
{
    self.rightItemCallback = callback;
    
    /** 如果已经创建过item只需更新一下文案即可 */
    if (self.rightItem) {
        [self updateItemInfo:info item:self.rightItem itemPosition:BMNavigationItemPositionRight];
        return;
    }
    
    [self createBarButton:info itemPosition:BMNavigationItemPositionRight];
}

/* 设置导航栏左侧按钮 */
- (void)setLeftItem:(NSDictionary *)info callback:(WXModuleKeepAliveCallback)callback
{
    self.leftItemCallback = callback;
    
    /** 如果已经创建过item只需更新一下文案即可 */
    if (self.leftItem) {
        [self updateItemInfo:info item:self.leftItem itemPosition:BMNavigationItemPositionLeft];
        return;
    }
    
    [self createBarButton:info itemPosition:BMNavigationItemPositionLeft];
}

/* 设置导航栏中间按钮 */
- (void)setCenterItem:(NSDictionary *)info callback:(WXModuleKeepAliveCallback)callback
{
    self.centerItemCallback = callback;
    
    /** 如果已经创建过item只需更新一下文案即可 */
    if (self.centerItem) {
        [self updateItemInfo:info item:self.centerItem itemPosition:BMNavigationItemPositionCenter];
        return;
    }
    
    [self createBarButton:info itemPosition:BMNavigationItemPositionCenter];
}

/* 设置导航栏信息 title、hideNavbar、statusBarStyle */
- (void)setNavigationInfo:(NSDictionary *)info callback:(WXModuleCallback)callback
{
    UIViewController *vc = self.weexInstance.viewController;
    
    /* 设置title */
    if (info[@"title"]) {
        vc.navigationItem.title = [WXConvert NSString:info[@"title"]];
    }
    
    /* 是否隐藏导航栏 */
    if (info[@"navShow"]) {
        [vc.navigationController setNavigationBarHidden:![WXConvert BOOL:info[@"navShow"]] animated:NO];
    }
    
    /* 状态栏样式 */
    if (info[@"statusBarStyle"]) {
        if ([info[@"statusBarStyle"] isEqualToString:@"Default"]) {
            [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault];
        }
        else if ([info[@"statusBarStyle"] isEqualToString:@"LightContent"])
        {
            [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];
        }
    }
    
    callback(nil);
}


#pragma mark - Private Method

- (id<WXImgLoaderProtocol>)imageLoader
{
    static id<WXImgLoaderProtocol> imageLoader;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        imageLoader = [WXHandlerFactory handlerForProtocol:@protocol(WXImgLoaderProtocol)];
    });
    return imageLoader;
}

- (void)setNavItemWithView:(UIView *)view itemPosition:(BMNavigationItemPosition)itemPosition
{
    if (!view) {
        WXLogError(@"barButton 创建失败");
        return;
    }
    
    UIViewController *vc = self.weexInstance.viewController;
    
    [UIView performWithoutAnimation:^{
        switch (itemPosition) {
            case BMNavigationItemPositionRight:
                vc.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:view];
                break;
            case BMNavigationItemPositionLeft:
                vc.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:view];
                break;
            case BMNavigationItemPositionCenter:
                vc.navigationItem.titleView = view;
                break;
            default:
                break;
        }
    }];
}

- (void)createBarButton:(NSDictionary *)param itemPosition:(BMNavigationItemPosition)itemPosition
{
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    
    switch (itemPosition) {
        case BMNavigationItemPositionRight:
            self.rightItem = button;
            [button addTarget:self action:@selector(onClickRightBarButton) forControlEvents:UIControlEventTouchUpInside];
            break;
        case BMNavigationItemPositionLeft:
            self.leftItem = button;
            [button addTarget:self action:@selector(onClickLeftBarButton) forControlEvents:UIControlEventTouchUpInside];
            break;
        case BMNavigationItemPositionCenter:
            self.centerItem = button;
            [button addTarget:self action:@selector(onClickCenterBarButtion) forControlEvents:UIControlEventTouchUpInside];
            break;
        default:
            break;
    }
    
    if (param[@"text"]) {
        NSString *title = param[@"text"];
        
        CGFloat fontWeight = 0;
        if (param[@"fontWeight"]) {
            fontWeight = [WXConvert WXTextWeight:param[@"fontWeight"]];
        }
        
        UIColor *textColor = [UIColor whiteColor];
        if (param[@"textColor"]) {
            textColor = [WXConvert UIColor:param[@"textColor"]];
        }
        
        CGFloat fontSize = 16;
        if (param[@"fontSize"]) {
            fontSize = [param[@"fontSize"] floatValue] / 2.0;
        }
        
        UIFont *textFont = [WXUtility fontWithSize:fontSize textWeight:fontWeight textStyle:nil fontFamily:nil scaleFactor:self.weexInstance.pixelScaleFactor];
        
        NSDictionary *attribute = @{NSFontAttributeName: textFont};
        CGSize size = [title boundingRectWithSize:CGSizeMake(110.0f, 30.0f) options: NSStringDrawingTruncatesLastVisibleLine | NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading attributes:attribute context:nil].size;
        
        button.frame = CGRectMake(0, 0, size.width + 5, size.height);
        button.titleLabel.font = textFont;
//        button.titleLabel.adjustsFontSizeToFitWidth = YES;
        button.titleLabel.lineBreakMode = NSLineBreakByTruncatingMiddle;
        [button setTitleColor:textColor forState:UIControlStateNormal];
        [button setTitleColor:textColor  forState:UIControlStateHighlighted];
        [button setTitle:title forState:UIControlStateNormal];
        [button setTitle:title forState:UIControlStateHighlighted];
        
        [self setNavItemWithView:button itemPosition:itemPosition];
    }
    else if (param[@"image"]) {
        NSString *icon = param[@"image"];
        
        if (icon) {
//            button.frame = CGRectMake(0, 0, 50, 15);
            [[self imageLoader] downloadImageWithURL:icon imageFrame:CGRectMake(0, 0, 15, 15) userInfo:nil completed:^(UIImage *image, NSError *error, BOOL finished) {
                
                CGFloat scale = [UIScreen mainScreen].scale;
                
                CGRect rect = button.frame;
                rect.size = image.size;
                
                button.frame = rect;
                [button setBackgroundImage:image forState:UIControlStateNormal];
                [button setBackgroundImage:image forState:UIControlStateHighlighted];
//                [button setImage:image forState:UIControlStateNormal];
//                [button setImage:image forState:UIControlStateHighlighted];
                
                [self setNavItemWithView:button itemPosition:itemPosition];
                
            }];
            
        }
    }
}

- (void)updateItemInfo:(NSDictionary *)param item:(UIButton *)button itemPosition:(BMNavigationItemPosition)itemPosition
{
    if (param[@"text"]) {
        NSString *title = param[@"text"];
        
        if ([title isEqualToString:button.titleLabel.text]) {
            return;
        }
        
        CGFloat fontWeight = 0;
        if (param[@"fontWeight"]) {
            fontWeight = [WXConvert WXTextWeight:param[@"fontWeight"]];
        }
        
        UIColor *textColor = button.titleLabel.textColor;
        if (param[@"textColor"]) {
            textColor = [WXConvert UIColor:param[@"textColor"]];
        }
        
        CGFloat fontSize = 16;
        if (param[@"fontSize"]) {
            fontSize = [param[@"fontSize"] floatValue] / 2.0;
        }
        
        UIFont *textFont = [WXUtility fontWithSize:fontSize textWeight:fontWeight textStyle:nil fontFamily:nil scaleFactor:self.weexInstance.pixelScaleFactor];
        
        NSDictionary *attribute = @{NSFontAttributeName: textFont};
        CGSize size = [title boundingRectWithSize:CGSizeMake(110.0f, 30.0f) options: NSStringDrawingTruncatesLastVisibleLine | NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading attributes:attribute context:nil].size;
        
        size.width += 5;
        CGRect rect4Item = button.frame;
        
        rect4Item.size = size;
        button.frame = rect4Item;
        
        button.titleLabel.font = textFont;
        
        [button setTitle:title forState:UIControlStateNormal];
        [button setTitle:title forState:UIControlStateHighlighted];
        
        [button setTitleColor:textColor forState:UIControlStateNormal];
        [button setTitleColor:textColor forState:UIControlStateHighlighted];
        
        [self setNavItemWithView:button itemPosition:itemPosition];
    }
    else if (param[@"image"]) {
        
        NSString *icon = param[@"image"];
        if (icon) {
           
            [[self imageLoader] downloadImageWithURL:icon imageFrame:CGRectMake(0, 0, 15, 15) userInfo:nil completed:^(UIImage *image, NSError *error, BOOL finished) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    
                    CGFloat scale = [UIScreen mainScreen].scale;
                    
                    CGRect rect = button.frame;
                    rect.size = image.size;
                    
                    button.frame = rect;
            
                    [button setBackgroundImage:image forState:UIControlStateNormal];
                    [button setBackgroundImage:image forState:UIControlStateHighlighted];
//                    [button setImage:image forState:UIControlStateNormal];
//                    [button setImage:image forState:UIControlStateHighlighted];
                    [self setNavItemWithView:button itemPosition:itemPosition];
                });
            }];
            
        }
    }
}

/* 右侧itme响应事件 */
- (void)onClickRightBarButton
{
    if (self.rightItemCallback) {
        self.rightItemCallback(nil, YES);
    }
}

/* 左侧item响应事件 */
- (void)onClickLeftBarButton
{
    if (self.leftItemCallback) {
        self.leftItemCallback(nil,YES);
    }
}

/* 中间item响应事件 */
- (void)onClickCenterBarButtion
{
    if (self.centerItemCallback) {
        self.centerItemCallback(nil, YES);
    }
}

@end
