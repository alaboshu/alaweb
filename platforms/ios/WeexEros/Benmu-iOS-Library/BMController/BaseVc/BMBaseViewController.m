//
//  BMBaseViewController.m
//  WeexDemo
//
//  Created by XHY on 2017/1/12.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMBaseViewController.h"

#import <UINavigationController+FDFullscreenPopGesture.h>

#import <WeexSDK/WXSDKInstance.h>
#import <WeexSDK/WXSDKEngine.h>
#import <WeexSDK/WXUtility.h>
#import <WeexSDK/WXDebugTool.h>
#import <WeexSDK/WXSDKManager.h>
#import "BMNavigationController.h"
#import "CommonMacro.h"
#import "UIImage+Util.h"
#import "UIView+Util.h"
#import "WXUtility.h"

#import "BMBaseViewController+Extend.h"
#import "BMBaseViewController+Order.h"
#import "UINavigationBar+NavigationBarExtend.h"

#import "BMMediatorManager.h"
#import "BMGlobalEventManager.h"

@interface BMBaseViewController () <UIScrollViewDelegate, UIWebViewDelegate>

@property (nonatomic, strong) UIView *weexView;
@property (nonatomic, strong) NSHashTable *arr4Request;  // 存放此控制器对应的所有请求，当viewDidDisappear

@property (nonatomic, assign) CGFloat weexHeight;


@property (nonatomic, assign) BMControllerState controllerState;

@end

@implementation BMBaseViewController

- (instancetype)init
{
    if (self = [super init]) {
        
    }
    return self;
}

- (NSHashTable *)arr4Request
{
    if (!_arr4Request) {
        _arr4Request = [[NSHashTable alloc] initWithOptions:NSHashTableWeakMemory capacity:0];
    }
    return _arr4Request;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    /* 设置一些页面属性 */
    [self setupViews];
    
    /* 监听页面刷新事件 */
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(notificationRefreshInstance:) name:@"RefreshInstance" object:nil];
    
    /* 加载weex页面 */
    [self _renderWithURL:self.url];
}

- (void)setupViews
{
    /* 标示页面首次打开 */
    self.controllerState = BMControllerStateOpen;
    
    /* 设置0 0点坐标从导航栏下开始 */
    self.edgesForExtendedLayout = UIRectEdgeNone;
    self.automaticallyAdjustsScrollViewInsets = NO;
    
    /* 设置背景颜色 */
    [self.view setBackgroundColor:K_BACKGROUND_COLOR];
    
    // 设置backBarItem 不要文字
    UIBarButtonItem *_barBtnItem = [[UIBarButtonItem alloc] init];
    _barBtnItem.title = @"";
    self.navigationItem.backBarButtonItem = _barBtnItem;
    
    /* 设置导航栏shadowImage */
    self.navigationController.navigationBar.shadowImage = [[UIImage alloc] init];

    /* 设置weex页面高度 */
    _weexHeight = [self weexViewHeight];
    
    /* 设置title */
    self.navigationItem.title = self.routerModel.navTitle ?: @"";
    
    /* 判断是否需要隐藏导航栏 并设置weex页面高度
       注：使用FDFullscreenPopGesture方法设置，自定义pop返回动画
     */
    if ([self isHideNavbar]) {
        self.fd_prefersNavigationBarHidden = YES;
    } else {
        self.fd_prefersNavigationBarHidden = NO;
        _weexHeight -= K_TOPBAR_HEIGHT;
    }
    
    /* 是否禁用返回 */
    if (!self.routerModel.canBack) {
        self.fd_interactivePopDisabled = YES;
        UIBarButtonItem *leftBtnItem = [[UIBarButtonItem alloc] init];
        leftBtnItem.title = @"";
        self.navigationItem.leftBarButtonItem = leftBtnItem;
    } else {
        /* 添加BackItem */
        [self addBackBarbuttonItem];
    }
    
    /* 是否禁用手势返回 */
    if (!self.routerModel.gesBack) {
        self.fd_interactivePopDisabled = YES;
    }
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    /* 设置状态栏样式 */
    [self bmSetStatusBarStyle];

    /* 保存当前栈顶的 WXSDKInstance 与 ViewController */
    [[BMMediatorManager shareInstance] setCurrentWXInstance:self.instance];
    [[BMMediatorManager shareInstance] setCurrentViewController:self];
    
    // 通知js页面生命周期
    if (self.controllerState != BMControllerStateOpen) [BMGlobalEventManager sendViewLifeCycleEventWithInstance:_instance event:BMViewWillAppear controllerState:self.controllerState];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    // 通知js页面生命周期
    if (self.controllerState != BMControllerStateOpen) [BMGlobalEventManager sendViewLifeCycleEventWithInstance:_instance event:BMViewDidAppear controllerState:self.controllerState];
    [self _updateInstanceState:WeexInstanceAppear];
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    
    [self cancelAllRequest];
    
    [BMGlobalEventManager sendViewLifeCycleEventWithInstance:_instance event:BMViewWillDisappear controllerState:self.controllerState];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    
    [BMGlobalEventManager sendViewLifeCycleEventWithInstance:_instance event:BMViewDidDisappear controllerState:self.controllerState];
    self.controllerState = BMControllerStateBack;
    
    [self _updateInstanceState:WeexInstanceDisappear];
}

/* cancel掉所有请求 */
- (void)cancelAllRequest
{
    for (BMCommonRequest *request in self.arr4Request) {
        if (request) [request stop];
    }
    
    [self.arr4Request removeAllObjects];
    self.arr4Request = nil;
}

- (void)viewWillLayoutSubviews
{
    [super viewWillLayoutSubviews];
    
//    CGFloat currentHeight = self.view.frame.size.height;
//
//    if (_instance && _weexHeight && _weexHeight != currentHeight) {
//
//        CGFloat originY = 0;
//        if ([UIApplication sharedApplication].statusBarFrame.size.height == 40) {
//
//            originY = 20;
//        }
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//            _instance.frame = CGRectMake(0, originY, self.view.width, currentHeight - originY);
//        });
//        _weexHeight = currentHeight - originY;
//    } else {
//        _weexHeight = currentHeight;
//    }
    
    _instance.frame = self.view.bounds;
    _weexHeight = self.view.height;
}

//TODO get height
- (void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc
{
    WXLogInfo(@"dealloc >>>>>>>>>>>>>>>>>>>>>> %@",self.navigationItem.title);
    
    [_instance destroyInstance];
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)_renderWithURL:(NSURL *)sourceURL
{
    if (!sourceURL) {
        return;
    }
    
    WXSDKInstance *oldInstance = self.instance;
    //    [_instance destroyInstance];
    
    if([WXPrerenderManager isTaskExist:[sourceURL absoluteString]]){
        _instance = [WXPrerenderManager instanceFromUrl:sourceURL.absoluteString];
    }
    
    _instance = [[WXSDKInstance alloc] init];
    _instance.frame = CGRectMake(0.0f, 0.0f, self.view.bounds.size.width, _weexHeight);
    _instance.pageObject = self;
    _instance.pageName = sourceURL.absoluteString;
    _instance.viewController = self;
    
    NSString *newURL = nil;
    
    if ([sourceURL.absoluteString rangeOfString:@"?"].location != NSNotFound) {
        newURL = [NSString stringWithFormat:@"%@&random=%d", sourceURL.absoluteString, arc4random()];
    } else {
        newURL = [NSString stringWithFormat:@"%@?random=%d", sourceURL.absoluteString, arc4random()];
    }
    [_instance renderWithURL:[NSURL URLWithString:newURL] options:@{@"bundleUrl":sourceURL.absoluteString, @"eros":[BMConfigManager shareInstance].envInfo} data:nil];
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        
        if (weakSelf.controllerState != BMControllerStateRefresh) {
            UIView *oldWeexView = weakSelf.weexView;
            
            weakSelf.weexView = view;
            [weakSelf.view addSubview:weakSelf.weexView];
            
            [oldWeexView removeFromSuperview];
            [oldInstance destroyInstance];
        }
    };
    
    _instance.onFailed = ^(NSError *error) {
        
    };
    
    _instance.renderFinish = ^(UIView *view) {
        
        if (weakSelf.controllerState == BMControllerStateRefresh) {
            UIView *oldWeexView = weakSelf.weexView;
            
            weakSelf.weexView = view;
            [weakSelf.view addSubview:weakSelf.weexView];
            
            [oldWeexView removeFromSuperview];
            [oldInstance destroyInstance];
        }
        
        /* 在中介者中保留 instance 的引用 */
        [[BMMediatorManager shareInstance] setCurrentWXInstance:weakSelf.instance];
        // 通知 js 页面生命周期方法
        [BMGlobalEventManager sendViewLifeCycleEventWithInstance:weakSelf.instance event:BMViewWillAppear controllerState:weakSelf.controllerState];
        [BMGlobalEventManager sendViewLifeCycleEventWithInstance:weakSelf.instance event:BMViewDidAppear controllerState:weakSelf.controllerState];
        [weakSelf _updateInstanceState:WeexInstanceAppear];
    };
    
    if([WXPrerenderManager isTaskExist:[sourceURL absoluteString]]){
        WX_MONITOR_INSTANCE_PERF_START(WXPTJSDownload, _instance);
        WX_MONITOR_INSTANCE_PERF_END(WXPTJSDownload, _instance);
        WX_MONITOR_INSTANCE_PERF_START(WXPTFirstScreenRender, _instance);
        WX_MONITOR_INSTANCE_PERF_START(WXPTAllRender, _instance);
        [WXPrerenderManager renderFromCache:[sourceURL absoluteString]];
        return;
    }
}

- (void)_updateInstanceState:(WXState)state
{
    if (_instance && _instance.state != state) {
        _instance.state = state;
        
        if (state == WeexInstanceAppear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@"viewappear" params:nil domChanges:nil];
        } else if (state == WeexInstanceDisappear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@"viewdisappear" params:nil domChanges:nil];
        }
    }
}

#pragma mark - notification
- (void)notificationRefreshInstance:(NSNotification *)notification {
    [self refreshWeex];
}

#pragma mark - refresh
- (void)refreshWeex
{
    /* 标示页面状态刷新 */
    self.controllerState = BMControllerStateRefresh;
    
    [self _renderWithURL:self.url];
}

- (void)addRequest:(BMCommonRequest *)request
{
    [self.arr4Request addObject:request];
}

@end
