//
//  BMPopupComponent.m
//  Pods
//
//  Created by XHY on 2017/4/26.
//
//

#import "BMPopupComponent.h"
#import "BMMaskComponent.h"
#import "Masonry.h"

@interface BMPopupComponent ()

@property (nonatomic) CGFloat rowHeight;
@property (nonatomic) BOOL needUpdateFrame; /**< 兼容一些弹窗问题 */

@end

@implementation BMPopupComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        if (attributes[@"updatePosition"]) {
            _needUpdateFrame = [WXConvert BOOL:attributes[@"updatePosition"]];
        }
    }
    return self;
}

- (UIView *)loadView
{
    return [[UIView alloc] init];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
}

- (void)layoutDidFinish
{
    [super layoutDidFinish];
    
    if (_needUpdateFrame && [self.supercomponent isKindOfClass:[BMMaskComponent class]]) {
        [(BMMaskComponent *)self.supercomponent getPopViewRectNeedUpdateFrame:YES];
    }
    
}


@end
