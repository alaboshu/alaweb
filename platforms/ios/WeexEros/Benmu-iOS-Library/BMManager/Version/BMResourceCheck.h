//
//  BMResourceCheck.h
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/13.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import <Foundation/Foundation.h>


typedef void (^bmResourceCheckResult)(BOOL check,NSDictionary* info);


@interface BMResourceCheck : NSObject


+(void)checkLocalResourceByZipPath:(NSString*)zipPath result:(bmResourceCheckResult)result;

@end
