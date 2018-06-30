//
//  BMWebViewController.m
//  BM-JYT
//
//  Created by XHY on 2017/2/28.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMWebViewController.h"
#import "JYTTitleLabel.h"
#import <Masonry/Masonry.h>
#import "NSTimer+Addition.h"
#import "BMPopActionViewManager.h"
#import "BMMediatorManager.h"
#import <UINavigationController+FDFullscreenPopGesture.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "UIWebView+BMExtend.h"
#import "BMUserInfoModel.h"

@protocol BMJSExport <JSExport>

- (void)closePage;

@end

typedef void(^BMNativeHandle)(void);

@interface BMNative : NSObject <BMJSExport>
@property (nonatomic, copy)BMNativeHandle closePageBlock;
@end

@implementation BMNative

- (void)closePage
{
    if (self.closePageBlock) {
        self.closePageBlock();
    }
}

@end

@interface BMWebViewController () <UIWebViewDelegate, JSExport>
{
    BOOL _showProgress;
    JSContext *_jsContext;
}
@property (nonatomic, strong) UIWebView *webView;

/** 伪进度条 */
@property (nonatomic, strong) CAShapeLayer *progressLayer;
/** 进度条定时器 */
@property (nonatomic, strong) NSTimer *timer;

/** 要打开的url */
@property (nonatomic, copy) NSString *urlStr;
/** js端传的分享内容 */
@property (nonatomic, strong) BMShareModel *shareModel;

/** 底部弹出的功能页面 */
@property (nonatomic, strong) BMPopActionViewManager *actionView;

@end

@implementation BMWebViewController

- (void)dealloc
{
    NSLog(@"dealloc >>>>>>>>>>>>> BMWebViewController");
}

- (UIWebView *)webView
{
    if (!_webView) {
        
        CGFloat height = K_SCREEN_HEIGHT - 64;
        if (!self.routerInfo.navShow) {
            height = K_SCREEN_HEIGHT;
        }
        _webView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, K_SCREEN_WIDTH, height)];
        _webView.backgroundColor = K_BACKGROUND_COLOR;
        _webView.delegate = self;
        [self.view addSubview:_webView];
    }
    return _webView;
}

- (CAShapeLayer *)progressLayer
{
    if (!_progressLayer) {
        
        UIBezierPath *path = [[UIBezierPath alloc] init];
        [path moveToPoint:CGPointMake(0, self.navigationController.navigationBar.height - 2)];
        [path addLineToPoint:CGPointMake(K_SCREEN_WIDTH, self.navigationController.navigationBar.height - 2)];
        _progressLayer = [CAShapeLayer layer];
        _progressLayer.path = path.CGPath;
        _progressLayer.strokeColor = [UIColor lightGrayColor].CGColor;
        _progressLayer.fillColor = K_CLEAR_COLOR.CGColor;
        _progressLayer.lineWidth = 2;
        
        _progressLayer.strokeStart = 0.0f;
        _progressLayer.strokeEnd = 0.0f;
        
        
        [self.navigationController.navigationBar.layer addSublayer:_progressLayer];
        
        //        [self.view.layer addSublayer:_progressLayer];
    }
    return _progressLayer;
}

- (BMPopActionViewManager *)actionView
{
    if (!_actionView) {
        _actionView = [[BMPopActionViewManager alloc] init];
    }
    return _actionView;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    [[BMMediatorManager shareInstance] setCurrentViewController:self];
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    
    if (_timer) {
        [_timer invalidate];
        _timer = nil;
    }
    
    if (_progressLayer) {
        [_progressLayer removeFromSuperlayer];
        _progressLayer = nil;
    }
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    /* 解析 router 数据 */
    self.urlStr = self.routerInfo.url;
    self.navigationItem.title = self.routerInfo.title;
    self.shareModel = self.routerInfo.shareModel;
    
    self.view.backgroundColor = K_BACKGROUND_COLOR;
    self.automaticallyAdjustsScrollViewInsets = NO;
    self.edgesForExtendedLayout = UIRectEdgeNone;
    
    /* 判断是否需要隐藏导航栏 并设置weex页面高度
     注：使用FDFullscreenPopGesture方法设置，自定义pop返回动画
     */
    if (!self.routerInfo.navShow) {
        self.fd_prefersNavigationBarHidden = YES;
    } else {
        self.fd_prefersNavigationBarHidden = NO;
    }
    
    /* 返回按钮 */
    UIBarButtonItem *backItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"NavBar_BackItemIcon"] style:UIBarButtonItemStylePlain target:self action:@selector(backItemClicked)];
    self.navigationItem.leftBarButtonItem = backItem;
    
    /** 功能面板 */
    UIBarButtonItem * shareItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"actionIcon"] style:UIBarButtonItemStylePlain target:self action:@selector(share)];
    self.navigationItem.rightBarButtonItem = shareItem;
    

    self.timer = [NSTimer scheduledTimerWithTimeInterval:0.15 target:self selector:@selector(progressAnimation:) userInfo:nil repeats:YES];
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self reloadURL];
        
        _showProgress = YES;
    });
}

- (void)share
{
    [self.actionView showWebViewActionViewWithWebView:self.webView shareInfo:self.shareModel];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)backItemClicked
{
    if ([self.webView canGoBack]) {
        
        _showProgress = NO;
        [self.webView goBack];
        
        if ([self.webView canGoBack] && [self.navigationItem.leftBarButtonItems count] < 2) {
            //
            //  barbuttonitems
            //
            UIBarButtonItem *backItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"NavBar_BackItemIcon"] style:UIBarButtonItemStylePlain target:self action:@selector(backItemClicked)];
            UIBarButtonItem *closeItem = [[UIBarButtonItem alloc] initWithTitle:@"关闭" style:UIBarButtonItemStylePlain target:self action:@selector(closeItemClicked)];
            self.navigationItem.leftBarButtonItems = @[backItem, closeItem];
        }
        
    } else {
        [self.navigationController popViewControllerAnimated:YES];
    }
}

- (void)closeItemClicked
{
    [self.navigationController popViewControllerAnimated:YES];
}

- (void)requestAgain
{
    [self reloadURL];
}

- (void)reloadURL
{
    
    if ([self.urlStr isHasChinese]) {
        self.urlStr = [self.urlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    }
    
    NSString *loadURL = [NSString stringWithFormat:@"%@",self.urlStr];
    NSURL *url = [NSURL URLWithString:loadURL];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];
}


#pragma mark - UIWebViewDelegate

- (void)webViewDidStartLoad:(UIWebView *)webView
{
    
    if (_showProgress) {
        
        [self.timer resumeTimer];
        
    }
    
    _showProgress = YES;
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    /* 如果是goBack的操作 从新加载url避免有些页面加载不完全的问题 */
    if (navigationType == UIWebViewNavigationTypeBackForward) {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.01 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            NSURL *url = [NSURL URLWithString:request.URL.absoluteString];
            NSURLRequest *request = [NSURLRequest requestWithURL:url];
            [self.webView loadRequest:request];
        });
        return YES;
    }
    
    WXLogInfo(@"%@",request.URL.absoluteString);
    
    /* 获取js的运行环境 */
    _jsContext = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    [self injectionJsMethod];
    
    return YES;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    /** 检查一下字体大小 */
    [self.webView checkCurrentFontSize];
    
    NSString * docTitle = [webView stringByEvaluatingJavaScriptFromString:@"document.title"];
    if (docTitle && docTitle.length) {
        self.navigationItem.title = docTitle;
    }
    
    if (_timer != nil) {
        [_timer pauseTimer];
    }
    
    if (_progressLayer) {
        _progressLayer.strokeEnd = 1.0f;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.7 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [_progressLayer removeFromSuperlayer];
            _progressLayer = nil;
        });
    }
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    WXLogInfo(@"\n******************** - WebView didFailLoad - ********************\n %@",error);
    
    if (_timer != nil) {
        [_timer pauseTimer];
    }
    
    if (_progressLayer) {
        [_progressLayer removeFromSuperlayer];
        _progressLayer = nil;
    }
    
    WXLogInfo(@"\n******************** - WebView didFailLoad - ********************\n %@",webView.request.URL.absoluteString);
    
//    // 确保加载的是第一个url时显示
//    if (!webView.request.URL || !webView.request.URL.absoluteString || webView.request.URL.absoluteString.length < 1) {
//        [self showRequestAgainView];
//    }
}

- (void)progressAnimation:(NSTimer *)timer
{
    self.progressLayer.strokeEnd += 0.005f;
    
    //    NSLog(@"%f",self.progressLayer.strokeEnd);
    
    if (self.progressLayer.strokeEnd >= 0.9f) {
        [_timer pauseTimer];
    }
}


/**
 注入 js 方法
 */
- (void)injectionJsMethod
{
    /* 注入一个关闭当前页面的方法 */
    BMNative *bmnative = [[BMNative alloc] init];
    @weakify(self);
    bmnative.closePageBlock = ^{
        @strongify(self);
        [self closeItemClicked];
    };
    _jsContext[@"bmnative"] = bmnative;
}

@end
