package com.benmu.widget.view;

import android.content.Context;
import android.content.res.Resources;
import android.content.res.TypedArray;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.View;

import com.benmu.R;


/**
 * Created by aliouswang on 15/5/6.
 */
public class MaterialCircleView extends View {

    private boolean bGradient;

    private int circleColor;
    private int circleWidth;
    private int radius;

    private Paint mPaint;
    private int rotateDelta = 4;
    private int curAngle = 0;

    private int minAngle = 0;
    private int startAngle = 0;
    private int endAngle = 120;

    private int sWidth;
    private int sHeight;

    private int halfWidth;
    private int halfHeight;

    private int red = 0;
    private int green = 0;
    private int blue = 255;

    int phase = 0;


    public MaterialCircleView(Context context) {
        this(context, null);
    }

    public MaterialCircleView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public MaterialCircleView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);

        TypedArray t = null;
        try {
            t = context.obtainStyledAttributes(attrs, R.styleable.MaterialCircleView,
                    0, defStyleAttr);
            setbGradient(t.getBoolean(R.styleable.MaterialCircleView_bGradient, true));
            circleColor = t.getColor(R.styleable.MaterialCircleView_circleColor,
                    getResources().getColor(android.R.color.holo_blue_light));
            circleWidth = t.getDimensionPixelSize(R.styleable.MaterialCircleView_circleWidth,
                    10);
            radius = t.getDimensionPixelSize(R.styleable.MaterialCircleView_radius,
                    50);
        } finally {
            if (t != null) {
                t.recycle();
            }
        }

        mPaint = new Paint();
        if (isbGradient()) {
            mPaint.setColor(Color.rgb(red, green, blue));
        }else {
            mPaint.setColor(circleColor);
        }
        mPaint.setAntiAlias(true);
        setBackgroundColor(getResources().getColor(android.R.color.transparent));
    }



    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

        sWidth = this.getMeasuredWidth();
        sHeight = this.getMeasuredHeight();
        halfWidth = sWidth / 2;
        halfHeight = sHeight / 2;
    }

    private int colorDelta = 2;
    private void checkPaint() {
        if (isbGradient()) {
            switch (phase % 5) {
                case 0:
                    green += colorDelta;
                    if (green > 255) {
                        green = 255;
                        phase ++;
                    }
                    break;
                case 1:
                    red += colorDelta;
                    green -= colorDelta;
                    if (red > 255) {
                        red = 255;
                        green = 0;
                        phase ++;
                    }
                    break;
                case 2:
                    blue -= colorDelta;
                    if (blue < 0) {
                        blue = 0;
                        phase ++;
                    }
                    break;
                case 3:
                    red -= colorDelta;
                    green += colorDelta;
                    if (red < 0) {
                        red = 0;
                        green = 255;
                        phase ++;
                    }
                    break;
                case 4:
                    green -= colorDelta;
                    blue += colorDelta;
                    if (green < 0) {
                        green = 0;
                        blue = 255;
                        phase ++;
                    }
                    break;
            }


            mPaint.setColor(Color.rgb(red, green, blue));
        }
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if (startAngle == minAngle) {
            endAngle += 6;
        }
        if (endAngle >= 280 || startAngle > minAngle) {
            startAngle += 6;
            if(endAngle > 20) {
                endAngle -= 6;
            }

        }
        if (startAngle > minAngle + 280) {
            minAngle = startAngle;
            startAngle = minAngle;
            endAngle = 20;
        }

        checkPaint();
        canvas.rotate(curAngle += rotateDelta, halfWidth, halfHeight);

        Bitmap bitmap = Bitmap.createBitmap(sWidth, sHeight, Bitmap.Config.ARGB_8888);
        Canvas bmpCanvas = new Canvas(bitmap);
        bmpCanvas.drawArc(new RectF(0, 0, sWidth, sHeight), startAngle, endAngle, true, mPaint);
        Paint transparentPaint = new Paint();
        transparentPaint.setAntiAlias(true);
        transparentPaint.setColor(getResources().getColor(android.R.color.transparent));
        transparentPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.CLEAR));
        bmpCanvas.drawCircle(halfWidth, halfHeight,
                halfWidth - circleWidth, transparentPaint);
        canvas.drawBitmap(bitmap, 0, 0, new Paint());

        invalidate();
    }

    /**
     * Convert Dp to Pixel
     */
    public static int dpToPx(float dp, Resources resources){
        float px = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, resources.getDisplayMetrics());
        return (int) px;
    }

    /**
     * need gradient or not
     */
    public boolean isbGradient() {
        return bGradient;
    }

    public void setbGradient(boolean bGradient) {
        this.bGradient = bGradient;
    }
}
