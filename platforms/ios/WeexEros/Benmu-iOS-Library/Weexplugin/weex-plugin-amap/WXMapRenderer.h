//
//  WXMapRenderer.h
//  Pods
//
//  Created by yangshengtao on 17/3/3.
//
//

#import <WeexSDK/WeexSDK.h>
#import <MAMapKit/MAMapKit.h>
@interface WXComponent(WXMapShape)

@property(nonatomic, strong) MAShape *shape;

@end

@interface WXMapRenderer : WXComponent

@property (nonatomic, strong) NSArray *path;
@property (nonatomic, copy) NSString *strokeColor;
@property (nonatomic, assign) double strokeWidth;
@property (nonatomic, assign) double strokeOpacity;
@property (nonatomic, copy) NSString *strokeStyle;

@end
