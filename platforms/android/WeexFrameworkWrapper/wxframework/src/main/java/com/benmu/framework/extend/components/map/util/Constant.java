package com.benmu.framework.extend.components.map.util;

/**
 * Created by aoxiao on 2017/1/4.
 */

public class Constant {

  public static interface Value {
    int SCROLLGESTURE = 0x1;
    int ZOOMGESTURE = 0x1 << 1;
    int TILTGESTURE = 0x1 << 2;
    int ROTATEGESTURE = 0x1 << 3;
  }

  public interface Name {

    // mapview
    String SCALECONTROL = "scale";
    String ZOOM_ENABLE = "zoomEnable";
    String ZOOM = "zoom";
    String COMPASS = "compass";
    String GEOLOCATION = "geolocation";
    String GESTURE = "gesture";
    String INDOORSWITCH = "indoorswitch";
    String CENTER = "center";
    String KEYS = "sdkKey";

    // marker
    String MARKER = "marker";
    String POSITION = "position";
    String ICON = "icon";
    String TITLE = "title";
    String HIDE_CALL_OUT = "hideCallout";

    // polyline
    String PATH = "path";
    String STROKE_COLOR = "strokeColor";
    String STROKE_WIDTH = "strokeWidth";
    String STROKE_OPACITY = "strokeOpacity";
    String STROKE_STYLE = "strokeStyle";

    // circle
    String RADIUS = "radius";
    String FILL_COLOR = "fillColor";

    // offset
    String OFFSET = "offset";
    String OPEN = "open";
  }



  public static interface EVENT {
    String ZOOM_CHANGE = "zoomchange";
    String DRAG_CHANGE = "dragend";
    String CLICK = "click";
    String REGEO = "regeo";
  }
}
