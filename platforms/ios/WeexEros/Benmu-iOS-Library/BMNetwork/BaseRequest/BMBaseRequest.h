//
//  BMBaseRequest.h
//  WeexDemo
//
//  Created by XHY on 2017/1/13.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <YTKNetwork/YTKNetwork.h>

/**
 *  请求完成回调
 *
 *  @param errorStatus 错误代码（服务器规定）
 *  @param data        数据dic
 */
typedef void(^RequestResultBlock)(id data);

@interface BMBaseRequest : YTKRequest

/**
 *  调用此方法请求数据
 *
 *  @param resultBlock 返回结果block （先判断errorDescription == nil，说明数据请求出错，!= nil，请求成功，解析data即可）
 */
- (void)startRequestResult:(RequestResultBlock)resultBlock;

@end
