//
//  BMMapViewController.m
//  Pods
//
//  Created by XHY on 2017/5/27.
//
//

#import "BMMapViewController.h"
#import "BMNavigateToHospitalMapView.h"
#import "BMMediatorManager.h"

@interface BMMapViewController ()

@property (nonatomic, strong) BMMapInfoModel *mapInfoModel;

@end

@implementation BMMapViewController

#pragma mark - Public Method

- (instancetype)initWithMapViewInfo:(BMMapInfoModel *)mapInfoModel
{
    if (self = [super init]) {
        _mapInfoModel = mapInfoModel;
    }
    return self;
}

#pragma mark - Private Method

- (void)dealloc
{
    WXLogInfo(@"dealloc >>>> BMMapViewController ");
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.view.backgroundColor = K_BACKGROUND_COLOR;
    
    self.navigationItem.title = _mapInfoModel.title;
    
    /** 根据不同 type 加载对应功能的 mapView */
    switch (self.mapInfoModel.type) {
        case BMMapViewTypeNavigate:
            [BMNavigateToHospitalMapView showInView:self.view info:self.mapInfoModel];
            break;
            
        default:
            break;
    }
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    [[BMMediatorManager shareInstance] setCurrentViewController:self];
}

@end
