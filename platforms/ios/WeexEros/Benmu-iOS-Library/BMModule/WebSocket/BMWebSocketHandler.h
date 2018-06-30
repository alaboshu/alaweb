//
//  BMWebSocketHandler.h
//  BMBaseLibrary
//
//  Created by XHY on 2017/10/23.
//

#ifndef BMWebSocketHandler_h
#define BMWebSocketHandler_h
#import "WXModuleProtocol.h"

@protocol BMWebSocketDelegate<NSObject>
- (void)didOpen;
- (void)didFailWithError:(NSError *)error;
- (void)didReceiveMessage:(id)message;
- (void)didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean;
@end

@protocol BMWebSocketHandler<NSObject>

- (void)open:(NSString *)url protocol:(NSString *)protocol withDelegate:(id<BMWebSocketDelegate>)delegate;
- (void)sendData:(NSString *)data;
- (void)close;
- (void)closeWithCode:(NSInteger)code reason:(NSString *)reason;
- (void)clear;
@end

#endif /* BMWebSocketHandler_h */
