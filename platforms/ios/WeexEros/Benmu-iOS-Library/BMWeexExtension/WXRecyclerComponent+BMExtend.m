//
//  WXRecyclerComponent+BMExtend.m
//  BMBaseLibrary
//
//  Created by XHY on 2017/9/22.
//

#import "WXRecyclerComponent+BMExtend.h"

@implementation WXRecyclerComponent (BMExtend)

- (UIView *)bmRecycler_loadView
{
    UIView *view = [self bmRecycler_loadView];
//    UICollectionView *collectionView = (UICollectionView *)view;
//    if (@available(iOS 11.0, *)) {
//        if (!isIphoneX) collectionView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
//    }
    return view;
}

@end
