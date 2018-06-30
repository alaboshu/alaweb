//
//  BMNavigateToHospitalMapView.m
//  Pods
//
//  Created by XHY on 2017/5/27.
//
//

#import "BMNavigateToHospitalMapView.h"
#import "MAMapKit.h"
#import "CommonUtility.h"
#import "BMZoomPannelView.h"
#import "BMGPSButtonView.h"
#import "BMPointAnnotation.h"
#import "BMNavToHosAnnotationView.h"
#import "BMNavigationUseOtherMap.h"

#define kCalloutViewMargin          -8

@interface BMNavigateToHospitalMapView () <MAMapViewDelegate>

@property (nonatomic, strong) BMMapInfoModel *mapInfoModel;
@property (nonatomic, strong) MAMapView *mapView;
/** 目的地标注 */
@property (nonatomic, strong) BMPointAnnotation *destinationAnnotation;
/** 调用第三方地图导航 */
@property (nonatomic, strong) BMNavigationUseOtherMap *useOtherMapNavigation;

@end

@implementation BMNavigateToHospitalMapView

#pragma mark - Public Method

+ (void)showInView:(UIView *)view info:(BMMapInfoModel *)info
{
    BMNavigateToHospitalMapView *navigateMapView = [[BMNavigateToHospitalMapView alloc] initWithFrame:view.bounds];
    navigateMapView.mapInfoModel = info;
    [navigateMapView setupViews];
    [view addSubview:navigateMapView];
}

#pragma mark - Private Method

- (void)setupViews
{
    /** 初始化地图 */
    self.mapView = [[MAMapView alloc] initWithFrame:self.bounds];
    self.mapView.showsScale = NO;
    self.mapView.showsCompass= NO;
    self.mapView.showsUserLocation = YES;
    [self.mapView setUserTrackingMode:MAUserTrackingModeFollow];
    self.mapView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.mapView.delegate = self;
    [self addSubview:self.mapView];
    
//    MAUserLocationRepresentation *userR = [[MAUserLocationRepresentation alloc] init];
//    userR.showsHeadingIndicator = YES;
//    [self.mapView updateUserLocationRepresentation:userR];
    
    /** 添加缩放面板 */
    @weakify(self);
    [BMZoomPannelView showInView:self.mapView
                          center:CGPointMake(self.mapView.width - K_ZoomPannelView_Width / 2.0 - 10, self.mapView.height - K_ZoomPannelView_Height / 2.0 - 10)
                        zoomType:^(BMZoomType zoomType) {
                            @strongify(self);
                            
                            switch (zoomType) {
                                case BMZoomTypePlus:{
                                    CGFloat oldZoom = self.mapView.zoomLevel;
                                    [self.mapView setZoomLevel:(oldZoom + 1) animated:YES];
                                }
                                    break;
                                case BMZoomTypeMinus:{
                                    CGFloat oldZoom = self.mapView.zoomLevel;
                                    [self.mapView setZoomLevel:(oldZoom - 1) animated:YES];
                                }
                                    break;
                                    
                                default:
                                    break;
                            }
                            
                        }];
    
    /** 添加定位按钮 */
    [BMGPSButtonView showInView:self.mapView
                         center:CGPointMake(K_GPSButtonView_Width / 2.0 + 10, self.mapView.height - K_GPSButtonView_Height / 2.0 - 20)
                  clickedHandle:^{
                      @strongify(self);
                      if(self.mapView.userLocation.updating && self.mapView.userLocation.location) {
                          [self.mapView setCenterCoordinate:self.mapView.userLocation.location.coordinate animated:YES];
                      }
                      
                  }];
    
    /** 添加起点终点标注 */
    [self addAnnotations];
    
}

- (void)addAnnotations
{
    
    self.destinationAnnotation = [[BMPointAnnotation alloc] initWithAnnotationType:BMPointAnnotationTypeDestination];
    self.destinationAnnotation.coordinate = CLLocationCoordinate2DMake(self.mapInfoModel.navigationInfo.latitude, self.mapInfoModel.navigationInfo.longitude);
    
    [self.mapView addAnnotation:self.destinationAnnotation];
    
}

- (CGSize)offsetToContainRect:(CGRect)innerRect inRect:(CGRect)outerRect
{
    CGFloat nudgeRight = fmaxf(0, CGRectGetMinX(outerRect) - (CGRectGetMinX(innerRect)));
    CGFloat nudgeLeft = fminf(0, CGRectGetMaxX(outerRect) - (CGRectGetMaxX(innerRect)));
    CGFloat nudgeTop = fmaxf(0, CGRectGetMinY(outerRect) - (CGRectGetMinY(innerRect)));
    CGFloat nudgeBottom = fminf(0, CGRectGetMaxY(outerRect) - (CGRectGetMaxY(innerRect)));
    return CGSizeMake(nudgeLeft ?: nudgeRight, nudgeTop ?: nudgeBottom);
}

#pragma mark - Api Request

#pragma mark - Custom Delegate & DataSource
- (MAAnnotationView *)mapView:(MAMapView *)mapView viewForAnnotation:(id<MAAnnotation>)annotation
{
    if ([annotation isKindOfClass:[BMPointAnnotation class]]) {
        
        BMPointAnnotation *bm_annotation = (BMPointAnnotation *)annotation;
        
        /** 起点 */
        if (bm_annotation.annotationType == BMPointAnnotationTypeStart)
        {
            static NSString *annotationIdentifier = @"annotationIdentifier";
            
            MAAnnotationView *poiAnnotationView = [self.mapView dequeueReusableAnnotationViewWithIdentifier:annotationIdentifier];
            
            if (!poiAnnotationView) {
                poiAnnotationView = [[MAAnnotationView alloc] initWithAnnotation:annotation reuseIdentifier:annotationIdentifier];
            }
            
            poiAnnotationView.image = [UIImage imageNamed:@"startPoint"];
            poiAnnotationView.canShowCallout = NO;
            
            return poiAnnotationView;
        }
        /** 终点 */
        else if (bm_annotation.annotationType == BMPointAnnotationTypeDestination)
        {
            static NSString *annotationIdentifier = @"annotationIdentifier";
            
            BMNavToHosAnnotationView *poiAnnotationView = (BMNavToHosAnnotationView *)[self.mapView dequeueReusableAnnotationViewWithIdentifier:annotationIdentifier];
            
            if (!poiAnnotationView) {
                poiAnnotationView = [[BMNavToHosAnnotationView alloc] initWithAnnotation:annotation
                                                                         reuseIdentifier:annotationIdentifier];
                @weakify(self);
                poiAnnotationView.navigationAction = ^{
                    @strongify(self);
                    [self.useOtherMapNavigation navigationUseOtherMapWithDestinationName:self.mapInfoModel.navigationInfo.title endLocation:self.destinationAnnotation.coordinate];
                };
            }
            
            poiAnnotationView.desTitle = self.mapInfoModel.navigationInfo.title;
            poiAnnotationView.desAddress = self.mapInfoModel.navigationInfo.address;
            poiAnnotationView.image = [UIImage imageNamed:@"endPoint"];
            poiAnnotationView.canShowCallout = NO;
            
            return poiAnnotationView;
        }
    }
    
    return nil;
}

- (void)mapView:(MAMapView *)mapView didSelectAnnotationView:(MAAnnotationView *)view
{
    /* Adjust the map center in order to show the callout view completely. */
    if ([view isKindOfClass:[BMNavToHosAnnotationView class]]) {
        BMNavToHosAnnotationView *cusView = (BMNavToHosAnnotationView *)view;
        CGRect frame = [cusView convertRect:cusView.calloutView.frame toView:self.mapView];
        
        frame = UIEdgeInsetsInsetRect(frame, UIEdgeInsetsMake(kCalloutViewMargin, kCalloutViewMargin, kCalloutViewMargin, kCalloutViewMargin));
        
        if (!CGRectContainsRect(self.mapView.frame, frame))
        {
            /* Calculate the offset to make the callout view show up. */
            CGSize offset = [self offsetToContainRect:frame inRect:self.mapView.frame];
            
            CGPoint theCenter = self.mapView.center;
            theCenter = CGPointMake(theCenter.x - offset.width, theCenter.y - offset.height);
            
            CLLocationCoordinate2D coordinate = [self.mapView convertPoint:theCenter toCoordinateFromView:self.mapView];
            
            [self.mapView setCenterCoordinate:coordinate animated:YES];
        }
    }
}

- (void)mapView:(MAMapView *)mapView didUpdateUserLocation:(MAUserLocation *)userLocation updatingLocation:(BOOL)updatingLocation
{
    BMPointAnnotation *startAnnotation = [[BMPointAnnotation alloc] initWithAnnotationType:BMPointAnnotationTypeStart];
    startAnnotation.coordinate = userLocation.location.coordinate;
    [self.mapView addAnnotation:startAnnotation];
    self.mapView.showsUserLocation = NO;
    

    [self.mapView setVisibleMapRect:[self getUnionMapRectWithAnnotations:@[self.destinationAnnotation,startAnnotation]] edgePadding:UIEdgeInsetsMake(200, 80, 200, 80) animated:NO];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self.mapView selectAnnotation:self.destinationAnnotation animated:NO];
    });
}

- (MAMapRect)getUnionMapRectWithAnnotations:(NSArray *)annotations
{
    MAMapRect zoomRect = MAMapRectNull;
    for (BMPointAnnotation *annotation in annotations) {
        MAMapPoint pt = MAMapPointForCoordinate(annotation.coordinate);
        MAMapRect pointRect = MAMapRectMake(pt.x, pt.y, 10, 10);
        
        if (MAMapRectIsNull(zoomRect)) {
            zoomRect = pointRect;
        } else {
            zoomRect = MAMapRectUnion(zoomRect, pointRect);
        }
    }
    
    zoomRect = [self.mapView mapRectThatFits:zoomRect];
    
    return zoomRect;
}

#pragma mark - System Delegate & DataSource

#pragma mark - Setter

#pragma mark - Getter
- (BMNavigationUseOtherMap *)useOtherMapNavigation
{
    if (!_useOtherMapNavigation) {
        _useOtherMapNavigation = [[BMNavigationUseOtherMap alloc] init];
    }
    return _useOtherMapNavigation;
}


@end
