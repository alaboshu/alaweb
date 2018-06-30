//
//  PBViewController.m
//  PhotoBrowser
//
//  Created by Moch Xiao on 8/24/15.
//  Copyright (c) 2015 Moch Xiao (https://github.com/cuzv).
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

#import "PBViewController.h"
#import "PBImageScrollerViewController.h"
#import "UIView+PBSnapshot.h"
#import "PBImageScrollView.h"
#import "PBImageScrollView+internal.h"
#import "PBPresentAnimatedTransitioningController.h"

static const NSUInteger reusable_page_count = 3;

@interface PBViewController () <
    UIPageViewControllerDataSource,
    UIPageViewControllerDelegate,
    UIViewControllerTransitioningDelegate
>

@property (nonatomic, strong) NSArray<PBImageScrollerViewController *> *reusableImageScrollerViewControllers;
@property (nonatomic, assign, readwrite) NSInteger numberOfPages;
@property (nonatomic, assign, readwrite) NSInteger currentPage;

/// Images count >9, use this for indicate
@property (nonatomic, strong) UILabel *indicatorLabel;
/// Images count <=9, use this for indicate
@property (nonatomic, strong) UIPageControl *indicatorPageControl;
/// Hold the indicator control
@property (nonatomic, weak) UIView *indicator;
/// Blur background view
@property (nonatomic, strong) UIView *blurBackgroundView;

/// Gestures
@property (nonatomic, strong) UITapGestureRecognizer *singleTapGestureRecognizer;
@property (nonatomic, strong) UITapGestureRecognizer *doubleTapGestureRecognizer;
@property (nonatomic, strong) UILongPressGestureRecognizer *longPressGestureRecognizer;

@property (nonatomic, strong) PBPresentAnimatedTransitioningController *transitioningController;
@property (nonatomic, assign) CGFloat velocity;

@property (nonatomic, assign) CGRect contentsRect;
@property (nonatomic, assign) CGRect originFrame;
@property (nonatomic, weak) UIView *lastThumbView;

@end

@implementation PBViewController

- (void)dealloc {
    NSLog(@"~~~~~~~~~~~%s~~~~~~~~~~~", __FUNCTION__);
}

#pragma mark - respondsToSelector

- (instancetype)initWithTransitionStyle:(UIPageViewControllerTransitionStyle)style
                  navigationOrientation:(UIPageViewControllerNavigationOrientation)navigationOrientation
                                options:(NSDictionary *)options {
    NSMutableDictionary *dict = [(options ?: @{}) mutableCopy];
    [dict setObject:@(20) forKey:UIPageViewControllerOptionInterPageSpacingKey];
    self = [super initWithTransitionStyle:UIPageViewControllerTransitionStyleScroll
                    navigationOrientation:navigationOrientation
                                  options:dict];
    if (!self) {
        return nil;
    }
    
    self.modalPresentationStyle = UIModalPresentationCustom;
    self.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
    self.transitioningDelegate = self;
    _contentsRect = CGRectMake(0, 0, 1, 1);
    _blurBackground = YES;
    _hideThumb = YES;
    
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Set numberOfPages
    [self _setNumberOfPages];
    // Set visible view controllers
    [self _setCurrentPresentPageAnimated: NO];
    // Set indicatorLabel
    [self _addIndicator];
    // Blur background
    [self _addBlurBackgroundView];
    
    [self.view addGestureRecognizer:self.longPressGestureRecognizer];
    [self.view addGestureRecognizer:self.doubleTapGestureRecognizer];
    [self.view addGestureRecognizer:self.singleTapGestureRecognizer];
    [self.singleTapGestureRecognizer requireGestureRecognizerToFail:self.longPressGestureRecognizer];
    [self.singleTapGestureRecognizer requireGestureRecognizerToFail:self.doubleTapGestureRecognizer];
    
    self.dataSource = self;
    self.delegate = self;
    
    [self _setupTransitioningController];
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    [self _updateIndicator];
    [self _updateBlurBackgroundView];
}

#pragma mark - Public method

- (void)setInitializePageIndex:(NSInteger)pageIndex {
    self.pb_startPage = pageIndex;
}

- (void)setPb_startPage:(NSInteger)pb_startPage {
    _startPage = pb_startPage;
    _pb_startPage = pb_startPage;
    _currentPage = pb_startPage;
}

- (void)setStartPage:(NSInteger)startPage {
    self.pb_startPage = startPage;
}

- (void)reload {
    [self reloadWithCurrentPage:0];
}

- (void)reloadWithCurrentPage:(NSInteger)index {
    self.pb_startPage = index;
    [self _setNumberOfPages];
    NSAssert(index < _numberOfPages, @"index(%@) beyond boundary.", @(index));
    [self _setCurrentPresentPageAnimated: YES];
    [self _updateIndicator];
    [self _updateBlurBackgroundView];
    [self _hideThumbView];
}

#pragma mark - Private methods

- (void)_setNumberOfPages {
    if ([self.pb_dataSource conformsToProtocol:@protocol(PBViewControllerDataSource)] &&
        [self.pb_dataSource respondsToSelector:@selector(numberOfPagesInViewController:)]) {
        self.numberOfPages = [self.pb_dataSource numberOfPagesInViewController:self];
    }
}

- (void)_setCurrentPresentPageAnimated:(BOOL)animated {
    self.currentPage = 0 < self.currentPage && self.currentPage < self.numberOfPages ? self.currentPage : 0;
    PBImageScrollerViewController *firstImageScrollerViewController = [self _imageScrollerViewControllerForPage:self.currentPage];
    [self setViewControllers:@[firstImageScrollerViewController] direction:UIPageViewControllerNavigationDirectionForward animated:animated completion:nil];
    [firstImageScrollerViewController reloadData];
}

- (void)_addIndicator {
    if (self.numberOfPages == 1) {
        return;
    }
    if (self.numberOfPages <= 9) {
        [self.view addSubview:self.indicatorPageControl];
        self.indicator = self.indicatorPageControl;
    } else {
        [self.view addSubview:self.indicatorLabel];
        self.indicator = self.indicatorLabel;
    }
    self.indicator.layer.zPosition = 1024;
}

- (void)_updateIndicator {
    if (!self.indicator) {
        return;
    }
    if (self.numberOfPages <= 9) {
        self.indicatorPageControl.numberOfPages = self.numberOfPages;
        self.indicatorPageControl.currentPage = self.currentPage;
        [self.indicatorPageControl sizeToFit];
        self.indicatorPageControl.center = CGPointMake(CGRectGetWidth(self.view.bounds) / 2.0f,
                                                       CGRectGetHeight(self.view.bounds) - CGRectGetHeight(self.indicatorPageControl.bounds) / 2.0f);
    } else {
        NSString *indicatorText = [NSString stringWithFormat:@"%@/%@", @(self.currentPage + 1), @(self.numberOfPages)];
        self.indicatorLabel.text = indicatorText;
        [self.indicatorLabel sizeToFit];
        self.indicatorLabel.center = CGPointMake(CGRectGetWidth(self.view.bounds) / 2.0f,
                                                 CGRectGetHeight(self.view.bounds) - CGRectGetHeight(self.indicatorLabel.bounds));
    }
}

- (void)_addBlurBackgroundView {
    [self.view addSubview:self.blurBackgroundView];
    [self.view sendSubviewToBack:self.blurBackgroundView];
}

- (void)_updateBlurBackgroundView {
    self.blurBackgroundView.frame = self.view.bounds;
}

- (void)_hideStatusBarIfNeeded {
    self.presentingViewController.view.window.windowLevel = UIWindowLevelStatusBar;
}

- (void)_showStatusBarIfNeeded {
    self.presentingViewController.view.window.windowLevel = UIWindowLevelNormal;
}

- (PBImageScrollerViewController *)_imageScrollerViewControllerForPage:(NSInteger)page {
    if (page > self.numberOfPages - 1 || page < 0) {
        return nil;
    }
    
    // Get the reusable `PBImageScrollerViewController`
    PBImageScrollerViewController *imageScrollerViewController = self.reusableImageScrollerViewControllers[page % reusable_page_count];
    
    // Set new data
    if (!self.pb_dataSource) {
        [NSException raise:@"Must implement `PBViewControllerDataSource` protocol." format:@""];
    }
    
    __weak typeof(self) weak_self = self;
    if ([self.pb_dataSource conformsToProtocol:@protocol(PBViewControllerDataSource)]) {
        imageScrollerViewController.page = page;
        
        if ([self.pb_dataSource respondsToSelector:@selector(viewController:imageForPageAtIndex:)]) {
            imageScrollerViewController.fetchImageHandler = ^UIImage *(void) {
                __strong typeof(weak_self) strong_self = weak_self;
                if (page < strong_self.numberOfPages) {
                    return [strong_self.pb_dataSource viewController:strong_self imageForPageAtIndex:page];
                }
                return nil;
            };
        } else if ([self.pb_dataSource respondsToSelector:@selector(viewController:presentImageView:forPageAtIndex:progressHandler:)]) {
            imageScrollerViewController.configureImageViewWithDownloadProgressHandler = ^(UIImageView *imageView, PBImageDownloadProgressHandler handler) {
                __strong typeof(weak_self) strong_self = weak_self;
                if (page < strong_self.numberOfPages) {
                    [strong_self.pb_dataSource viewController:strong_self presentImageView:imageView forPageAtIndex:page progressHandler:handler];
                }
            };
        } else if ([self.pb_dataSource respondsToSelector:@selector(viewController:presentImageView:forPageAtIndex:)]) {
            imageScrollerViewController.configureImageViewHandler = ^(UIImageView *imageView) {
                __strong typeof(weak_self) strong_self = weak_self;
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
                if (page < strong_self.numberOfPages) {
                    [strong_self.pb_dataSource viewController:strong_self presentImageView:imageView forPageAtIndex:page];
                }
#pragma clang diagnostic pop
            };
        }
    }
    
    return imageScrollerViewController;
}

- (void)_setupTransitioningController {
    __weak typeof(self) weak_self = self;
    self.transitioningController.willPresentActionHandler = ^(UIView *fromView, UIView *toView) {
        __strong typeof(weak_self) strong_self = weak_self;
        [strong_self _willPresent];
    };
    self.transitioningController.onPresentActionHandler = ^(UIView *fromView, UIView *toView) {
        __strong typeof(weak_self) strong_self = weak_self;
        [strong_self _onPresent];
    };
    self.transitioningController.didPresentActionHandler = ^(UIView *fromView, UIView *toView) {
        __strong typeof(weak_self) strong_self = weak_self;
        [strong_self _didPresented];
    };
    self.transitioningController.willDismissActionHandler = ^(UIView *fromView, UIView *toView) {
        __strong typeof(weak_self) strong_self = weak_self;
        [strong_self _willDismiss];
    };
    self.transitioningController.onDismissActionHandler = ^(UIView *fromView, UIView *toView) {
        __strong typeof(weak_self) strong_self = weak_self;
        [strong_self _onDismiss];
    };
    self.transitioningController.didDismissActionHandler = ^(UIView *fromView, UIView *toView) {
        __strong typeof(weak_self) strong_self = weak_self;
        [strong_self _didDismiss];
    };
}

- (void)_willPresent {
    PBImageScrollerViewController *currentScrollViewController = self.currentScrollViewController;
    currentScrollViewController.view.alpha = 0;
    self.blurBackgroundView.alpha = 0;
    UIView *thumbView = self.currentThumbView;
    if (!thumbView) {
        return;
    }
    [self _hideThumbView];

    currentScrollViewController.view.alpha = 1;
    PBImageScrollView *imageScrollView = currentScrollViewController.imageScrollView;
    UIImageView *imageView = imageScrollView.imageView;
    imageView.image = self.currentThumbImage;
    UIImage *image = imageView.image;

    // 长图
    if (self.thumbClippedToTop) {
        CGRect fromFrame = [thumbView.superview convertRect:thumbView.frame toView:self.view];
        CGRect originFrame = [imageView.superview convertRect:imageView.frame toView:self.view];
        // 长微博长图只取屏幕高度
        if (CGRectGetHeight(originFrame) > CGRectGetHeight(imageScrollView.bounds)) {
            originFrame.size.height = CGRectGetHeight(imageScrollView.bounds);
            
            CGFloat scale = CGRectGetWidth(fromFrame) / CGRectGetWidth(imageScrollView.bounds);
            // centerX
            imageScrollView.center = CGPointMake(CGRectGetMidX(fromFrame), CGRectGetMidY(imageScrollView.frame));
            // height
            CGRect newFrame = imageScrollView.frame;
            newFrame.size.height = CGRectGetHeight(fromFrame) / scale;
            imageScrollView.frame = newFrame;
            // layer animation
            [imageScrollView.layer setValue:@(scale) forKeyPath:@"transform.scale"];
            // centerY
            imageScrollView.center = CGPointMake(CGRectGetMidX(imageScrollView.frame), CGRectGetMidY(fromFrame));
        }
        // 长图但是长度不超过屏幕
        else {
            imageView.frame = fromFrame;
            CGFloat heightRatio = (image.size.width / image.size.height) * (CGRectGetHeight(imageView.bounds) / CGRectGetWidth(imageView.bounds));
            imageView.layer.contentsRect = CGRectMake(0, 0, 1, heightRatio);
            imageView = UIViewContentModeScaleToFill;
        }
        
        // record
        self.originFrame = originFrame;
    }
    // 宽图 or 等比例
    else {
        // record
        self.originFrame = imageView.frame;
        CGRect frame = [thumbView.superview convertRect:thumbView.frame toView:self.view];
        imageView.frame = frame;
        imageView.contentMode = thumbView.contentMode;
        imageView.clipsToBounds = thumbView.clipsToBounds;
        imageView.backgroundColor = thumbView.backgroundColor;
    }
}

- (void)_onPresent {
    PBImageScrollerViewController *currentScrollViewController = self.currentScrollViewController;
    self.blurBackgroundView.alpha = 1;
    [self _hideStatusBarIfNeeded];
    
    if (!self.currentThumbView) {
        currentScrollViewController.view.alpha = 1;
        return;
    }
    
    PBImageScrollView *imageScrollView = currentScrollViewController.imageScrollView;
    UIImageView *imageView = imageScrollView.imageView;
    CGRect originFrame = [imageView.superview convertRect:imageView.frame toView:self.view];
    
    if (CGRectEqualToRect(originFrame, CGRectZero)) {
        currentScrollViewController.view.alpha = 1;
        return;
    }

    // 长图
    if (self.thumbClippedToTop) {
        // 长微博长图
        if (CGRectGetHeight(self.originFrame) > CGRectGetHeight(imageScrollView.bounds)) {
            imageScrollView.frame = self.originFrame;
            [imageScrollView.layer setValue:@(1) forKeyPath:@"transform.scale"];
        }
        // 长图但是长度不超过屏幕
        else {
            imageView.frame = self.originFrame;
            imageView.layer.contentsRect = CGRectMake(0, 0, 1, 1);
        }
    }
    // 宽图 or 等比例
    else {
        imageView.frame = self.originFrame;
    }
}

- (void)_didPresented {
    self.currentScrollViewController.view.alpha = 1;
    self.currentScrollViewController.imageScrollView.imageView.contentMode = UIViewContentModeScaleAspectFill;
    [self.currentScrollViewController reloadData];
    [self _hideIndicator];
}

/// pic  :    正方形 | 长方形(w>h) | 长方形(h>w)
/// view :    正方形 | 长方形(w>h) | 长方形(h>w)
/// 3 * 3 = 9 种情况
- (void)_willDismiss {
    PBImageScrollerViewController *currentScrollViewController = self.currentScrollViewController;
    PBImageScrollView *imageScrollView = currentScrollViewController.imageScrollView;
    // 还原 zoom.
    if (imageScrollView.zoomScale != 1) {
        [imageScrollView setZoomScale:1 animated:NO];
    }
    
    // 有 thumbView
    if (self.currentThumbView) {
        // 裁剪过图片
        if (self.thumbClippedToTop) {
            // 记录 contentsRect
            UIImage *image = imageScrollView.imageView.image;
            CGFloat heightRatio = (image.size.width / image.size.height) * (CGRectGetHeight(self.currentThumbView.bounds) / CGRectGetWidth(self.currentThumbView.bounds));
            self.contentsRect = CGRectMake(0, 0, 1, heightRatio);
            
            // 图片长度超过屏幕(长微博形式)，为裁剪动画做准备
            if (imageScrollView.contentSize.height > CGRectGetHeight(imageScrollView.bounds)) {
                [CATransaction begin];
                [CATransaction setDisableActions:YES];
                CGRect frame = imageScrollView.imageView.frame;
                imageScrollView.imageView.layer.anchorPoint = CGPointMake(0.5, self.isPullup ? 1 : 0);
                imageScrollView.imageView.frame = frame;
                [CATransaction commit];
            }
        }
        // 点击推出，需要先回到顶部
        if (self.dismissByClick) {
            [imageScrollView _scrollToTopAnimated:NO];
        }
    }
    // 无 thumbView
    else {
        // 点击退出模式，截取当前屏幕并替换图片
        if (self.dismissByClick) {
            UIImage *image = [self.view pb_snapshotAfterScreenUpdates:NO];
            imageScrollView.imageView.image = image;
        }
    }
}

- (void)_onDismiss {
    [self _showStatusBarIfNeeded];
    self.blurBackgroundView.alpha = 0;
    
    PBImageScrollerViewController *currentScrollViewController = self.currentScrollViewController;
    PBImageScrollView *imageScrollView = currentScrollViewController.imageScrollView;
    UIImageView *imageView = imageScrollView.imageView;
    UIImage *currentImage = imageView.image;
    // 图片未加载，默认 CrossDissolve 动画。
    if (!currentImage) {
        return;
    }
    
    // present 之前显示的图片视图。
    UIView *thumbView = self.currentThumbView;
    CGRect destFrame = CGRectZero;
    if (thumbView) {
        // 还原到起始位置然后 dismiss.
        destFrame = [thumbView.superview convertRect:thumbView.frame toView:currentScrollViewController.view];
        // 把 contentInset 考虑进来。
        CGFloat verticalInset = imageScrollView.contentInset.top + imageScrollView.contentInset.bottom;
        destFrame = CGRectMake(
           CGRectGetMinX(destFrame),
           CGRectGetMinY(destFrame) - verticalInset,
           CGRectGetWidth(destFrame),
           CGRectGetHeight(destFrame)
       );
        
        // 同步裁剪图片位置
        imageView.layer.contentsRect = self.contentsRect;
        
        // 裁剪过图片的长微博
        if (self.thumbClippedToTop && imageScrollView.contentSize.height > CGRectGetHeight(imageScrollView.bounds)) {
            CGFloat height = CGRectGetHeight(thumbView.bounds) / CGRectGetWidth(thumbView.bounds) * CGRectGetWidth(imageView.bounds);
            if (isnan(height)) {
                height = CGRectGetWidth(imageView.bounds);
            }
            
            CGRect newFrame = imageView.frame;
            newFrame.size.height = height;
            imageView.frame = newFrame;
            imageView.center = CGPointMake(CGRectGetMidX(destFrame), CGRectGetMinY(destFrame) + (self.isPullup ? CGRectGetHeight(thumbView.bounds) : 0));

            CGFloat scale = CGRectGetWidth(thumbView.bounds) / CGRectGetWidth(imageView.bounds) * imageScrollView.zoomScale;
            [imageView.layer setValue:@(scale) forKeyPath:@"transform.scale"];
        } else {
            imageView.frame = destFrame;
        }
    } else {
        if (self.dismissByClick) {
            // 非滑动退出，点击中间
            destFrame = CGRectMake(CGRectGetWidth(imageScrollView.bounds) / 2, CGRectGetHeight(imageScrollView.bounds) / 2, 0, 0);
            // 图片渐变
            imageScrollView.alpha = 0;
        } else {
            // 移动到屏幕外然后 dismiss.
            CGFloat width = CGRectGetWidth(imageScrollView.imageView.bounds);
            CGFloat height = CGRectGetHeight(imageScrollView.imageView.bounds);
            if (self.isPullup) {
                // 向上
                destFrame = CGRectMake(0, -height, width, height);
            } else {
                // 向下
                destFrame = CGRectMake(0, CGRectGetHeight(imageScrollView.bounds), width, height);
            }
        }
        imageView.frame = destFrame;
    }
}

- (void)_didDismiss {
    self.currentScrollViewController.imageScrollView.imageView.layer.anchorPoint = CGPointMake(0.5, 0);
    self.currentThumbView.hidden = NO;
}

- (void)_hideIndicator {
    if (!self.indicator || 0 == self.indicator.alpha) {
        return;
    }
    [UIView animateWithDuration:0.25 delay:0.5 options:UIViewAnimationOptionBeginFromCurrentState | UIViewAnimationOptionCurveEaseOut animations:^{
        self.indicator.alpha = 0;
    } completion:^(BOOL finished) {
    }];
}

- (void)_showIndicator {
    if (!self.indicator || 1 == self.indicator.alpha) {
        return;
    }
    [UIView animateWithDuration:0.25 delay:0 options:UIViewAnimationOptionBeginFromCurrentState | UIViewAnimationOptionCurveEaseOut animations:^{
        self.indicator.alpha = 1;
    } completion:^(BOOL finished) {
    }];
}

- (void)_hideThumbView {
    if (!_hideThumb) {
        return;
    }
    NSLog(@"_hideThumbView");
    self.lastThumbView.hidden = NO;
    UIView *currentThumbView = self.currentThumbView;
    currentThumbView.hidden = YES;
    self.lastThumbView = currentThumbView;
}

#pragma mark - Actions

- (void)_handleSingleTapAction:(UITapGestureRecognizer *)sender {
    if (sender.state != UIGestureRecognizerStateEnded) {
        return;
    }
    if (!self.pb_delegate) {
        return;
    }
    if ([self.pb_delegate conformsToProtocol:@protocol(PBViewControllerDelegate)]) {
        if ([self.pb_delegate respondsToSelector:@selector(viewController:didSingleTapedPageAtIndex:presentedImage:)]) {
            [self.pb_delegate viewController:self didSingleTapedPageAtIndex:self.currentPage presentedImage:self.currentScrollViewController.imageScrollView.imageView.image];
        }
    }
}

- (void)_handleDoubleTapAction:(UITapGestureRecognizer *)sender {
    if (sender.state != UIGestureRecognizerStateEnded) {
        return;
    }
    CGPoint location = [sender locationInView:self.view];
    PBImageScrollView *imageScrollView = self.currentScrollViewController.imageScrollView;
    [imageScrollView _handleZoomForLocation:location];
}

- (void)_handleLongPressAction:(UILongPressGestureRecognizer *)sender {
    if (sender.state != UIGestureRecognizerStateEnded) {
        return;
    }
    if (!self.pb_delegate) {
        return;
    }
    if ([self.pb_delegate conformsToProtocol:@protocol(PBViewControllerDelegate)]) {
        if ([self.pb_delegate respondsToSelector:@selector(viewController:didLongPressedPageAtIndex:presentedImage:)]) {
            [self.pb_delegate viewController:self didLongPressedPageAtIndex:self.currentPage presentedImage:self.currentScrollViewController.imageScrollView.imageView.image];
        }
    }
}

#pragma mark - UIPageViewControllerDataSource

- (UIViewController *)pageViewController:(UIPageViewController *)pageViewController viewControllerBeforeViewController:(PBImageScrollerViewController *)viewController {
    return [self _imageScrollerViewControllerForPage:viewController.page - 1];
}

- (UIViewController *)pageViewController:(UIPageViewController *)pageViewController viewControllerAfterViewController:(PBImageScrollerViewController *)viewController {
    return [self _imageScrollerViewControllerForPage:viewController.page + 1];
}

#pragma mark - UIPageViewControllerDelegate

- (void)pageViewController:(UIPageViewController *)pageViewController willTransitionToViewControllers:(NSArray<UIViewController *> *)pendingViewControllers {
    [self _showIndicator];
}

- (void)pageViewController:(UIPageViewController *)pageViewController didFinishAnimating:(BOOL)finished previousViewControllers:(NSArray *)previousViewControllers transitionCompleted:(BOOL)completed {
    PBImageScrollerViewController *imageScrollerViewController = pageViewController.viewControllers.firstObject;
    self.currentPage = imageScrollerViewController.page;
    [self _updateIndicator];
    [self _hideIndicator];
    [self _hideThumbView];
}

#pragma mark - UIViewControllerTransitioningDelegate

- (nullable id <UIViewControllerAnimatedTransitioning>)animationControllerForPresentedController:(UIViewController *)presented  presentingController:(UIViewController *)presenting sourceController:(UIViewController *)source {
    return [self.transitioningController prepareForPresent];
}

- (nullable id <UIViewControllerAnimatedTransitioning>)animationControllerForDismissedController:(UIViewController *)dismissed {
    return [self.transitioningController prepareForDismiss];
}

#pragma mark - Accessor

- (NSArray<PBImageScrollerViewController *> *)reusableImageScrollerViewControllers {
    if (!_reusableImageScrollerViewControllers) {
        NSMutableArray *controllers = [[NSMutableArray alloc] initWithCapacity:reusable_page_count];
        for (NSInteger index = 0; index < reusable_page_count; index++) {
            PBImageScrollerViewController *imageScrollerViewController = [PBImageScrollerViewController new];
            imageScrollerViewController.page = index;
            __weak typeof(self) weak_self = self;
            imageScrollerViewController.imageScrollView.contentOffSetVerticalPercentHandler = ^(CGFloat percent) {
                __strong typeof(weak_self) strong_self = weak_self;
                CGFloat alpha = 1.0f - percent * 4;
                if (alpha < 0) {
                    alpha = 0;
                }
                strong_self.blurBackgroundView.alpha = alpha;
            };
            imageScrollerViewController.imageScrollView.didEndDraggingInProperpositionHandler = ^(CGFloat velocity){
                __strong typeof(weak_self) strong_self = weak_self;
                strong_self.velocity = velocity;
                if (strong_self.exit) {
                    strong_self.exit(self);
                } else {
                    [strong_self dismissViewControllerAnimated:YES completion:nil];
                }
            };
            [controllers addObject:imageScrollerViewController];
        }
        _reusableImageScrollerViewControllers = [[NSArray alloc] initWithArray:controllers];
    }
    return _reusableImageScrollerViewControllers;
}

- (UILabel *)indicatorLabel {
    if (!_indicatorLabel) {
        _indicatorLabel = [UILabel new];
        _indicatorLabel.font = [UIFont preferredFontForTextStyle:UIFontTextStyleFootnote];
        _indicatorLabel.textAlignment = NSTextAlignmentCenter;
        _indicatorLabel.textColor = [UIColor whiteColor];
    }
    return _indicatorLabel;
}

- (UIPageControl *)indicatorPageControl {
    if (!_indicatorPageControl) {
        _indicatorPageControl = [UIPageControl new];
        _indicatorPageControl.numberOfPages = self.numberOfPages;
        _indicatorPageControl.currentPage = self.currentPage;
    }
    return _indicatorPageControl;
}

- (UIView *)blurBackgroundView {
    if (self.blurBackground) {
        if (!_blurBackgroundView) {
            _blurBackgroundView = [[UIToolbar alloc] initWithFrame:self.view.bounds];
            ((UIToolbar *)_blurBackgroundView).barStyle = UIBarStyleBlack;
            ((UIToolbar *)_blurBackgroundView).translucent = YES;
            _blurBackgroundView.clipsToBounds = YES;
            _blurBackgroundView.multipleTouchEnabled = NO;
            _blurBackgroundView.userInteractionEnabled = NO;
        }
    } else {
        if (!_blurBackgroundView) {
            _blurBackgroundView = [[UIView alloc] initWithFrame:self.view.bounds];
            _blurBackgroundView.backgroundColor = [UIColor clearColor];
            _blurBackgroundView.clipsToBounds = YES;
            _blurBackgroundView.multipleTouchEnabled = NO;
            _blurBackgroundView.userInteractionEnabled = NO;
        }
    }
    return _blurBackgroundView;
}

- (UITapGestureRecognizer *)singleTapGestureRecognizer {
    if (!_singleTapGestureRecognizer) {
        _singleTapGestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(_handleSingleTapAction:)];
    }
    return _singleTapGestureRecognizer;
}

- (UITapGestureRecognizer *)doubleTapGestureRecognizer {
    if (!_doubleTapGestureRecognizer) {
        _doubleTapGestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(_handleDoubleTapAction:)];
        _doubleTapGestureRecognizer.numberOfTapsRequired = 2;
    }
    return _doubleTapGestureRecognizer;
}

- (UILongPressGestureRecognizer *)longPressGestureRecognizer {
    if (!_longPressGestureRecognizer) {
        _longPressGestureRecognizer = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(_handleLongPressAction:)];
    }
    return _longPressGestureRecognizer;
}

- (PBImageScrollerViewController *)currentScrollViewController {
    return self.reusableImageScrollerViewControllers[self.currentPage % reusable_page_count];
}

- (UIView *)currentThumbView {
    if (!self.pb_dataSource) {
        return nil;
    }
    if (![self.pb_dataSource conformsToProtocol:@protocol(PBViewControllerDataSource)]) {
        return nil;
    }
    if (![self.pb_dataSource respondsToSelector:@selector(thumbViewForPageAtIndex:)]) {
        return  nil;
    }
    return [self.pb_dataSource thumbViewForPageAtIndex:self.currentPage];
}

- (UIImage *)currentThumbImage {
    UIView *currentThumbView = self.currentThumbView;
    if (!currentThumbView) {
        return nil;
    }
    if ([currentThumbView isKindOfClass:[UIImageView class]]) {
        return ((UIImageView *)self.currentThumbView).image;
    }
    if (currentThumbView.layer.contents) {
        return [[UIImage alloc] initWithCGImage:(__bridge CGImageRef _Nonnull)(currentThumbView.layer.contents)];
    }
    return nil;
}

- (BOOL)thumbClippedToTop {
    UIView *currentThumbView = self.currentThumbView;
    if (!currentThumbView) {
        return NO;
    }
    return currentThumbView.layer.contentsRect.size.height < 1;
}

- (BOOL)dismissByClick {
    if (0 != self.velocity) {
        return NO;
    }
    PBImageScrollView *imageScrollView = self.currentScrollViewController.imageScrollView;
    if (imageScrollView.contentOffset.y < 0) {
        return NO;
    }
    if (imageScrollView.contentInset.top < 0) {
        return NO;
    }
    
    return YES;
}

- (BOOL)isPullup {
    return 0 < self.velocity;
}

- (PBPresentAnimatedTransitioningController *)transitioningController {
    if (!_transitioningController) {
        _transitioningController = [PBPresentAnimatedTransitioningController new];
    }
    return _transitioningController;
}

@end
