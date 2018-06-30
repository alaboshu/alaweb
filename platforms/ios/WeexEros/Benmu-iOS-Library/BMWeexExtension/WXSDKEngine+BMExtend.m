//
//  WXSDKEngine+BMExtend.m
//  Pods
//
//  Created by 窦静轩 on 2017/5/5.
//
//

#import "WXSDKEngine+BMExtend.h"
#import "WXResourceRequestHandlerDefaultImpl.h"

@implementation WXSDKEngine(BMExtend)

+(void)bm_registerDefaultHandlers
{
    [self bm_registerDefaultHandlers];
    
    if (nil == [WXSDKEngine handlerForProtocol:@protocol(WXResourceRequestHandler)]) {
        [WXSDKEngine registerHandler:[WXResourceRequestHandlerDefaultImpl new] withProtocol:@protocol(WXResourceRequestHandler)];
    }


}

+(void)bm_registerDefaultModules
{
    [self bm_registerDefaultModules];
    
    [self registerModule:@"picker" withClass:NSClassFromString(@"BMPickerModule")];

}
@end
