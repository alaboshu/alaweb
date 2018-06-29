package com.benmu.widget.view;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.widget.ScrollView;

import com.benmu.R;


/**
 * @ClassName: MaxSrollView
 * @Description: TODO(in one word)
 * @author yuemeilin
 * @date 2014-12-4 上午10:46:31
 */
public class MaxScrollView extends ScrollView {

	private int maxHeight;

	public MaxScrollView(Context context) {
		super(context);
		init(context, null);
	}

	public MaxScrollView(Context context, AttributeSet attrs) {
		super(context, attrs);
		init(context, attrs);
	}

	public MaxScrollView(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
		init(context, attrs);
	}

	/** 动态设置最大高度 */
	public void setMaxHeight(int resId) {
		maxHeight = resId;
	}

	private void init(Context context, AttributeSet attrs) {
		if (attrs != null) {
			TypedArray typedArray = context.obtainStyledAttributes(attrs,
					R.styleable.MaxScrollViewStyle);
			/** 获取自定义属性和默认值 */
			maxHeight = (int) typedArray.getDimension(
					R.styleable.MaxScrollViewStyle_maxHeight, -1);
			typedArray.recycle();
		}
	}

	@Override
	protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
		int height = MeasureSpec.getSize(heightMeasureSpec);
		if (maxHeight >= 0 && height > maxHeight) {
			height = MeasureSpec.makeMeasureSpec(maxHeight,
					MeasureSpec.getMode(heightMeasureSpec));
		}
		super.onMeasure(widthMeasureSpec, height);
	}

}
