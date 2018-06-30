//
//  WXSVGNodeComponent.h
//  Pods
//
//  Created by yangshengtao on 17/2/16.
//
//

#import <WeexSDK/WeexSDK.h>
#import "WXSVGNode.h"
#import "NSDictionary+WXSVG.h"
#import "WXConvert+WXSVG.h"

@interface WXSVGNodeComponent : WXComponent

@property (nonatomic, copy) NSString *name;
@property (nonatomic, assign) CGFloat opacity;
@property (nonatomic, assign) CGAffineTransform matrix;
@property (nonatomic, copy) NSString *clipPath;
@property (nonatomic, assign) WXSVGCGFCRule clipRule;
@property (nonatomic, assign) BOOL responsible;
@property (nonatomic, strong) NSDictionary *attributes;

- (WXSVGNode *)node;

- (void)syncViewAttributes:(WXSVGNode *)view;

- (NSString *)formatterPoint:(NSString *)point;


@end
