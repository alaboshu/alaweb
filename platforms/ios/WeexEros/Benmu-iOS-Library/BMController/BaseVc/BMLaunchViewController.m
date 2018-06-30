//
//  BMLaunchViewController.m
//  BM-JYT
//
//  Created by XHY on 2017/2/20.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMLaunchViewController.h"

@interface BMLaunchViewController ()

@property (nonatomic, weak) IBOutlet NSLayoutConstraint *topSpace;

@end

@implementation BMLaunchViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    if (isIphone4) {
        _topSpace.constant = 80.0;
    } else if (isIphone5) {
        _topSpace.constant = 110.0;
    } else {
        _topSpace.constant = 130.0;
    }
    
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

@end
