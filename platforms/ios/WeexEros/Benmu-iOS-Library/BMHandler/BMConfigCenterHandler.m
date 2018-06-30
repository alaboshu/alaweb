//
//  BMConfigCenterHandler.m
//  BMBaseLibrary
//
//  Created by XHY on 2017/9/22.
//

#import "BMConfigCenterHandler.h"

@implementation BMConfigCenterHandler

- (id)configForKey:(NSString *)key defaultValue:(id)defaultValue isDefault:(BOOL *)isDefault
{
    NSArray<NSString*>* keys = [key componentsSeparatedByString:@"."];
    if ([keys[0] isEqualToString:@"iOS_weex_ext_config"] && [keys[1] isEqualToString:@"text_render_useCoreText"]){
        return @YES;
    }
    if ([keys[0] isEqualToString:@"iOS_weex_ext_config"] && [keys[1] isEqualToString:@"slider_class_name"]){
        return @"WXCycleSliderComponent";
    }
    if ([keys[0] isEqualToString:@"weex_prerender_config"] && [keys[1] isEqualToString:@"is_switch_on"]){
        return @YES;
    }
    if ([keys[0] isEqualToString:@"weex_prerender_config"] && [keys[1] isEqualToString:@"cacheTime"]){
        return @300000;
    }
    if ([keys[0] isEqualToString:@"weex_prerender_config"] && [keys[1] isEqualToString:@"max_cache_num"]){
        return @2;
    }
    return nil;
}

@end
