//
//  BMPointAnnotation.h
//  Pods
//
//  Created by XHY on 2017/5/31.
//
//

#import <MAMapKit/MAMapKit.h>


/**
 点标注类型

 - BMPointAnnotationTypeStart: 起点
 - BMPointAnnotationTypeDestination: 目的地
 */
typedef NS_ENUM(NSInteger,BMPointAnnotationType) {
    BMPointAnnotationTypeStart = 1,
    BMPointAnnotationTypeDestination
};

@interface BMPointAnnotation : MAPointAnnotation

@property (nonatomic)BMPointAnnotationType annotationType;


/**
 初始化方法

 @param type type类型
 @return instance
 */
- (instancetype)initWithAnnotationType:(BMPointAnnotationType)type;

@end
