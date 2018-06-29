package com.benmu.framework.extend.components.map;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.view.View;

import com.benmu.framework.extend.components.map.util.Constant;
import com.amap.api.maps2d.AMap;
import com.amap.api.maps2d.MapView;
import com.amap.api.maps2d.model.LatLng;
import com.amap.api.maps2d.model.Polygon;
import com.amap.api.maps2d.model.PolygonOptions;
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

public class WXMapPolygonComponent extends WXComponent<View> {
  ArrayList<LatLng> mPosition = new ArrayList<>();
  private MapView mMapView;
  private AMap mMap;
  private Polygon mPolygon;
  private int mColor = 0;
  private int mFillColor = 0;
  private float mWidth = 1.0f;

  public WXMapPolygonComponent(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }

  @Override
  protected View initComponentHostView(@NonNull Context context) {
    if (getParent() != null && getParent() instanceof WXMapViewComponent) {
      mMapView = ((WXMapViewComponent) getParent()).getHostView();
      mMap = mMapView.getMap();
      initPolygon();
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
    mPolygon.setPoints(mPosition);
  }

  @WXComponentProp(name = Constant.Name.STROKE_COLOR)
  public void setStrokeColor(String param) {
    mColor = Color.parseColor(param);
    mPolygon.setStrokeColor(mColor);
  }

  @WXComponentProp(name = Constant.Name.FILL_COLOR)
  public void setFillColor(String param) {
    mFillColor = Color.parseColor(param);
    mPolygon.setFillColor(mFillColor);
  }

  @WXComponentProp(name = Constant.Name.STROKE_WIDTH)
  public void setStrokeWidth(float param) {
    mWidth = param;
    mPolygon.setStrokeWidth(mWidth);
  }

  private void initPolygon() {
    PolygonOptions polygonOptions = new PolygonOptions();
    polygonOptions.addAll(mPosition);
    polygonOptions.strokeColor(mColor);
    polygonOptions.strokeWidth(mWidth);
    mPolygon = mMap.addPolygon(polygonOptions);
  }

  public boolean contains(LatLng latLng) {
    return mPolygon != null && mPolygon.contains(latLng);
  }
}
