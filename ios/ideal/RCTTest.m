//
//  RCTTest.m
//  ideal
//
//  Created by Ilyas Malgazhdarov on 1/5/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTTest.h"

@implementation RCTTest  {
  UIVisualEffectView *_visualEffectView;
}

- (void)setBlurType:(NSString *)blurType
{
  if (_visualEffectView) {
    [_visualEffectView removeFromSuperview];
  }
  
  UIBlurEffect *blurEffect;
  
  if ([blurType isEqual: @"xlight"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleExtraLight];
  } else if ([blurType isEqual: @"light"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
  } else if ([blurType isEqual: @"dark"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
  } else {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
  }
  
  _visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  
  _visualEffectView.frame = self.bounds;
  [self insertSubview:_visualEffectView atIndex:0];
}

@end
