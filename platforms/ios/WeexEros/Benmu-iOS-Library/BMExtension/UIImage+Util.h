//
//  UIImage+Util.h
//  JingYitong
//
//  Created by XHY on 15/7/14.
//  Copyright (c) 2015年 京医通. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIImage (Util)

+ (UIImage *)imageWithColor:(UIColor *)color size:(CGSize)size;
+ (UIImage *)imageWithColor:(UIColor *)color triangleSize:(CGSize)size;

+ (UIImage *)imageAutoNamed:(NSString *)imageName;
+ (UIImage *)mergerImage1:(UIImage *)image1 image2:(UIImage *)image2 toSize:(CGSize)toSize;

- (UIImage *)toGrayImage;

/* size.width */
- (CGFloat)width;
/* size.height */
- (CGFloat)height;

- (UIImage *)imageTo4b3;
- (UIImage *)imageTo4b3AtSize:(CGSize)size;
- (UIImage *)imageAtRect:(CGRect)rect;
- (UIImage *)imageToScale:(float)scale;
- (UIImage *)imageToSize:(CGSize)size;

- (UIImage *)addImage:(UIImage *)image point:(CGPoint)point;

- (UIImage *)imageRotatedByRadians:(CGFloat)radians;
- (UIImage *)imageRotatedByDegrees:(CGFloat)degrees;

/**
 *  按比例缩放到最小尺寸
 *
 *  @param targetSize 目标尺寸
 *
 *  @return 切后图片
 */
- (UIImage *)imageByScalingProportionallyToMinimumSize:(CGSize)targetSize;

/** 将UIView 转换为 UIImage */
+ (UIImage *)converViewToImage:(UIView *)theView;

+ (UIImage *)imageWithWatermark:(NSString *)watermark size:(CGSize)size;

@end
