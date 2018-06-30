//
//  BMScanQRViewController.m
//  WeexDemo
//
//  Created by XHY on 2017/2/4.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import "BMScanQRViewController.h"
#import <UINavigationController+FDFullscreenPopGesture.h>
#import "UINavigationBar+NavigationBarExtend.h"
#import "BMDefine.h"
#import "JYTTitleLabel.h"
#import "NSDictionary+Util.h"
#import <SVProgressHUD.h>
#import <AVFoundation/AVFoundation.h>
#import "QRShaowView.h"

#define customShowSize CGSizeMake(K_SCREEN_WIDTH - 100, K_SCREEN_WIDTH - 100);

typedef NS_ENUM(NSInteger, AlertType) {
    AlertTypeNoAuthorization = 7849,
    AlertTypeOpenURL
};

@interface BMScanQRViewController ()<UIAlertViewDelegate, AVCaptureMetadataOutputObjectsDelegate>

@property (strong,nonatomic)AVCaptureDevice * device;
@property (strong,nonatomic)AVCaptureDeviceInput * input;
@property (strong,nonatomic)AVCaptureMetadataOutput * output;
@property (strong,nonatomic)AVCaptureSession * session;
@property (strong,nonatomic)AVCaptureVideoPreviewLayer * preview;

@property (nonatomic, copy) NSString *content4QRCode;
@property (nonatomic, strong) UIView *bgView;

@property (nonatomic,assign) CGSize showSize;
@property (nonatomic,assign) CGSize layerViewSize;
@property (nonatomic,strong) QRShaowView *shadowView; /**< 阴影 */

@end

@implementation BMScanQRViewController

- (QRShaowView *)shadowView
{
    if (!_shadowView) {
        _shadowView = [[QRShaowView alloc] initWithFrame:self.view.bounds];
    }
    return _shadowView;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault animated:YES];
    
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent animated:NO];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    if (TARGET_IPHONE_SIMULATOR) {
        
        [SVProgressHUD dismiss];
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil message:@"当前设备不支持此项功能" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles: nil];
        [alert show];
        
        [self.navigationController popViewControllerAnimated:YES];
        
        return;
    }
    
    AVAuthorizationStatus authStatus= [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if (authStatus == AVAuthorizationStatusDenied) {
        return ;
    }
    
    self.showSize = customShowSize;
    [self createQR];
    [self allowScanRect];
    self.shadowView.showSize = self.showSize;
    [self.view addSubview:self.shadowView];
    [self.shadowView showAnimation];
    [SVProgressHUD dismiss];
    
    JYTTitleLabel * label = [[JYTTitleLabel alloc] initWithFrame:CGRectMake(10, (self.view.height - self.showSize.height) / 2 - 60, K_SCREEN_WIDTH - 10 * 2, 60)];
    label.text = @"将条码放入框内，即可自动扫描";
    label.textColor = [UIColor whiteColor];
    label.textAlignment = 1;
    label.lineBreakMode = 0;
    label.numberOfLines = 0;
    label.backgroundColor = [UIColor clearColor];
    [self.view addSubview:label];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.navigationItem.title = @"扫一扫";
    self.navigationController.fd_prefersNavigationBarHidden = NO;
    self.view.backgroundColor = [UIColor blackColor];
    
    /* 权限判断 */
    AVAuthorizationStatus authStatus= [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if (authStatus == AVAuthorizationStatusDenied) {
        
        // 无相机权限 做一个友好的提示
        UIAlertView * alert = [[UIAlertView alloc]initWithTitle:@"无法使用相机" message:@"请在iPhone的""设置-隐私-相机""中允许访问相机" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"设置", nil];
        alert.tag = AlertTypeNoAuthorization;
        [alert show];
        
        return;
    }
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(.02 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [SVProgressHUD showWithStatus:@"扫描器初始化中..."];
    });
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)createQR
{
    if (_device == nil) {
        // Device
        _device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
        
        // Input
        _input = [AVCaptureDeviceInput deviceInputWithDevice:self.device error:nil];
        
        // Output
        _output = [[AVCaptureMetadataOutput alloc]init];
        [_output setMetadataObjectsDelegate:self queue:dispatch_get_main_queue()];
        
        // Session
        _session = [[AVCaptureSession alloc]init];
        [_session setSessionPreset:AVCaptureSessionPresetHigh];
        if ([_session canAddInput:self.input])
        {
            [_session addInput:self.input];
        }
        
        if ([_session canAddOutput:self.output])
        {
            [_session addOutput:self.output];
        }
        
        //设置扫码支持的编码格式(如下设置条形码和二维码兼容)
        _output.metadataObjectTypes=@[AVMetadataObjectTypeQRCode,AVMetadataObjectTypeEAN13Code, AVMetadataObjectTypeEAN8Code, AVMetadataObjectTypeCode128Code];
//  @[
//                                      AVMetadataObjectTypeUPCECode,
//                                      AVMetadataObjectTypeCode39Code,
//                                      AVMetadataObjectTypeCode39Mod43Code,
//                                      AVMetadataObjectTypeEAN13Code,
//                                      AVMetadataObjectTypeEAN8Code,
//                                      AVMetadataObjectTypeCode93Code,
//                                      AVMetadataObjectTypeCode128Code,
//                                      AVMetadataObjectTypePDF417Code,
//                                      AVMetadataObjectTypeQRCode,
//                                      AVMetadataObjectTypeAztecCode
//                                      ];
        

        //        _output.rectOfInterest = CGRectMake(<#CGFloat x#>, <#CGFloat y#>, <#CGFloat width#>, <#CGFloat height#>)
        
        // Preview
        _preview =[AVCaptureVideoPreviewLayer layerWithSession:self.session];
        _preview.videoGravity = AVLayerVideoGravityResizeAspectFill;
        _preview.frame = self.view.bounds;
        [self.view.layer insertSublayer:self.preview atIndex:0];
        
        self.layerViewSize = CGSizeMake(_preview.frame.size.width, _preview.frame.size.height);
    }
    
    // Start
    [_session startRunning];
}

/** 配置扫码范围 */
-(void)allowScanRect{
    
    
    /** 扫描是默认是横屏, 原点在[右上角]
     *  rectOfInterest = CGRectMake(0, 0, 1, 1);
     *  AVCaptureSessionPresetHigh = 1920×1080   摄像头分辨率
     *  需要转换坐标 将屏幕与 分辨率统一
     */
    
    //剪切出需要的大小位置
    CGRect shearRect = CGRectMake((self.layerViewSize.width - self.showSize.width) / 2,
                                  (self.layerViewSize.height - self.showSize.height) / 2,
                                  self.showSize.height,
                                  self.showSize.height);
    
    
    CGFloat deviceProportion = 1920.0 / 1080.0;
    CGFloat screenProportion = self.layerViewSize.height / self.layerViewSize.width;
    
    //分辨率比> 屏幕比 ( 相当于屏幕的高不够)
    if (deviceProportion > screenProportion) {
        //换算出 分辨率比 对应的 屏幕高
        CGFloat finalHeight = self.layerViewSize.width * deviceProportion;
        // 得到 偏差值
        CGFloat addNum = (finalHeight - self.layerViewSize.height) / 2;
        
        // (对应的实际位置 + 偏差值)  /  换算后的屏幕高
        self.output.rectOfInterest = CGRectMake((shearRect.origin.y + addNum) / finalHeight,
                                                shearRect.origin.x / self.layerViewSize.width,
                                                shearRect.size.height/ finalHeight,
                                                shearRect.size.width/ self.layerViewSize.width);
        
    }else{
        
        CGFloat finalWidth = self.layerViewSize.height / deviceProportion;
        
        CGFloat addNum = (finalWidth - self.layerViewSize.width) / 2;
        
        self.output.rectOfInterest = CGRectMake(shearRect.origin.y / self.layerViewSize.height,
                                                (shearRect.origin.x + addNum) / finalWidth,
                                                shearRect.size.height / self.layerViewSize.height,
                                                shearRect.size.width / finalWidth);
    }
    
}

#pragma mark - AVCaptureMetadataOutputObjectsDelegate
- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection
{
    
    NSString *stringValue;
    
    if ([metadataObjects count] >0)
    {
        AVMetadataMachineReadableCodeObject * metadataObject = [metadataObjects objectAtIndex:0];
        stringValue = metadataObject.stringValue;
        _content4QRCode = stringValue;
    }
    
    [_session stopRunning];
    [self.shadowView stopAnimation];
    
    if ([_content4QRCode hasPrefix:@"http"]) {
        //
        //  Other QR Code Operation
        //
        UIAlertView *tmpAlert = [[UIAlertView alloc] initWithTitle:@"是否打开链接" message:self.content4QRCode delegate:self cancelButtonTitle:nil otherButtonTitles:@"取消",@"打开", nil];
        tmpAlert.tag = AlertTypeOpenURL;
        [tmpAlert show];
    } else {
        
        WXLogInfo(@"qr>>>>>>>>>>>>>>>%@",_content4QRCode);
        
        if (self.callback) {
            
            NSDictionary *resultData = [NSDictionary configCallbackDataWithResCode:BMResCodeSuccess msg:nil data:@{@"text": _content4QRCode}];
            
            /* 将扫码结果回传给js */
            if (self.callback) {
                self.callback(resultData);
                self.callback = nil;
            }
            
        }
        
        [self.navigationController popViewControllerAnimated:YES];
        return;
        
    }
    
    
}


#pragma mark -  UIAlertViewDelegate
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (alertView.tag == AlertTypeNoAuthorization) {
        if (buttonIndex == 1) {
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
            });
        }
        [self.navigationController popViewControllerAnimated:YES];
        return;
    } else if (alertView.tag == AlertTypeOpenURL) {
        if (buttonIndex == 1) {
            
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [[UIApplication sharedApplication] openURL:[NSURL URLWithString:_content4QRCode]];
            });
            [self.navigationController popViewControllerAnimated:YES];
        }
    }
    
    //
    //  Carry on 2 Scan
    //
    // Start
    [_session startRunning];
    [self.shadowView showAnimation];
}


@end
