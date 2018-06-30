//
//  WXMapViewMarkerComponent.h
//  Pods
//
//  Created by yangshengtao on 17/2/6.
//
//

#import <WeexSDK/WeexSDK.h>

@interface WXMapViewMarkerComponent : WXComponent

@property (nonatomic, copy) NSString *icon;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, strong) NSArray *location;

@property (nonatomic, copy) NSString *clickEvent;

@property (nonatomic, assign) CGPoint offset;

@property (nonatomic, assign) BOOL hideCallout;

@property (nonatomic, assign) NSInteger zIndex;


@property (nonatomic, copy) NSString *subTitle;


@property (nonatomic,assign)CGFloat pinWidth;
@property (nonatomic,assign)CGFloat pinHeight;

@end
