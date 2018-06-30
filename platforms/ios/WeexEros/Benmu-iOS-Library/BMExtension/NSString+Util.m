//
//  NSString+Util.m
//  JingYitong
//
//  Created by XHY on 15/7/14.
//  Copyright (c) 2015年 京医通. All rights reserved.
//

#import "NSString+Util.h"
#import <CommonCrypto/CommonDigest.h>
#import <CommonCrypto/CommonCryptor.h>
#import <sys/utsname.h>
//#import <Base64.h>

@implementation NSString (Util)

- (NSString *)md5 {
    const char *cStr = [self UTF8String];
    unsigned char result[16];
    CC_MD5( cStr, (CC_LONG)strlen(cStr), result);
    return [[NSString stringWithFormat:
            @"%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X%02X",
            result[0], result[1], result[2], result[3],
            result[4], result[5], result[6], result[7],
            result[8], result[9], result[10], result[11],
            result[12], result[13], result[14], result[15]
            ] lowercaseString];
}

- (NSString *)trimming {
    return [self stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
}

/** 防止空字符串 */
- (NSString *)dNull {
    return self.length > 0 ? self : @"";
}

- (BOOL)isNull {
    return [self trimming].length == 0;
}


- (BOOL)isContainsSpecialCharacter {
    for(int i = 0; i < [self length]; i++) {
        int a = [self characterAtIndex:i];
        if ((a < 0x0041 && a != 0x0020) ||
            (a > 0x005A && a < 0x0061)  ||
            (a > 0x007A && a < 0x4e00 && a != 0x2006)  ||
            (a > 0x9fff && a < 0xff21)  ||
            (a > 0xff3a && a < 0xff41)  ||
            (a > 0xff5a)) {
            return YES;
        }
    }
    return NO;
}

- (BOOL)isMobileNumber
{
    NSString * phoneRegex = @"1[0-9]{10}";
    NSPredicate * phoneTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", phoneRegex];
    return [phoneTest evaluateWithObject:self];
}

- (BOOL)isHasChinese
{
    for (int i = 0; i < [self length]; i++) {
        unichar ch = [self characterAtIndex:i];
        if (0x4e00 < ch  && ch < 0x9fff)
        {
            return true;
        }
    }
    return NO;
}

- (BOOL)isDigit
{
    NSString *regex = @"^[0-9]*$";
    NSPredicate *pre = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",regex];
    return [pre evaluateWithObject:self];
}

- (NSMutableAttributedString *)addAttributes:(NSDictionary<NSString *,id> *)attrs subString:(NSString *)subString
{
    if (!subString) {
        return nil;
    }
    
    NSMutableAttributedString *attStr = [[NSMutableAttributedString alloc] initWithString:self];
    NSRange range = [self rangeOfString:subString];
    if (range.location != NSNotFound) {
        [attStr addAttributes:attrs range:range];
    }
    return attStr;
}

// 需要#import <sys/utsname.h>
+ (NSString*)deviceModelName
{
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString *deviceModel = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
    
    //iPhone 系列
    if ([deviceModel isEqualToString:@"iPhone1,1"])    return @"iPhone1G";
    if ([deviceModel isEqualToString:@"iPhone1,2"])    return @"iPhone3G";
    if ([deviceModel isEqualToString:@"iPhone2,1"])    return @"iPhone3GS";
    if ([deviceModel isEqualToString:@"iPhone3,1"])    return @"iPhone4";
    if ([deviceModel isEqualToString:@"iPhone3,2"])    return @"Verizon_iPhone4";
    if ([deviceModel isEqualToString:@"iPhone4,1"])    return @"iPhone4S";
    if ([deviceModel isEqualToString:@"iPhone5,1"])    return @"iPhone5";
    if ([deviceModel isEqualToString:@"iPhone5,2"])    return @"iPhone5";
    if ([deviceModel isEqualToString:@"iPhone5,3"])    return @"iPhone5C";
    if ([deviceModel isEqualToString:@"iPhone5,4"])    return @"iPhone5C";
    if ([deviceModel isEqualToString:@"iPhone6,1"])    return @"iPhone5S";
    if ([deviceModel isEqualToString:@"iPhone6,2"])    return @"iPhone5S";
    if ([deviceModel isEqualToString:@"iPhone7,1"])    return @"iPhone6_Plus";
    if ([deviceModel isEqualToString:@"iPhone7,2"])    return @"iPhone6";
    if ([deviceModel isEqualToString:@"iPhone8,1"])    return @"iPhone6s";
    if ([deviceModel isEqualToString:@"iPhone8,2"])    return @"iPhone6s_Plus";
    if ([deviceModel isEqualToString:@"iPhone8,4"])    return @"iPhoneSE";
    if ([deviceModel isEqualToString:@"iPhone9,1"])    return @"iPhone7(CDMA)";
    if ([deviceModel isEqualToString:@"iPhone9,3"])    return @"iPhone7(GSM)";
    if ([deviceModel isEqualToString:@"iPhone9,2"])    return @"iPhone7_Plus(CDMA)";
    if ([deviceModel isEqualToString:@"iPhone9,4"])    return @"iPhone7_Plus(GSM)";
    
    //iPod 系列
    if ([deviceModel isEqualToString:@"iPod1,1"])      return @"iPodTouch1G";
    if ([deviceModel isEqualToString:@"iPod2,1"])      return @"iPodTouch2G";
    if ([deviceModel isEqualToString:@"iPod3,1"])      return @"iPodTouch3G";
    if ([deviceModel isEqualToString:@"iPod4,1"])      return @"iPodTouch4G";
    if ([deviceModel isEqualToString:@"iPod5,1"])      return @"iPodTouch5G";
    
    //iPad 系列
    if ([deviceModel isEqualToString:@"iPad1,1"])      return @"iPad";
    if ([deviceModel isEqualToString:@"iPad2,1"])      return @"iPad2(WiFi)";
    if ([deviceModel isEqualToString:@"iPad2,2"])      return @"iPad2(GSM)";
    if ([deviceModel isEqualToString:@"iPad2,3"])      return @"iPad2(CDMA)";
    if ([deviceModel isEqualToString:@"iPad2,4"])      return @"iPad2(32nm)";
    if ([deviceModel isEqualToString:@"iPad2,5"])      return @"iPad_mini(WiFi)";
    if ([deviceModel isEqualToString:@"iPad2,6"])      return @"iPad_mini(GSM)";
    if ([deviceModel isEqualToString:@"iPad2,7"])      return @"iPad_mini(CDMA)";
    
    if ([deviceModel isEqualToString:@"iPad3,1"])      return @"iPad3(WiFi)";
    if ([deviceModel isEqualToString:@"iPad3,2"])      return @"iPad3(CDMA)";
    if ([deviceModel isEqualToString:@"iPad3,3"])      return @"iPad3(4G)";
    if ([deviceModel isEqualToString:@"iPad3,4"])      return @"iPad4(WiFi)";
    if ([deviceModel isEqualToString:@"iPad3,5"])      return @"iPad4(4G)";
    if ([deviceModel isEqualToString:@"iPad3,6"])      return @"iPad4(CDMA)";
    
    if ([deviceModel isEqualToString:@"iPad4,1"])      return @"iPadAir";
    if ([deviceModel isEqualToString:@"iPad4,2"])      return @"iPadAir";
    if ([deviceModel isEqualToString:@"iPad4,3"])      return @"iPadAir";
    if ([deviceModel isEqualToString:@"iPad5,3"])      return @"iPadAir2";
    if ([deviceModel isEqualToString:@"iPad5,4"])      return @"iPadAir2";
    if ([deviceModel isEqualToString:@"i386"])         return @"Simulator";
    if ([deviceModel isEqualToString:@"x86_64"])       return @"Simulator";
    
    if ([deviceModel isEqualToString:@"iPad4,4"]
        ||[deviceModel isEqualToString:@"iPad4,5"]
        ||[deviceModel isEqualToString:@"iPad4,6"])      return @"iPad_mini2";
    
    if ([deviceModel isEqualToString:@"iPad4,7"]
        ||[deviceModel isEqualToString:@"iPad4,8"]
        ||[deviceModel isEqualToString:@"iPad4,9"])      return @"iPad_mini3";
    
    return deviceModel;
}

- (BOOL)isContainsSubString:(NSString *)subString
{
    if ([self rangeOfString:subString].location != NSNotFound)
    {
        return YES;
    }
    
    return NO;
}

- (NSDictionary*)dictionaryFromQuery
{
    NSCharacterSet* delimiterSet = [NSCharacterSet characterSetWithCharactersInString:@"&"];
    NSMutableDictionary* pairs = [NSMutableDictionary dictionary];
    NSScanner* scanner = [[NSScanner alloc] initWithString:self];
    while (![scanner isAtEnd]) {
        NSString* pairString = nil;
        [scanner scanUpToCharactersFromSet:delimiterSet intoString:&pairString];
        [scanner scanCharactersFromSet:delimiterSet intoString:NULL];
        NSArray* kvPair = [pairString componentsSeparatedByString:@"="];
        if (kvPair.count == 2) {
            NSString* key = [[kvPair objectAtIndex:0]
                             stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
            NSString* value = [[kvPair objectAtIndex:1]
                               stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
            [pairs setObject:value forKey:key];
        }
    }
    
    return [NSDictionary dictionaryWithDictionary:pairs];
}

-(NSString*)encodeString
{
    
    // CharactersToBeEscaped = @":/?&=;+!@#$()~',*";
    // CharactersToLeaveUnescaped = @"[].";
    
    NSString *encodedString = (NSString *)
    CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault,
                                                              (CFStringRef)self,
                                                              NULL,
                                                              (CFStringRef)@"!*'();:@&=+$,/?%#[]",
                                                              kCFStringEncodingUTF8));
    
    return encodedString;
}

//URLDEcode
-(NSString *)decodeString

{
    //NSString *decodedString = [encodedString stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding ];
    
    NSString *decodedString  = (__bridge_transfer NSString *)CFURLCreateStringByReplacingPercentEscapesUsingEncoding(NULL,
                                                                                                                     (__bridge CFStringRef)self,
                                                                                                                     CFSTR(""),
                                                                                                                     CFStringConvertNSStringEncodingToEncoding(NSUTF8StringEncoding));
    return decodedString;
}

+ (NSString*)getStatusText:(NSInteger)code
{
    switch (code) {
        case -1:
            return @"ERR_INVALID_REQUEST";
        case 100:
            return @"Continue";
            break;
        case 101:
            return @"Switching Protocol";
        case 102:
            return @"Processing";
            
        case 200:
            return @"OK";
        case 201:
            return @"Created";
        case 202:
            return @"Accepted";
        case 203:
            return @"Non-Authoritative Information";
        case 204:
            return @"No Content";
        case 205:
            return @" Reset Content";
        case 206:
            return @"Partial Content";
        case 207:
            return @"Multi-Status";
        case 208:
            return @"Already Reported";
        case 226:
            return @"IM Used";
            
        case 300:
            return @"Multiple Choices";
        case 301:
            return @"Moved Permanently";
        case 302:
            return @"Found";
        case 303:
            return @"See Other";
        case 304:
            return @"Not Modified";
        case 305:
            return @"Use Proxy";
        case 306:
            return @"Switch Proxy";
        case 307:
            return @"Temporary Redirect";
        case 308:
            return @"Permanent Redirect";
            
        case 400:
            return @"Bad Request";
        case 401:
            return @"Unauthorized";
        case 402:
            return @"Payment Required";
        case 403:
            return @"Forbidden";
        case 404:
            return @"Not Found";
        case 405:
            return @"Method Not Allowed";
        case 406:
            return @"Not Acceptable";
        case 407:
            return @"Proxy Authentication Required";
        case 408:
            return @"Request Timeout";
        case 409:
            return @"Conflict";
        case 410:
            return @"Gone";
        case 411:
            return @"Length Required";
        case 412:
            return @"Precondition Failed";
        case 413:
            return @"Payload Too Large";
        case 414:
            return @"URI Too Long";
        case 415:
            return @"Unsupported Media Type";
        case 416:
            return @"Range Not Satisfiable";
        case 417:
            return @"Expectation Failed";
        case 418:
            return @"I'm a teapot";
        case 421:
            return @"Misdirected Request";
        case 422:
            return @"Unprocessable Entity";
        case 423:
            return @"Locked";
        case 424:
            return @"Failed Dependency";
        case 426:
            return @"Upgrade Required";
        case 428:
            return @"Precondition Required";
        case 429:
            return @"Too Many Requests";
        case 431:
            return @"Request Header Fields Too Large";
        case 451:
            return @"Unavailable For Legal Reasons";
            
        case 500:
            return @"Internal Server Error";
        case 501:
            return @"Not Implemented";
        case 502:
            return @"Bad Gateway";
        case 503:
            return @"Service Unavailable";
        case 504:
            return @"Gateway Timeout";
        case 505:
            return @"HTTP Version Not Supported";
        case 506:
            return @"Variant Also Negotiates";
        case 507:
            return @"Insufficient Storage";
        case 508:
            return @"Loop Detected";
        case 510:
            return @"Not Extended";
        case 511:
            return @"Network Authentication Required";
        default:
            break;
    }
    
    return @"Unknown";
}

@end
