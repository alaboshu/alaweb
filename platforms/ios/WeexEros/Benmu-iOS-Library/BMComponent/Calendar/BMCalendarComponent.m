//
//  BMCalendarComponent.m
//  BM-Doctor
//
//  Created by XHY on 2017/5/12.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMCalendarComponent.h"
#import "FSCalendar.h"
#import "RangePickerCell.h"
#import "Masonry.h"

NSString * const defaultDateFormat = @"yyyy-MM-dd";

// event
NSString * const k_finishEvent = @"finish";

// selectType
NSString * const K_SelectTypeSingle = @"single";    /**< 单选 */
NSString * const K_SelectTypeMulti = @"multi";      /**< 多选 */
NSString * const K_SelectTypeRange = @"range";      /**< 区间 */


@interface BMCalendarComponent()<FSCalendarDataSource,FSCalendarDelegate>


@property (weak, nonatomic) FSCalendar *calendar;
@property (strong, nonatomic) NSCalendar *gregorian;
@property (strong, nonatomic) NSDateFormatter *dateFormatter;

@property (nonatomic, strong) UIButton *previousButton;
@property (nonatomic, strong) UIButton *nextButton;

@property (nonatomic, copy) NSString *selectType;           /**< 选择类型 */
@property (copy, nonatomic) NSString * minimumDate;         /**< 最小日期 */
@property (copy, nonatomic) NSString * maximumDate;         /**< 最大日期 */
@property (nonatomic, assign) BOOL showPlaceholder;         /**< 是否显示非本月日期 */

@property (strong, nonatomic) NSDate *startDate;            /**< 选择起始日期 */
@property (strong, nonatomic) NSDate *endDate;              /**< 多选模式下有用 */

// color
@property (nonatomic, strong) UIColor *monthColor;          /**< 月份颜色 */
@property (nonatomic, strong) UIColor *weekColor;           /**< 周几的颜色 */
@property (nonatomic, strong) UIColor *weekBgColor;         /**< 周几的背景颜色 */
@property (nonatomic, strong) UIColor *weekdayColor;        /**< 平日的颜色 */
@property (nonatomic, strong) UIColor *weekendColor;        /**< 周末的颜色 */
@property (nonatomic, strong) UIColor *placeholderColor;    /**< 占位日期的颜色 */
@property (nonatomic, strong) UIColor *selectColor;         /**< 选择日期的颜色 */

// event
@property (nonatomic, assign) BOOL *finishEvent;

@end


@implementation BMCalendarComponent

WX_EXPORT_METHOD(@selector(goPrve))
WX_EXPORT_METHOD(@selector(goNext))

-(instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        
        _finishEvent = NO;
        
        self.maximumDate = attributes[@"maximumDate"];
        self.minimumDate = attributes[@"minimumDate"];
        
        if (attributes[@"selectType"]) {
            self.selectType = [WXConvert NSString:attributes[@"selectType"]];
        } else {
            self.selectType = K_SelectTypeSingle;
        }
        
        if (attributes[@"dateFormat"]) {
            self.dateFormatter.dateFormat = attributes[@"dateFormat"];
        }
        
        if (attributes[@"startDate"]) {
            self.startDate = [self.dateFormatter dateFromString:[WXConvert NSString:attributes[@"startDate"]]];
        }
        
        if (attributes[@"showPlaceholder"]) {
            self.showPlaceholder = [WXConvert BOOL:attributes[@"showPlaceholder"]];
        }
        
        if ([self.selectType isEqualToString:K_SelectTypeRange] && attributes[@"endDate"]) {
            self.endDate = [self.dateFormatter dateFromString:[WXConvert NSString:attributes[@"endDate"]]];
        }
        
        [self fillCSSStyles:styles];
    }

    return self;
}

- (void)fillCSSStyles:(NSDictionary *)styles
{
    if (styles[@"monthColor"]) {
        self.monthColor = [WXConvert UIColor:styles[@"monthColor"]];
    }
    
    if (styles[@"weekColor"]) {
        self.weekColor = [WXConvert UIColor:styles[@"weekColor"]];
    }
    
    if (styles[@"weekBgColor"]) {
        self.weekBgColor = [WXConvert UIColor:styles[@"weekBgColor"]];
    }
    
    if (styles[@"weekdayColor"]) {
        self.weekdayColor = [WXConvert UIColor:styles[@"weekdayColor"]];
    }
    
    if (styles[@"weekendColor"]) {
        self.weekendColor = [WXConvert UIColor:styles[@"weekendColor"]];
    }
    
    if (styles[@"placeholderColor"]) {
        self.placeholderColor = [WXConvert UIColor:styles[@"placeholderColor"]];
    }
    
    if (styles[@"selectColor"]) {
        self.selectColor = [WXConvert UIColor:styles[@"selectColor"]];
    }
    
}

#pragma mark Getter
- (NSDateFormatter *)dateFormatter
{
    if (!_dateFormatter) {
        _dateFormatter = [[NSDateFormatter alloc] init];
        _dateFormatter.dateFormat = defaultDateFormat;
    }
    
    return _dateFormatter;
}

- (NSCalendar *)gregorian
{
    if (!_gregorian) {
        _gregorian = [NSCalendar calendarWithIdentifier:NSCalendarIdentifierGregorian];
    }
    return _gregorian;
}

-(UIView*)loadView
{
    FSCalendar *calendar = [[FSCalendar alloc] init];
    calendar.dataSource = self;
    calendar.delegate = self;
    calendar.pagingEnabled = YES;
    calendar.scrollDirection = FSCalendarScrollDirectionHorizontal;
    calendar.allowsMultipleSelection = [self.selectType isEqualToString:K_SelectTypeRange];
    calendar.placeholderType = self.showPlaceholder ? FSCalendarPlaceholderTypeFillSixRows : FSCalendarPlaceholderTypeNone;
    
    calendar.appearance.headerTitleFont = [UIFont boldSystemFontOfSize:18];
    calendar.appearance.titleFont = [UIFont boldSystemFontOfSize:16];
    calendar.appearance.weekdayFont = [UIFont systemFontOfSize:14];
    
    calendar.appearance.headerMinimumDissolvedAlpha = 0;
    calendar.appearance.headerDateFormat = @"yyyy年MM月";
    calendar.scrollDirection = FSCalendarScrollDirectionHorizontal;
    calendar.weekdayHeight = 25;
    calendar.headerHeight = 80;
    calendar.swipeToChooseGesture.enabled = YES;
    
    calendar.appearance.caseOptions = FSCalendarCaseOptionsWeekdayUsesSingleUpperCase;
    calendar.appearance.separators = FSCalendarSeparatorInterRows;
    
    calendar.appearance.headerTitleColor = self.monthColor?:UIColorFromValue(0x333333);
    calendar.calendarWeekdayView.backgroundColor = self.weekBgColor?:UIColorFromValue(0xf0f5fa);
    calendar.appearance.weekdayTextColor = self.weekColor?:UIColorFromValue(0x777777);
    calendar.appearance.titleDefaultColor = self.weekdayColor?:UIColorFromValue(0x333333);
    calendar.appearance.titleWeekendColor = self.weekendColor?:UIColorFromValue(0x777777);
    calendar.appearance.titlePlaceholderColor = self.placeholderColor ?: UIColorFromValue(0xceced9);
    
    calendar.today = nil; // Hide the today circle
    [calendar registerClass:[RangePickerCell class] forCellReuseIdentifier:@"cell"];
    
    self.calendar = calendar;
    self.calendar.backgroundColor = [UIColor whiteColor];
    

    return calendar;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self createActionButton];
    
    
    if (self.startDate)
        [self.calendar selectDate:self.startDate];
    if (self.endDate)
        [self.calendar selectDate:self.endDate];
    
    [self configureVisibleCells];
}

- (void)createActionButton
{
    UIImageView *iconArrows = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"CalendarLeftArrows"]];
    [self.view addSubview:iconArrows];
    
    [iconArrows mas_makeConstraints:^(MASConstraintMaker *make) {
       
        make.left.mas_equalTo(15);
        make.top.mas_equalTo(37);
        
    }];
    
    CGFloat btnHeight = 35.0;
    UIButton *previousButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.view addSubview:previousButton];
    previousButton.titleLabel.font = [UIFont systemFontOfSize:15];
    [previousButton setTitle:@"上一月" forState:UIControlStateNormal];
    [previousButton setTitleColor:UIColorFromValue(0x333333) forState:UIControlStateNormal];
    [previousButton setTitleColor:UIColorFromValue(0xceced9) forState:UIControlStateDisabled];
    [previousButton addTarget:self action:@selector(previousClicked) forControlEvents:UIControlEventTouchUpInside];
    self.previousButton = previousButton;
    
    [previousButton mas_makeConstraints:^(MASConstraintMaker *make) {
       
        make.left.mas_equalTo(iconArrows.mas_right).mas_offset(5);
        make.top.mas_equalTo((self.calendar.headerHeight - btnHeight) / 2.0 + 4);
        make.size.mas_equalTo(CGSizeMake(50, btnHeight));
        
    }];
    
    iconArrows = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"CalendarReightArrows"]];
    [self.view addSubview:iconArrows];
    
    [iconArrows mas_makeConstraints:^(MASConstraintMaker *make) {
       
        make.top.mas_equalTo(37);
        make.right.mas_equalTo(-15);
        
    }];
    
    UIButton *nextButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.view addSubview:nextButton];
    nextButton.backgroundColor = [UIColor whiteColor];
    nextButton.titleLabel.font = [UIFont systemFontOfSize:15];
    [nextButton setTitle:@"下一月" forState:UIControlStateNormal];
    [nextButton setTitleColor:UIColorFromValue(0x333333) forState:UIControlStateNormal];
    [nextButton setTitleColor:UIColorFromValue(0xceced9) forState:UIControlStateDisabled];
    [nextButton addTarget:self action:@selector(nextClicked) forControlEvents:UIControlEventTouchUpInside];
    self.nextButton = nextButton;
    
    [nextButton mas_makeConstraints:^(MASConstraintMaker *make) {
       
        make.top.mas_equalTo(previousButton);
        make.right.mas_equalTo(iconArrows.mas_left).mas_offset(-5);
        make.size.mas_equalTo(previousButton);
        
    }];
}

- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:k_finishEvent]) {
        _finishEvent = YES;
    }
}

#pragma mark - FSCalendarDataSource

- (NSDate *)minimumDateForCalendar:(FSCalendar *)calendar
{
    return [self.dateFormatter dateFromString:self.minimumDate];
}

- (NSDate *)maximumDateForCalendar:(FSCalendar *)calendar
{
    return [self.dateFormatter dateFromString:self.maximumDate];
}

- (NSString *)calendar:(FSCalendar *)calendar titleForDate:(NSDate *)date
{
    if ([self.gregorian isDateInToday:date]) {
        return @"今";
    }
    return nil;
}

- (FSCalendarCell *)calendar:(FSCalendar *)calendar cellForDate:(NSDate *)date atMonthPosition:(FSCalendarMonthPosition)monthPosition
{
    RangePickerCell *cell = [calendar dequeueReusableCellWithIdentifier:@"cell" forDate:date atMonthPosition:monthPosition];
    return cell;
}

- (void)calendar:(FSCalendar *)calendar willDisplayCell:(FSCalendarCell *)cell forDate:(NSDate *)date atMonthPosition: (FSCalendarMonthPosition)monthPosition
{
    [self configureCell:cell forDate:date atMonthPosition:monthPosition];
}

#pragma mark - FSCalendarDelegate
- (void)calendar:(FSCalendar *)calendar boundingRectWillChange:(CGRect)bounds animated:(BOOL)animated
{
    calendar.frame = (CGRect){calendar.frame.origin,bounds.size};
}

- (BOOL)calendar:(FSCalendar *)calendar shouldSelectDate:(NSDate *)date atMonthPosition:(FSCalendarMonthPosition)monthPosition
{
    return monthPosition == FSCalendarMonthPositionCurrent;
}

- (BOOL)calendar:(FSCalendar *)calendar shouldDeselectDate:(NSDate *)date atMonthPosition:(FSCalendarMonthPosition)monthPosition
{
    return [self.selectType isEqualToString:K_SelectTypeRange];
}

- (void)calendar:(FSCalendar *)calendar didSelectDate:(NSDate *)date atMonthPosition:(FSCalendarMonthPosition)monthPosition
{
    
    if ([self.selectType isEqualToString:K_SelectTypeSingle]) {
        if (self.startDate) {
            [calendar deselectDate:self.startDate];
        }
        self.startDate = date;
        self.endDate = nil;
        
        [self configureVisibleCells];
        [self fireMsg];
        
        return;
    }
    
    if (calendar.swipeToChooseGesture.state == UIGestureRecognizerStateChanged) {
        // If the selection is caused by swipe gestures
        if (!self.startDate) {
            self.startDate = date;
        } else {
            if (self.endDate) {
                [calendar deselectDate:self.endDate];
            }
            self.endDate = date;
        }
    } else {
        if (self.endDate) {
            [calendar deselectDate:self.startDate];
            [calendar deselectDate:self.endDate];
            self.startDate = date;
            self.endDate = nil;
        } else if (!self.startDate) {
            self.startDate = date;
        } else {
            if (NSOrderedDescending == [date compare:self.startDate]) {
                self.endDate = date;
            } else {
                [calendar deselectDate:self.startDate];
                self.startDate = date;
                self.endDate = nil;
            }
        }
    }
    
    [self configureVisibleCells];
    
    [self fireMsg];
    
}

- (void)calendar:(FSCalendar *)calendar didDeselectDate:(NSDate *)date atMonthPosition:(FSCalendarMonthPosition)monthPosition
{
    NSLog(@"did deselect date %@",[self.dateFormatter stringFromDate:date]);
    
    if ([self.selectType isEqualToString:K_SelectTypeRange]) {
        if (self.startDate && self.endDate) {
            
            if (NSOrderedSame == [date compare:self.startDate]) {
                [calendar deselectDate:self.endDate];
            } else {
                [calendar deselectDate:self.startDate];
            }
            
            self.startDate = date;
            self.endDate = nil;
            [calendar selectDate:self.startDate];
        }
        else if (self.startDate && !self.endDate) {
            self.startDate = date;
            self.endDate = date;
            
            [calendar selectDate:self.startDate];
            
            [self fireMsg];
            
            return;
        }
    }
    else if ([self.selectType isEqualToString:K_SelectTypeSingle]) {
        
    }
    
    [self configureVisibleCells];
}

- (NSArray<UIColor *> *)calendar:(FSCalendar *)calendar appearance:(FSCalendarAppearance *)appearance eventDefaultColorsForDate:(NSDate *)date
{
    if ([self.gregorian isDateInToday:date]) {
        return @[[UIColor orangeColor]];
    }
    return @[appearance.eventDefaultColor];
}

#pragma mark - Private methods

- (void)previousClicked
{
    NSDate *currentMonth = self.calendar.currentPage;
    NSDate *previousMonth = [self.gregorian dateByAddingUnit:NSCalendarUnitMonth value:-1 toDate:currentMonth options:0];
    [self.calendar setCurrentPage:previousMonth animated:YES];
}

- (void)nextClicked
{
    NSDate *currentMonth = self.calendar.currentPage;
    NSDate *nextMonth = [self.gregorian dateByAddingUnit:NSCalendarUnitMonth value:1 toDate:currentMonth options:0];
    [self.calendar setCurrentPage:nextMonth animated:YES];
}

- (void)configureVisibleCells
{
    [self.calendar.visibleCells enumerateObjectsUsingBlock:^(__kindof FSCalendarCell * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSDate *date = [self.calendar dateForCell:obj];
        FSCalendarMonthPosition position = [self.calendar monthPositionForCell:obj];
        [self configureCell:obj forDate:date atMonthPosition:position];
    }];
}

- (void)configureCell:(__kindof FSCalendarCell *)cell forDate:(NSDate *)date atMonthPosition:(FSCalendarMonthPosition)position
{
    RangePickerCell *rangeCell = cell;
    
    rangeCell.selectionLayer.backgroundColor = self.selectColor ? self.selectColor.CGColor : UIColorFromValue(0x07ae9c).CGColor;
    rangeCell.middleLayer.backgroundColor = self.selectColor ? [self.selectColor colorWithAlphaComponent:0.3].CGColor : [UIColorFromValue(0x07ae9c) colorWithAlphaComponent:0.3].CGColor;
    
    if (position != FSCalendarMonthPositionCurrent) {
        rangeCell.middleLayer.hidden = YES;
        rangeCell.selectionLayer.hidden = YES;
        return;
    }
    if (self.startDate && self.endDate) {
        // The date is in the middle of the range
        BOOL isMiddle = [date compare:self.startDate] != [date compare:self.endDate];
        rangeCell.middleLayer.hidden = !isMiddle;
    } else {
        rangeCell.middleLayer.hidden = YES;
    }
    BOOL isSelected = NO;
    isSelected |= self.startDate && [self.gregorian isDate:date inSameDayAsDate:self.startDate];
    isSelected |= self.endDate && [self.gregorian isDate:date inSameDayAsDate:self.endDate];
    rangeCell.selectionLayer.hidden = !isSelected;
}

#pragma mark 前端透传事件
-(void)goPrve
{
    [self previousClicked];

}
-(void)goNext
{
    [self nextClicked];
}
-(void)done:(WXModuleCallback)callback
{
    if (callback) {
        NSString * selectDateString = nil;
        if(self.calendar.selectedDate){
          selectDateString = [self.dateFormatter stringFromDate:self.calendar.selectedDate];
        }
        else{
            selectDateString = [self.dateFormatter stringFromDate:self.calendar.today];
        }
        
        if (selectDateString) {
            NSDictionary * dict = [NSDictionary dictionaryWithObjectsAndKeys:selectDateString,@"selectDate",nil];
            callback(dict);
        }
    }
}

- (void)fireMsg
{
    if ([self.selectType isEqualToString:K_SelectTypeRange]) {
        if (!self.startDate || !self.endDate) {
            return;
        }
    }
    
    if (_finishEvent) {
        [self fireEvent:k_finishEvent params:[self callbackParams]];
    }
}

- (NSDictionary *)callbackParams
{
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    NSString *start = @"";
    if (self.startDate) start = [self.dateFormatter stringFromDate:self.startDate];
    NSString *end = @"";
    if (self.endDate) end = [self.dateFormatter stringFromDate:self.endDate];
    
    [params setValue:start forKey:@"startDate"];
    [params setValue:end forKey:@"endDate"];
    return params;
}

@end
