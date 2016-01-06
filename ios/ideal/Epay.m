//
//  Epay.m
//  ideal
//
//  Created by Ilyas Malgazhdarov on 1/5/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "Epay.h"
#import "RCTBridge.h"
#import "RCTConvert.h"
#import "BMEpaySDK.h"
#import <AFNetworking/AFNetworking.h>
@implementation Epay

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(pay:(NSString *) order){
  
  
  
  //
  
//  UIViewController *rootController = [[[[UIApplication sharedApplication] windows] firstObject] rootViewController];

//  [self presentViewController:controller fromController:rootController];
//  AFHTTPRequestOperationManager *apiClient = [[AFHTTPRequestOperationManager alloc] initWithBaseURL:[NSURL URLWithString:@"https://epay.kkb.kz"]];
//  apiClient.responseSerializer = [AFHTTPResponseSerializer serializer];
//  [apiClient GET:@"/jsp/client/signorderb64.jsp" parameters:@{@"order_id":order} success:^(AFHTTPRequestOperation *operation, id responseObject) {
//    NSString *data = [[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
//    BMEpayViewController *controller = [[BMEpayViewController alloc] init];
//    controller.delegate = self;
//    controller.sdkMode = EpaySdkModeTest;
//    controller.signedOrderBase64 = data;
//    controller.postLink = @"http://test.kz";
//    controller.template = @"besmart_android.xsl";
//    //        controller.clientEmail = @"test@test.kz";
//    //        controller.language = EpayLanguageKazakh;
//    [self presentViewController:controller animated:YES completion:^{
//      
//    }];
//  } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
//    NSLog(@"%@", error);
//  }];
  
}


@end
