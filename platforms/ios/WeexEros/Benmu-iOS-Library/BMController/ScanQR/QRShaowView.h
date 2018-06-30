//
//  QRShaowView.h
//  BMBaseLibrary
//
//  Created by XHY on 2017/10/11.
//

#import <UIKit/UIKit.h>

@interface QRShaowView : UIView

@property (nonatomic,assign) CGSize showSize; /**< 有效范围 */

- (void)showAnimation;
- (void)stopAnimation;

@end
