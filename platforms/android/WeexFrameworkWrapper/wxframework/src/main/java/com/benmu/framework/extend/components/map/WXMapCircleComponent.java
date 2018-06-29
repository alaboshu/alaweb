package com.benmu.framework.extend.components.map;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.view.View;

import com.benmu.framework.extend.components.map.util.Constant;
import com.amap.api.maps2d.AMap;
import com.amap.api.maps2d.MapView;
import com.amap.api.maps2d.model.Circle;
import com.amap.api.maps2d.model.CircleOptions;
import com.amap.api.maps2d.model.LatLng;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by budao on 2017/3/3.
 */

public class WXMapCircleComponent extends WXComponent<View> {
  private MapView mMapView;
  private AMap mMap;
  private Circle mCircle;
  private int mColor = 0;
  private int mFillColor = 0;
  private float mWeight = 1.0f;
  private float mRadius = 1.0f;

  public WXMapCircleComponent(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }

  @Override
  protected View initComponentHostView(@NonNull Context context) {
    if (getParent() != null && getParent() instanceof WXMapViewComponent) {
      mMapView = ((WXMapViewComponent) getParent()).getHostView();
      mMap = mMapView.getMap();
      initCircle();
    }
    // FixMe： 只是为了绕过updateProperties中的逻辑检查
    return new View(context);
  }

  @WXComponentProp(name = Constant.Name.CENTER)
  public void setPath(String param) {
    try {
      JSONArray center = new JSONArray(param);
      if (center != null && center.length() == 2) {
        mCircle.setCenter(new LatLng(center.getDouble(1), center.getDouble(0)));
      }
    } catch (JSONException e) {
      e.printStackTrace();
    }
  }

  @WXComponentProp(name = Constant.Name.STROKE_COLOR)
  public void setStrokeColor(String param) {
    mColor = Color.parseColor(param);
    mCircle.setStrokeColor(mColor);
  }

  @WXComponentProp(name = Constant.Name.FILL_COLOR)
  public void setFillColor(String param) {
    mFillColor = Color.parseColor(param);
    mCircle.setFillColor(mFillColor);
  }

  @WXComponentProp(name = Constant.Name.STROKE_WIDTH)
  public void setStrokeWeight(float param) {
    mWeight = param;
    mCircle.setStrokeWidth(mWeight);
  }

  @WXComponentProp(name = Constant.Name.RADIUS)
  public void setRadius(float param) {
    mRadius = param;
    mCircle.setRadius(mRadius);
  }

  private void initCircle() {
    CircleOptions circleOptions = new CircleOptions();
    circleOptions.strokeColor(mColor);
    circleOptions.strokeWidth(mWeight);
    circleOptions.radius(mRadius);
    circleOptions.fillColor(mFillColor);
    mCircle = mMap.addCircle(circleOptions);
  }
}
