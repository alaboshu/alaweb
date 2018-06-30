//
//  BMDragButton.h
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/10.
//  Copyright © 2017年 XHY. All rights reserved.
//

#ifdef DEBUG

#import <UIKit/UIKit.h>

@interface BMDragButton : UIView

@property(nonatomic,assign,getter = isDragEnable)   BOOL dragEnable;
@property(nonatomic,assign,getter = isAdsorbEnable) BOOL adsorbEnable;
@property(nonatomic,weak) UIViewController * controller;

@end

#endif
