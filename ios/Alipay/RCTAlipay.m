#import "RCTAlipay.h"

static RCTPromiseResolveBlock _resolve;
static RCTPromiseRejectBlock _reject;

@implementation RCTAlipay

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(pay, payInfo:(NSString *)payInfo resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
//  NSArray *urls = [[NSBundle mainBundle] infoDictionary][@"CFBundleURLTypes"];
//  NSMutableString *appScheme = [NSMutableString string];
//  NSMutableString *appScheme = @"1232142";
  NSString *appScheme = @"2021001169609094";
  
  _resolve = resolve;
  _reject = reject;
  
  
  [[AlipaySDK defaultService] payOrder:payInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    [RCTAlipay handleResult:resultDic];
  }];
}

+(void) handleResult:(NSDictionary *)resultDic
{
  NSString *status = resultDic[@"resultStatus"];
  if ([status integerValue] >= 8000) {
    _resolve(@[resultDic]);
  } else {
    _reject(status, resultDic[@"memo"], [NSError errorWithDomain:resultDic[@"memo"] code:[status integerValue] userInfo:NULL]);
  }
}

+(void) handleCallback:(NSURL *)url
{
  //如果极简开发包不可用，会跳转支付宝钱包进行支付，需要将支付宝钱包的支付结果回传给开发包
  if ([url.host isEqualToString:@"safepay"]) {
    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
      //【由于在跳转支付宝客户端支付的过程中，商户app在后台很可能被系统kill了，所以pay接口的callback就会失效，请商户对standbyCallback返回的回调结果进行处理,就是在这个方法里面处理跟callback一样的逻辑】
      [self handleResult:resultDic];
    }];
  }
  if ([url.host isEqualToString:@"platformapi"]){//支付宝钱包快登授权返回authCode
    
    [[AlipaySDK defaultService] processAuthResult:url standbyCallback:^(NSDictionary *resultDic) {
      //【由于在跳转支付宝客户端支付的过程中，商户app在后台很可能被系统kill了，所以pay接口的callback就会失效，请商户对standbyCallback返回的回调结果进行处理,就是在这个方法里面处理跟callback一样的逻辑】
      [self handleResult:resultDic];
    }];
  }
}

@end
