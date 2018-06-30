//
//  UIView+Util.m
//  JingYitong
//
//  Created by XHY on 15/7/14.
//  Copyright (c) 2015年 京医通. All rights reserved.
//

#import "UIView+Util.h"

@implementation UIView (Util)

- (CGFloat)minX {
    return self.frame.origin.x;
}

- (void)setMinX:(CGFloat)x {
    CGRect frame = self.frame;
    frame.origin.x = x;
    self.frame = frame;
}

- (CGFloat)minY {
    return self.frame.origin.y;
}

- (void)setMinY:(CGFloat)y {
    CGRect frame = self.frame;
    frame.origin.y = y;
    self.frame = frame;
}

- (CGFloat)maxX {
    return self.frame.origin.x + self.frame.size.width;
}

- (void)setMaxX:(CGFloat)x {
    CGRect frame = self.frame;
    frame.origin.x = x - frame.size.width;
    self.frame = frame;
}

- (CGFloat)maxY {
    return self.frame.origin.y + self.frame.size.height;
}

- (void)setMaxY:(CGFloat)y {
    CGRect frame = self.frame;
    frame.origin.y = y - frame.size.height;
    self.frame = frame;
}

- (CGFloat)centerX {
    return self.center.x;
}

- (void)setCenterX:(CGFloat)centerX {
    self.center = CGPointMake(centerX, self.center.y);
}

- (CGFloat)centerY {
    return self.center.y;
}

- (void)setCenterY:(CGFloat)centerY {
    self.center = CGPointMake(self.center.x, centerY);
}

- (CGFloat)width {
    return self.frame.size.width;
}

- (void)setWidth:(CGFloat)width {
    CGRect frame = self.frame;
    frame.size.width = width;
    self.frame = frame;
}

- (CGFloat)height {
    return self.frame.size.height;
}

- (void)setHeight:(CGFloat)height {
    CGRect frame = self.frame;
    frame.size.height = height;
    self.frame = frame;
}

- (CGFloat)ttScreenX {
    CGFloat x = 0;
    for (UIView* view = self; view; view = view.superview) {
        x += view.minX;
    }
    return x;
}

- (CGFloat)ttScreenY {
    CGFloat y = 0;
    for (UIView* view = self; view; view = view.superview) {
        y += view.minY;
    }
    return y;
}

- (CGFloat)screenViewX {
    CGFloat x = 0;
    for (UIView* view = self; view; view = view.superview) {
        x += view.minX;
        
        if ([view isKindOfClass:[UIScrollView class]]) {
            UIScrollView* scrollView = (UIScrollView*)view;
            x -= scrollView.contentOffset.x;
        }
    }
    
    return x;
}

- (CGFloat)screenViewY {
    CGFloat y = 0;
    for (UIView* view = self; view; view = view.superview) {
        y += view.minY;
        
        if ([view isKindOfClass:[UIScrollView class]]) {
            UIScrollView* scrollView = (UIScrollView*)view;
            y -= scrollView.contentOffset.y;
        }
    }
    return y;
}

- (CGRect)screenFrame {
    return CGRectMake(self.screenViewX, self.screenViewY, self.width, self.height);
}

- (CGPoint)origin {
    return self.frame.origin;
}

- (void)setOrigin:(CGPoint)origin {
    CGRect frame = self.frame;
    frame.origin = origin;
    self.frame = frame;
}

- (CGSize)size {
    return self.frame.size;
}

- (void)setSize:(CGSize)size {
    CGRect frame = self.frame;
    frame.size = size;
    self.frame = frame;
}

- (CGPoint)centerBounds {
    return CGPointMake(self.bounds.size.width / 2, self.bounds.size.height / 2);
}

- (void)setCenterBounds:(CGPoint)centerBounds {
    
}

- (void)setCornerRadius:(CGFloat)radius {
    [self.layer setMasksToBounds:YES];
    [self.layer setCornerRadius:radius];
}

- (UIView*)subviewWithFirstResponder {
    if ([self isFirstResponder])
        return self;
    
    for (UIView *subview in self.subviews) {
        UIView *view = [subview subviewWithFirstResponder];
        if (view) return view;
    }
    
    return nil;
}

- (UIView*)subviewWithClass:(Class)cls {
    if ([self isKindOfClass:cls])
        return self;
    
    for (UIView* subview in self.subviews) {
        UIView* view = [subview subviewWithClass:cls];
        if (view) return view;
    }
    
    return nil;
}

- (UIView*)superviewWithClass:(Class)cls {
    if ([self isKindOfClass:cls]) {
        return self;
    } else if (self.superview) {
        return [self.superview superviewWithClass:cls];
    } else {
        return nil;
    }
}

- (NSArray *)subviewsWtihClass:(Class)cls {
    
    NSMutableArray *array = [[NSMutableArray alloc] init];
    
    if ([self isKindOfClass:cls])
        [array addObject:self];
    
    for (UIView* subview in self.subviews) {
        NSArray *array_Temp = [subview subviewsWtihClass:cls];
        if (array_Temp.count > 0)
            [array addObjectsFromArray:array_Temp];
    }
    return array;
}

- (void)removeAllSubviews {
    while (self.subviews.count) {
        UIView* child = self.subviews.lastObject;
        [child removeFromSuperview];
    }
}

/** 设置背景图片 */
- (void)setBackgroundImage:(UIImage *)image
{
    UIImageView *iv = [[UIImageView alloc] initWithImage:image];
    [self setBackgroundView:iv];
}

/** 设置背景视图 */
- (void)setBackgroundView:(UIView *)bgView
{
    static int kBackgroundViewTag = 0x06746292;
    self.backgroundColor = [UIColor clearColor];
    
    bgView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    bgView.tag = kBackgroundViewTag;
    
    UIView* oldView = [self viewWithTag:kBackgroundViewTag];
    if (oldView)
        [oldView removeFromSuperview];
    
    [self insertSubview:bgView atIndex:0];
}


//初始化透明背景的View
- (id)initWithClearFrame:(CGRect)frame{
    self = [self initWithFrame:frame];
    self.backgroundColor = [UIColor clearColor];
    return self;
}

//初始化一根线
- (id)initLineWithFrame:(CGRect)frame color:(UIColor *)color{
    self = [self initWithFrame:frame];
    self.backgroundColor = color;
    return self;
}

// 添加子view
- (UIView *)addSubviewWithFrame:(CGRect)frame color:(UIColor *)color
{
    UIView *line = [[UIView alloc] initWithFrame:frame];
    line.backgroundColor = color;
    [self addSubview:line];
    return line;
}

// 初始化带上线边框的view
- (id)initBorderWithFrame:(CGRect)frame{
    self = [self initWithFrame:frame];
    
    [self addSubview:[[UIView alloc] initLineWithFrame:CGRectMake(0, 0, frame.size.width, 0.6) color:[UIColor colorWithRed:200.0/255.0 green:199.0/255.0 blue:204.0/255.0 alpha:1]]];
    [self addSubview:[[UIView alloc] initLineWithFrame:CGRectMake(0, frame.size.height - 0.6, frame.size.width, 0.6) color:[UIColor colorWithRed:200.0/255.0 green:199.0/255.0 blue:204.0/255.0 alpha:1]]];
    
    return self;
}

// 初始化一个带头的view
- (id)initHeaderWithFrame:(CGRect)frame title:(NSString *)title {

    CGRect tempFrame = CGRectMake(frame.origin.x, frame.origin.y, frame.size.width, frame.size.height + 20);
    
    self = [self initWithFrame:tempFrame];
    
    UIView *headerView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, tempFrame.size.width, 20)];
    headerView.backgroundColor = [UIColor colorWithRed:233.0/255.0 green:233.0/255.0 blue:233.0/255.0 alpha:1];
    
    UILabel *titleLab = [[UILabel alloc] init];
    titleLab.backgroundColor = [UIColor clearColor];
    titleLab.text = title;
    titleLab.font = [UIFont systemFontOfSize:12];
    titleLab.textColor = [UIColor darkTextColor];
    [titleLab sizeToFit];
    titleLab.origin = CGPointMake(15, (headerView.height - titleLab.height) / 2);
    
    [headerView addSubview:titleLab];
    [self addSubview:headerView];
    
    return self;
}

/** super UIViewController */
- (UIViewController*)viewController {
    for (UIView* next = [self superview]; next; next = next.superview) {
        UIResponder* nextResponder = [next nextResponder];
        if ([nextResponder isKindOfClass:[UIViewController class]]) {
            return (UIViewController*)nextResponder;
        }
    }
    return nil;
}

/** 文字组织视图结构 */
- (void)dumpViewIntoString:(NSMutableString *)str view:(UIView *)view level:(int)level
{
    for (int i = 0; i < level; i++)
        [str appendString:@"--"];
    [str appendFormat:@"[%d] %@ %@\n", level, [view.class description], NSStringFromCGRect(view.frame)];
    for (UIView *v in view.subviews)
        [self dumpViewIntoString:str view:v level:level + 1];
}

/** 文字视图结构 */
- (NSString *)stringViewStruct
{
    NSMutableString *str = [NSMutableString stringWithFormat:@"\n"];
    [self dumpViewIntoString:str view:self level:0];
    return str;
}

@end
