//
//  DebugSettingVC.m
//  TicketAnalysis
//
//  Created by XHY on 17/3/24.
//  Copyright © 2017年 XHY. All rights reserved.
//



#ifdef DEBUG
#import "DebugSettingVC.h"
#import "BMResourceManager.h"
#import "UINavigationBar+NavigationBarExtend.h"
#import <BMBaseViewController.h>
#import "BMDebugManager.h"

@interface DebugSettingVC ()<UITableViewDelegate,UITableViewDataSource>
{
    UITableView * _tableView;
    NSMutableArray * _sources;
    NSString * _jsVersion;
}

@property (nonatomic, strong) UISwitch *hotRefreshSwitch; /**< 热刷新开关 */

@end

@implementation DebugSettingVC

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.title = @"Debug";
    
    NSDictionary * userInfo = [[BMResourceManager sharedInstance] loadConfigData:K_JS_VERSION_PATH];
    if ([userInfo isKindOfClass:[NSDictionary class]]) {
        _jsVersion = userInfo[@"jsVersion"] ? userInfo[@"jsVersion"]:@"";
    }
    
    UIBarButtonItem * item = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemCancel target:self action:@selector(close)];
    self.navigationItem.leftBarButtonItem = item;
    
    _sources = [NSMutableArray arrayWithObjects:@"Interceptor",@"HotRefresh",@"js版本号",@"app版本号",nil];
    
    _tableView = [[UITableView alloc] initWithFrame:self.view.bounds style:UITableViewStylePlain];
    _tableView.delegate = self;
    _tableView.dataSource = self;
    _tableView.rowHeight = 55;
    [self.view addSubview:_tableView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

#pragma mark mark
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
}
-(UITableViewCell*)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString * cellSwitchId = @"cellSwitchId";
    static NSString * cellVersionId = @"cellVersionId";
    static NSString * cellAppVersionId = @"cellAppVersionId";
    
    NSString * title = [_sources objectAtIndex:indexPath.row];
    UITableViewCell * cell = nil;
    if ([title isEqualToString:@"Interceptor"]) {
        cell = [tableView dequeueReusableCellWithIdentifier:cellSwitchId];
        if (nil == cell) {
            cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellSwitchId];
            
            UISwitch * switchOpen = [[UISwitch alloc] init];
            switchOpen.tag = 1000 + indexPath.row;
            
            switchOpen.on = BM_InterceptorOn();
            
            [switchOpen addTarget:self action:@selector(switchChange:) forControlEvents:UIControlEventValueChanged];
            
            cell.accessoryView = switchOpen;
            cell.textLabel.textAlignment = NSTextAlignmentLeft;
            
        }
        
        cell.textLabel.text = title;
        return cell;
    }
    
    else if ([title isEqualToString:@"HotRefresh"]) {
        cell = [tableView dequeueReusableCellWithIdentifier:cellSwitchId];
        if (nil == cell) {
            cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellSwitchId];
            
            UISwitch * switchOpen = [[UISwitch alloc] init];
            self.hotRefreshSwitch = switchOpen;
            switchOpen.tag = 1000 + indexPath.row;
            switchOpen.on = [[NSUserDefaults standardUserDefaults] boolForKey:BM_HotRefreshKey];
            switchOpen.enabled = !BM_InterceptorOn();
            [switchOpen addTarget:self action:@selector(hotRefreshSwitchChange:) forControlEvents:UIControlEventValueChanged];
            cell.accessoryView = switchOpen;
            cell.textLabel.textAlignment = NSTextAlignmentLeft;
        }
        
        cell.textLabel.text = title;
        return cell;
    }
    
    else if ([title isEqualToString:@"js版本号"]) {
        cell = [tableView dequeueReusableCellWithIdentifier:cellVersionId];
        if (nil == cell) {
            cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellVersionId];
            cell.textLabel.textAlignment = NSTextAlignmentLeft;
            cell.textLabel.text = [NSString stringWithFormat:@"jsVersion:  %@",_jsVersion];
            cell.textLabel.numberOfLines = 2;
            cell.textLabel.adjustsFontSizeToFitWidth = YES;
            
        }
        return cell;
    }
    
   else if ([title isEqualToString:@"app版本号"]) {
        cell = [tableView dequeueReusableCellWithIdentifier:cellAppVersionId];
        if (nil == cell) {
            cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellAppVersionId];
            cell.textLabel.textAlignment = NSTextAlignmentLeft;
            cell.textLabel.text = [NSString stringWithFormat:@"appVersion: %@ (%@)",K_APP_VERSION,K_AppBuild_VERSION];
            cell.textLabel.numberOfLines = 2;
            cell.textLabel.adjustsFontSizeToFitWidth = YES;
            
        }
        return cell;
    }

    return cell;
}
-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [_sources count];
}

#pragma mark
-(void)switchChange:(id)sender
{
    UISwitch * switchSender = (UISwitch*)sender;
    BOOL on = switchSender.on;
    
    WXLogInfo(@"拦截开关 is %d",on);
    
    NSNumber * number = [[NSNumber alloc] initWithBool:on];
    [[NSUserDefaults standardUserDefaults] setObject:number forKey:BM_Weex_Interceptor];
    
    [[BMMediatorManager shareInstance] loadJSMediator:YES];
  
    //拦截器打开,将热刷新Socket关闭
    if (on) {
        self.hotRefreshSwitch.on = NO;
        [[BMDebugManager shareInstance] hotRefreshWebSocketClose];
    }
    
    self.hotRefreshSwitch.enabled = !on;
    
    [[NSUserDefaults standardUserDefaults] synchronize];
}

-(void)hotRefreshSwitchChange:(UISwitch *)aSwitch
{
    if (aSwitch.on) {
        [[BMDebugManager shareInstance] hotRefreshWebSocketConnect];
    } else {
        [[BMDebugManager shareInstance] hotRefreshWebSocketClose];
    }
}


-(void)close
{
    [self dismissViewControllerAnimated:YES completion:nil];
}
@end
#endif
