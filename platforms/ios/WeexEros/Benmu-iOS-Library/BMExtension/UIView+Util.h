//
//  UIView+Util.h
//  JingYitong
//
//  Created by XHY on 15/7/14.
//  Copyright (c) 2015年 京医通. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIView (Util)

/* frame.origin.x */
@property (nonatomic) CGFloat minX;

/* frame.origin.y */
@property (nonatomic) CGFloat minY;

/* frame.origin.x + frame.size.width */
@property (nonatomic) CGFloat maxX;

/* frame.origin.y + frame.size.height */
@property (nonatomic) CGFloat maxY;

/* frame.size.width */
@property (nonatomic) CGFloat width;

/* frame.size.height */
@property (nonatomic) CGFloat height;

/* center.x */
@property (nonatomic) CGFloat centerX;

/* center.y */
@property (nonatomic) CGFloat centerY;

/* Return the x coordinate on the screen */
@property (nonatomic, readonly) CGFloat ttScreenX;

/* Return the y coordinate on the screen */
@property (nonatomic, readonly) CGFloat ttScreenY;

/* Return the x coordinate on the screen, taking into account scroll views */
@property (nonatomic, readonly) CGFloat screenViewX;

/* Return the y coordinate on the screen, taking into account scroll views */
@property (nonatomic, readonly) CGFloat screenViewY;

/* Return the view frame on the screen, taking into account scroll views */
@property (nonatomic, readonly) CGRect screenFrame;

/* frame.origin */
@property (nonatomic) CGPoint origin;

/* frame.size */
@property (nonatomic) CGSize size;

/* center for bounds */
@property (nonatomic) CGPoint centerBounds;

- (UIView*)subviewWithFirstResponder;
- (UIView*)subviewWithClass:(Class)cls;
- (UIView*)superviewWithClass:(Class)cls;
- (NSArray *)subviewsWtihClass:(Class)cls;

- (void)removeAllSubviews;

/** 设置背景图片 */
- (void)setBackgroundImage:(UIImage *)image;

/** 设置背景视图 */
- (void)setBackgroundView:(UIView *)bgView;

/** 设置圆角*/
- (void)setCornerRadius:(CGFloat)radius;


- (id)initWithClearFrame:(CGRect)frame;
- (id)initLineWithFrame:(CGRect)frame color:(UIColor *)color;
- (id)initBorderWithFrame:(CGRect)frame;
- (id)initHeaderWithFrame:(CGRect)frame title:(NSString *)title;

/** 添加一个子view*/
- (UIView *)addSubviewWithFrame:(CGRect)frame color:(UIColor *)color;

- (UIViewController *)viewController;

- (NSString *)stringViewStruct;

@end
