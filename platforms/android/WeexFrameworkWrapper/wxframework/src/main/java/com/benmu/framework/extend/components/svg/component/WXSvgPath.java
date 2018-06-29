package com.benmu.framework.extend.components.svg.component;

import android.graphics.Canvas;
import android.graphics.DashPathEffect;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Log;

import com.benmu.framework.extend.components.svg.SvgBrush;
import com.benmu.framework.extend.components.svg.SvgParser;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by budao on 2017/2/22.
 */

public class WXSvgPath extends WXSvgAbsComponent {
  private static final String TAG = "WXSvgPath";

  private static final int CAP_BUTT = 0;
  private static final int CAP_ROUND = 1;
  private static final int CAP_SQUARE = 2;

  private static final int JOIN_BEVEL = 2;
  private static final int JOIN_MITER = 0;
  private static final int JOIN_ROUND = 1;

  private static final int FILL_RULE_EVENODD = 0;
  private static final int FILL_RULE_NONZERO = 1;
  public float mStrokeWidth = 1;
  public float mStrokeOpacity = 1;
  public float mStrokeMiterlimit = 4;
  public float mStrokeDashoffset = 0;
  public Paint.Cap mStrokeLinecap = Paint.Cap.ROUND;
  public Paint.Join mStrokeLinejoin = Paint.Join.ROUND;
  public float mFillOpacity = 1.0f;
  public Path.FillType mFillRule = Path.FillType.WINDING;
  protected Path mPath;
  protected ArrayList<SvgParser.PathCmd> mD;
  //private float[] mD;
//  protected ReadableArray mPropList;// = new WritableNativeArray();
//  protected WritableArray mOwnedPropList;// = new WritableNativeArray();
  private String mFillColor = "#00ffffff";
  private String mStrokeColor;
  float[] mStrokeDasharray;
  private boolean mFillRuleSet = true;
  private ArrayList<String> mChangedList;
  private ArrayList<Object> mOriginProperties;
  private WXDomObject mWXDomObject;

  public WXSvgPath(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
    mWXDomObject = dom;
    Log.v(TAG, "WXSvgPath init " + mWXDomObject.getRef() + " dom attr " + mD);
  }

  @WXComponentProp(name = "d")
  public void setPath(@Nullable String shapePath) {
    mD = SvgParser.parserPath(shapePath);
    setupPath();
  }

  @WXComponentProp(name = "fillOpacity")
  public void setFillOpacity(float fillOpacity) {
    mFillOpacity = fillOpacity;
  }

  @WXComponentProp(name = "fillRule")
  public void setFillRule(int fillRule) {
    switch (fillRule) {
      case FILL_RULE_EVENODD:
        mFillRule = Path.FillType.EVEN_ODD;
        break;
      case FILL_RULE_NONZERO:
        break;
      default:
        Log.v(TAG, "fillRule " + mFillRule + " unrecognized");
    }

    mFillRuleSet = true;
    setupPath();
  }

  @WXComponentProp(name = "strokeOpacity")
  public void setStrokeOpacity(float strokeOpacity) {
    mStrokeOpacity = strokeOpacity;

  }

//  @WXComponentProp(name = "strokeDasharray")
//  public void setStrokeDasharray(@Nullable ReadableArray strokeDasharray) {
//
//    mStrokeDasharray = PropHelper.toFloatArray(strokeDasharray);
//    if (mStrokeDasharray != null && mStrokeDasharray.length > 0) {
//      for (int i = 0; i < mStrokeDasharray.length; i++) {
//        mStrokeDasharray[i] = mStrokeDasharray[i] * mScale;
//      }
//    }
//
//  }

  @WXComponentProp(name = "strokeDashoffset")
  public void setStrokeDashoffset(float strokeWidth) {
    mStrokeDashoffset = strokeWidth * mScale;

  }

  @WXComponentProp(name = "strokeWidth")
  public void setStrokeWidth(float strokeWidth) {
    mStrokeWidth = strokeWidth;
  }

  @WXComponentProp(name = "strokeMiterlimit")
  public void setStrokeMiterlimit(float strokeMiterlimit) {
    mStrokeMiterlimit = strokeMiterlimit;

  }

  @WXComponentProp(name = "strokeLinecap")
  public void setStrokeLinecap(int strokeLinecap) {
    switch (strokeLinecap) {
      case CAP_BUTT:
        mStrokeLinecap = Paint.Cap.BUTT;
        break;
      case CAP_SQUARE:
        mStrokeLinecap = Paint.Cap.SQUARE;
        break;
      case CAP_ROUND:
        mStrokeLinecap = Paint.Cap.ROUND;
        break;
      default:
        Log.v(TAG, "strokeLinecap " + mStrokeLinecap + " unrecognized");
    }

  }

  @WXComponentProp(name = "strokelinejoin")
  public void setStrokeLinejoin(int strokeLinejoin) {
    switch (strokeLinejoin) {
      case JOIN_MITER:
        mStrokeLinejoin = Paint.Join.MITER;
        break;
      case JOIN_BEVEL:
        mStrokeLinejoin = Paint.Join.BEVEL;
        break;
      case JOIN_ROUND:
        mStrokeLinejoin = Paint.Join.ROUND;
        break;
      default:
        Log.v(TAG, "strokeLinejoin " + mStrokeLinejoin + " unrecognized");
    }

  }

//  @WXComponentProp(name = "proplist")
//  public void setPropList(@Nullable ReadableArray propList) {
//    WritableArray copy = new WritableNativeArray();
//    if (propList != null) {
//      for (int i = 0; i < propList.size(); i++) {
//        String fieldName = propertyNameToFieldName(propList.getString(i));
//        copy.pushString(fieldName);
//        mOwnedPropList.pushString(fieldName);
//      }
//
//    }
//
//    mPropList = copy;
//
//  }

  @WXComponentProp(name = "stroke")
  public void setStroke(String stroke) {
    if (!TextUtils.isEmpty(stroke)) {
      mStrokeColor = stroke;
    }
  }

  @WXComponentProp(name = "fill")
  public void setFill(String fill) {
    if (!TextUtils.isEmpty(fill) && !fill.equals("none")) {
      mFillColor = fill;
    }
  }

  @Override
  public void draw(Canvas canvas, Paint paint, float opacity) {
    opacity *= mOpacity;
    Log.v(TAG, "WXSvgPath draw " + mWXDomObject.getRef() + " dom attr " + mD);
    if (opacity > MIN_OPACITY_FOR_DRAW) {
      int count = saveAndSetupCanvas(canvas);
      if (mPath == null) {
        Log.v(TAG, "Paths should have a valid path (d) prop");
      }

      if (mPath != null) {
        clip(canvas, paint);

        if (setupFillPaint(paint, opacity * mFillOpacity, null)) {
          canvas.drawPath(mPath, paint);
        }
        if (setupStrokePaint(paint, opacity * mStrokeOpacity, null)) {
          canvas.drawPath(mPath, paint);
        }
      }
      restoreCanvas(canvas, count);
      //markUpdateSeen();
    }
  }

  @Override
  protected Path getPath(Canvas canvas, Paint paint) {
    return mPath;
  }

  protected void setupPath() {
    // init path after both fillRule and path have been set
    if (mFillRuleSet && mD != null) {
      mPath = new Path();
      mPath.setFillType(mFillRule);
      super.createPath(mD, mPath);
    }
  }

  /**
   * Sets up paint according to the props set on a shadow view. Returns {@code true}
   * if the fill should be drawn, {@code false} if not.
   */
  protected boolean setupFillPaint(Paint paint, float opacity, @Nullable RectF box) {
    if (!TextUtils.isEmpty(mFillColor)) {
      paint.reset();
      //paint.setColor(SvgParser.parseColor(mFillColor));
      paint.setFlags(Paint.ANTI_ALIAS_FLAG);
      paint.setStyle(Paint.Style.FILL);
      setupPaint(paint, opacity, mFillColor, box);
      return true;
    }
    return false;
  }

  /**
   * Sets up paint according to the props set on a shadow view. Returns {@code true}
   * if the stroke should be drawn, {@code false} if not.
   */
  protected boolean setupStrokePaint(Paint paint, float opacity, @Nullable RectF box) {
    paint.reset();
    if (TextUtils.isEmpty(mStrokeColor)) {
      return false;
    }

    paint.setFlags(Paint.ANTI_ALIAS_FLAG);
    paint.setStyle(Paint.Style.STROKE);
    paint.setStrokeCap(mStrokeLinecap);
    paint.setStrokeJoin(mStrokeLinejoin);
    paint.setStrokeMiter(mStrokeMiterlimit * mScale);
    paint.setStrokeWidth(mStrokeWidth * mScale);
    setupPaint(paint, opacity, mStrokeColor, box);

    if (mStrokeDasharray != null && mStrokeDasharray.length > 0) {
      paint.setPathEffect(new DashPathEffect(mStrokeDasharray, mStrokeDashoffset));
    }

    return true;
  }

  // convert propertyName something like fillOpacity to fieldName like mFillOpacity
  private String propertyNameToFieldName(String fieldName) {
    Pattern pattern = Pattern.compile("^(\\w)");
    Matcher matched = pattern.matcher(fieldName);
    StringBuffer sb = new StringBuffer("m");
    while (matched.find()) {
      matched.appendReplacement(sb, matched.group(1).toUpperCase());
    }
    matched.appendTail(sb);
    return sb.toString();
  }

  private void setupPaint(Paint paint, float opacity, String colors, @Nullable RectF box) {
    if (!TextUtils.isEmpty(colors)) {
      if (!colors.startsWith("url")) {
        Integer color = SvgParser.parseColor(colors);
        if (color != null) {
          paint.setColor(color);
        }
      } else {
        if (box == null) {
          box = new RectF();
          mPath.computeBounds(box, true);
        }
        String key = colors.substring(colors.indexOf("#") + 1, colors.lastIndexOf(")"));
        SvgBrush brush = getSvgComponent().getDefinedBrush(key);
        if (brush != null) {
          brush.setupPaint(paint, box, mScale, opacity);
        }
      }
    }
  }

  private static class NumberParse {
    private ArrayList<Float> numbers;
    private int nextCmd;

    public NumberParse(ArrayList<Float> numbers, int nextCmd) {
      this.numbers = numbers;
      this.nextCmd = nextCmd;
    }

    public int getNextCmd() {
      return nextCmd;
    }

    public float getNumber(int index) {
      return numbers.get(index);
    }

  }
}
