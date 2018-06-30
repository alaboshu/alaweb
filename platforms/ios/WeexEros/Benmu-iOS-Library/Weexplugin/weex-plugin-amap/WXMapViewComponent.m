//
//  WXMapViewComponent.m
//  WeexDemo
//
//  Created by yangshengtao on 2017/1/20.
//  Copyright © 2016年 taobao. All rights reserved.
//

#import "WXMapViewComponent.h"
#import "WXMapViewMarkerComponent.h"
#import "WXMapPolylineComponent.h"
#import "WXMapPolygonComponent.h"
#import "WXMapCircleComponent.h"
#import "WXMapInfoWindowComponent.h"
#import "WXMapInfoWindow.h"
#import "WXImgLoaderDefaultImpl.h"
#import "NSArray+WXMap.h"
#import "NSDictionary+WXMap.h"
#import "WXConvert+AMapKit.h"
#import "AMapSearchAPI.h"
#import <objc/runtime.h>

#define WX_CUSTOM_MARKER @"wx_custom_marker";

@interface MAPointAnnotation(imageAnnotation)

@property(nonatomic, copy) NSString *iconImage;
@property(nonatomic, strong) WXComponent *component;

@end

static const void *iconImageKey = &iconImageKey;
static const void *componentAnnotationKey = &componentAnnotationKey;
bool wrongCenter = false;

@implementation MAPointAnnotation (imageAnnotation)

@dynamic iconImage;

- (void)setIconImage:(NSString *)iconImage
{
    objc_setAssociatedObject(self, iconImageKey, iconImage, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (NSString *)iconImage
{
    return objc_getAssociatedObject(self, iconImageKey);
}

- (void)setComponent:(WXComponent *)component
{
    objc_setAssociatedObject(self, componentAnnotationKey, component, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (WXComponent *)component
{
    return objc_getAssociatedObject(self, componentAnnotationKey);
}

@end

@interface MAShape(WXMapShape)

@property(nonatomic, strong) WXComponent *component;

@end

static const void *componentKey = &componentKey;

@implementation MAShape(WXMapShape)

@dynamic component;

- (void)setComponent:(WXComponent *)component {
    objc_setAssociatedObject(self, componentKey, component, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (WXComponent *)component {
    return objc_getAssociatedObject(self, componentKey);
}

@end


@interface WXMapViewComponent()


@end

@implementation WXMapViewComponent
{
    CLLocationCoordinate2D _centerCoordinate;
    NSMutableDictionary *_annotations;
    NSMutableDictionary *_overlays;
    CGFloat _zoomLevel;
    BOOL _showScale;
    BOOL _showGeolocation;
    BOOL _zoomChanged;
    BOOL _isDragend;
    BOOL _showsCompass;
    
}

- (id<WXImgLoaderProtocol>)imageLoader
{
    static id<WXImgLoaderProtocol> imageLoader;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        imageLoader = [WXImgLoaderDefaultImpl new];
    });
    return imageLoader;
}


- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        NSArray *center = [attributes wxmap_safeObjectForKey:@"center"];
        if ([WXConvert isValidatedArray:center]) {
            _centerCoordinate = [WXConvert CLLocationCoordinate2D:center];
            wrongCenter = false;
        } else {
            wrongCenter = true;
        }
        _zoomLevel = [[attributes wxmap_safeObjectForKey:@"zoom"] floatValue];
        _showScale = [[attributes wxmap_safeObjectForKey:@"scale"] boolValue];
        _showGeolocation = [[attributes wxmap_safeObjectForKey:@"geolocation"] boolValue];
        _showsCompass = [[attributes wxmap_safeObjectForKey:@"compass"] boolValue];
        if ([attributes wxmap_safeObjectForKey:@"sdkKey"]) {
            [self setAPIKey:[attributes[@"sdkKey"] objectForKey:@"ios"] ? : @""];
        }
        if ([events containsObject:@"zoomchange"]) {
            _zoomChanged = YES;
        }
        if ([events containsObject:@"dragend"]) {
            _isDragend = YES;
        }
        if (_showGeolocation && [CLLocationManager authorizationStatus] ==kCLAuthorizationStatusDenied) {
            UIAlertView * alert = [[UIAlertView alloc] initWithTitle:NSLocalizedString(@"无法获取定位服务", nil) message:NSLocalizedString(@"请在iPhone的\"设置-隐私-定位服务\"中允许访问定位服务", nil) delegate:self cancelButtonTitle:NSLocalizedString(@"取消", nil) otherButtonTitles:NSLocalizedString(@"设置", nil), nil];
            [alert show];
        }
    }
    
    return self;
}

- (UIView *) loadView
{
    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    CGSize windowSize = window.rootViewController.view.frame.size;
    self.mapView = [[MAMapView alloc] initWithFrame:CGRectMake(0, 0, windowSize.width, windowSize.height)];
    self.mapView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.mapView.showsUserLocation = _showGeolocation;
    self.mapView.showsCompass = _showsCompass;
    // self.mapView.showsLabels = YES;
    self.mapView.delegate = self;
    self.mapView.showsUserLocation = true;
    self.mapView.userTrackingMode = MAUserTrackingModeFollow;
    
    return self.mapView;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.mapView.showsScale = _showScale;
    [self.mapView setCenterCoordinate:_centerCoordinate];
    [self.mapView setZoomLevel:_zoomLevel animated:YES];
    self.gpsButton = [self makeGPSButtonView];
    self.gpsButton.center = CGPointMake(CGRectGetMidX(self.gpsButton.bounds) + 10,
                                        self.view.bounds.size.height -  CGRectGetMidY(self.gpsButton.bounds) - 40);
    [self.view addSubview:self.gpsButton];
    self.gpsButton.autoresizingMask = UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleRightMargin;
    UIView *zoomPannelView = [self makeZoomPannelView];
    zoomPannelView.center = CGPointMake(self.view.bounds.size.width -  CGRectGetMidX(zoomPannelView.bounds) - 10,
                                        self.view.bounds.size.height -  CGRectGetMidY(zoomPannelView.bounds) - 10);
    
    zoomPannelView.autoresizingMask = UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleLeftMargin;
    [self.view addSubview:zoomPannelView];
//    self.mapView.compassOrigin = CGPointMake(self.mapView.compassOrigin.x, self.mapView.compassOrigin.y+40);
//    self.mapView.scaleOrigin = CGPointMake(self.mapView.scaleOrigin.x, self.mapView.scaleOrigin.y+40);
    self.search = [[AMapSearchAPI alloc] init];
    self.search.delegate = self;
}


- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    if ([subcomponent isKindOfClass:[WXMapRenderer class]]) {
        WXMapRenderer *overlayRenderer = (WXMapRenderer *)subcomponent;
        [self addOverlay:overlayRenderer];
    }else if ([subcomponent isKindOfClass:[WXMapViewMarkerComponent class]]) {
        [self addMarker:(WXMapViewMarkerComponent *)subcomponent];
    }
}


- (void)dealloc
{
    [self clearPOIData];
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if ([WXConvert isValidatedArray:attributes[@"center"]]) {
        [self setCenter:attributes[@"center"]];
        wrongCenter = false;
    }
    
    if (attributes[@"zoom"]) {
        [self setZoomLevel:[attributes[@"zoom"] floatValue]];
    }
}

#pragma mark - mark
- (void)addOverlay:(WXMapRenderer *)overlayRenderer
{
    MAShape *shape;
    [self initOverLays];
    if (!overlayRenderer.path && [overlayRenderer isKindOfClass:[WXMapCircleComponent class]]) {
        WXMapCircleComponent *circle = (WXMapCircleComponent *)overlayRenderer;
        if (!circle.center) {
            return;
        }
        CLLocationCoordinate2D centerCoordinate = [WXConvert CLLocationCoordinate2D:circle.center];
        shape = [MACircle circleWithCenterCoordinate:centerCoordinate radius:circle.radius];
        shape.component = overlayRenderer;
        overlayRenderer.shape = shape;
        [_overlays setObject:shape forKey:shape.component.ref];
        [self.mapView addOverlay:(MACircle *)shape];
    }else {
        NSInteger count = overlayRenderer.path.count;
        if (count <= 0) {
            return;
        }
        CLLocationCoordinate2D shapePoints[count];
        for (NSInteger i = 0; i < count; i++) {
            if (!overlayRenderer.path) {
                return;
            }
            CLLocationCoordinate2D coordinate = [WXConvert CLLocationCoordinate2D:[overlayRenderer.path wxmap_safeObjectForKey:i]];
            shapePoints[i].latitude = coordinate.latitude;
            shapePoints[i].longitude = coordinate.longitude;
        }
        if ([overlayRenderer isKindOfClass:[WXMapPolylineComponent class]]) {
            shape = [MAPolyline polylineWithCoordinates:shapePoints count:count];
            shape.component = overlayRenderer;
            overlayRenderer.shape = shape;
            [self.mapView addOverlay:(MAPolyline *)shape];
        }else if ([overlayRenderer isKindOfClass:[WXMapPolygonComponent class]]) {
            shape = [MAPolygon polygonWithCoordinates:shapePoints count:count];
            shape.component = overlayRenderer;
            overlayRenderer.shape = shape;
            [self.mapView addOverlay:(MAPolygon *)shape];
        }
        [_overlays setObject:shape forKey:shape.component.ref];
    }
}

- (void)removeOverlay:(id)overlay
{
    WXComponent *component = (WXComponent*)overlay;
    if ([_overlays objectForKey:component.ref])
    {
        [self.mapView removeOverlay:[_overlays objectForKey:component.ref]];
        [_overlays removeObjectForKey:component.ref];
    }
}

- (void)updateOverlayAttributes:(id)overlay;
{
    WXComponent *component = (WXComponent*)overlay;
    if ([_overlays objectForKey:component.ref])
    {
        [self.mapView addOverlay:[_overlays objectForKey:component.ref]];
    }
}

#pragma mark - mark
- (void)addMarker:(WXMapViewMarkerComponent *)marker {
    if ([marker isKindOfClass:[WXMapInfoWindowComponent class]] && !((WXMapInfoWindowComponent *)marker).isOpen) {
        return;
    }
    [self initPOIData];
    MAPointAnnotation *a1 = [[MAPointAnnotation alloc] init];
    [self convertMarker:marker onAnnotation:a1];
    [_annotations setObject:a1 forKey:marker.ref];
    [self.mapView addAnnotation:a1];
}

- (void)convertMarker:(WXMapViewMarkerComponent *)marker onAnnotation:(MAPointAnnotation *)annotation {
    if (!marker.location) {
        return;
    }
    CLLocationCoordinate2D position = [WXConvert CLLocationCoordinate2D:marker.location];
    annotation.coordinate = position;
    if (marker.title) {
        annotation.title      = [NSString stringWithFormat:@"%@", marker.title];
    }
    if (marker.icon) {
        annotation.iconImage = marker.icon ? : nil;
    }
    //    if (marker.subTitle) {
    //        annotation.subtitle = marker.subTitle? : nil;
    //    }
    annotation.component = marker;
}

- (void)updateTitleMarker:(WXMapViewMarkerComponent *)marker {
    MAPointAnnotation *a1 = _annotations[marker.ref];
    a1.title = [NSString stringWithFormat:@"%@", marker.title];
    [self.mapView addAnnotation:a1];
}

//- (void)updateSubTitleMarker:(WXMapViewMarkerComponent *)marker
//{
//    MAPointAnnotation *a1 = _annotations[marker.ref];
//    a1.subtitle = [NSString stringWithFormat:@"%@", marker.subTitle];
//    [self.mapView addAnnotation:a1];
//}

- (void)updateIconMarker:(WXMapViewMarkerComponent *)marker {
    MAPointAnnotation *a1 = _annotations[marker.ref];
    a1.iconImage = marker.icon ? : nil;
    
    //    MAAnnotationView*  annotationView = [self.mapView viewForAnnotation:a1];
    //    [[self imageLoader] downloadImageWithURL:a1.iconImage imageFrame:CGRectMake(0, 0, marker.pinWidth, marker.pinHeight) userInfo:nil completed:^(UIImage *image, NSError *error, BOOL finished) {
    //        dispatch_async(dispatch_get_main_queue(), ^{
    //            if (image) {
    //                annotationView.image = image;
    //
    //                if (marker.pinWidth > 0 && marker.pinHeight > 0) {
    //                    annotationView.frame = CGRectMake(annotationView.frame.origin.x, annotationView.frame.origin.y,marker.pinWidth, marker.pinHeight);
    //                }
    //            }else {
    //                annotationView.image = [UIImage imageNamed:@"greenPin"];
    //            }
    //        });
    //    }];
    
    
    [self.mapView addAnnotation:a1];
}

- (void)updateLocationMarker:(WXMapViewMarkerComponent *)marker {
    MAPointAnnotation *a1 = _annotations[marker.ref];
    if (!marker.location) {
        return;
    }
    CLLocationCoordinate2D coordinate = [WXConvert CLLocationCoordinate2D:marker.location];
    a1.coordinate = coordinate;
    [self.mapView addAnnotation:a1];
}


- (void)removeMarker:(WXComponent *)marker {
    if (_annotations[marker.ref]) {
        [self.mapView removeAnnotation:_annotations[marker.ref]];
        [_annotations removeObjectForKey:marker.ref];
    }
}


#pragma mark - component interface
- (void)setAPIKey:(NSString *)appKey
{
    [AMapServices sharedServices].apiKey = appKey;
}

- (void)setCenter:(NSArray *)center
{
    if (!center) {
        return;
    }
    CLLocationCoordinate2D centerCoordinate = [WXConvert CLLocationCoordinate2D:center];
    [self.mapView setCenterCoordinate:centerCoordinate];
}

- (void)setZoomLevel:(CGFloat)zoom
{
    [self.mapView setZoomLevel:zoom animated:YES];
}


#pragma mark - publish method
- (NSDictionary *)getUserLocation
{
    if(self.mapView.userLocation.updating && self.mapView.userLocation.location) {
        NSArray *coordinate = @[[NSNumber numberWithDouble:self.mapView.userLocation.location.coordinate.longitude],[NSNumber numberWithDouble:self.mapView.userLocation.location.coordinate.latitude]];
        NSDictionary *userDic = @{@"result":@"success",@"data":@{@"position":coordinate,@"title":@""}};
        return userDic;
    }
    return @{@"resuldt":@"false",@"data":@""};
}

#pragma mark - private method
- (CLLocationCoordinate2D)_coordinate2D:(CLLocationCoordinate2D)position offset:(CGPoint)offset
{
    CGPoint convertedPoint = [self.mapView convertCoordinate:position toPointToView:self.weexInstance.rootView];
    return [self.mapView convertPoint:CGPointMake(convertedPoint.x + offset.x, convertedPoint.y + offset.y) toCoordinateFromView:self.weexInstance.rootView];
}

- (void)initPOIData
{
    if (!_annotations) {
        _annotations = [NSMutableDictionary dictionaryWithCapacity:5];
    }
}

- (void)initOverLays
{
    if (!_overlays) {
        _overlays = [NSMutableDictionary dictionaryWithCapacity:10];
    }
}

- (void)clearPOIData
{
    [_annotations removeAllObjects];
    _annotations = nil;
}

- (MAAnnotationView *)_generateAnnotationView:(MAMapView *)mapView viewForAnnotation:(MAPointAnnotation *)annotation
{
    WXMapViewMarkerComponent *markerComponent = (WXMapViewMarkerComponent *)annotation.component;
    if (annotation.iconImage){
        static NSString *pointReuseIndetifier = @"customReuseIndetifier";
        MAAnnotationView *annotationView = (MAAnnotationView*)[mapView dequeueReusableAnnotationViewWithIdentifier:pointReuseIndetifier];
        if (annotationView == nil)
        {
            annotationView = [[MAAnnotationView alloc] initWithAnnotation:annotation reuseIdentifier:pointReuseIndetifier];
        }
        
        annotationView.canShowCallout               = !markerComponent.hideCallout;
        //        if (markerComponent.title.length == 0 && markerComponent.subTitle.length == 0) {
        //            annotationView.canShowCallout  = NO;
        //        }
        
        
        annotationView.zIndex = markerComponent.zIndex;
        [[self imageLoader] downloadImageWithURL:annotation.iconImage imageFrame:CGRectMake(0, 0, markerComponent.pinWidth, markerComponent.pinHeight) userInfo:nil completed:^(UIImage *image, NSError *error, BOOL finished) {
            dispatch_async(dispatch_get_main_queue(), ^{
                if (image) {
                    annotationView.image = image;
                    
                    
                    //                    if (markerComponent.pinWidth > 0 && markerComponent.pinHeight > 0) {
                    //                        annotationView.frame = CGRectMake(annotationView.frame.origin.x, annotationView.frame.origin.y,markerComponent.pinWidth, markerComponent.pinHeight);
                    //                    }
                    
                    
                }else {
                    annotationView.image = [UIImage imageNamed:@"greenPin"];
                }
            });
        }];
        return annotationView;
    }else {
        static NSString *pointReuseIndetifier = @"pointReuseIndetifier";
        MAPinAnnotationView *annotationView = (MAPinAnnotationView*)[mapView dequeueReusableAnnotationViewWithIdentifier:pointReuseIndetifier];
        if (annotationView == nil)
        {
            annotationView = [[MAPinAnnotationView alloc] initWithAnnotation:annotation reuseIdentifier:pointReuseIndetifier];
        }
        
        annotationView.canShowCallout  = !markerComponent.hideCallout;
        
        //        if (markerComponent.title.length == 0 && markerComponent.subTitle.length == 0) {
        //            annotationView.canShowCallout  = NO;
        //        }
        
        annotationView.zIndex = markerComponent.zIndex;
        return annotationView;
    }
}

- (MAAnnotationView *)_generateCustomInfoWindow:(MAMapView *)mapView viewForAnnotation:(MAPointAnnotation *)annotation
{
    WXMapInfoWindowComponent *infoWindowComponent = (WXMapInfoWindowComponent *)annotation.component;
    static NSString *customReuseIndetifier = WX_CUSTOM_MARKER;
    WXMapInfoWindow *infoView = (WXMapInfoWindow*)[mapView dequeueReusableAnnotationViewWithIdentifier:customReuseIndetifier];
    if (infoView == nil || ![infoView isKindOfClass:[WXMapInfoWindow class]]) {
        infoWindowComponent.annotation = annotation;
        infoWindowComponent.identifier = customReuseIndetifier;
        infoView = (WXMapInfoWindow *)infoWindowComponent.view;
        infoView.canShowCallout = !infoWindowComponent.hideCallout;
    }
    if (infoWindowComponent.subcomponents.count > 0) {
        for (WXComponent *component in annotation.component.subcomponents) {
            if ([infoView respondsToSelector:@selector(addCustomInfoWindow:)]) {
                [infoView addCustomInfoWindow:component.view];
            }
        }
    }
    infoView.centerOffset = infoWindowComponent.offset;
    infoView.zIndex = infoWindowComponent.zIndex;
    return infoView;
}

#pragma mark - mapview delegate
/*!
 @brief 根据anntation生成对应的View
 */
- (MAAnnotationView*)mapView:(MAMapView *)mapView viewForAnnotation:(id <MAAnnotation>)annotation
{
    if ([annotation isKindOfClass:[MAPointAnnotation class]])
    {
        MAPointAnnotation *pointAnnotation = (MAPointAnnotation *)annotation;
        if ([pointAnnotation.component isKindOfClass:[WXMapInfoWindowComponent class]]) {
            return [self _generateCustomInfoWindow:mapView viewForAnnotation:pointAnnotation];
            
        }else {
            return [self _generateAnnotationView:mapView viewForAnnotation:pointAnnotation];
        }
    }
    
    return nil;
}

/**
 * @brief 当选中一个annotation views时，调用此接口
 * @param mapView 地图View
 * @param view 选中的annotation views
 */
- (void)mapView:(MAMapView *)mapView didSelectAnnotationView:(MAAnnotationView *)view
{
    MAPointAnnotation *annotation = view.annotation;
    for (WXComponent *component in self.subcomponents) {
        if ([component isKindOfClass:[WXMapViewMarkerComponent class]] && [component.ref isEqualToString:annotation.component.ref]) {
            WXMapViewMarkerComponent *marker = (WXMapViewMarkerComponent *)component;
            if (marker.clickEvent) {
                [marker fireEvent:marker.clickEvent params:[NSDictionary dictionary]];
            }
        }
    }
}

/**
 * @brief 当取消选中一个annotation views时，调用此接口
 * @param mapView 地图View
 * @param view 取消选中的annotation views
 */
- (void)mapView:(MAMapView *)mapView didDeselectAnnotationView:(MAAnnotationView *)view
{
    
}


/**
 * @brief 地图移动结束后调用此接口
 * @param mapView       地图view
 * @param wasUserAction 标识是否是用户动作
 */
- (void)mapView:(MAMapView *)mapView mapDidMoveByUser:(BOOL)wasUserAction
{
    if (_isDragend) {
        [self fireEvent:@"dragend" params:[NSDictionary dictionary]];
    }
}




#pragma mark - Overlay
- (MAOverlayRenderer *)mapView:(MAMapView *)mapView rendererForOverlay:(id <MAOverlay>)overlay
{
    if ([overlay isKindOfClass:[MAPolyline class]])
    {
        MAPolyline *polyline = (MAPolyline *)overlay;
        WXMapPolylineComponent *component = (WXMapPolylineComponent *)polyline.component;
        MAPolylineRenderer *polylineRenderer = [[MAPolylineRenderer alloc] initWithPolyline:overlay];
        polylineRenderer.strokeColor = [WXConvert UIColor:component.strokeColor];
        polylineRenderer.lineWidth   = component.strokeWidth;
        //polylineRenderer.lineCapType = kCGLineCapButt;
        //polylineRenderer.lineDash = [WXConvert isLineDash:component.strokeStyle];
        return polylineRenderer;
    }else if ([overlay isKindOfClass:[MAPolygon class]])
    {
        MAPolygon *polygon = (MAPolygon *)overlay;
        WXMapPolygonComponent *component = (WXMapPolygonComponent *)polygon.component;
        MAPolygonRenderer *polygonRenderer = [[MAPolygonRenderer alloc] initWithPolygon:overlay];
        polygonRenderer.lineWidth   = component.strokeWidth;;
        polygonRenderer.strokeColor = [WXConvert UIColor:component.strokeColor];
        polygonRenderer.fillColor   = [WXConvert UIColor:component.fillColor];
        //polygonRenderer.lineDash = [WXConvert isLineDash:component.strokeStyle];
        return polygonRenderer;
    }else if ([overlay isKindOfClass:[MACircle class]])
    {
        MACircle *circle = (MACircle *)overlay;
        WXMapCircleComponent *component = (WXMapCircleComponent *)circle.component;
        MACircleRenderer *circleRenderer = [[MACircleRenderer alloc] initWithCircle:overlay];
        circleRenderer.lineWidth   = component.strokeWidth;
        circleRenderer.strokeColor = [WXConvert UIColor:component.strokeColor];
        circleRenderer.fillColor   = [WXConvert UIColor:component.fillColor];
        return circleRenderer;
    }
    
    return nil;
}
- (UIButton *)makeGPSButtonView {
    UIButton *ret = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 40, 40)];
    ret.backgroundColor = [UIColor whiteColor];
    ret.layer.cornerRadius = 4;
    
    [ret setImage:[UIImage imageNamed:@"gpsStat1"] forState:UIControlStateNormal];
    [ret addTarget:self action:@selector(gpsAction) forControlEvents:UIControlEventTouchUpInside];
    
    return ret;
}

- (UIView *)makeZoomPannelView
{
    UIView *ret = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 53, 98)];
    
    UIButton *incBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 53, 49)];
    [incBtn setImage:[UIImage imageNamed:@"increase"] forState:UIControlStateNormal];
    [incBtn sizeToFit];
    [incBtn addTarget:self action:@selector(zoomPlusAction) forControlEvents:UIControlEventTouchUpInside];
    
    UIButton *decBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, 49, 53, 49)];
    [decBtn setImage:[UIImage imageNamed:@"decrease"] forState:UIControlStateNormal];
    [decBtn sizeToFit];
    [decBtn addTarget:self action:@selector(zoomMinusAction) forControlEvents:UIControlEventTouchUpInside];
    
    
    [ret addSubview:incBtn];
    [ret addSubview:decBtn];
    
    return ret;
}
- (void)zoomPlusAction
{
    CGFloat oldZoom = self.mapView.zoomLevel;
    [self.mapView setZoomLevel:(oldZoom + 1) animated:YES];
}

- (void)zoomMinusAction
{
    CGFloat oldZoom = self.mapView.zoomLevel;
    [self.mapView setZoomLevel:(oldZoom - 1) animated:YES];
}

- (void)gpsAction {
    if ([CLLocationManager authorizationStatus] ==kCLAuthorizationStatusDenied) {
        UIAlertView * alert = [[UIAlertView alloc] initWithTitle:NSLocalizedString(@"无法获取定位服务", nil) message:NSLocalizedString(@"请在iPhone的\"设置-隐私-定位服务\"中允许访问定位服务", nil) delegate:self cancelButtonTitle:NSLocalizedString(@"取消", nil) otherButtonTitles:NSLocalizedString(@"设置", nil), nil];
        [alert show];
    }
    if(self.mapView.userLocation.updating && self.mapView.userLocation.location) {
        [self.mapView setCenterCoordinate:self.mapView.userLocation.location.coordinate animated:YES];
        [self.gpsButton setSelected:YES];
    }
}
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    if (buttonIndex == 1) { // 去设置界面，开启相机访问权限
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
    }
}
- (void)mapView:(MAMapView *)mapView didAddAnnotationViews:(NSArray *)views
{
    MAAnnotationView *view = views[0];
    
    // 放到该方法中用以保证userlocation的annotationView已经添加到地图上了。
    if ([view.annotation isKindOfClass:[MAUserLocation class]])
    {
        MAUserLocationRepresentation *pre = [[MAUserLocationRepresentation alloc] init];
        pre.fillColor = [UIColor colorWithRed:0 green:0 blue:0.7 alpha:0.04];
        pre.strokeColor = [UIColor colorWithRed:0 green:0.57 blue:1 alpha:0.7];
        pre.image = [UIImage imageNamed:@"userPosition"];
        pre.lineWidth = 3;
        //        pre.lineDashPattern = @[@6, @3];
        
        [self.mapView updateUserLocationRepresentation:pre];
        
        view.calloutOffset = CGPointMake(0, 0);
        view.canShowCallout = NO;
        self.userLocationAnnotationView = view;
    }
}
- (void)mapView:(MAMapView *)mapView didUpdateUserLocation:(MAUserLocation *)userLocation updatingLocation:(BOOL)updatingLocation
{
    if (updatingLocation)
    {
        [self.mapView setCenterCoordinate:userLocation.coordinate animated:YES];
    }
}
/**
 *  单击地图底图调用此接口
 *
 *  @param mapView    地图View
 *  @param coordinate 点击位置经纬度
 */
- (void)mapView:(MAMapView *)mapView didSingleTappedAtCoordinate:(CLLocationCoordinate2D)coordinate {
    [self searchReGeocodeWithCoordinate:coordinate];
    [self fireEvent:@"click" params:@{@"latitude": @(coordinate.latitude), @"longitude": @(coordinate.longitude)}];
}

- (void)searchReGeocodeWithCoordinate:(CLLocationCoordinate2D)coordinate
{
    AMapReGeocodeSearchRequest *regeo = [[AMapReGeocodeSearchRequest alloc] init];
    
    regeo.location                    = [AMapGeoPoint locationWithLatitude:coordinate.latitude longitude:coordinate.longitude];
    regeo.requireExtension            = YES;
    
    [self.search AMapReGoecodeSearch:regeo];
}

- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error
{
    [self fireEvent:@"regeo" params:@{@"status": @(error.code)}];
}
/* 逆地理编码回调. */
- (void)onReGeocodeSearchDone:(AMapReGeocodeSearchRequest *)request response:(AMapReGeocodeSearchResponse *)response
{
    if (response.regeocode != nil)
    {
        NSString *address = response.regeocode.formattedAddress;
        AMapAddressComponent *component = response.regeocode.addressComponent;
        NSArray<AMapPOI*>* pois = response.regeocode.pois;
        NSString *poisName = @"";
        if (pois.count > 0) {
            poisName = pois[0].name;
        }
        
        [self fireEvent:@"regeo" params: @{@"status": @(0), @"address": address, @"province": component.province,
                                           @"city": component.city, @"district": component.district,
                                           @"town": component.township, @"neighborhood": component.neighborhood,
                                           @"building": component.building, @"latitude": @(request.location.latitude),
                                           @"longitude": @(request.location.longitude),
                                           @"street": component.streetNumber.street, @"number": component.streetNumber.number,
                                           @"poiName": poisName
                                           }];
    }
}

@end

