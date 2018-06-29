package com.benmu.framework.extend.components.map;

import android.content.Context;
import android.support.annotation.NonNull;
import android.widget.LinearLayout;

import com.amap.api.maps2d.AMap;
import com.amap.api.maps2d.MapView;
import com.amap.api.maps2d.model.BitmapDescriptorFactory;
import com.amap.api.maps2d.model.LatLng;
import com.amap.api.maps2d.model.Marker;
import com.amap.api.maps2d.model.MarkerOptions;
import com.benmu.framework.R;
import com.benmu.framework.extend.components.map.util.Constant;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.Constants;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXUtils;

import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by budao on 2017/2/9.
 */

public class WXMapInfoWindowComponent extends WXVContainer<LinearLayout> {
  private Marker mMarker;
  private MapView mMapView;
  private WXMapViewComponent mWxMapViewComponent;

  public WXMapInfoWindowComponent(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);

  }

  @Override
  protected LinearLayout initComponentHostView(@NonNull Context context) {
//    frameLayout = new LinearLayout(context);
//    // frameLayout.setLayoutParams(new LinearLayout.LayoutParams(1, 1));
//    // frameLayout.setBackgroundColor(Color.TRANSPARENT);
    if (getParent() != null && getParent() instanceof WXMapViewComponent) {
      mWxMapViewComponent = (WXMapViewComponent) getParent();
      mMapView = ((WXMapViewComponent) getParent()).getHostView();
      boolean open = (Boolean) getDomObject().getAttrs().get(Constant.Name.OPEN);
      String offset = (String) getDomObject().getAttrs().get(Constant.Name.ICON);
      String position = getDomObject().getAttrs().get(Constant.Name.POSITION).toString();
      initMarker(open, position, offset);
    }
    // FixMe： 只是为了绕过updateProperties中的逻辑检查
    return new LinearLayout(context);
  }

  @Override
  protected boolean setProperty(String key, Object param) {
    switch (key) {
      case Constants.Name.POSITION:
        String position = WXUtils.getString(param, null);
        if (position != null)
          setPosition(position);
        return true;
    }
    return super.setProperty(key, param);
  }

  @WXComponentProp(name = Constant.Name.POSITION)
  public void setPosition(String position) {
    setMarkerPosition(position);
  }

  @WXComponentProp(name = Constant.Name.OFFSET)
  public void setOffset(String offset) {
    setMarkerInfoWindowOffset(offset);
  }

  @WXComponentProp(name = Constant.Name.OPEN)
  public void setOpened(Boolean opened) {
    if (opened) {
      mMarker.showInfoWindow();
    } else {
      mMarker.hideInfoWindow();
    }
  }

  @Override
  public void destroy() {
    super.destroy();
    if (mMarker != null) {
      if (mWxMapViewComponent != null) {
        mWxMapViewComponent.getCachedInfoWindow().remove(mMarker.getId());
      }
      mMarker.remove();
    }
  }

  private void initMarker(boolean open, String position, String icon) {
    final MarkerOptions markerOptions = new MarkerOptions();
    //设置Marker可拖动, 将Marker设置为贴地显示，可以双指下拉地图查看效果
//    markerOptions.setFlat(true);
//    markerOptions.infoWindowEnable(true);
    markerOptions.icon(BitmapDescriptorFactory.fromResource(R.drawable.infowindow_marker_icon));
    markerOptions.title("");
    AMap mMap = mMapView.getMap();
    mMarker = mMap.addMarker(markerOptions);
    mWxMapViewComponent.getCachedInfoWindow().put(mMarker.getId(), this);
    //mMarker.setClickable(false);
    mMarker.hideInfoWindow();
    setMarkerPosition(position);
    if (open) {
      mMarker.showInfoWindow();
    } else {
      mMarker.hideInfoWindow();
    }
  }

  private void setMarkerInfoWindowOffset(String position) {
    try {
      JSONArray jsonArray = new JSONArray(position);
      if (mMarker != null) {
//        MarkerOptions markerOptions = mMarker.getOptions();
//        markerOptions.setInfoWindowOffset(jsonArray.optInt(0), jsonArray.optInt(1));
//        mMarker.setMarkerOptions(markerOptions);
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  private void setMarkerPosition(String position) {
    try {
      JSONArray jsonArray = new JSONArray(position);
      LatLng latLng = new LatLng(jsonArray.optDouble(1), jsonArray.optDouble(0));
      mMarker.setPosition(latLng);
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }
}
