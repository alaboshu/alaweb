//
//  HYGuideView.m
//  BM-JYT
//
//  Created by XHY on 2017/2/23.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "HYGuideView.h"

@interface HYGuideView () <UIScrollViewDelegate>

@property (nonatomic, strong) UIScrollView *scrollView;
@property (nonatomic, strong) UIPageControl *pageControl;

@end

@implementation HYGuideView

+ (BOOL)isNeedShow
{
    //
    //  判断是否显示引导页
    //
    NSDictionary *__dic4BundleInfo = [NSBundle mainBundle].infoDictionary;
    NSString *__str4VersionNum = __dic4BundleInfo[@"CFBundleShortVersionString"];
    NSString *guideKey = [NSString stringWithFormat:@"GuideShow_%@",__str4VersionNum];
    
    return ![[NSUserDefaults standardUserDefaults] boolForKey:guideKey];
}


- (void)configViews
{
    
    /* 标示当前版本已经显示过 */
    NSDictionary *__dic4BundleInfo = [NSBundle mainBundle].infoDictionary;
    NSString *__str4VersionNum = __dic4BundleInfo[@"CFBundleShortVersionString"];
    [[NSUserDefaults standardUserDefaults] setBool:YES forKey:[NSString stringWithFormat:@"GuideShow_%@",__str4VersionNum]];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    
    NSInteger count = 5;
    
    self.scrollView = [[UIScrollView alloc] initWithFrame:self.bounds];
    self.scrollView.pagingEnabled = YES;
    self.scrollView.backgroundColor = K_WHITE_COLOR;
    self.scrollView.contentSize = CGSizeMake(K_SCREEN_WIDTH * count, K_SCREEN_HEIGHT);
    self.scrollView.showsHorizontalScrollIndicator = NO;
    self.scrollView.delegate = self;
    [self addSubview:self.scrollView];
    
    self.pageControl = [[UIPageControl alloc] initWithFrame:CGRectMake(0, K_SCREEN_HEIGHT - 35, K_SCREEN_WIDTH, 35)];
    self.pageControl.numberOfPages = count;
    self.pageControl.currentPage = 0;
    self.pageControl.currentPageIndicatorTintColor = UIColorFromValue(0xea5555);
    self.pageControl.pageIndicatorTintColor = K_PLACEHOLDER_COLOR;
    [self addSubview:self.pageControl];
    
    NSString *imageNamed = @"";
    CGFloat bottomSpace = 130;
    if (isIphone4 || isIpad) {
        imageNamed = @"GuideImage_640x960_";
        bottomSpace -= 30;
    }
    else if (isIphone5)
    {
        imageNamed = @"GuideImage_640x1136_";
    }
    else if (isIphone6 || isIphone6Plus)
    {
        imageNamed = @"GuideImage_750x1334_";
        bottomSpace += 20;
    }
    else
    {
        imageNamed = @"GuideImage_640x1136_";
    }
    
    for(int i = 0; i < count; i++) {
        
        UIImageView *imv = [[UIImageView alloc] initWithFrame:CGRectMake(i * K_SCREEN_WIDTH, 0, K_SCREEN_WIDTH, K_SCREEN_HEIGHT)];
        imv.image = [UIImage imageNamed:[NSString stringWithFormat:@"%@%d",imageNamed,i]];
        [self.scrollView addSubview:imv];
        
        if (i == count - 1) {
            imv.userInteractionEnabled = YES;
            UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
            btn.frame = CGRectMake(50, K_SCREEN_HEIGHT - bottomSpace, K_SCREEN_WIDTH - 100, 45);
            [btn setTitle:@"进入京医通" forState:UIControlStateNormal];
            btn.titleLabel.font = [UIFont boldSystemFontOfSize:16];
            [btn setTitleColor:K_WHITE_COLOR forState:UIControlStateNormal];
            [btn setBackgroundImage:[UIImage imageWithColor:K_BUTTON_COLOR size:btn.size] forState:UIControlStateNormal];
            [btn setCornerRadius:4];
            [btn addTarget:self action:@selector(enterMain) forControlEvents:UIControlEventTouchUpInside];
            [imv addSubview:btn];
        }
        
    }
}

- (void)enterMain
{
    [self removeFromSuperview];
}


+ (void)showInView:(UIView *)view
{
    if (![HYGuideView isNeedShow]) {
        return;
    }
    
    HYGuideView *guideView = [[HYGuideView alloc] initWithFrame:view.bounds];
    [guideView configViews];
    [view addSubview:guideView];
}

#pragma mark - ScrollViewDelegate
- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    CGPoint pt = scrollView.contentOffset;
    NSInteger index = (pt.x + K_SCREEN_WIDTH / 2) / K_SCREEN_WIDTH;
    self.pageControl.currentPage = index;
}

@end
