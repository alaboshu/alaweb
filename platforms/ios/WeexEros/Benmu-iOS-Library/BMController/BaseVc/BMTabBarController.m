//
//  BMTabBarController.m
//  WeexDemo
//
//  Created by XHY on 2017/1/12.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMTabBarController.h"

#import "BMMediatorManager.h"

@interface BMTabBarController ()

@property (nonatomic, assign) BOOL isLoadImage;

@end

@implementation BMTabBarController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
//    BMTabBar *tabbar = [[BMTabBar alloc] init];
//    [self setValue:tabbar forKey:@"tabBar"];
    
    [[BMMediatorManager shareInstance] setBaseTabBarController:self];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    // 设置item图片
    if (!_isLoadImage) [self configItems];
}

- (void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    
}

- (void)viewWillLayoutSubviews
{
    [super viewWillLayoutSubviews];
    
    CGFloat tabbarHeight = K_TABBAR_HEIGHT;
    
    /* 修改 tabbar 高度 */
    CGRect tabFrame = self.tabBar.frame;
    tabFrame.size.height = tabbarHeight;
    tabFrame.origin.y = self.view.frame.size.height - tabbarHeight;
    self.tabBar.frame = tabFrame;
    
    /* 修改内容高度 */
    UIView *trView = [self.view.subviews objectAtIndex:0];
    trView.frame = CGRectMake(0, 0, self.view.width, self.view.height - tabbarHeight);
    
}

- (void)configItems
{
    _isLoadImage = YES;
    
    // 设置bar背景颜色
    self.tabBar.barTintColor = UIColorFromValue(0xfafafa);
    self.tabBar.backgroundColor = UIColorFromValue(0xfafafa);
    [self.tabBar setBackgroundImage:[UIImage imageWithColor:UIColorFromValue(0xfafafa) size:CGSizeMake(1, 1)]];
    
    // 设置shadow
    self.tabBar.shadowImage = [UIImage imageWithColor:K_CLEAR_COLOR size:CGSizeMake(self.tabBar.width, 0.5)];
    
    // 设置item选中之后图片文字的渲染颜色
    self.tabBar.tintColor = UIColorFromValue(0x00b4cb);
    
    // 遍历item设置图片
    NSString *image = @"image";
    NSString *imageSelected = @"imageSelected";
    NSString *title = @"title";
    NSArray *souceData = @[
                           @{ image: @"TabBar_JingYiTong", imageSelected: @"TabBar_JingYiTong_Selected", title:@"医疗服务"},
                           @{ image: @"TabBar_HealthManagement", imageSelected: @"TabBar_HealthManagement_Selected", title:@"健康管理"},
                           @{ image: @"TabBar_MyCenter", imageSelected: @"TabBar_MyCenter_Selected", title: @"个人中心"}
                           ];
    
    NSArray *items = [self.tabBar items];
    for (int i = 0; i < [items count]; i++) {
        UITabBarItem *item = items[i];
        item.image = [UIImage imageNamed:souceData[i][image]];
        item.selectedImage = [UIImage imageNamed:souceData[i][imageSelected]];
        item.title = souceData[i][title];
        
//        if (i == 1) {
//            item.enabled = NO;
//        }
    }
    
    /* CenterBtn */
    UIView *topLine = [[UIView alloc] initWithFrame:CGRectMake(0, 0, K_SCREEN_WIDTH, 0.5)];
    topLine.backgroundColor = UIColorFromValue(0xdfe1eb);
    [self.tabBar addSubview:topLine];
//
//    CGRect rect4View = CGRectMake((K_SCREEN_WIDTH - 52.0) / 2.0, -16, 52.0, 78.0);
//    self.centerItem = [[BMTabBarCenterItem alloc] initWithFrame:rect4View];
//    self.centerItem.clickedBlock = ^(){
//        [[BMMediatorManager shareInstance] toSelectHospital];
//    };
//    [self.tabBar addSubview:self.centerItem];
//    
    [self setItemFontSize];
//
//    // 注册改变字体的通知
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(setItemFontSize) name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
    
}

- (void)setItemFontSize
{
    
    NSString *fontSize = [[NSUserDefaults standardUserDefaults] objectForKey:K_FONT_SIZE_KEY];
    CGFloat currFont = 13.0;
    CGFloat titleOffsetVertical = -3;
    // 标准字体
//    if (!fontSize || [fontSize isEqualToString:K_FONT_SIZE_NORM])
//    {
//        currFont = 12.0;
//        titleOffsetVertical = -1;
//        
//    }
//    else if ([fontSize isEqualToString:K_FONT_SIZE_BIG])
//    {
//        currFont = 12.0 * K_FontSizeBig_Scale;
//        titleOffsetVertical = -1;
//    }
//    else if ([fontSize isEqualToString:k_FONT_SIZE_EXTRALARGE])
//    {
//        currFont = 12.0 * K_FontSizeExtralarge_Scale;
//        titleOffsetVertical = 0;
//    }
    
    NSArray *items = [self.tabBar items];
    for (int i =0; i < [items count]; i++) {
        UITabBarItem *item = items[i];
        [item setTitleTextAttributes:@{NSFontAttributeName: [UIFont systemFontOfSize:currFont], NSForegroundColorAttributeName: UIColorFromValue(0x777777)} forState:UIControlStateNormal];
        [item setTitleTextAttributes:@{NSFontAttributeName: [UIFont systemFontOfSize:currFont], NSForegroundColorAttributeName: UIColorFromValue(0x00b4cb)} forState:UIControlStateSelected];
        //        [item setTitleTextAttributes:@{NSFontAttributeName: currFont} forState:UIControlStateSelected];
        //        [item setTitleTextAttributes:@{NSFontAttributeName: currFont} forState:UIControlStateHighlighted];
        // 设置字体偏移
        [item setTitlePositionAdjustment:UIOffsetMake(0, -4)];
        [item setImageInsets:UIEdgeInsetsMake(-4, 0, 4, 0)];
        
//        if (i == 1) {
//            item.enabled = NO;
//        }
    }
    
//    [self.tabBar bringSubviewToFront:self.centerItem];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc
{
    WXLogInfo(@"Dealloc >>>>>>>>>>>>>>>>>>>>>>>: %@",NSStringFromClass([self class]));
    
    // 移除通知
    [[NSNotificationCenter defaultCenter] removeObserver:self name:K_CHANGE_FONT_SIZE_NOTIFICATION object:nil];
}

@end
