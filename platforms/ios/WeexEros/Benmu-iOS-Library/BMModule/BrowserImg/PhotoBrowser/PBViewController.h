//
//  PBViewController.h
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

#import <UIKit/UIKit.h>

@class PBViewController;

#pragma mark - PBViewControllerDataSource

@protocol PBViewControllerDataSource <NSObject>

/// Return the pages count
- (NSInteger)numberOfPagesInViewController:(nonnull PBViewController *)viewController;

@optional

/// Return the image, implement one of this or follow method
- (nonnull UIImage *)viewController:(nonnull PBViewController *)viewController imageForPageAtIndex:(NSInteger)index;

/// Configure the imageView's image, implement one of this or upper method
- (void)viewController:(nonnull PBViewController *)viewController presentImageView:(nonnull UIImageView *)imageView forPageAtIndex:(NSInteger)index __attribute__((deprecated("use `viewController:presentImageView:forPageAtIndex:progressHandler` instead.")));
/// Configure the imageView's image, implement one of this or upper method
- (void)viewController:(nonnull PBViewController *)viewController presentImageView:(nonnull UIImageView *)imageView forPageAtIndex:(NSInteger)index progressHandler:(nullable void (^)(NSInteger receivedSize, NSInteger expectedSize))progressHandler;

/// Use for dismiss animation, will be an UIImageView in general.
- (nullable UIView *)thumbViewForPageAtIndex:(NSInteger)index;

@end

#pragma mark - PBViewControllerDelegate

@protocol PBViewControllerDelegate <NSObject>

@optional

/// Action call back for single tap, presentedImage will be nil untill loaded image
- (void)viewController:(nonnull PBViewController *)viewController didSingleTapedPageAtIndex:(NSInteger)index presentedImage:(nullable UIImage *)presentedImage;

/// Action call back for long press, presentedImage will be nil untill loaded image
- (void)viewController:(nonnull PBViewController *)viewController didLongPressedPageAtIndex:(NSInteger)index presentedImage:(nullable UIImage *)presentedImage;

@end


#pragma mark - PBViewController

@interface PBViewController : UIPageViewController

@property (nonatomic, weak, nullable) id<PBViewControllerDataSource> pb_dataSource;
@property (nonatomic, weak, nullable) id<PBViewControllerDelegate> pb_delegate;

@property (nonatomic, assign) NSInteger startPage;
@property (nonatomic, assign) NSInteger pb_startPage;
- (void)setInitializePageIndex:(NSInteger)pageIndex __attribute__((deprecated("use `pb_startPage` instead.")));

@property (nonatomic, assign, readonly) NSInteger numberOfPages;
@property (nonatomic, assign, readonly) NSInteger currentPage;
/// Will show first page.
- (void)reload;
/// Will show the specified page.
- (void)reloadWithCurrentPage:(NSInteger)index;
/// Default value is `YES`
@property (nonatomic, assign) BOOL blurBackground;
/// Default value is `YES`
@property (nonatomic, assign) BOOL hideThumb;
/// Custom exit method, if did not provide, use dismiss.
@property (nonatomic, copy, nullable) void (^exit)(PBViewController * _Nonnull sender);
@end
