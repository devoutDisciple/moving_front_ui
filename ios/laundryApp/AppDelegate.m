/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import "RCTAlipay.h"
@implementation AppDelegate

// ios 9.0+ 微信支付的回调
// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//             options:(NSDictionary<NSString*, id> *)options
// {
//   // Triggers a callback event.
//   // 触发回调事件
//   [RCTLinkingManager application:application openURL:url options:options];
//   return [WXApi handleOpenURL:url delegate:self];
// }

// 支付支付的回调
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary*)options {
  //如果极简开发包不可用，会跳转支付宝钱包进行支付，需要将支付宝钱包的支付结果回传给开发包
  if ([url.host isEqualToString:@"safepay"]) {
      [RCTAlipay handleCallback:url];
    return YES;
  }
  //此处是微信支付 XXXXXX:微信urlsheme
  if ([url.host isEqualToString:@"pay"])
  {
   // Triggers a callback event.
  // 触发回调事件
    [RCTLinkingManager application:application openURL:url options:options];
    return [WXApi handleOpenURL:url delegate:self];
  }

  return  YES;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"laundryApp"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
