//
//  PBImageScrollerViewController.h
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

@class PBImageScrollView;
typedef void(^PBImageDownloadProgressHandler)(NSInteger receivedSize, NSInteger expectedSize);

@interface PBImageScrollerViewController : UIViewController

@property (nonatomic, assign) NSInteger page;

/// Return the image for current imageView
@property (nonatomic, copy) UIImage *(^fetchImageHandler)(void);
/// Configure image for current imageView
@property (nonatomic, copy) void (^configureImageViewHandler)(UIImageView *imageView);

/// Configure image for current imageView with progress
@property (nonatomic, copy) void (^configureImageViewWithDownloadProgressHandler)(UIImageView *imageView, PBImageDownloadProgressHandler handler);

@property (nonatomic, strong, readonly) PBImageScrollView *imageScrollView;

- (void)reloadData;

@end
