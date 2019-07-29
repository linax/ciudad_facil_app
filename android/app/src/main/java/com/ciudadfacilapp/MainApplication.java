package com.ciudadfacilapp;

import android.app.Application;

import com.beefe.picker.PickerViewPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.timhagn.rngloc.RNGLocation;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> react_packages = Arrays.asList(
              new MainReactPackage(),
              new PickerViewPackage(),
              new SplashScreenReactPackage(),
              new ImagePickerPackage(),
              new BackgroundTimerPackage(),
              new ReactNativeMapboxGLPackage(),
              new VectorIconsPackage(),
              new RNGLocation()
      );

      return react_packages;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
