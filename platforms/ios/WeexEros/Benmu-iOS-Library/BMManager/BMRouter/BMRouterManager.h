//
//  BMRouterManager.h
//  Pods
//
//  Created by 窦静轩 on 2017/4/26.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface BMRouterManager : NSObject

+(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;

@end
