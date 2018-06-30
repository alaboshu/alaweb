//
//  BMPickerModule.m
//  Pods
//
//  Created by 窦静轩 on 2017/5/5.
//
//

#import "BMPickerModule.h"
#import "WXConvert.h"
#import "WXUtility.h"
#import <UIKit/UIPickerView.h>
#import <UIKit/UIDatePicker.h>
#import <UIKit/UIKit.h>

#define WXPickerHeight 266
#define WXPickerToolBarHeight 44

@interface BMPickerModule()

//picker
@property(nonatomic,strong)UIPickerView *picker;
@property(nonatomic,strong)UIView *backgroundView;
@property(nonatomic,strong)UIView *pickerView;

//custom
@property(nonatomic,copy)NSString *title;
@property(nonatomic,strong)UIColor *titleColor;
@property(nonatomic,copy)NSString *cancelTitle;
@property(nonatomic,copy)NSString *confirmTitle;
@property(nonatomic,strong)UIColor *cancelTitleColor;
@property(nonatomic,strong)UIColor *confirmTitleColor;
@property(nonatomic,strong)UIColor *titleBackgroundColor;
@property(nonatomic)CGFloat height;
@property(nonatomic,strong)UIColor *textColor;
@property(nonatomic,strong)UIColor *selectionColor;
@property(nonatomic)NSInteger column;
@property(nonatomic)BOOL isLink;
//data
@property(nonatomic,copy)NSArray *items;
@property(nonatomic,copy)NSArray *items1;
@property(nonatomic,copy)NSArray *items2;
@property(nonatomic,copy)NSArray *items3;
@property(nonatomic,copy)NSDictionary *selectDict;
@property(nonatomic)BOOL isAnimating;
@property(nonatomic)NSInteger index;
@property(nonatomic,copy)WXModuleCallback callback;

//date picker
@property(nonatomic,strong)UIDatePicker *datePicker;
@property(nonatomic)UIDatePickerMode datePickerMode;

@end

@implementation BMPickerModule
@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(pick:callback:))
WX_EXPORT_METHOD(@selector(pickDate:callback:))
WX_EXPORT_METHOD(@selector(pickTime:callback:))

#pragma mark -
#pragma mark Single Picker
-(void)dealloc
{
    [NSObject cancelPreviousPerformRequestsWithTarget:self];
}

-(void)pick:(NSDictionary *)options callback:(WXModuleCallback)callback
{
    NSDictionary *items;
    NSArray *value = @[] ;
    if (options[@"items"]) {
        items = options[@"items"];
    }
    if (options[@"value"]) {
        value = options[@"value"];
    }
    if (options[@"title"]) {
        self.title = [WXConvert NSString:options[@"title"]];
    }
    if (options[@"titleColor"]) {
        self.titleColor = [WXConvert UIColor:options[@"titleColor"]];
    }
    if (options[@"cancelTitle"]) {
        self.cancelTitle = [WXConvert NSString:options[@"cancelTitle"]];
    }
    if (options[@"confirmTitle"]) {
        self.confirmTitle = [WXConvert NSString:options[@"confirmTitle"]];
    }
    if (options[@"cancelTitleColor"]) {
        self.cancelTitleColor = [WXConvert UIColor:options[@"cancelTitleColor"]];
    }
    if (options[@"confirmTitleColor"]) {
        self.confirmTitleColor = [WXConvert UIColor:options[@"confirmTitleColor"]];
    }
    if (options[@"titleBackgroundColor"]) {
        self.titleBackgroundColor = [WXConvert UIColor:options[@"titleBackgroundColor"]];
    }
    if (options[@"textColor"]) {
        self.textColor = [WXConvert UIColor:options[@"textColor"]];
    }
    if (options[@"selectionColor"]) {
        self.selectionColor = [WXConvert UIColor:options[@"selectionColor"]];
    }
    if (options[@"height"]) {
        self.height = [WXConvert CGFloat:options[@"height"]];
    }
    if (options[@"isLink"]) {
        self.isLink = [WXConvert BOOL:options[@"isLink"]];
    }
    [self configPickerView];
    if (![self initPicker:items value:value]) {
        if (callback) {
            callback(@{ @"result": @"error"});
        }
        return;
    }
    [self show];
    self.callback = callback;
}
-(BOOL)hasArray:(NSArray*)array
{
    for (id value in array) {
        if(!([value isKindOfClass:[NSArray class]] && [value count] > 1)) {
            return NO;
        }
    }
    return YES;
}
-(void)SetColorDelay:(NSNumber *)number
{
    if(self.selectionColor) {
        UILabel *labelSelected = (UILabel*)[self.picker viewForRow:[number integerValue] forComponent:0.3];
        [labelSelected setBackgroundColor:self.selectionColor];
    }
}
-(Boolean)initPicker:(NSArray *)items value:(NSArray *)value
{
    if ([items isKindOfClass:[NSArray class]]) {
        if (!self.isLink) {
            if ([self isRightItems:items]) {
                self.items1 = items;
                self.column = 1;
                [self setDefaultValue:self.items1 value:value index:0];
            } else if([self hasArray:items]) {
                self.items1 = [items count] > 0 ? ((NSArray*)items)[0] : nil;
                self.items2 = [items count] > 1 ? ((NSArray*)items)[1] : nil;
                self.items3 = [items count] > 2 ? ((NSArray*)items)[2] : nil;
                self.column = [items count];
                [self setDefaultValue:self.items1 value:value index:0];
                [self setDefaultValue:self.items2 value:value index:1];
                [self setDefaultValue:self.items3 value:value index:2];
            } else {
                return false;
            }
        } else {
            if (!([items count] > 1
                  && [items[0] isKindOfClass:[NSArray class]]
                  && [items[1] isKindOfClass:[NSArray class]]
                  && [items[0] count] == [items[1] count]
                  )) {
                return false;
            }
            self.column = [items count];
            self.items1 = items[0];
            self.items2 = (NSArray*)items[1][0];
            if ([items count] > 2) {
                if (![items[2] isKindOfClass:[NSArray class]]) {
                    return false;
                }
                for (int i = 0; i < [items[0] count]; i ++) {
                    if ([items[1][i] count] != [items[2][i] count]) {
                        return false;
                    }
                }
                self.items3 = (NSArray*)items[2][0][0];
            }
            NSInteger index1 = [self setDefaultValue:self.items1 value:value index:0];
            self.items2 = (NSArray*)items[1][index1];
            NSInteger index2 = [self setDefaultValue:self.items2 value:value index:1];
            self.items3 = (NSArray*)items[2][index1][index2];
            [self setDefaultValue:self.items3 value:value index:2];
        }
    } else {
        return false;
    }
    
    self.items = (NSArray*)[items copy];
    return true;
}
-(NSInteger)setDefaultValue: (NSArray*)items value: (NSArray*)value index: (NSInteger)index {
    if ([value count] > index && [value[index] isKindOfClass: [NSNumber class]] && [[NSString stringWithFormat:@"%@",value[index]] integerValue] < [items count]) {
        [self.picker selectRow: [[NSString stringWithFormat:@"%@",value[index]] integerValue] inComponent:index animated:NO];
        return [[NSString stringWithFormat:@"%@",value[index]] integerValue];
    } else {
        [self.picker selectRow:0 inComponent:index animated:NO];
        return 0;
    }
}

-(void)show
{
    [[[UIApplication sharedApplication] keyWindow] endEditing:YES];  //hide keyboard
    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    [window addSubview:self.backgroundView];
    if (self.isAnimating) {
        return;
    }
    self.isAnimating = YES;
    self.backgroundView.hidden = NO;
    [UIView animateWithDuration:0.35f animations:^{
        self.pickerView.frame = CGRectMake(0, [UIScreen mainScreen].bounds.size.height - WXPickerHeight, [UIScreen mainScreen].bounds.size.width, WXPickerHeight);
        self.backgroundView.alpha = 1;
    } completion:^(BOOL finished) {
        self.isAnimating = NO;
    }];
}

-(void)hide
{
    if (self.isAnimating) {
        return;
    }
    self.isAnimating = YES;
    [UIView animateWithDuration:0.35f animations:^{
        self.pickerView.frame = CGRectMake(0, [UIScreen mainScreen].bounds.size.height, [UIScreen mainScreen].bounds.size.width, WXPickerHeight);
        self.backgroundView.alpha = 0;
    } completion:^(BOOL finished) {
        self.backgroundView.hidden = YES;
        self.isAnimating = NO;
        [self.backgroundView removeFromSuperview];
    }];
}

-(void)cancel:(id)sender
{
    [self hide];
    if (self.callback) {
        self.callback(@{ @"result": @"cancel"});
        self.callback=nil;
    }
    self.items1 = nil;
    self.items2 = nil;
    self.items3 = nil;
}

-(void)done:(id)sender
{
    NSMutableArray *marr = [[NSMutableArray alloc] init];
    self.column > 0 ? [marr addObject: [NSNumber numberWithInteger: [self.picker selectedRowInComponent:0]]]: nil;
    self.column > 1 ? [marr addObject: [NSNumber numberWithInteger: [self.picker selectedRowInComponent:1]]]: nil;
    self.column > 2 ? [marr addObject: [NSNumber numberWithInteger: [self.picker selectedRowInComponent:2]]]: nil;
    self.items2 = nil;
    self.items3 = nil;
    self.items1 = nil;
    [self hide];
    
    if (self.callback) {
        self.callback(@{ @"result": @"success",@"data": marr});
        self.callback=nil;
    }
}

-(BOOL)isRightItems:(id)array
{
    for (id value in array) {
        if([value isKindOfClass:[NSString class]] || [value isKindOfClass:[NSNumber class]]) {
            continue;
        }else {
            return NO;
        }
    }
    return YES;
}

-(NSString *)convertItem:(id)value
{
    if ([value isKindOfClass:[NSNumber class]]) {
        return [NSString stringWithFormat:@"%ld",[value longValue]];
    } else if ([value isKindOfClass:[NSString class]]) {
        return value;
    } else {
        return @"--";
    }
}

#pragma mark -
#pragma mark Picker View

-(void)configPickerView
{
    self.backgroundView = [self createbackgroundView];
    UITapGestureRecognizer *tapGesture=[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(hide)];
    [self.backgroundView addGestureRecognizer:tapGesture];
    self.pickerView = [self createPickerView];
    UIToolbar *toolBar=[[UIToolbar alloc]initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, WXPickerToolBarHeight)];
    toolBar.barTintColor = self.titleBackgroundColor?self.titleBackgroundColor:[UIColor whiteColor];
    
    
    
    UIBarButtonItem* noSpace = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFixedSpace target:nil action:nil];
    noSpace.width=10;
    
    UIBarButtonItem* doneBtn ;
    if (self.confirmTitle.length >0) {
        doneBtn = [[UIBarButtonItem alloc] initWithTitle:self.confirmTitle style:UIBarButtonItemStylePlain target:self action:@selector(done:)];
    }else {
        doneBtn = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(done:)];
    }
    if(self.confirmTitleColor){
        doneBtn.tintColor = self.confirmTitleColor;
    }
    UIBarButtonItem *cancelBtn;
    if (self.cancelTitle.length >0) {
        cancelBtn = [[UIBarButtonItem alloc] initWithTitle:self.cancelTitle style:UIBarButtonItemStylePlain target:self action:@selector(cancel:)];
    }else {
        cancelBtn = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemCancel target:self action:@selector(cancel:)];
    }
    if(self.cancelTitleColor){
        cancelBtn.tintColor = self.cancelTitleColor;
    }
    UIBarButtonItem* flexSpace = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil];
    [toolBar setItems:[NSArray arrayWithObjects:noSpace,cancelBtn,flexSpace,doneBtn,noSpace, nil]];
    UILabel *titleLabel = [UILabel new];
    titleLabel.frame = CGRectMake(0, 0, 200, WXPickerToolBarHeight);
    titleLabel.center = toolBar.center;
    titleLabel.textAlignment = NSTextAlignmentCenter;
    if(self.titleColor){
        titleLabel.textColor = self.titleColor;
    }
    if(self.title.length>0){
        titleLabel.text = self.title;
        [toolBar addSubview:titleLabel];
    }
    [self.pickerView addSubview:toolBar];
    self.picker = [[UIPickerView alloc]init];
    self.picker.delegate = self;
    CGFloat height = WXPickerHeight;
    if (WXFloatEqual(self.height, 0)){
        height = self.height>WXPickerToolBarHeight?self.height:WXPickerHeight;
    }
    CGRect pickerFrame = CGRectMake(0, WXPickerToolBarHeight, [UIScreen mainScreen].bounds.size.width, height-WXPickerToolBarHeight);
    self.picker.backgroundColor = [UIColor whiteColor];
    self.picker.frame = pickerFrame;
    [self.pickerView addSubview:self.picker];
    [self.backgroundView addSubview:self.pickerView];
}

-(UIView *)createPickerView
{
    UIView *view = [UIView new];
    CGFloat height = WXPickerHeight;
    if (WXFloatEqual(self.height, 0)){
        height = self.height>WXPickerToolBarHeight?self.height:WXPickerHeight;
    }
    view.frame = CGRectMake(0, [UIScreen mainScreen].bounds.size.height, [UIScreen mainScreen].bounds.size.width, height);
    view.backgroundColor = [UIColor whiteColor];
    return view;
}

-(UIView *)createbackgroundView
{
    UIView *view = [UIView new];
    view.frame = [UIScreen mainScreen].bounds;
    view.backgroundColor = [UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:0.4];
    return view;
}

#pragma mark -
#pragma UIPickerDelegate
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
    return self.column;
}
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
//    return [self.items count];
    if (component == 0) {
        return [self.items1 count];
    } else if (component == 1) {
        return [self.items2 count];
    } else if (component == 2) {
        return [self.items3 count];
    }
    return 0;
}

- (CGFloat)pickerView:(UIPickerView *)pickerView rowHeightForComponent:(NSInteger)component
{
    return 44.0f;
}

- (NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    if (component == 0) {
        return [self convertItem:self.items1[row]];
    } else if (component == 1) {
        return [self convertItem:self.items2[row]];
    } else if (component == 2) {
        return [self convertItem:self.items3[row]];
    }
    return nil;
}

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
//    self.index = row;
    if(self.selectionColor) {
        UILabel *labelSelected = (UILabel*)[pickerView viewForRow:row forComponent:component];
        [labelSelected setBackgroundColor:self.selectionColor];
    }
    if (!self.isLink) {
        return;
    }
    if (component == 0) {
        self.items2 = self.items[1][row];
        if (self.column > 2) {
            self.items3 = self.items[2][row][0];
            [self.picker selectRow:0 inComponent:2 animated:NO];
            [self.picker reloadComponent:2];
        }
        [self.picker selectRow:0 inComponent:1 animated:NO];
        [self.picker reloadComponent:1];
    } else if (component == 1) {
        if (self.column > 2) {
            NSInteger row0 = [self.picker selectedRowInComponent:0];
            self.items3 = self.items[2][row0][row];
            [self.picker selectRow:0 inComponent:2 animated:NO];
            [self.picker reloadComponent:2];
        }
    }
}

-(UIView *)pickerView:(UIPickerView *)pickerView viewForRow:(NSInteger)row forComponent:(NSInteger)component reusingView:(UIView *)view
{
    
    UILabel *label = (id)view;
    
    if (!label)
    {
        label= [[UILabel alloc] initWithFrame:CGRectMake(0.0f, 0.0f, [pickerView rowSizeForComponent:component].width, [pickerView rowSizeForComponent:component].height)];
        label.textAlignment = NSTextAlignmentCenter;
        UIColor *color = self.textColor?self.textColor:[UIColor blackColor];
        label.textColor = color;
        if (component == 0) {
            label.text = [self convertItem:self.items1[row]];
        } else if (component == 1) {
            label.text = [self convertItem:self.items2[row]];
        } else if (component == 2) {
            label.text = [self convertItem:self.items3[row]];
        }
    }
    
    return label;
}


#pragma mark -
#pragma Date & Time Picker
-(void)pickDate:(NSDictionary *)options callback:(WXModuleCallback)callback
{
    self.datePickerMode = UIDatePickerModeDate;
    [self datepick:options callback:callback];
}

-(void)pickTime:(NSDictionary *)options callback:(WXModuleCallback)callback
{
    self.datePickerMode = UIDatePickerModeTime;
    [self datepick:options callback:callback];
}

-(void)datepick:(NSDictionary *)options callback:(WXModuleCallback)callback
{
    if (options[@"title"]) {
        self.title = [WXConvert NSString:options[@"title"]];
    }
    if (options[@"titleColor"]) {
        self.titleColor = [WXConvert UIColor:options[@"titleColor"]];
    }
    if (options[@"cancelTitle"]) {
        self.cancelTitle = [WXConvert NSString:options[@"cancelTitle"]];
    }
    if (options[@"confirmTitle"]) {
        self.confirmTitle = [WXConvert NSString:options[@"confirmTitle"]];
    }
    if (options[@"cancelTitleColor"]) {
        self.cancelTitleColor = [WXConvert UIColor:options[@"cancelTitleColor"]];
    }
    if (options[@"confirmTitleColor"]) {
        self.confirmTitleColor = [WXConvert UIColor:options[@"confirmTitleColor"]];
    }
    if ((UIDatePickerModeTime == self.datePickerMode) || (UIDatePickerModeDate == self.datePickerMode)) {
        [self createDatePicker:options callback:callback];
    } else {
        if (callback) {
            callback(@{ @"result": @"error" });
        }
        self.callback = nil;
    }
}

- (void)createDatePicker:(NSDictionary *)options callback:(WXModuleCallback)callback
{
    self.callback = callback;
    self.datePicker = [[UIDatePicker alloc]init];
    
    NSString *locale;
    if ([[NSUserDefaults standardUserDefaults] objectForKey:@"myLanguage"] && ![[[NSUserDefaults standardUserDefaults] objectForKey:@"myLanguage"] isEqualToString:@""]) {
        locale = [[NSUserDefaults standardUserDefaults] objectForKey:@"myLanguage"];
    } else {
        locale = [[[NSUserDefaults standardUserDefaults] objectForKey:@"AppleLanguages"] objectAtIndex:0];
    }
    self.datePicker.locale = [NSLocale localeWithLocaleIdentifier: locale];
    if (UIDatePickerModeDate == self.datePickerMode) {
        self.datePicker.datePickerMode = UIDatePickerModeDate;
        NSString *value = [WXConvert NSString:options[@"value"]];
        if (value) {
            NSDate *date = [WXUtility dateStringToDate:value];
            if (date) {
                self.datePicker.date =date;
            }
        }
        NSString *max = [WXConvert NSString:options[@"max"]];
        if (max) {
            NSDate *date = [WXUtility dateStringToDate:max];
            if (date) {
                self.datePicker.maximumDate =date;
            }
        }
        NSString *min = [WXConvert NSString:options[@"min"]];
        if (min) {
            NSDate *date = [WXUtility dateStringToDate:min];
            if (date) {
                self.datePicker.minimumDate =date;
            }
        }
    } else if (UIDatePickerModeTime == self.datePickerMode) {
        self.datePicker.datePickerMode = UIDatePickerModeTime;
        NSString *value = [WXConvert NSString:options[@"value"]];
        if (value) {
            NSDate *date = [WXUtility timeStringToDate:value];
            if (date) {
                self.datePicker.date = date;
            }
        }
    }
    [self configDatePickerView];
    [self show];
}

-(void)configDatePickerView
{
    self.backgroundView = [self createbackgroundView];
    UITapGestureRecognizer *tapGesture=[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(cancel:)];
    [self.backgroundView addGestureRecognizer:tapGesture];
    self.pickerView = [self createPickerView];
    UIToolbar *toolBar=[[UIToolbar alloc]initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, WXPickerToolBarHeight)];
    [toolBar setBackgroundColor:[UIColor whiteColor]];
    UIBarButtonItem* noSpace = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFixedSpace target:nil action:nil];
    noSpace.width=10;
    UIBarButtonItem* doneBtn ;
    if (self.confirmTitle.length >0) {
        doneBtn = [[UIBarButtonItem alloc] initWithTitle:self.confirmTitle style:UIBarButtonItemStylePlain target:self action:@selector(doneDatePicker:)];
    }else {
        doneBtn = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(doneDatePicker:)];
    }
    if(self.confirmTitleColor){
        doneBtn.tintColor = self.confirmTitleColor;
    }
    UIBarButtonItem *cancelBtn;
    if (self.cancelTitle.length >0) {
        cancelBtn = [[UIBarButtonItem alloc] initWithTitle:self.cancelTitle style:UIBarButtonItemStylePlain target:self action:@selector(cancelDatePicker:)];
    }else {
        cancelBtn = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemCancel target:self action:@selector(cancelDatePicker:)];
    }
    if(self.cancelTitleColor){
        cancelBtn.tintColor = self.cancelTitleColor;
    }
    //UIBarButtonItem* doneBtn = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(doneDatePicker:)];
    UIBarButtonItem *flexSpace = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil];
    //UIBarButtonItem* cancelBtn = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemCancel target:self action:@selector(cancelDatePicker:)];
    [toolBar setItems:[NSArray arrayWithObjects:noSpace,cancelBtn,flexSpace,doneBtn,noSpace, nil]];
    UILabel *titleLabel = [UILabel new];
    titleLabel.frame = CGRectMake(0, 0, 200, WXPickerToolBarHeight);
    titleLabel.center = toolBar.center;
    titleLabel.textAlignment = NSTextAlignmentCenter;
    if(self.titleColor){
        titleLabel.textColor = self.titleColor;
    }
    if(self.title.length>0){
        titleLabel.text = self.title;
        [toolBar addSubview:titleLabel];
    }
    [self.pickerView addSubview:toolBar];
    CGRect pickerFrame = CGRectMake(0, WXPickerToolBarHeight, [UIScreen mainScreen].bounds.size.width, WXPickerHeight-WXPickerToolBarHeight);
    self.datePicker.frame = pickerFrame;
    self.datePicker.backgroundColor = [UIColor whiteColor];
    [self.pickerView addSubview:self.datePicker];
    [self.backgroundView addSubview:self.pickerView];
}

-(void)cancelDatePicker:(id)sender
{
    [self hide];
    if (self.callback) {
        self.callback(@{ @"result": @"cancel"});
        self.callback = nil;
    }
}

-(void)doneDatePicker:(id)sender
{
    [self hide];
    NSString *value = @"";
    if (UIDatePickerModeTime == self.datePicker.datePickerMode) {
        value = [WXUtility timeToString:self.datePicker.date];
    } else if(UIDatePickerModeDate == self.datePicker.datePickerMode)
    {
        value = [WXUtility dateToString:self.datePicker.date];
    }
    if (self.callback) {
        // value 改成了 self.datePicker.date
        self.callback(@{ @"result": @"success",@"data":self.datePicker.date});
        self.callback=nil;
    }
}

@end

