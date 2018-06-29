/**
 * Copyright (c) 2015-present, Horcrux.
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


package com.benmu.framework.extend.components.svg.view;

import android.content.Context;
import android.graphics.Canvas;
import android.util.Log;
import android.view.View;
import android.widget.FrameLayout;

import com.benmu.framework.extend.components.svg.ISvgDrawable;

/**
 * Custom {@link View} implementation that draws an RNSVGSvg React view and its \children.
 */
public class WXSvgView extends FrameLayout {
    private ISvgDrawable mSvgDrawable;

    public WXSvgView(Context context) {
        super(context);
        setWillNotDraw(false);
//        setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Log.v("WXSvgAbsComponent", getTag().toString()
            + " onDraw Layout is (" + getLayoutParams().width + ", " + getLayoutParams().height
            + ") onDraw is (" + getWidth() + ", " + getHeight() + ")");
        //canvas.drawColor(Color.GREEN);
        if(mSvgDrawable != null) {
            mSvgDrawable.draw(canvas, null, 0);
        }
    }

    public void setSvgDrawable(ISvgDrawable drawable) {
        mSvgDrawable = drawable;
    }
}
