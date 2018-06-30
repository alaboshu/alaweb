//
//  PBImageScrollerViewController.m
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

#import "PBImageScrollerViewController.h"
#import "PBImageScrollView.h"
#import "PBImageScrollView+internal.h"

@interface PBImageScrollerViewController ()
@property (nonatomic, strong, readwrite) PBImageScrollView *imageScrollView;
@property (nonatomic, weak, readwrite) UIImageView *imageView;
@property (nonatomic, strong, readwrite) CAShapeLayer *progressLayer;
@property (nonatomic, assign) BOOL dismissing;
@end

@implementation PBImageScrollerViewController

- (void)dealloc {
    NSLog(@"~~~~~~~~~~~%s~~~~~~~~~~~", __FUNCTION__);
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.view addSubview:self.imageScrollView];
    [self.view.layer addSublayer:self.progressLayer];
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    
    CGPoint center = CGPointMake(CGRectGetWidth(self.view.bounds) / 2.0, CGRectGetHeight(self.view.bounds) / 2.0);
    CGRect frame = self.progressLayer.frame;
    frame.origin.x = center.x - CGRectGetWidth(frame) / 2.0f;
    frame.origin.y = center.y - CGRectGetHeight(frame) / 2.0f;
    self.progressLayer.frame = frame;
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self reloadData];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    // 干掉加载动画。
    self.progressLayer.hidden = YES;
    self.dismissing = YES;
}

- (void)reloadData {
    [self _prepareForReuse];
    [self _loadData];
}

#pragma mark - Private methods

- (void)_prepareForReuse {
    self.imageView.image = nil;
    self.progressLayer.hidden = YES;
    self.progressLayer.strokeStart = 0;
    self.progressLayer.strokeEnd = 0;
    self.dismissing = NO;
}

- (void)_loadData {
    if (self.fetchImageHandler) {
        self.imageView.image = self.fetchImageHandler();
    } else if (self.configureImageViewWithDownloadProgressHandler) {
        __weak typeof(self) weak_self = self;
        self.configureImageViewWithDownloadProgressHandler(self.imageView, ^(NSInteger receivedSize, NSInteger expectedSize) {
            __strong typeof(weak_self) strong_self = weak_self;
            if (strong_self.dismissing || !strong_self.view.window) {
                strong_self.progressLayer.hidden = YES;
                return;
            }
            CGFloat progress = (receivedSize * 1.0f) / (expectedSize * 1.0f);
            if (0.0f >= progress || progress >= 1.0f) {
                strong_self.progressLayer.hidden = YES;
                return;
            }
            strong_self.progressLayer.hidden = NO;
            strong_self.progressLayer.strokeEnd = progress;
            
        });
    } else if (self.configureImageViewHandler) {
        self.configureImageViewHandler(self.imageView);
    }
}

#pragma mark - Accessor

- (PBImageScrollView *)imageScrollView {
    if (!_imageScrollView) {
        _imageScrollView = [PBImageScrollView new];
    }
    return _imageScrollView;
}

- (UIImageView *)imageView {
    return self.imageScrollView.imageView;
}

- (CAShapeLayer *)progressLayer {
    if (!_progressLayer) {
        _progressLayer = [CAShapeLayer layer];
        _progressLayer.frame = CGRectMake(0, 0, 40, 40);
        _progressLayer.cornerRadius = MIN(CGRectGetWidth(_progressLayer.bounds) / 2.0f, CGRectGetHeight(_progressLayer.bounds) / 2.0f);
        _progressLayer.lineWidth = 4;
        _progressLayer.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.5].CGColor;
        _progressLayer.fillColor = [UIColor clearColor].CGColor;
        _progressLayer.strokeColor = [UIColor whiteColor].CGColor;
        _progressLayer.lineCap = kCALineCapRound;
        _progressLayer.strokeStart = 0;
        _progressLayer.strokeEnd = 0;
        UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:CGRectInset(_progressLayer.bounds, 7, 7) cornerRadius:_progressLayer.cornerRadius - 7];
        _progressLayer.path = path.CGPath;
        _progressLayer.hidden = YES;
    }
    return _progressLayer;
}

@end

