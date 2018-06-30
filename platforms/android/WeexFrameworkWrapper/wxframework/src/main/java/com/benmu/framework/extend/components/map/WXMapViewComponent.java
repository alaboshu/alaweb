package com.benmu.framework.extend.components.map;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.view.MotionEvent;
import android.view.View;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.maps2d.AMap;
import com.amap.api.maps2d.CameraUpdateFactory;
import com.amap.api.maps2d.LocationSource;
import com.amap.api.maps2d.MapView;
import com.amap.api.maps2d.MapsInitializer;
import com.amap.api.maps2d.UiSettings;
import com.amap.api.maps2d.model.BitmapDescriptorFactory;
import com.amap.api.maps2d.model.CameraPosition;
import com.amap.api.maps2d.model.LatLng;
import com.amap.api.maps2d.model.Marker;
import com.amap.api.maps2d.model.MyLocationStyle;
import com.amap.api.services.core.AMapException;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.core.PoiItem;
import com.amap.api.services.geocoder.GeocodeResult;
import com.amap.api.services.geocoder.GeocodeSearch;
import com.amap.api.services.geocoder.RegeocodeQuery;
import com.amap.api.services.geocoder.RegeocodeResult;
import com.benmu.framework.R;
import com.benmu.framework.extend.components.map.util.Constant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.PermissionManager;
import com.benmu.framework.extend.components.map.util.Constant;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXLogUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;

public class WXMapViewComponent extends WXVContainer<MapView> implements LocationSource,
    AMapLocationListener {
  private static final int REQUEST_CODE_MAPVIEW = 12332;
  private static String[] permissions = new String[] {
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.ACCESS_LOCATION_EXTRA_COMMANDS"
  };
  private MapView mMapView;
  private AMap mAMap;
  private UiSettings mUiSettings;
  private Activity mActivity;

  private boolean isScaleEnable = true;
  private boolean isZoomEnable = true;
  private boolean isCompassEnable = true;
  private boolean isMyLocationEnable = false;
  private float mZoomLevel;
  private int mGesture = 0xF;
  private boolean isIndoorSwitchEnable = false;
  private OnLocationChangedListener mLocationChangedListener;
  private AMapLocationClient mLocationClient;
  private AMapLocationClientOption mLocationOption;
  private HashMap<String, WXMapInfoWindowComponent> mInfoWindowHashMap = new HashMap<>();
  private static final int STROKE_COLOR = Color.argb(180, 3, 145, 255);
  private static final int FILL_COLOR = Color.argb(10, 0, 0, 180);
  private GeocodeSearch geocodeSearch;
  private LatLng mLatLng;

  public WXMapViewComponent(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, boolean isLazy) {
    super(instance, dom, parent, isLazy);
  }

  @Override
  protected MapView initComponentHostView(@NonNull Context context) {
    mMapView = new MapView(context);
    geocodeSearch = new GeocodeSearch(context);
    mMapView.onCreate(null);
    if (context instanceof Activity) {
      mActivity = (Activity) context;
    }
    initMap();
    return mMapView;
  }

  private void initMap() {
    if (mAMap == null) {
      mAMap = mMapView.getMap();

      mAMap.setInfoWindowAdapter(new InfoWindowAdapter(this));
      mAMap.setOnMapLoadedListener(new AMap.OnMapLoadedListener() {
        @Override
        public void onMapLoaded() {
          mZoomLevel = mAMap.getCameraPosition().zoom;
        }
      });
      geocodeSearch.setOnGeocodeSearchListener(new GeocodeSearch.OnGeocodeSearchListener() {
        @Override
        public void onRegeocodeSearched(RegeocodeResult result, int code) {
          if (code == AMapException.CODE_AMAP_SUCCESS) {
            if (result != null && result.getRegeocodeAddress() != null
                    && result.getRegeocodeAddress().getFormatAddress() != null) {
              HashMap<String, Object> params = new HashMap<>();
              //params.put("00",result.getRegeocodeAddress());
              params.put("address",result.getRegeocodeAddress().getFormatAddress());
              params.put("province",result.getRegeocodeAddress().getProvince());
              params.put("city",result.getRegeocodeAddress().getCity());
              params.put("district",result.getRegeocodeAddress().getDistrict());
              params.put("town",result.getRegeocodeAddress().getTownship());
              params.put("neighborhood",result.getRegeocodeAddress().getNeighborhood());
              params.put("building",result.getRegeocodeAddress().getBuilding());
              params.put("street",result.getRegeocodeAddress().getStreetNumber().getStreet());
              params.put("number", result.getRegeocodeAddress().getStreetNumber().getNumber());
              params.put("latitude",mLatLng.latitude);
              params.put("longitude",mLatLng.longitude);
              List<PoiItem> poiItems = result.getRegeocodeAddress().getPois();
              if (poiItems.size() > 0) {
                double distance = 999;
                int minItem = 0;
                // 寻求最近的poi
                for (int i= 0; i< poiItems.size(); i++) {
                  double error = poiItems.get(i).getDistance();
//                  double lat = poiItems.get(i).getLatLonPoint().getLatitude();
//                  double lon = poiItems.get(i).getLatLonPoint().getLongitude();
//                  double error = Math.abs(lat-mLatLng.latitude) + Math.abs(lon-mLatLng.longitude);
                  if ( distance > error) {
                    distance = error;
                    minItem = i;
                  }
                }
                params.put("poiName",poiItems.get(minItem).getTitle());
                params.put("poiSnippet",poiItems.get(minItem).getSnippet());
                params.put("poiTypecode",poiItems.get(minItem).getTypeCode());
              } else {
                params.put("poisName", "");
              }
              params.put("status", 0);
              getInstance().fireEvent(getRef(), Constant.EVENT.REGEO, params);
            }
          } else {
            HashMap<String, Object> params = new HashMap<>();
            params.put("status", code);
            getInstance().fireEvent(getRef(), Constant.EVENT.REGEO, params);
          }
        }

        @Override
        public void onGeocodeSearched(GeocodeResult geocodeResult, int i) {

        }
      });

      // 绑定 Marker 被点击事件
      mAMap.setOnMarkerClickListener(new AMap.OnMarkerClickListener() {
        // marker 对象被点击时回调的接口
        // 返回 true 则表示接口已响应事件，否则返回false
        @Override
        public boolean onMarkerClick(Marker marker) {
          if (marker != null) {
            for (int i = 0; i < getChildCount(); i++) {
              if (getChild(i) instanceof WXMapMarkerComponent) {
                WXMapMarkerComponent child = (WXMapMarkerComponent) getChild(i);
                if (child.getMarker() != null && child.getMarker().getId() == marker.getId()) {
                  child.onClick();
                }
              }
            }
          }
          return false;
        }
      });
      mAMap.setOnCameraChangeListener(new AMap.OnCameraChangeListener() {

        private boolean mZoomChanged;

        @Override
        public void onCameraChange(CameraPosition cameraPosition) {
          mZoomChanged = mZoomLevel != cameraPosition.zoom;
          mZoomLevel = cameraPosition.zoom;
        }

        @Override
        public void onCameraChangeFinish(CameraPosition cameraPosition) {
          if (mZoomChanged) {
            getInstance().fireEvent(getRef(), Constant.EVENT.ZOOM_CHANGE);
          }
        }
      });
      mAMap.setOnMapClickListener(new AMap.OnMapClickListener() {
        @Override
        public void onMapClick(LatLng latLng) {
          mLatLng = latLng;
          LatLonPoint latLonPoint = new LatLonPoint(latLng.latitude,latLng.longitude);
          RegeocodeQuery query = new RegeocodeQuery(latLonPoint,1000, GeocodeSearch.AMAP);
          geocodeSearch.getFromLocationAsyn(query);
          HashMap<String, Object> params = new HashMap<>();
          params.put("latitude", latLng.latitude);
          params.put("longitude", latLng.longitude);
          getInstance().fireEvent(getRef(), Constant.EVENT.CLICK, params);
        }
      });
      mAMap.setOnMapTouchListener(new AMap.OnMapTouchListener() {
        boolean dragged = false;

        @Override
        public void onTouch(MotionEvent motionEvent) {

          switch (motionEvent.getAction()) {
            case MotionEvent.ACTION_MOVE:
              dragged = true;
              break;
            case MotionEvent.ACTION_UP:
              if (dragged) getInstance().fireEvent(getRef(), Constant.EVENT.DRAG_CHANGE);
              dragged = false;
              break;
          }
        }
      });
      setUpMap();
    }
  }

  private void setUpMap() {
    mUiSettings = mAMap.getUiSettings();

    mUiSettings.setScaleControlsEnabled(isScaleEnable); // 比例尺
    mUiSettings.setZoomControlsEnabled(isZoomEnable); // 放大缩小
    mUiSettings.setCompassEnabled(isCompassEnable); //罗盘
    // mUiSettings.setIndoorSwitchEnabled(isIndoorSwitchEnable);
    if (checkPermissions(mActivity, permissions)) {
      setMyLocationStatus(isMyLocationEnable);  // 定位按钮
    }
    updateGestureSetting();

  }

  private void updateGestureSetting() {
    if ((mGesture & 0xF) == 0xF) {
      mUiSettings.setAllGesturesEnabled(true);
    } else {
      if ((mGesture & Constant.Value.SCROLLGESTURE) == Constant.Value.SCROLLGESTURE) {
        mUiSettings.setScrollGesturesEnabled(true);
      } else {
        mUiSettings.setScrollGesturesEnabled(false);
      }

      if ((mGesture & Constant.Value.ZOOMGESTURE) == Constant.Value.ZOOMGESTURE) {
        mUiSettings.setZoomGesturesEnabled(true);
      } else {
        mUiSettings.setZoomGesturesEnabled(false);
      }

      if ((mGesture & Constant.Value.TILTGESTURE) == Constant.Value.TILTGESTURE) {
        //mUiSettings.setTiltGesturesEnabled(true);
      } else {
        //mUiSettings.setTiltGesturesEnabled(false);
      }

      if ((mGesture & Constant.Value.ROTATEGESTURE) == Constant.Value.ROTATEGESTURE) {
        //mUiSettings.setRotateGesturesEnabled(true);
      } else {
        //mUiSettings.setRotateGesturesEnabled(false);
      }
    }
  }

  @JSMethod
  public void setMyLocationButtonEnabled(boolean enabled) {

    if (mUiSettings != null) {
      mUiSettings.setMyLocationButtonEnabled(enabled);

    }
  }

  @Override
  public void onActivityCreate() {
    super.onActivityCreate();
  }

  @Override
  public void onActivityPause() {
    mMapView.onPause();
    deactivate();
  }

  @Override
  public void onActivityResume() {
    mMapView.onResume();
  }

  @Override
  public void onActivityDestroy() {
    mMapView.onDestroy();
    if (mLocationClient != null) {
      mLocationClient.onDestroy();
    }
  }

  @WXComponentProp(name = Constant.Name.KEYS)
  public void setApiKey(String keys) {
    try {
      JSONObject object = new JSONObject(keys);
      String key = object.optString("android");
      if (!TextUtils.isEmpty(key)) {
        MapsInitializer.setApiKey(key);
        AMapLocationClient.setApiKey(key);
        //ServiceSettings.getInstance().setApiKey(key);
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }

  }

  @WXComponentProp(name = Constant.Name.SCALECONTROL)
  public void setScaleEnable(boolean scaleEnable) {
    this.isScaleEnable = scaleEnable;
    mUiSettings.setScaleControlsEnabled(scaleEnable);
  }

  @WXComponentProp(name = Constant.Name.ZOOM_ENABLE)
  public void setZoomEnable(boolean zoomEnable) {
    this.isZoomEnable = zoomEnable;
    mUiSettings.setZoomControlsEnabled(zoomEnable);
  }

  @WXComponentProp(name = Constant.Name.ZOOM)
  public void setZoom(int level) {
    mAMap.moveCamera(CameraUpdateFactory.zoomTo(level));
  }

  @WXComponentProp(name = Constant.Name.COMPASS)
  public void setCompass(boolean compass) {
    this.isCompassEnable = compass;
    mUiSettings.setCompassEnabled(compass);
  }

  @WXComponentProp(name = Constant.Name.GEOLOCATION)
  public void setMyLocationEnable(boolean myLocationEnable) {
    this.isMyLocationEnable = myLocationEnable;
    if (checkPermissions(mActivity,permissions)) {
      setMyLocationStatus(myLocationEnable);
    }
  }

  @WXComponentProp(name = Constant.Name.CENTER)
  public void setCenter(String location) {
    try {
      JSONArray jsonArray = new JSONArray(location);
      LatLng latLng = new LatLng(jsonArray.optDouble(1), jsonArray.optDouble(0));
      mAMap.moveCamera(CameraUpdateFactory.changeLatLng(latLng));
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  @WXComponentProp(name = Constant.Name.GESTURE)
  public void setGesture(int gesture) {
    this.mGesture = gesture;
    updateGestureSetting();
  }

  @WXComponentProp(name = Constant.Name.INDOORSWITCH)
  public void setIndoorSwitchEnable(boolean indoorSwitchEnable) {
    this.isIndoorSwitchEnable = indoorSwitchEnable;
    //mUiSettings.setIndoorSwitchEnabled(indoorSwitchEnable);
  }

  public void setMyLocationStatus(boolean isActive) {

    if (isActive) {
      mAMap.setLocationSource(this);// 设置定位监听
      mUiSettings.setMyLocationButtonEnabled(true);// 设置默认定位按钮是否显示

      mAMap.setMyLocationEnabled(true);// 设置为true表示显示定位层并可触发定位，false表示隐藏定位层并不可触发定位，默认是false
      // 设置定位的类型为定位模式 ，可以由定位、跟随或地图根据面向方向旋转几种
      //mAMap.setMyLocationType(AMap.LOCATION_TYPE_LOCATE);
      setupLocationStyle();
    } else {
      deactivate();
      mAMap.setLocationSource(null);
      mAMap.setMyLocationEnabled(false);
      mUiSettings.setMyLocationButtonEnabled(false);
    }
  }
  private void setupLocationStyle(){
    // 自定义系统定位蓝点
    MyLocationStyle myLocationStyle = new MyLocationStyle();
    // 自定义定位蓝点图标
    myLocationStyle.myLocationIcon(BitmapDescriptorFactory.
            fromResource(R.drawable.gps_point));
    // 自定义精度范围的圆形边框颜色
    myLocationStyle.strokeColor(STROKE_COLOR);
    //自定义精度范围的圆形边框宽度
    myLocationStyle.strokeWidth(2);
    // 设置圆形的填充颜色
    myLocationStyle.radiusFillColor(FILL_COLOR);
    // 将自定义的 myLocationStyle 对象添加到地图上
    mAMap.setMyLocationStyle(myLocationStyle);
  }

  @Override
  public void activate(OnLocationChangedListener listener) {
    mLocationChangedListener = listener;
    if (mLocationClient == null) {
      mLocationClient = new AMapLocationClient(getContext());
      mLocationOption = new AMapLocationClientOption();
      //设置定位监听
      mLocationClient.setLocationListener(this);
      //设置为高精度定位模式
      mLocationOption.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
      //mLocationOption.setOnceLocation(true);//可选，设置是否单次定位。默认是false
      //设置定位参数
      mLocationClient.setLocationOption(mLocationOption);
      // 此方法为每隔固定时间会发起一次定位请求，为了减少电量消耗或网络流量消耗，
      // 注意设置合适的定位时间的间隔（最小间隔支持为2000ms），并且在合适时间调用stopLocation()方法来取消定位请求
      // 在定位结束后，在合适的生命周期调用onDestroy()方法
      // 在单次定位情况下，定位无论成功与否，都无需调用stopLocation()方法移除请求，定位sdk内部会移除
      mLocationClient.startLocation();
    }
  }

  @Override
  public void deactivate() {
    mLocationChangedListener = null;
    if (mLocationClient != null) {
      mLocationClient.stopLocation();
      mLocationClient.onDestroy();
    }
    mLocationClient = null;
  }

  @Override
  public void onLocationChanged(AMapLocation amapLocation) {
    if (mLocationChangedListener != null && amapLocation != null) {
      if (amapLocation != null
          && amapLocation.getErrorCode() == 0) {
        mLocationChangedListener.onLocationChanged(amapLocation);// 显示系统小蓝点

        // mAMap.moveCamera(CameraUpdateFactory.zoomTo(18));
      } else {
        String errText = "定位失败," + amapLocation.getErrorCode() + ": " + amapLocation.getErrorInfo();
        WXLogUtils.e("AmapErr", errText);
      }
    }
  }

  public boolean checkPermissions(Activity context, String[] permissions) {
    boolean granted = true;
    if (permissions != null && permissions.length > 0) {
      for (String permission : permissions) {
        if (ContextCompat.checkSelfPermission(context, permission) != PackageManager.PERMISSION_GRANTED) {
          granted = false;
          PermissionManager permissionManager = ManagerFactory.getManagerService(PermissionManager
                  .class);
          permissionManager.requestPermissions(mActivity, new PermissionManager.PermissionListener() {
            @Override
            public void onPermissionsGranted(List<String> perms) {
              setMyLocationStatus(isMyLocationEnable);
            }

            @Override
            public void onPermissionsDenied(List<String> perms) {

            }

            @Override
            public void onPermissionRequestRejected() {

            }
          }, permissions);
        }
      }
    }

    return granted;
  }

  public HashMap<String, WXMapInfoWindowComponent> getCachedInfoWindow() {
    return mInfoWindowHashMap;
  }

  private static class InfoWindowAdapter implements AMap.InfoWindowAdapter {

    private WXMapViewComponent mWXMapViewComponent;

    InfoWindowAdapter(WXMapViewComponent wxMapViewComponent) {
      mWXMapViewComponent = wxMapViewComponent;
    }

    @Override
    public View getInfoWindow(Marker marker) {
      return render(marker);
    }

    @Override
    public View getInfoContents(Marker marker) {
      return render(marker);
    }

    private View render(Marker marker) {
      WXMapInfoWindowComponent wxMapInfoWindowComponent = mWXMapViewComponent.mInfoWindowHashMap.get(marker.getId());
      if (wxMapInfoWindowComponent != null) {
        mWXMapViewComponent.getHostView().removeView(wxMapInfoWindowComponent.getHostView());
        return wxMapInfoWindowComponent.getHostView();
      }
      return null;
    }
  }
}
