//
//  BMBrowserImgModule.m
//  BM-JYT
//
//  Created by 窦静轩 on 2017/4/1.
//  Copyright © 2017年 XHY. All rights reserved.
//

#import "BMBrowserImgModule.h"
#import <SDWebImage/SDImageCache.h>
#import "PBViewController.h"
#import <objc/runtime.h>
#import <SDWebImage/UIImageView+WebCache.h>

static NSString * indexKey = @"index";
static NSString * imagesKey = @"images";
static NSString * typeKey = @"type";
static NSString * localKey = @"local";
static NSString * networkKey = @"network";

@interface BMBrowserImgModule()<PBViewControllerDelegate,PBViewControllerDataSource>
{
    PBViewController * _photoBrowser;
}
@property (nonatomic,strong)NSMutableArray * images;
@end




@implementation BMBrowserImgModule


@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(open:callback:))
WX_EXPORT_METHOD(@selector(close))

-(void)open:(NSDictionary*)info callback:(WXModuleCallback)callback
{
    if ([info isKindOfClass:[NSDictionary class]]) {
        NSArray * images = [(NSDictionary*)info objectForKey:imagesKey];
        NSNumber * index = [(NSDictionary*)info objectForKey:indexKey];
        NSString * type = [(NSDictionary*)info objectForKey:typeKey];
        
        
        NSMutableArray * imagsArray = [[NSMutableArray alloc] initWithCapacity:0];
        
        BOOL isLocal = NO;
        if ([images isKindOfClass:[NSArray class]]) {
            for (int i = 0; i < images.count; i++) {
                NSString * url = [images objectAtIndex:i];
                
                if ([type isEqualToString:localKey]) {
                    isLocal = YES;
                    UIImage * image = [[SDImageCache sharedImageCache] imageFromDiskCacheForKey:[url md5]];
                    if (nil != image) {
                        [imagsArray addObject:image];
                    }
                    
                }
                if ([type isEqualToString:networkKey]) {
                    isLocal = NO;
                    if (nil != url) {
                        [imagsArray addObject:url];
                    }
                }
            }
            
            if (nil != self.images) {
                [self.images removeAllObjects];
                self.images = nil;
            }
            self.images = [[NSMutableArray alloc] initWithArray:imagsArray];
            
            if (nil != _photoBrowser) {
                _photoBrowser = nil;
            }
            
             _photoBrowser = [PBViewController new];
             _photoBrowser.pb_dataSource = self;
             _photoBrowser.pb_delegate = self;
             _photoBrowser.pb_startPage = [index integerValue];

            [weexInstance.viewController presentViewController:_photoBrowser animated:YES completion:^{
                if (callback) {
                    callback([NSDictionary dictionary]);
                }
            }];
        
        }
    }
}
-(void)close
{
    if (_photoBrowser) {
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [_photoBrowser dismissViewControllerAnimated:YES completion:nil];
        });
    }
}

#pragma mark - PBViewControllerDataSource

- (NSInteger)numberOfPagesInViewController:(PBViewController *)viewController {
    return self.images.count;
}

- (void)viewController:(PBViewController *)viewController presentImageView:(UIImageView *)imageView forPageAtIndex:(NSInteger)index progressHandler:(void (^)(NSInteger, NSInteger))progressHandler {
    
    NSString *url = self.images[index]?:@"";
    UIImage *placeholder = nil;
    [imageView sd_setImageWithURL:[NSURL URLWithString:url]
                 placeholderImage:placeholder
                          options:0
                         progress:progressHandler
                        completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, NSURL *imageURL) {
                        }];
}

- (UIView *)thumbViewForPageAtIndex:(NSInteger)index {
    return nil;
}

#pragma mark - PBViewControllerDelegate

- (void)viewController:(PBViewController *)viewController didSingleTapedPageAtIndex:(NSInteger)index presentedImage:(UIImage *)presentedImage {
    [_photoBrowser dismissViewControllerAnimated:YES completion:nil];
}

- (void)viewController:(PBViewController *)viewController didLongPressedPageAtIndex:(NSInteger)index presentedImage:(UIImage *)presentedImage {
    NSLog(@"didLongPressedPageAtIndex: %@", @(index));
}



@end
