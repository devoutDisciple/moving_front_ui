package com.moving.dry.cleaner;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "laundryApp";
  }

 @Override
 protected ReactActivityDelegate createReactActivityDelegate() {
   return new ReactActivityDelegate(this, getMainComponentName()) {
     @Override
     protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(MainActivity.this);
     }
   };
 }

 // 禁止字体缩放
 @Override
 public Resources getResources() {
     Resources res = super.getResources();
     Configuration config=new Configuration();
     config.setToDefaults();
     res.updateConfiguration(config,res.getDisplayMetrics());
     return res;
 }
}
