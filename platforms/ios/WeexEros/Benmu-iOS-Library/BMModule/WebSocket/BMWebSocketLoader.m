//
//  BMWebSocketLoader.m
//  BMBaseLibrary
//
//  Created by XHY on 2017/10/23.
//

#import "BMWebSocketLoader.h"
#import "BMWebSocketHandler.h"
#import "BMWebSocketDefaultImpl.h"

@interface BMWebSocketLoader() <BMWebSocketDelegate>
@property (nonatomic,copy) NSString *url;
@property (nonatomic,copy) NSString *protocol;
@property (nonatomic,strong) BMWebSocketDefaultImpl *webSocketImp;
@end

@implementation BMWebSocketLoader

- (BMWebSocketDefaultImpl *)webSocketImp
{
    if (!_webSocketImp) {
        _webSocketImp = [[BMWebSocketDefaultImpl alloc] init];
    }
    return _webSocketImp;
}

- (instancetype)initWithUrl:(NSString *)url protocol:(NSString *)protocol
{
    if (self = [super init]) {
        _url = url;
        _protocol = protocol;
    }
    return self;
}

- (id)copyWithZone:(NSZone *)zone
{
    BMWebSocketLoader *newClass = [[BMWebSocketLoader alloc] init];
    newClass.onOpen = self.onOpen;
    newClass.onReceiveMessage = self.onReceiveMessage;
    newClass.onFail = self.onFail;
    newClass.onClose = self.onClose;
    newClass.protocol = self.protocol;
    newClass.url = self.url;
    return newClass;
}

- (void)open
{
    [self.webSocketImp open:self.url protocol:self.protocol withDelegate:self];
}

- (void)send:(NSString *)data
{
    [self.webSocketImp sendData:data];
}

- (void)close
{
    [self.webSocketImp close];
}

- (void)clear
{
    [self.webSocketImp clear];
}

- (void)close:(NSInteger)code reason:(NSString *)reason
{
    [self.webSocketImp closeWithCode:code reason:reason];
}

#pragma mark - BMWebSocketDelegate
- (void)didOpen
{
    if (self.onOpen) {
        self.onOpen();
    }
}

- (void)didFailWithError:(NSError *)error
{
    if (self.onFail) {
        self.onFail(error);
    }
}

- (void)didReceiveMessage:(id)message
{
    if (self.onReceiveMessage) {
        self.onReceiveMessage(message);
    }
}

- (void)didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean
{
    if (self.onClose) {
        self.onClose(code, reason, wasClean);
    }
}

@end
