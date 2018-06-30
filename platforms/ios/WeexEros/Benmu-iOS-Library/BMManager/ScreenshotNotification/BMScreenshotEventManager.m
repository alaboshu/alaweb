//
//  BMScreenshotEventManager.m
//  Pods
//
//  Created by XHY on 2017/5/12.
//
//

#import "BMScreenshotEventManager.h"
#import <BMGlobalEventManager.h>

@interface BMScreenshotEventManager ()

@property (nonatomic, strong) UIButton *feedbackBtn;
@property (nonatomic, strong) UIImage *snapshotImage;

@end

@implementation BMScreenshotEventManager


#pragma mark - Private Method

- (UIButton *)feedbackBtn
{
    if (!_feedbackBtn) {
        _feedbackBtn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 116.5, 55.0)];
        [_feedbackBtn setImage:[UIImage imageNamed:@"feedback"] forState:UIControlStateNormal];
        [_feedbackBtn addTarget:self action:@selector(toFeedBackVc) forControlEvents:UIControlEventTouchUpInside];
    }
    return _feedbackBtn;
}

/* 触发截屏事件 */
- (void)userDidTakeScreenshot
{
    if (_feedbackBtn) {
        [_feedbackBtn removeFromSuperview];
        _feedbackBtn = nil;
    }
    
    UIView *window = [[[UIApplication sharedApplication] windows] objectAtIndex:0];
    
    self.snapshotImage = [UIImage converViewToImage:window];
    
    /* 在 window 上显示按钮 */
    CGRect btnFrame = self.feedbackBtn.frame;
    btnFrame.origin = CGPointMake(window.width,(window.height - btnFrame.size.height) / 2.0);
    self.feedbackBtn.frame = btnFrame;
    [window addSubview:self.feedbackBtn];

    /* 添加一个动画显示按钮 */
    [UIView animateWithDuration:0.25 animations:^{
        self.feedbackBtn.transform = CGAffineTransformMakeTranslation(-self.feedbackBtn.width, 0);
    }];
    
    /* 几秒后移除按钮 */
    @weakify(self);
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self removeFeedbackButton];
    });
    
}

/* 移除按钮 */
- (void)removeFeedbackButton
{
    [UIView animateWithDuration:0.25 animations:^{
        self.feedbackBtn.transform = CGAffineTransformIdentity;
    } completion:^(BOOL finished) {
        [self.feedbackBtn removeFromSuperview];
        _feedbackBtn = nil;
    }];
}

- (void)toFeedBackVc
{
    [self removeFeedbackButton];
    
    // fire 截屏后的事件
    [BMGlobalEventManager sendGlobalEvent:BMScreenshotFeedbackEvent params:nil];
}

#pragma mark - Public Method
+ (instancetype)shareInstance
{
    static BMScreenshotEventManager *_instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[BMScreenshotEventManager alloc] init];
    });
    
    return _instance;
}

/* 添加监听截屏事件 */
- (void)monitorScreenshotEvent
{
    NSOperationQueue *mainQueue = [NSOperationQueue mainQueue];
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationUserDidTakeScreenshotNotification object:nil queue:mainQueue usingBlock:^(NSNotification * _Nonnull note) {
        [self userDidTakeScreenshot];
    }];
}

- (UIImage *)snapshotImage
{
    return _snapshotImage;
}

@end
