package com.benmu.framework.extend.components.svg;

import android.graphics.LinearGradient;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.RadialGradient;
import android.graphics.RectF;
import android.graphics.Shader;

import java.util.ArrayList;

/**
 * Created by budao on 2017/3/28.
 */
public class SvgBrush {

  private GradientType mType = GradientType.LINEAR_GRADIENT;
  private ArrayList<String> mPoints;
  private float[] mStops;
  private int[] mStopColors;

  public SvgBrush(GradientType type, ArrayList<String> points, float[] colors) {
    mType = type;
    mPoints = points;
    mStops = colors;
  }

  public SvgBrush(GradientType type, ArrayList<String> points, float[] stops, int[] stopColors) {
    mType = type;
    mPoints = points;
    mStops = stops;
    mStopColors = stopColors;
  }

  public enum GradientType {
    LINEAR_GRADIENT(0),
    RADIAL_GRADIENT(1);

    GradientType(int ni) {
      nativeInt = ni;
    }

    final int nativeInt;
  }

  public void setupPaint(Paint paint, RectF box, float scale, float opacity) {
    float height = box.height();
    float width = box.width();
    float midX = box.centerX();
    float midY = box.centerY();
    float offsetX = (midX - width / 2);
    float offsetY = (midY - height / 2);

    int[] stopsColors = mStopColors;
    float[] stops = mStops;
    //parseGradientStops(mColors, stopsCount, stops, stopsColors, opacity);

    if (mType == GradientType.LINEAR_GRADIENT) {
      float x1 = ParserHelper.fromPercentageToFloat(mPoints.get(0), width, offsetX, scale);
      float y1 = ParserHelper.fromPercentageToFloat(mPoints.get(1), height, offsetY, scale);
      float x2 = ParserHelper.fromPercentageToFloat(mPoints.get(2), width, offsetX, scale);
      float y2 = ParserHelper.fromPercentageToFloat(mPoints.get(3), height, offsetY, scale);
      paint.setShader(
          new LinearGradient(
              x1,
              y1,
              x2,
              y2,
              stopsColors,
              stops,
              Shader.TileMode.CLAMP));
    } else {
      float rx = ParserHelper.fromPercentageToFloat(mPoints.get(2), width, 0f, scale);
      float ry = ParserHelper.fromPercentageToFloat(mPoints.get(3), height, 0f, scale);

      float cx = ParserHelper.fromPercentageToFloat(mPoints.get(4), width, offsetX, scale);
      float cy = ParserHelper.fromPercentageToFloat(mPoints.get(5), height, offsetY, scale) / (ry / rx);
      // TODO: support focus point.
      float fx = ParserHelper.fromPercentageToFloat(mPoints.get(0), width, offsetX, scale);
      float fy = ParserHelper.fromPercentageToFloat(mPoints.get(1), height, offsetY, scale) / (ry / rx);
      Shader radialGradient = new RadialGradient(
          cx,
          cy,
          rx,
          stopsColors,
          stops,
          Shader.TileMode.CLAMP
      );

      Matrix radialMatrix = new Matrix();
      radialMatrix.preScale(1f, ry / rx);
      radialGradient.setLocalMatrix(radialMatrix);
      paint.setShader(radialGradient);
    }
  }
}
