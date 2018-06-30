/*
 * MIT License
 *
 * Copyright (c) 2017 Kavin Varnan
 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

#import <CommonCrypto/CommonDigest.h>
#import <CommonCrypto/CommonCryptor.h>
#import <Foundation/Foundation.h>

#define AES_KEY @"eros loves you"
#define AES_IV @"RjatRGC4W72PJXTE"

@interface CryptLib : NSObject

-  (NSData *)encrypt:(NSData *)plainText key:(NSString *)key iv:(NSString *)iv;
-  (NSData *)decrypt:(NSData *)encryptedText key:(NSString *)key iv:(NSString *)iv;
-  (NSData *)generateRandomIV:(size_t)length;
-  (NSString *) md5:(NSString *) input;
-  (NSString *) sha256:(NSString *)key length:(NSInteger) length;
-  (NSString *) encryptPlainTextWith:(NSString *)plainText key:(NSString *)key iv:(NSString *)iv;
-  (NSString *) decryptCipherTextWith:(NSString *)cipherText key:(NSString *)key iv:(NSString *)iv;

@end
