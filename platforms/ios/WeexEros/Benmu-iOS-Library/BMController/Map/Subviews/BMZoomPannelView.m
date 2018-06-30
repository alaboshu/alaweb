//
//  BMZoomPannelView.m
//  Pods
//
//  Created by XHY on 2017/5/27.
//
//

#import "BMZoomPannelView.h"

@interface BMZoomPannelView ()

@property (nonatomic, copy) BMZoomPannelHandle zoomPannelHandle;

@end

@implementation BMZoomPannelView

#pragma mark - Public Method

+ (void)showInView:(UIView *)mapView center:(CGPoint)pt zoomType:(BMZoomPannelHandle)zoomPannelHandle
{
    BMZoomPannelView *zoomPannel = [[BMZoomPannelView alloc] initWithFrame:CGRectMake(0, 0, K_ZoomPannelView_Width, K_ZoomPannelView_Height)];
    zoomPannel.zoomPannelHandle = zoomPannelHandle;
    zoomPannel.center = pt;
    [mapView addSubview:zoomPannel];
}

#pragma mark - Private Method

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        [self setupViews];
    }
    
    return self;
}

- (void)setupViews
{
    UIButton *incBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, K_ZoomPannelView_Width, K_ZoomPannelView_Height / 2.0)];
    [incBtn setBackgroundImage:[UIImage imageNamed:@"increase"] forState:UIControlStateNormal];
    [incBtn addTarget:self action:@selector(zoomPlusAction) forControlEvents:UIControlEventTouchUpInside];
    
    UIButton *decBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, K_ZoomPannelView_Height / 2.0, K_ZoomPannelView_Width, K_ZoomPannelView_Height / 2.0)];
    [decBtn setBackgroundImage:[UIImage imageNamed:@"decrease"] forState:UIControlStateNormal];
    [decBtn addTarget:self action:@selector(zoomMinusAction) forControlEvents:UIControlEventTouchUpInside];
    
    [self addSubview:incBtn];
    [self addSubview:decBtn];
}

- (void)zoomPlusAction
{
    if (self.zoomPannelHandle) {
        self.zoomPannelHandle(BMZoomTypePlus);
    }
}

- (void)zoomMinusAction
{
    if (self.zoomPannelHandle) {
        self.zoomPannelHandle(BMZoomTypeMinus);
    }
}

#pragma mark - Api Request

#pragma mark - Custom Delegate & DataSource

#pragma mark - System Delegate & DataSource

#pragma mark - Setter

#pragma mark - Getter

@end
