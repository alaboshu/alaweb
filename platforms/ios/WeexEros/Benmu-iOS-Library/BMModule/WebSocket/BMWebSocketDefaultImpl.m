//
//  BMWebSocketDefaultImpl.m
//  BMBaseLibrary
//
//  Created by XHY on 2017/10/23.
//

#import "BMWebSocketDefaultImpl.h"
#import "SRWebSocket.h"

@interface BMWebSocketDefaultImpl() <SRWebSocketDelegate>

@property (nonatomic,strong) SRWebSocket *webSocket; /**< socket */
@property (nonatomic,weak) id<BMWebSocketDelegate> delegate; /**< BMWebSocketDelegate */
@property (nonatomic,assign) BOOL isConnect;

@end

@implementation BMWebSocketDefaultImpl

#pragma mark - BMWebSocketHandler
- (void)open:(NSString *)url protocol:(NSString *)protocol withDelegate:(id<BMWebSocketDelegate>)delegate
{
    NSArray *protols;
    if ([protocol length] > 0) {
        protols = [NSArray arrayWithObject:protocol];
    }
    
    if (_webSocket) {
        _webSocket.delegate = nil;
        [_webSocket close];
    }
    
    self.delegate = delegate;
    
    _webSocket = [[SRWebSocket alloc] initWithURL:[NSURL URLWithString:url] protocols:protols];
    _webSocket.delegate = self;
    [_webSocket open];
}

- (void)sendData:(NSString *)data
{
    if (!_isConnect) {
        WXLogError(@"WebSocket 已断开，不能发送消息:%@",data);
        return;
    }
    [self.webSocket send:data];
}

- (void)close
{
    [self.webSocket close];
}

- (void)closeWithCode:(NSInteger)code reason:(NSString *)reason
{
    [self.webSocket closeWithCode:code reason:reason];
}

- (void)clear
{
    self.webSocket.delegate = nil;
    [self.webSocket close];
}

#pragma mark - SRWebSocketDelegate

/** socket连接成功 */
- (void)webSocketDidOpen:(SRWebSocket *)webSocket
{
    _isConnect = YES;
    
    if (self.delegate && [self.delegate respondsToSelector:@selector(didOpen)]) {
        [self.delegate didOpen];
    }
}

/** socket连接失败 */
- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(didFailWithError:)]) {
        [self.delegate didFailWithError:error];
    }
}

/** socket收到消息 */
- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(didReceiveMessage:)]) {
        [self.delegate didReceiveMessage:message];
    }
}

/** socket断开连接 */
- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean
{
    _isConnect = NO;
    
    if (self.delegate && [self.delegate respondsToSelector:@selector(didCloseWithCode:reason:wasClean:)]) {
        [self.delegate didCloseWithCode:code reason:reason wasClean:wasClean];
    }
}

@end
