//
//  BMDBBaseModel.h
//  RealmDome
//
//  Created by XHY on 2017/3/31.
//  Copyright © 2017年 本木医疗. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Realm/Realm.h>

@interface BMDBBaseModel : RLMObject

@property (nonatomic, copy) NSString *key;
@property (nonatomic, copy) NSString *data;    // json string

@end
