//
//  BMWebViewRouterModel.h
//  Pods
//
//  Created by XHY on 2017/7/19.
//
//

#import <Foundation/Foundation.h>
#import "BMShareModel.h"

@interface BMWebViewRouterModel : NSObject

@property (nonatomic, copy) NSString *url;              /**< url */
@property (nonatomic, copy) NSString *title;            /**< 页面标题 */
@property (nonatomic, assign) BOOL navShow;             /**< 是否隐藏导航栏 */
@property (nonatomic, copy) BMShareModel *shareModel;   /**< 分享model */

@end
