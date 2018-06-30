//
//  BMWebViewChangeFontSizeView.m
//  Pods
//
//  Created by XHY on 2017/6/29.
//
//

#import "BMWebViewChangeFontSizeView.h"
#import "UIWebView+BMExtend.h"

#define K_Margin 29
#define K_DotBtnWidth 28
#define K_ContainerHeight 40

@interface BMWebViewChangeFontSizeView ()

@property (nonatomic, weak) UIWebView *webView;

@property (nonatomic, strong) UIControl *maskView;
@property (nonatomic, strong) UIView *popView;

/** 比例一段对应的宽度 */
@property (nonatomic) CGFloat prorateWidth;
/** 有效点击视图 */
@property (nonatomic, strong) UIView *touchView;
/** 标示是否点击在有效范围内 */
@property (nonatomic, assign) BOOL canChange;
/** 调节按钮 */
@property (nonatomic, strong) UIView *dotView;
/** 当前字体级别 0-4 级 1级为标准 */
@property (nonatomic) NSUInteger currentLevel;

@end

@implementation BMWebViewChangeFontSizeView

#pragma mark - Public Method
- (instancetype)initWithFrame:(CGRect)frame targetWebView:(UIWebView *)webView
{
    if (self = [super initWithFrame:frame]) {
        _webView = webView;
        
        NSNumber *level = [[NSUserDefaults standardUserDefaults] objectForKey:K_WebView_FontSize];
        _currentLevel = level ? [level unsignedIntegerValue] : 1;
        
        [self setupSubViews];
    }
    return self;
}

#pragma mark - Private Method
- (void)setupSubViews
{
    self.backgroundColor = K_WHITE_COLOR;
    self.layer.shadowColor = K_BACKGROUND_COLOR.CGColor;
    self.layer.shadowOpacity = 0.5;
    self.layer.shadowOffset = CGSizeMake(0, -3);
    
    /** 线条刻度容器 */
    UIView *container = [[UIView alloc] initWithFrame:CGRectMake(K_Margin, K_ChangeFontSizeView_Height / 2, self.width - K_Margin * 2, K_ContainerHeight)];
    container.backgroundColor = K_WHITE_COLOR;
    [self addSubview:container];
    /** 横线条刻度 */
    UIView *line = [[UIView alloc] initWithFrame:CGRectMake(K_DotBtnWidth / 2, (container.height - 1) / 2, container.width - K_DotBtnWidth, 1)];
    line.backgroundColor = UIColorFromValue(0x989898);
    [container addSubview:line];
    
    /** 一段的宽度 */
    _prorateWidth = line.width / 4;
    
    /** 竖线条刻度 */
    int i = 0;
    while (i < 5) {
        line = [[UIView alloc] initWithFrame:CGRectMake(K_DotBtnWidth / 2 + i * _prorateWidth, (container.height - 10) / 2, 1, 10)];
        line.backgroundColor = UIColorFromValue(0x989898);
        [container addSubview:line];
        i++;
    }
    
    CGFloat lblCenterY = container.minY - 15;
    /** 小A */
    [self addLabelWithText:@"A"
                 textColor:UIColorFromValue(0x333333)
                      font:[UIFont boldSystemFontOfSize:14]
                    center:CGPointMake(K_DotBtnWidth / 2 + K_Margin, lblCenterY)];
    /** 标准 */
    [self addLabelWithText:@"标准"
                 textColor:UIColorFromValue(0x777777)
                      font:[UIFont boldSystemFontOfSize:16]
                    center:CGPointMake(K_DotBtnWidth / 2 + _prorateWidth + K_Margin, lblCenterY)];
    /** 大A */
    [self addLabelWithText:@"A"
                 textColor:UIColorFromValue(0x333333)
                      font:[UIFont boldSystemFontOfSize:20]
                    center:CGPointMake(K_DotBtnWidth / 2 + 4 * _prorateWidth + K_Margin, lblCenterY)];
    
    self.dotView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, K_DotBtnWidth, K_DotBtnWidth)];
    self.dotView.backgroundColor = K_WHITE_COLOR;
    self.dotView.layer.shadowColor = K_BLACK_COLOR.CGColor;
    self.dotView.layer.shadowOffset = CGSizeMake(1, 1);
    self.dotView.layer.shadowOpacity = 0.25;
    self.dotView.layer.shadowRadius = K_DotBtnWidth / 2.0;
    self.dotView.layer.cornerRadius = K_DotBtnWidth / 2.0;
    self.dotView.clipsToBounds = NO;
    self.dotView.center = [self dotViewCenterWithLevel:_currentLevel];
    [container addSubview:self.dotView];
    
    self.touchView = [[UIView alloc] initWithFrame:container.bounds];
    self.touchView.backgroundColor = K_CLEAR_COLOR;
    [container addSubview:self.touchView];
    
}

- (CGPoint)dotViewCenterWithLevel:(NSUInteger)level
{
    return CGPointMake(K_DotBtnWidth / 2 + level * self.prorateWidth, K_ContainerHeight / 2);
}

- (void)addLabelWithText:(NSString *)text textColor:(UIColor *)color font:(UIFont *)font center:(CGPoint)center
{
    UILabel *lbl = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 35, 20)];
    lbl.textAlignment = NSTextAlignmentCenter;
    lbl.textColor = color;
    lbl.font = font;
    lbl.center = center;
    lbl.text = text;
    [self addSubview:lbl];
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    UITouch *touch = [touches anyObject];
    CGPoint pt = [touch locationInView:self.touchView];
    
    if (pt.x >=0 && pt.x <= self.touchView.width && pt.y >= 0) {
        self.canChange = YES;
        [self changeFontSizeWithTouchPoint:pt];
    } else {
        self.canChange = NO;
    }
}

- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    UITouch *touch = [touches anyObject];
    CGPoint pt = [touch locationInView:self.touchView];
    
    if (self.canChange) {
        [self changeFontSizeWithTouchPoint:pt];
    }
}

- (void)changeFontSizeWithTouchPoint:(CGPoint)pt
{
    NSUInteger level = (pt.x + self.prorateWidth / 2.0 - K_DotBtnWidth / 2.0) / self.prorateWidth;
    if (level > 4) level = 4;
    
    if (level != _currentLevel) {
        _currentLevel = level;
        self.dotView.center = [self dotViewCenterWithLevel:level];
        
        [[NSUserDefaults standardUserDefaults] setObject:@(_currentLevel) forKey:K_WebView_FontSize];
        
        [self.webView checkCurrentFontSize];
    }
}

#pragma mark - Api Request

#pragma mark - Custom Delegate & DataSource

#pragma mark - System Delegate & DataSource

#pragma mark - Setter

#pragma mark - Getter

@end
