//
//  BMMapInfoModel.m
//  Pods
//
//  Created by XHY on 2017/6/1.
//
//

#import "BMMapInfoModel.h"

@implementation BMMapNavigationInfo

@end

@implementation BMMapInfoModel

- (BOOL)modelCustomTransformFromDictionary:(NSDictionary *)dic
{
    NSString *type = dic[@"type"];
    if ([type isEqualToString:@"NAVIGATION"])
    {
        _type = BMMapViewTypeNavigate;
    }
    
    return YES;
}

@end
