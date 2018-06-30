//
//  BMNavToHosAnnotationView.m
//  Pods
//
//  Created by XHY on 2017/5/31.
//
//

#import "BMNavToHosAnnotationView.h"

#define kCalloutWidth   280.0
#define kCalloutHeight  75.0

@interface BMNavToHosAnnotationView ()

@property (nonatomic, strong) UILabel *lbl4Title;
@property (nonatomic, strong) UILabel *lbl4Address;

@end

@implementation BMNavToHosAnnotationView

- (void)toNatigation
{
    if (self.navigationAction) {
        self.navigationAction();
    }
}

#pragma mark - Override
- (void)setSelected:(BOOL)selected
{
    [self setSelected:selected animated:NO];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    if (self.selected == selected)
    {
        return;
    }
    
    if (selected)
    {
        if (self.calloutView == nil)
        {
            /* Construct custom callout. */
            self.calloutView = [[BMCalloutView alloc] initWithFrame:CGRectMake(0, 0, kCalloutWidth, kCalloutHeight)];
            self.calloutView.center = CGPointMake(CGRectGetWidth(self.bounds) / 2.f + self.calloutOffset.x,
                                                  -CGRectGetHeight(self.calloutView.bounds) / 2.f + self.calloutOffset.y);
            
            CGFloat kBtnWidth = 80;
            CGFloat kBtnHeight = 67;
            
            /** 名称 */
            self.lbl4Title = [[UILabel alloc] initWithFrame:CGRectMake(15, 15, self.calloutView.width - kBtnWidth - 15, 20)];
            self.lbl4Title.textColor = K_TITLE_COLOR;
            self.lbl4Title.font = K_FONT_16;
            [self.calloutView addSubview:self.lbl4Title];
            
            /** 地址 */
            self.lbl4Address = [[UILabel alloc] initWithFrame:CGRectMake(self.lbl4Title.minX, self.lbl4Title.maxY, self.lbl4Title.width, self.lbl4Title.height)];
            self.lbl4Address.textColor = K_SUBTITLE_COLOR;
            self.lbl4Address.font = K_FONT_13;
            [self.calloutView addSubview:self.lbl4Address];
            
            /** 导航按钮 */
            UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
            btn.frame = CGRectMake(self.lbl4Title.maxX, 0, kBtnWidth, kBtnHeight);
            [btn setBackgroundImage:[UIImage imageWithColor:K_NAV_BAR_COLOR size:btn.size] forState:UIControlStateNormal];
            [btn setImage:[UIImage imageNamed:@"navIcon"] forState:UIControlStateNormal];
            [btn setTitle:@"导航" forState:UIControlStateNormal];
            btn.titleLabel.font = [UIFont boldSystemFontOfSize:16];
            [btn setTitleColor:K_WHITE_COLOR forState:UIControlStateNormal];
            /** 设置圆角 */
            UIBezierPath *maskPath = [UIBezierPath bezierPathWithRoundedRect:btn.bounds byRoundingCorners:UIRectCornerTopRight|UIRectCornerBottomRight cornerRadii:CGSizeMake(6, 6)];
            CAShapeLayer *maskLayer = [[CAShapeLayer alloc] init];
            maskLayer.path = maskPath.CGPath;
            btn.layer.mask = maskLayer;
            [btn addTarget:self action:@selector(toNatigation) forControlEvents:UIControlEventTouchUpInside];
            [self.calloutView addSubview:btn];
        }
        
        self.lbl4Title.text = self.desTitle;
        self.lbl4Address.text = self.desAddress;
        
        [self addSubview:self.calloutView];
    }
    else
    {
        [self.calloutView removeFromSuperview];
    }
    
    [super setSelected:selected animated:animated];
}

- (BOOL)pointInside:(CGPoint)point withEvent:(UIEvent *)event
{
    BOOL inside = [super pointInside:point withEvent:event];
    /* Points that lie outside the receiver’s bounds are never reported as hits,
     even if they actually lie within one of the receiver’s subviews.
     This can occur if the current view’s clipsToBounds property is set to NO and the affected subview extends beyond the view’s bounds.
     */
    if (!inside && self.selected)
    {
        inside = [self.calloutView pointInside:[self convertPoint:point toView:self.calloutView] withEvent:event];
    }
    
    return inside;
}

@end
