//
//  WXListComponent+BMExtend.m
//  BM-JYT
//
//  Created by XHY on 2017/3/21.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "WXListComponent+BMExtend.h"

@implementation WXListComponent (BMExtend)

//- (instancetype)bmList_initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
//{
//    if (attributes[@"bounce"]) {
//        objc_setAssociatedObject(self, "bm_bounce", [NSNumber numberWithBool:[WXConvert BOOL:attributes[@"bounce"]]], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
//    }
//    
//    return [self bmList_initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
//}
//
//- (void)bmList_scrollViewDidScroll:(UIScrollView *)scrollView
//{
//    NSNumber *bounce = objc_getAssociatedObject(self, "bm_bounce");
//    if (bounce) {
//        CGPoint pt = scrollView.contentOffset;
//        if (pt.y <=0 ) {
//            pt.y = 0;
//            scrollView.contentOffset = pt;
//            return;
//        }
//    }
//    
//    [self bmList_scrollViewDidScroll:scrollView];
//}

@end
