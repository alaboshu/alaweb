//
//  WXImageComponent+BMExtend.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/3/21.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "WXImageComponent+BMExtend.h"

#import "WXHandlerFactory.h"
#import "WXComponent_internal.h"
#import "WXImgLoaderProtocol.h"
#import "WXLayer.h"
#import "WXType.h"
#import "WXConvert.h"
#import "WXURLRewriteProtocol.h"
#import "UIColor+Util.h"
#import <Masonry/Masonry.h>



const char * placeholdSrcKey = "placeholdSrc";

const char * imageDownloadFinishKey = "imageDownloadFinish";

const char * placeholderOperationKey = "placeholderOperation";

const char * imageSrcKey = "_imageSrc";

const char * blurRadiusKey = "blurRadius";

const char * imageSharpKey = "imageSharp";

const char * imageQualityKey = "imageQuality";

const char * imageLoadEventKey = "imageLoadEvent";


static NSString * defaultKey = @"default";


@interface WXImageComponent ()<WXImgLoaderProtocol>

@property (nonatomic,strong)UIActivityIndicatorView * indicatorView;

@property (nonatomic,strong)UIImageView * placeholderView;

@end



@implementation WXImageComponent (BMExtend)


- (void)dealloc
{
    self.indicatorView = nil;
    self.placeholderView = nil;
}
-(UIActivityIndicatorView*)indicatorView
{
    return objc_getAssociatedObject(self, @selector(indicatorView));
}

-(void)setIndicatorView:(UIActivityIndicatorView *)indicatorView
{
    objc_setAssociatedObject(self, @selector(indicatorView), indicatorView, OBJC_ASSOCIATION_RETAIN);
}

-(UIImageView*)placeholderView
{
    return objc_getAssociatedObject(self, @selector(placeholderView));
}

-(void)setPlaceholderView:(UIImageView *)placeholderView
{
    objc_setAssociatedObject(self, @selector(placeholderView), placeholderView, OBJC_ASSOCIATION_RETAIN);
}


- (void)bm_updatePlaceHolderWithFailedBlock:(void(^)(NSString *, NSError *))downloadFailedBlock
{
    
    objc_property_t placeholderOperationProperty = class_getProperty([WXImageComponent class], placeholderOperationKey);
    
    NSString * placeholderOperationPName = [[NSString alloc] initWithCString:property_getName(placeholderOperationProperty) encoding:NSUTF8StringEncoding];
    
    
    
    objc_property_t imageDownloadFinishProperty = class_getProperty([WXImageComponent class], imageDownloadFinishKey);
    
    NSString * imageDownloadFinishPName = [[NSString alloc] initWithCString:property_getName(imageDownloadFinishProperty) encoding:NSUTF8StringEncoding];
    
    
    
    objc_property_t placeholdSrcProperty = class_getProperty([WXImageComponent class], placeholdSrcKey);
    
    NSString *propertyName = [[NSString alloc] initWithCString:property_getName(placeholdSrcProperty) encoding:NSUTF8StringEncoding];
    
    id placeholderSrcValue = [self valueForKey:propertyName];
    
    NSString * placeholderSrc = nil;
    if ([placeholderSrcValue isKindOfClass:[NSString class]]) {
        placeholderSrc = placeholderSrcValue;
    }
    
    
    if (placeholderSrc.length > 0 && ![placeholderSrc isEqualToString:defaultKey]) {
        WXLogDebug(@"Updating image, component:%@, placeholder:%@ ", self.ref, placeholderSrc);
        NSMutableString *newURL = [placeholderSrc mutableCopy];
        WX_REWRITE_URL(placeholderSrc, WXResourceTypeImage, self.weexInstance)
        
        
        
        id <WXImgLoaderProtocol> imageLoader = [WXHandlerFactory handlerForProtocol:@protocol(WXImgLoaderProtocol)];
        
        __weak typeof(self) weakSelf = self;
        id<WXImageOperationProtocol> placeholderOperation;
        placeholderOperation =  [imageLoader downloadImageWithURL:newURL imageFrame:self.calculatedFrame userInfo:nil completed:^(UIImage *image, NSError *error, BOOL finished) {
            dispatch_async(dispatch_get_main_queue(), ^{
                __strong typeof(self) strongSelf = weakSelf;
                
                if (!strongSelf) {
                    return ;
                }
                
                UIImage *viewImage = ((UIImageView *)strongSelf.view).image;
                if (error) {
                    downloadFailedBlock(placeholderSrc,error);
                    if ([strongSelf isViewLoaded] && !viewImage) {
                        ((UIImageView *)(strongSelf.view)).image = nil;
                        //                        UIImage * failedImage = [UIImage imageNamed:@"image_failed"];
                        //                        ((UIImageView *)strongSelf.view).image = failedImage;
                        [self readyToRender];
                    }
                    return;
                }
                if (![placeholderSrc isEqualToString:placeholderSrcValue]) {
                    return;
                }
                
                if ([strongSelf isViewLoaded] && !viewImage) {
                    
                    UIImageView * imageView = (UIImageView *)self.view;
                    imageView.image = viewImage;
                    
                    [self setValue:[NSNumber numberWithBool:YES] forKey:imageDownloadFinishPName];
                    
                    if (nil == self.indicatorView) {
                        self.indicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
                    }
                    
                    
                    [imageView addSubview:self.indicatorView];
                    
                    [self.indicatorView mas_makeConstraints:^(MASConstraintMaker *make) {
                        make.center.mas_equalTo(imageView);
                    }];
                    
                    [self.indicatorView startAnimating];
                    [self readyToRender];
                }
            });
        }];
        
        [self setValue:placeholderOperation forKey:placeholderOperationPName];
        
    }
    
    if ([placeholderSrc isEqualToString:defaultKey]) {
        UIImage * image = [UIImage imageNamed:@"image_placeholder"];
        if(image){
            if ([self isViewLoaded]) {
                
                dispatch_async(dispatch_get_main_queue(), ^{
                    UIImageView * imageView = (UIImageView *)self.view;
                    
                    [self setValue:[NSNumber numberWithBool:YES] forKey:imageDownloadFinishPName];
                    
                    if (nil == self.indicatorView) {
                        self.indicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
                    }
                    
                    
                    [imageView addSubview:self.indicatorView];
                    
                    [self.indicatorView mas_makeConstraints:^(MASConstraintMaker *make) {
                        make.center.mas_equalTo(imageView);
                    }];
                    
                    [self.indicatorView startAnimating];
                    [self readyToRender];
                    
                    
                });
            }
        }
    }
}


- (void)bm_updateContentImageWithFailedBlock:(void(^)(NSString *, NSError *))downloadFailedBlock
{
//    objc_property_t imageSrcProperty = class_getProperty([WXImageComponent class], imageSrcKey);
//
//    NSString * imageSrcPName = [[NSString alloc] initWithCString:property_getName(imageSrcProperty) encoding:NSUTF8StringEncoding];
    
    id imageSrcValue = [self valueForKey:@"imageSrc"];
    
    NSString *imageSrc = nil;
    
    if ([imageSrcValue isKindOfClass:[NSString class]]) {
        imageSrc = imageSrcValue;
    }
    
    
    if (imageSrc) {
        
        objc_property_t imageQualityProperty = class_getProperty([WXImageComponent class], imageQualityKey);
        
        NSString * imageQualityPName = [[NSString alloc] initWithCString:property_getName(imageQualityProperty) encoding:NSUTF8StringEncoding];
        
        id imageQualityValue = [self valueForKey:imageQualityPName];
        
        
        
        objc_property_t imageSharpProperty = class_getProperty([WXImageComponent class], imageSharpKey);
        
        NSString * imageSharpPName = [[NSString alloc] initWithCString:property_getName(imageSharpProperty) encoding:NSUTF8StringEncoding];
        
        id imageSharpValue = [self valueForKey:imageSharpPName];
        
        
        
        objc_property_t blurRadiusProperty = class_getProperty([WXImageComponent class], blurRadiusKey);
        
        NSString * blurRadiusPName = [[NSString alloc] initWithCString:property_getName(blurRadiusProperty) encoding:NSUTF8StringEncoding];
        
        id blurRadiusValue = [self valueForKey:blurRadiusPName];
        
        
        
        objc_property_t imageDownloadFinishProperty = class_getProperty([WXImageComponent class], imageDownloadFinishKey);
        
        NSString * imageDownloadFinishPName = [[NSString alloc] initWithCString:property_getName(imageDownloadFinishProperty) encoding:NSUTF8StringEncoding];
        
        
        objc_property_t imageLoadEventProperty = class_getProperty([WXImageComponent class], imageLoadEventKey);
        
        NSString * imageLoadEventPName = [[NSString alloc] initWithCString:property_getName(imageLoadEventProperty) encoding:NSUTF8StringEncoding];
        
        id imageLoadEventValue = [self valueForKey:imageLoadEventPName];
        
        
        
        WXLogDebug(@"Updating image:%@, component:%@", imageSrc, self.ref);
        NSDictionary *userInfo = @{@"imageQuality":imageQualityValue, @"imageSharp":imageSharpValue, @"blurRadius":blurRadiusValue};
        NSMutableString * newURL = [imageSrc mutableCopy];
//        WX_REWRITE_URL(imageSrc, WXResourceTypeImage, self.weexInstance)
        __weak typeof(self) weakSelf = self;
        dispatch_async(dispatch_get_main_queue(), ^{
            
            id <WXImgLoaderProtocol> imageLoader = [WXHandlerFactory handlerForProtocol:@protocol(WXImgLoaderProtocol)];
            
            
            [imageLoader downloadImageWithURL:newURL imageFrame:weakSelf.calculatedFrame userInfo:userInfo completed:^(UIImage *image, NSError *error, BOOL finished) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    __strong typeof(self) strongSelf = weakSelf;
                    
                    if (!strongSelf) {
                        return ;
                    }
                    
                    if ([imageLoadEventValue boolValue]) {
                        NSMutableDictionary *sizeDict = [NSMutableDictionary new];
                        sizeDict[@"naturalWidth"] = @0;
                        sizeDict[@"naturalHeight"] = @0;
                        if (!error) {
                            sizeDict[@"naturalWidth"] = @(image.size.width * image.scale);
                            sizeDict[@"naturalHeight"] = @(image.size.height * image.scale);
                        } else {
                            [sizeDict setObject:[error description]?:@"" forKey:@"errorDesc"];
                        }
                        [strongSelf fireEvent:@"load" params:@{ @"success": error? @false : @true,@"size":sizeDict}];
                    }
                    if (error) {
                        downloadFailedBlock(imageSrc, error);

                        UIImageView * imageView = (UIImageView *)strongSelf.view;
                        
                        
                        UIImage * image = [UIImage imageNamed:@"image_placeholder"];
                        
                        //                        imageView.backgroundColor = [UIColor colorWithHexString:@"#f0f3f5"];
                        
                        
                        if (nil == strongSelf.placeholderView) {
                            strongSelf.placeholderView = [[UIImageView alloc] initWithImage:image];
                            
                        }
                        //
                        [imageView addSubview:strongSelf.placeholderView];
                        
                        [strongSelf.placeholderView mas_makeConstraints:^(MASConstraintMaker *make) {
                            make.center.mas_equalTo(imageView);
                            CGFloat minValue = MIN(imageView.width, imageView.height);
                            
                            
                            CGSize size  = CGSizeMake(minValue/2, minValue/2);
                            make.size.mas_equalTo(size);
                            
                        }];
                        strongSelf.placeholderView.contentMode = UIViewContentModeScaleAspectFit;
                        
                        
                        if ([strongSelf.indicatorView isAnimating]) {
                            
                            [strongSelf.indicatorView stopAnimating];
                            [strongSelf.indicatorView removeFromSuperview];
                            strongSelf.indicatorView = nil;
                        }
                        
                        
                        [strongSelf readyToRender];
                        return ;
                    }
                    
                    if (![imageSrc isEqualToString:imageSrcValue]) {
                        return ;
                    }
                    
                    if ([strongSelf isViewLoaded]) {
                        
                        UIImageView * imageView = (UIImageView *)strongSelf.view;
                        
                        imageView.image = image;
                        
                        imageView.backgroundColor = [UIColor clearColor];
                        
                        if (strongSelf.placeholderView) {
                            [strongSelf.placeholderView removeFromSuperview];
                            strongSelf.placeholderView = nil;
                            
                        }
                        
                        [strongSelf setValue:[NSNumber numberWithBool:YES] forKey:imageDownloadFinishPName];
                        
                        
                        if ([strongSelf.indicatorView isAnimating]) {
                            
                            [strongSelf.indicatorView stopAnimating];
                            [strongSelf.indicatorView removeFromSuperview];
                            strongSelf.indicatorView = nil;
                        }
                        
                        [strongSelf readyToRender];
                    } else if (strongSelf->_isCompositingChild) {
                        [strongSelf setValue:[NSNumber numberWithBool:YES] forKey:imageDownloadFinishPName];
                        [strongSelf setValue:image forKey:@"image"];
                        [strongSelf setNeedsDisplay];
                    }
                });
            }];
        });
    }
}

@end
