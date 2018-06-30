//
//  BMShareView.m
//  Pods
//
//  Created by XHY on 2017/6/29.
//
//

#import "BMShareView.h"
#import <UMSocialCore/UMSocialCore.h>
#import "BMMediatorManager.h"
#import <WXApi.h>
#import "SVProgressHUD.h"
#import "BMWebViewChangeFontSizeView.h"
#import "BMPopActionViewManager.h"

#define K_CancelButton_Height 50.0

@interface BMShareView ()

@property (nonatomic, strong) BMShareModel *shareModel;
@property (nonatomic, copy) WXModuleCallback successCallback;
@property (nonatomic, copy) WXModuleCallback failedCallback;

/** 功能面板显示的平台元素 */
@property (nonatomic, strong) NSMutableArray *platforms;

/** 对应的WebView */
@property (nonatomic, weak) UIWebView *webView;

/** 调整字体大小控制视图 */
@property (nonatomic, strong) BMPopActionViewManager *popActionViewManager;

@end

@implementation BMShareView
- (void)dealloc
{
    NSLog(@"dealloc >>>>>>>>> BMShareView ");
}

#pragma mark - Setter / Getter
- (BMPopActionViewManager *)popActionViewManager
{
    if (!_popActionViewManager) {
        _popActionViewManager = [[BMPopActionViewManager alloc] init];
    }
    
    return _popActionViewManager;
}


#pragma mark - Private Method

- (void)hideShareView
{
    if (self.delegate) {
        [self.delegate hideActionView];
    }
}

- (void)setupSubViews
{
    self.backgroundColor = K_WHITE_COLOR;
    
    /* 分享平台 */
    [self addPlatformItemView];
    
    /* 取消按钮 */
    UIButton *cancelBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, self.height - K_CancelButton_Height, self.width, K_CancelButton_Height)];
    cancelBtn.backgroundColor = K_WHITE_COLOR;
    [cancelBtn addSubviewWithFrame:CGRectMake(0, 0, cancelBtn.width, 1) color:K_LINE_COLOR];
    [cancelBtn setTitle:@"取消" forState:UIControlStateNormal];
    [cancelBtn setTitleColor:UIColorFromValue(0x333333) forState:UIControlStateNormal];
    cancelBtn.titleLabel.font = K_FONT_18;
    [cancelBtn addTarget:self action:@selector(hideShareView) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:cancelBtn];
}

/* 添加可分享的平台 */
- (void)addPlatformItemView
{
    /* item view */
    UIView *itemView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.width, self.height - K_CancelButton_Height)];
    itemView.backgroundColor = UIColorFromValue(0xf0f3f5);
    [self addSubview:itemView];
    
    /* 支持的分享平台 */
    NSDictionary *allPlatforms = [BMShareModel allPlarform];
    
    /* 判断是否支持所选择的平台将不支持的平台移除 */
    NSMutableArray *supportPlatforms = [NSMutableArray array];
    for (NSString *type in self.platforms) {
        if (!allPlatforms[type]) continue;
        BMSharePlarformType plarformType = [allPlatforms[type] integerValue];
        
        // 微信相关
        if ((plarformType == BMSharePlarformType_WechatSession ||
             plarformType == BMSharePlarformType_WechatTimeLine ||
             plarformType == BMSharePlarformType_WechatFavorite) &&
            ![WXApi isWXAppInstalled]) {
            continue;
        }
        
        [supportPlatforms addObject:type];
    }
    
    if (!supportPlatforms.count) return;
    
    /* 边距 */
    CGFloat margin = 15.0;
    /* 因为当前最多支持 3 个分享平台，后续根据需要设计需要修改布局 */
    CGFloat itemBgViewWidth = (self.width - margin * 2) / supportPlatforms.count;
    
    CGFloat imageWidth = 45.0;
    CGFloat imageHeight = imageWidth;
    
    for (int i = 0; i < supportPlatforms.count; i++) {
        
        NSString *type = supportPlatforms[i];
        BMSharePlarformType plarformType = [allPlatforms[type] integerValue];
        
        UIView *bgView = [[UIView alloc] initWithFrame:CGRectMake(margin + i * itemBgViewWidth, 0, itemBgViewWidth, self.height)];
        bgView.backgroundColor = itemView.backgroundColor;
        [self addSubview:bgView];
        
        /* 图标 */
        UIImageView *icon = [[UIImageView alloc] initWithFrame:CGRectMake((itemBgViewWidth - imageWidth) / 2.0, 30.0, imageWidth, imageHeight)];
        [bgView addSubview:icon];
        
        /* 平台描述 */
        UILabel *lbl = [[UILabel alloc] initWithFrame:CGRectMake(0, icon.maxY + 8, itemBgViewWidth, 20)];
        lbl.textAlignment = NSTextAlignmentCenter;
        lbl.textColor = UIColorFromValue(0x333333);
        lbl.font = K_FONT_14;
        [bgView addSubview:lbl];
        
        switch (plarformType) {
            case BMSharePlarformType_Pasteboard:
                icon.image = [UIImage imageNamed:@"share_pasteboard"];
                lbl.text = @"复制链接";
                break;
            case BMSharePlarformType_WechatSession:
                icon.image = [UIImage imageNamed:@"share_wechatSession"];
                lbl.text = @"发送给朋友";
                break;
            case BMSharePlarformType_WechatTimeLine:
                icon.image = [UIImage imageNamed:@"share_wechatTimeLine"];
                lbl.text = @"分享朋友圈";
                break;
            case BMSharePlarformType_FontSize:
                icon.image = [UIImage imageNamed:@"actionFontSize"];
                lbl.text = @"字体大小";
                break;
            default:
                break;
        }
        
        /* action */
        UIControl *actionBtn = [[UIControl alloc] initWithFrame:bgView.bounds];
        actionBtn.tag = plarformType;
        [bgView addSubview:actionBtn];
        [actionBtn addTarget:self action:@selector(shareAction:) forControlEvents:UIControlEventTouchUpInside];
        
        
    }
    
}

/* 分享事件 */
- (void)shareAction:(UIControl *)actionBtn
{
    [self hideShareView];
    
    BMSharePlarformType plarformType = actionBtn.tag;
    
    /* 剪切板 */
    if (plarformType == BMSharePlarformType_Pasteboard) {
        
        UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
        pasteboard.string = self.shareModel.url ?:@"";
        
        /* 成功回调 */
        if (self.successCallback) {
            NSDictionary *data = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:@"复制链接成功" data:nil];
            self.successCallback(data);
            self.successCallback = nil;
            self.failedCallback = nil;
        } else {
            [SVProgressHUD showImage:nil status:@"复制链接成功"];
        }
        
        return;
    }
    
    /** 调整字体 */
    if (plarformType == BMSharePlarformType_FontSize) {
        
        [self.popActionViewManager showChangeFontSizeViewTargetWebView:self.webView];
        
        return;
    }
    
    NSString *shareTitle = self.shareModel.title?:@"";
    NSString *shareText = self.shareModel.content?:@"";
    NSString *shareUrl = self.shareModel.url;
    id shareImage = self.shareModel.image;
    
    UMSocialPlatformType type = UMSocialPlatformType_UnKnown;
    
    /* 微信聊天 */
    if (plarformType == BMSharePlarformType_WechatSession)
    {
        type = UMSocialPlatformType_WechatSession;
    }
    /* 微信朋友圈 */
    else if (plarformType == BMSharePlarformType_WechatTimeLine)
    {
        type = UMSocialPlatformType_WechatTimeLine;
        shareTitle = shareText.length ? shareText : shareTitle;
    }
    
    UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
    messageObject.text = shareText;
    
    UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:shareTitle descr:shareText thumImage:shareImage];
    shareObject.webpageUrl = shareUrl;
    messageObject.shareObject = shareObject;
    
    //设置分享内容
    [[UMSocialManager defaultManager] shareToPlatform:type
                                        messageObject:messageObject
                                currentViewController:[BMMediatorManager shareInstance].currentViewController
                                           completion:^(id result, NSError *error) {
                                               if (error) {
                                                   WXLogError(@"%@",error);
                                                   
                                                   /* 失败回调 */
                                                   if (self.failedCallback) {
                                                       NSDictionary *data = [NSDictionary configCallbackDataWithResCode:BMResCodeError msg:@"分享失败" data:nil];
                                                       self.failedCallback(data);
                                                       self.failedCallback = nil;
                                                       self.successCallback = nil;
                                                   }
                                                   
                                               } else {
                                                   
                                                   /* 成功回调 */
                                                   if (self.successCallback) {
                                                       NSDictionary *data = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:@"分享成功" data:nil];
                                                       self.successCallback(data);
                                                       self.successCallback = nil;
                                                       self.failedCallback = nil;
                                                   } else {
                                                       [SVProgressHUD showImage:nil status:@"分享成功"];
                                                   }
                                               }
                                           }];
}


#pragma mark - Public Method

- (instancetype)initShareViewWithFrame:(CGRect)frame
                             shareInfo:(BMShareModel *)shareModel
                       successCallback:(WXModuleCallback)successCallback
                        failedCallback:(WXModuleCallback)failedCallback
{
    if (self = [super initWithFrame:frame]) {
        
        _shareModel = shareModel;
        _successCallback= successCallback;
        _failedCallback = failedCallback;
        
        _platforms = [NSArray arrayWithArray:_shareModel.platforms];
        
        /** 添加子视图 */
        [self setupSubViews];
    }
    return self;
}

- (instancetype)initWebActionViewWithFrame:(CGRect)frame
                                   webView:(UIWebView *)webView
                                 shareInfo:(BMShareModel *)shareModel
{
    if (self = [super initWithFrame:frame]) {
        _shareModel = shareModel;
        _webView = webView;
        
        _platforms = [[NSMutableArray alloc] init];
        
        if (_shareModel) {
            [_platforms addObjectsFromArray:_shareModel.platforms];
        }
        [_platforms addObject:K_SharePlarformFontSize];
        
        [self setupSubViews];
    }
    return self;
}

@end
