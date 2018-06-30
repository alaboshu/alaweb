//
//  SFHFKeychainUtils.h
//
//  Created by Buzz Andersen on 10/20/08.
//  Based partly on code by Jonathan Wight, Jon Crosby, and Mike Malone.
//  Copyright 2008 Sci-Fi Hi-Fi. All rights reserved.
//
//  UICKeyChainStore.h
//  UICKeyChainStore
//
//  Created by Kishikawa Katsumi on 11/11/20.
//  Copyright (c) 2011 Kishikawa Katsumi. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <UIKit/UIKit.h>


@interface SFHFKeychainUtils : NSObject {
    
}

+ (NSString *) getPasswordForUsername: (NSString *) username
					   andServiceName: (NSString *) serviceName
								error: (NSError **) error;


+ (BOOL) storeUsername: (NSString *) username
		   andPassword: (NSString *) password
		forServiceName: (NSString *) serviceName
		updateExisting: (BOOL) updateExisting
				 error: (NSError **) error;


+ (BOOL) deleteItemForUsername: (NSString *) username
				andServiceName: (NSString *) serviceName
						 error: (NSError **) error;

@end