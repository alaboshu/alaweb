package com.benmu.framework.extend.components.svg;

import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.Log;

import java.util.ArrayList;

/**
 * Created by budao on 2017/3/1.
 */

public class SvgParser {

  private static final String TAG = "SvgParser";

  public static ArrayList<PathCmd> parserPath(String s) {
    ArrayList<PathCmd> pathCmds = new ArrayList<>();
    int n = s.length();
    ParserHelper ph = new ParserHelper(s, 0);
    ph.skipWhitespace();
    char prevCmd = 0;
    while (ph.pos < n) {
      char cmd = s.charAt(ph.pos);
      switch (cmd) {
        case '-':
        case '+':
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
          if (prevCmd == 'm' || prevCmd == 'M') {
            cmd = (char) ((prevCmd) - 1);
            break;
          } else if (("lhvcsqta").indexOf(Character.toLowerCase(prevCmd)) >= 0) {
            cmd = prevCmd;
            break;
          }
        default: {
          ph.advance();
          prevCmd = cmd;
        }
      }

      switch (cmd) {
        case 'M':
          pathCmds.add(new PathCmd("M", new float[]{ph.nextFloat(), ph.nextFloat()}));
          break;
        case 'm':
          pathCmds.add(new PathCmd("m", new float[]{ph.nextFloat(), ph.nextFloat()}));
          break;
        case 'Z':
          pathCmds.add(new PathCmd("Z", null));
          break;
        case 'z':
          pathCmds.add(new PathCmd("z", null));
          break;
        case 'T':
        case 't':
          // todo - smooth quadratic Bezier (two parameters)
        case 'L':
          pathCmds.add(new PathCmd("L", new float[]{ph.nextFloat(), ph.nextFloat()}));
          break;
        case 'l':
          pathCmds.add(new PathCmd("l", new float[]{ph.nextFloat(), ph.nextFloat()}));
          break;
        case 'H':
          pathCmds.add(new PathCmd("H", new float[]{ph.nextFloat()}));
          break;
        case 'h':
          pathCmds.add(new PathCmd("h", new float[]{ph.nextFloat()}));
          break;
        case 'V':
          pathCmds.add(new PathCmd("V", new float[]{ph.nextFloat()}));
          break;
        case 'v':
          pathCmds.add(new PathCmd("v", new float[]{ph.nextFloat()}));
          break;
        case 'C':
          pathCmds.add(new PathCmd("C", new float[]{
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat()
          }));
          break;
        case 'c':
          pathCmds.add(new PathCmd("c", new float[]{
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat()
          }));
          break;
        case 'Q':
        case 'q':
          // todo - quadratic Bezier (four parameters)
        case 'S':
          pathCmds.add(new PathCmd("S", new float[]{
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat()
          }));
          break;
        case 's':
          pathCmds.add(new PathCmd("s", new float[]{
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat()
          }));
          break;
        case 'A':
          pathCmds.add(new PathCmd("A", new float[]{
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFlag(),
              ph.nextFlag(),
              ph.nextFloat(),
              ph.nextFloat()
          }));
          break;
        case 'a':
          pathCmds.add(new PathCmd("a", new float[]{
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFloat(),
              ph.nextFlag(),
              ph.nextFlag(),
              ph.nextFloat(),
              ph.nextFloat()
          }));
          break;
        default:
          Log.w(TAG, "Invalid path command: " + cmd);
          ph.advance();
      }
      ph.skipWhitespace();
    }
    return pathCmds;
  }

  public static ArrayList<PathCmd> parsePoints(String s) {
    ArrayList<PathCmd> pathCmds = new ArrayList<>();
    int n = s.length();
    ParserHelper ph = new ParserHelper(s, 0);
    ph.skipWhitespace();
    pathCmds.add(new PathCmd("M", new float[]{ph.nextFloat(), ph.nextFloat()}));
    while (ph.pos < n) {
      pathCmds.add(new PathCmd("L", new float[]{ph.nextFloat(), ph.nextFloat()}));
    }
    pathCmds.add(new PathCmd("Z", null));
    return pathCmds;
  }

  public static ArrayList<PathCmd> parsePolyLine(String s) {
    ArrayList<PathCmd> pathCmds = new ArrayList<>();
    int n = s.length();
    ParserHelper ph = new ParserHelper(s, 0);
    ph.skipWhitespace();
    pathCmds.add(new PathCmd("M", new float[]{ph.nextFloat(), ph.nextFloat()}));
    while (ph.pos < n) {
      pathCmds.add(new PathCmd("L", new float[]{ph.nextFloat(), ph.nextFloat()}));
    }
    return pathCmds;
  }

  public static class PathCmd {
    public String mCmd;
    public float[] mValue;

    public PathCmd(String cmd, float[] value) {
      mCmd = cmd;
      mValue = value;
    }

    @Override
    public String toString() {
      String desp = mCmd;
      if (mValue != null && mValue.length > 0) {
        for (float value : mValue) {
          desp += ", " + String.valueOf(value);
        }
      }

      return desp;
    }
  }

  public static Integer parseColor(String name) {
    String v = name;
    if (v == null) {
      return null;
    } else if (v.startsWith("#")) {
      try { // #RRGGBB or #AARRGGBB
        return Color.parseColor(v);
      } catch (IllegalArgumentException iae) {
        return null;
      }
    } else if (v.startsWith("rgb(") && v.endsWith(")")) {
      String values[] = v.substring(4, v.length() - 1).split(",");
      try {
        return rgb(parseNum(values[0]), parseNum(values[1]), parseNum(values[2]));
      } catch (NumberFormatException nfe) {
        return null;
      } catch (ArrayIndexOutOfBoundsException e) {
        return null;
      }
    } else {
      return SvgColors.mapColour(v);
    }
  }

  private static int parseNum(String v) throws NumberFormatException {
    if (v.endsWith("%")) {
      v = v.substring(0, v.length() - 1);
      return Math.round(Float.parseFloat(v) / 100 * 255);
    }
    return Integer.parseInt(v);
  }

  private static Integer rgb(int r, int g, int b) {
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
  }

  private static final RectF arcRectf = new RectF();
  private static final Matrix arcMatrix = new Matrix();
  private static final Matrix arcMatrix2 = new Matrix();

  public static void drawArc(Path p, float lastX, float lastY, float x, float y, float rx, float
      ry, float theta, int largeArc, int sweepArc) {
    Log.d("drawArc", "from (" + lastX + "," + lastY + ") to (" + x + "," + y + ") r=(" + rx + "," + ry +
        ") theta=" + theta + " flags=" + largeArc + "," + sweepArc);

    // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes

    if (rx == 0 || ry == 0) {
      p.lineTo(x, y);
      return;
    }

    if (x == lastX && y == lastY) {
      return; // nothing to draw
    }

    rx = Math.abs(rx);
    ry = Math.abs(ry);

    final float thrad = theta * (float) Math.PI / 180;
    final float st = (float) Math.sin(thrad);
    final float ct = (float) Math.cos(thrad);

    final float xc = (lastX - x) / 2;
    final float yc = (lastY - y) / 2;
    final float x1t = ct * xc + st * yc;
    final float y1t = -st * xc + ct * yc;

    final float x1ts = x1t * x1t;
    final float y1ts = y1t * y1t;
    float rxs = rx * rx;
    float rys = ry * ry;

    float lambda = (x1ts / rxs + y1ts / rys) * 1.001f; // add 0.1% to be sure that no out of range occurs due to
    // limited precision
    if (lambda > 1) {
      float lambdasr = (float) Math.sqrt(lambda);
      rx *= lambdasr;
      ry *= lambdasr;
      rxs = rx * rx;
      rys = ry * ry;
    }

    final float R =
        (float) Math.sqrt((rxs * rys - rxs * y1ts - rys * x1ts) / (rxs * y1ts + rys * x1ts))
            * ((largeArc == sweepArc) ? -1 : 1);
    final float cxt = R * rx * y1t / ry;
    final float cyt = -R * ry * x1t / rx;
    final float cx = ct * cxt - st * cyt + (lastX + x) / 2;
    final float cy = st * cxt + ct * cyt + (lastY + y) / 2;

    final float th1 = angle(1, 0, (x1t - cxt) / rx, (y1t - cyt) / ry);
    float dth = angle((x1t - cxt) / rx, (y1t - cyt) / ry, (-x1t - cxt) / rx, (-y1t - cyt) / ry);

    if (sweepArc == 0 && dth > 0) {
      dth -= 360;
    } else if (sweepArc != 0 && dth < 0) {
      dth += 360;
    }

    // draw
    if ((theta % 360) == 0) {
      // no rotate and translate need
      arcRectf.set(cx - rx, cy - ry, cx + rx, cy + ry);
      p.arcTo(arcRectf, th1, dth);
    } else {
      // this is the hard and slow part :-)
      arcRectf.set(-rx, -ry, rx, ry);

      arcMatrix.reset();
      arcMatrix.postRotate(theta);
      arcMatrix.postTranslate(cx, cy);
      arcMatrix.invert(arcMatrix2);

      p.transform(arcMatrix2);
      p.arcTo(arcRectf, th1, dth);
      p.transform(arcMatrix);
    }
  }

  private static float angle(float x1, float y1, float x2, float y2) {
    return (float) Math.toDegrees(Math.atan2(x1, y1) - Math.atan2(x2, y2)) % 360;
  }
}
