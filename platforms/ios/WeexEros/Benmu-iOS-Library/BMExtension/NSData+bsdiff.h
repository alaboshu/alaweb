//
//  NSData+bsdiff.h
//
//  Created by 窦静轩 on 16/6/27.
//  Copyright © 2016年 微票儿. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <bzlib.h>

@interface NSData (bsdiff)

- (instancetype)initWithData:(NSData *)data andPatch:(NSData *)patch;

+ (NSData *)dataWithData:(NSData *)data andPatch:(NSData *)patch;

@end
