//
//  WatermarkView.m
//  Pods
//
//  Created by XHY on 2017/8/9.
//
//

#import "WatermarkView.h"
#import <UIWindow+Util.h>

#define K_MarkView_Tag 2843

@implementation WatermarkView
{
    NSString *_markText;
}

#pragma mark - Public Func

+ (void)addWatermarkWithText:(NSString *)text
{
    UIWindow *window = [UIWindow findVisibleWindow];
    
    UIView *oldMarkView = [window viewWithTag:K_MarkView_Tag];
    if (oldMarkView) {
        [oldMarkView removeFromSuperview];
    }
    
    WatermarkView *markView = [[WatermarkView alloc] initWithFrame:window.bounds];
    markView.tag = K_MarkView_Tag;
    markView->_markText = text;
    [window addSubview:markView];
}

#pragma mark - Private Func

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        
        self.userInteractionEnabled = NO;
        self.backgroundColor = [UIColor clearColor];
    }
    
    return self;
}

- (void)drawRect:(CGRect)rect {
    // Drawing code
    
    [[UIColor clearColor] set];
    
    UIFont * font = [UIFont systemFontOfSize:16.0];
    CGRect rect4Text = [_markText boundingRectWithSize:rect.size options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:font} context:nil];
    
    CGFloat x = 0;
    CGFloat y = 20;
    CGFloat w = rect4Text.size.width;
    CGFloat h = rect4Text.size.height;
    CGFloat hs = 30;
    CGFloat vs = 50;
    
    while (y < rect.size.height) {
        CGRect rect4mark = CGRectMake(x, y, w, h);
        [_markText drawInRect:rect4mark withAttributes:@{NSFontAttributeName:font,NSForegroundColorAttributeName:[[UIColor blackColor] colorWithAlphaComponent:0.01]}];
        
        x += w + hs;
        
        if (x + w > rect.size.width) {
            y += h + vs;
            x = 0;
        }
    }
}


@end
