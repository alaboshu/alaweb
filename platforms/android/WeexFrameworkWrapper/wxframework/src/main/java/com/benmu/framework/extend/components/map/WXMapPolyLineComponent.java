package com.benmu.framework.extend.components.map;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.view.View;

import com.benmu.framework.extend.components.map.util.Constant;
import com.amap.api.maps2d.AMap;
import com.amap.api.maps2d.MapView;
import com.amap.api.maps2d.model.LatLng;
import com.amap.api.maps2d.model.Polyline;
import com.amap.api.maps2d.model.PolylineOptions;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;

/**
 * Created by budao on 2017/3/3.
 */

public class WXMapPolyLineComponent extends WXComponent<View> {
  ArrayList<LatLng> mPosition = new ArrayList<>();
  private MapView mMapView;
  private AMap mMap;
  private Polyline mPolyline;
  private int mColor = 0;
  private String mStyle;
  private float mWeight = 1.0f;

  public WXMapPolyLineComponent(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }

  @Override
  protected View initComponentHostView(@NonNull Context context) {
    if (getParent() != null && getParent() instanceof WXMapViewComponent) {
      mMapView = ((WXMapViewComponent) getParent()).getHostView();
      mMap = mMapView.getMap();
      initPolyLine();
    }
    // FixMe： 只是为了绕过updateProperties中的逻辑检查
    return new View(context);
  }

  @WXComponentProp(name = Constant.Name.PATH)
  public void setPath(String param) {
    try {
      JSONArray path = new JSONArray(param);
      if (path != null) {
        for (int i = 0; i < path.length(); i++) {
          JSONArray position = path.getJSONArray(i);
          mPosition.add(new LatLng(position.getDouble(1), position.getDouble(0)));
        }
      }

    } catch (JSONException e) {
      e.printStackTrace();
    }
    mPolyline.setPoints(mPosition);
  }

  @WXComponentProp(name = Constant.Name.STROKE_COLOR)
  public void setStrokeColor(String param) {
    mColor = Color.parseColor(param);
    mPolyline.setColor(mColor);
  }

  @WXComponentProp(name = Constant.Name.STROKE_WIDTH)
  public void setStrokeWeight(float param) {
    mWeight = param;
    mPolyline.setWidth(mWeight);
  }

  @WXComponentProp(name = Constant.Name.STROKE_STYLE)
  public void setStrokeStyle(String param) {
    mStyle = param;
    mPolyline.setDottedLine("dashed".equalsIgnoreCase(mStyle));
  }

  private void initPolyLine() {
    PolylineOptions polylineOptions = new PolylineOptions();
    //polylineOptions.setPoints(mPosition);
    polylineOptions.color(mColor);
    polylineOptions.width(mWeight);
    polylineOptions.setDottedLine("dashed".equalsIgnoreCase(mStyle));
    mPolyline = mMap.addPolyline(polylineOptions);
  }
}
