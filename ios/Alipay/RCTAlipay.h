//
//  RCTAlipay.h
//  laundryApp
//
//  Created by 张振 on 2020/6/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
#import <AlipaySDK/AlipaySDK.h>

@interface RCTAlipay : NSObject<RCTBridgeModule>

+(void) handleCallback:(NSURL *)url;

@end
