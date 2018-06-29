package com.benmu.framework.extend.module;

import android.support.annotation.Nullable;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.maps2d.AMapUtils;
import com.amap.api.maps2d.model.LatLng;
import com.amap.api.services.core.AMapException;
import com.amap.api.services.core.PoiItem;
import com.amap.api.services.poisearch.PoiResult;
import com.amap.api.services.poisearch.PoiSearch;
import com.amap.api.services.weather.LocalWeatherForecastResult;
import com.amap.api.services.weather.LocalWeatherLive;
import com.amap.api.services.weather.LocalWeatherLiveResult;
import com.amap.api.services.weather.WeatherSearch;
import com.amap.api.services.weather.WeatherSearchQuery;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.PermissionManager;
import com.benmu.framework.extend.components.map.WXMapPolygonComponent;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.ui.component.WXComponent;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashMap;
import java.util.List;

/**
 * Created by budao on 2017/1/24.
 */

public class WXMapModule extends WXModule {
  private static final String RESULT = "result";
  private static final String DATA = "data";

  private static final String RESULT_OK = "success";
  private static final String RESULT_FAILED = "failed";
  private static String[] permissions = new String[] {
          "android.permission.ACCESS_FINE_LOCATION",
          "android.permission.ACCESS_LOCATION_EXTRA_COMMANDS"
  };

  /**
   * get line distance between to POI.
   */
  @JSMethod
  public void getLineDistance(String posA, String posB, @Nullable final JSCallback callback) {
    Log.v("getDistance", posA + ", " + posB);
    float distance = -1;
    try {
      JSONArray jsonArray = new JSONArray(posA);
      LatLng latLngA = new LatLng(jsonArray.optDouble(1), jsonArray.optDouble(0));
      JSONArray jsonArrayB = new JSONArray(posB);
      LatLng latLngB = new LatLng(jsonArrayB.optDouble(1), jsonArrayB.optDouble(0));
      distance = AMapUtils.calculateLineDistance(latLngA, latLngB);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    if (callback != null) {
      HashMap map = new HashMap(2);
      HashMap data = new HashMap(1);
      data.put("distance", distance);
      map.put(DATA, data);
      map.put(RESULT, distance >= 0 ? RESULT_OK : RESULT_FAILED);
      callback.invoke(map);
    }

  }

  @JSMethod
  public void polygonContainsMarker(String position, String id, @Nullable final JSCallback callback) {
    boolean contains = false;
    boolean success = false;
    try {
      JSONArray jsonArray = new JSONArray(position);
      LatLng latLng = new LatLng(jsonArray.optDouble(1), jsonArray.optDouble(0));

      WXComponent component = findComponent(id);

      if (component != null && component instanceof WXMapPolygonComponent) {
        contains = ((WXMapPolygonComponent) component).contains(latLng);
        success = true;
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }
    if (callback != null) {
      HashMap map = new HashMap(2);
      map.put(DATA, contains);
      map.put(RESULT, success ? RESULT_OK : RESULT_FAILED);
      callback.invoke(map);
    }

  }

  /**
   * get user location.
   */
  @JSMethod
  public void getUserLocation(@Nullable final JSCallback callback) {
    PermissionManager permissionManager = ManagerFactory.getManagerService(PermissionManager.class);
    if (!permissionManager.hasPermissions(mWXSDKInstance.getContext(), permissions)) {
      permissionManager.requestPermissions(mWXSDKInstance.getContext(),
              new PermissionManager.PermissionListener() {
        @Override
        public void onPermissionsGranted(List<String> perms) {
          getLocation(callback);
        }

        @Override
        public void onPermissionsDenied(List<String> perms) {
          if (callback != null) callback.invoke(JSON.parse("{\"status\": 119}"));
        }

        @Override
        public void onPermissionRequestRejected() {

        }
        }, permissions);
    }
    getLocation(callback);
  }
  private void getLocation(final JSCallback callback) {
    final AMapLocationClient client = new AMapLocationClient(
            WXEnvironment.getApplication().getApplicationContext());
    final AMapLocationClientOption clientOption = new AMapLocationClientOption();
    //设置定位监听
    client.setLocationListener(new AMapLocationListener() {
      public void onLocationChanged(AMapLocation aMapLocation) {
        if (aMapLocation != null && aMapLocation.getErrorCode() == 0) {
          if (callback != null) {
            HashMap map = new HashMap(2);
            map.put(DATA, aMapLocation);
            map.put("status", aMapLocation.getLongitude() > 0 && aMapLocation.getLatitude() > 0 ? 0 : 400);
            callback.invoke(map);
          }
        } else {
          HashMap map = new HashMap(2);
          if (aMapLocation != null) {
            map.put("status", aMapLocation.getErrorCode());
            map.put("errorMsg", aMapLocation.getErrorInfo());
          } else {
            map.put("status",404);
            map.put("errorMsg"," ");
          }
          if (callback != null) callback.invoke(map);
        }
        if (client != null) {
          client.stopLocation();
          client.onDestroy();
        }
      }
    });
    //设置为高精度定位模式
    clientOption.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
    clientOption.setOnceLocation(true);
    clientOption.setHttpTimeOut(2000);
    //设置定位参数
    client.setLocationOption(clientOption);
    // 此方法为每隔固定时间会发起一次定位请求，为了减少电量消耗或网络流量消耗，
    // 注意设置合适的定位时间的间隔（最小间隔支持为2000ms），并且在合适时间调用stopLocation()方法来取消定位请求
    // 在定位结束后，在合适的生命周期调用onDestroy()方法
    // 在单次定位情况下，定位无论成功与否，都无需调用stopLocation()方法移除请求，定位sdk内部会移除
    client.startLocation();
  }
  @JSMethod
  public void GetPoiSearch(String keyWord, String city, @Nullable final JSCallback callback) {
    PoiSearch.Query query = new PoiSearch.Query(keyWord,"",city);
    query.setPageSize(20);
    query.setPageNum(0);

    query.setCityLimit(true);

    final PoiSearch search = new PoiSearch(WXEnvironment.getApplication().getApplicationContext(), query);
    search.setOnPoiSearchListener(new PoiSearch.OnPoiSearchListener() {
      @Override
      public void onPoiSearched(PoiResult result, int code) {
        if(code == AMapException.CODE_AMAP_SUCCESS) {
          if (result != null && result.getQuery() != null) {
            List<PoiItem> poiItems = result.getPois();
            HashMap map = new HashMap(2);
            map.put("data", poiItems);
            map.put("status", 0);
            if (callback != null)
              callback.invoke(map);
          }
        } else {
          if (callback != null) callback.invoke(JSON.parse("{\"status\": "+code+"}"));
        }
      }

      @Override
      public void onPoiItemSearched(PoiItem poiItem, int i) {

      }

    });
    search.searchPOIAsyn();
  }
  @JSMethod
  public void GetForcastsWeather(String cityname, @Nullable final JSCallback callback) {
    WeatherSearchQuery query = new WeatherSearchQuery(cityname, WeatherSearchQuery.WEATHER_TYPE_FORECAST);
    final WeatherSearch search = new WeatherSearch(WXEnvironment.getApplication().getApplicationContext());
    search.setOnWeatherSearchListener(new WeatherSearch.OnWeatherSearchListener() {
      @Override
      public void onWeatherLiveSearched(LocalWeatherLiveResult localWeatherLiveResult, int i) {

      }

      @Override
      public void onWeatherForecastSearched(LocalWeatherForecastResult result, int code) {
//        if (code == AMapException.CODE_AMAP_SUCCESS) {
//          if (result != null && result.getForecastResult() != null
//                  && result.getForecastResult().getWeatherForecast() != null
//                  && result.getForecastResult().getWeatherForecast().size()>0) {
//            LocalWeatherForecast forecast = result.getForecastResult();
//            List<LocalDayWeatherForecast> forecastList = forecast.getWeatherForecast();
//            if (callback != null)
//              callback.invoke(forecastList);
//          }
//        } else {
//          if (callback != null) {
//            callback.invoke(JSON.parse("{\"status\": "+code+"}"));
//          }
//        }
      }
    });
    search.setQuery(query);
    search.searchWeatherAsyn();
  }
  @JSMethod
  public void GetLiveWeather(String cityname, @Nullable final JSCallback callback) {
    WeatherSearchQuery query = new WeatherSearchQuery(cityname, WeatherSearchQuery.WEATHER_TYPE_LIVE);
    final WeatherSearch search = new WeatherSearch(WXEnvironment.getApplication().getApplicationContext());
    search.setOnWeatherSearchListener(new WeatherSearch.OnWeatherSearchListener() {
      @Override
      public void onWeatherLiveSearched(LocalWeatherLiveResult result, int code) {
        if (code == AMapException.CODE_AMAP_SUCCESS) {
          if (result != null && result.getLiveResult() != null ) {
            LocalWeatherLive live = result.getLiveResult();
            HashMap map = new HashMap(2);
            map.put("data", live);
            map.put("status", 0);
            if (callback != null)
              callback.invoke(map);
          }
        } else {
          if (callback != null) {
            callback.invoke(JSON.parse("{\"status\": "+code+"}"));
          }
        }
      }

      @Override
      public void onWeatherForecastSearched(LocalWeatherForecastResult result, int code) {

      }
    });
    search.setQuery(query);
    search.searchWeatherAsyn();
  }
}
