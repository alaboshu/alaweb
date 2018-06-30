//
//  BMGPSButtonView.m
//  Pods
//
//  Created by XHY on 2017/5/27.
//
//

#import "BMGPSButtonView.h"

@interface BMGPSButtonView ()

@property (nonatomic, copy) BMGPSButtonViewHandle clickedHandle;

@end

@implementation BMGPSButtonView

#pragma mark - Public Method

+ (void)showInView:(UIView *)mapView center:(CGPoint)center clickedHandle:(BMGPSButtonViewHandle)clickedHandle
{
    BMGPSButtonView *gpsView = [[BMGPSButtonView alloc] initWithFrame:CGRectMake(0, 0, K_GPSButtonView_Width, K_GPSButtonView_Height)];
    gpsView.clickedHandle = clickedHandle;
    gpsView.center = center;
    [gpsView setupViews];
    [mapView addSubview:gpsView];
}

#pragma mark - Private Method

- (void)setupViews
{
    UIButton *ret = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 40, 40)];
    ret.backgroundColor = [UIColor whiteColor];
    ret.layer.cornerRadius = 4;
    
    [ret setImage:[UIImage imageNamed:@"gpsStat1"] forState:UIControlStateNormal];
    [ret addTarget:self action:@selector(gpsAction) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:ret];
}

- (void)gpsAction
{
    if (self.clickedHandle) {
        self.clickedHandle();
    }
}

@end
