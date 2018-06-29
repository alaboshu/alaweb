package com.benmu.framework.activity;


import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.benmu.framework.R;
import com.benmu.framework.model.BroeserImgModuleBean;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.taobao.weex.WXEnvironment;

import uk.co.senab.photoview.PhotoView;

import java.util.List;


/**
 * 预览大图的默认实现
 */

public class BrowseImgActivity extends Activity implements ViewPager.OnPageChangeListener {


    private ViewGroup mOvalViewGroup;
    private ViewPager mViewPager;
    private ViewPagerAdapter mViewPagerAdapter;
    public static final String BROWSE_IMG_BEAN = "browse_img_bean";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_browse);
        initData();
    }

    //数据初始化
    private void initData() {
        BroeserImgModuleBean imgModuleBean = (BroeserImgModuleBean) getIntent()
                .getSerializableExtra(BROWSE_IMG_BEAN);
        if (imgModuleBean == null || imgModuleBean.getImages() == null || imgModuleBean.getImages
                ().size() < 1)
            return;
        initView(imgModuleBean);

    }

    //View初始化
    private void initView(BroeserImgModuleBean imgModuleBean) {
        mViewPager = (ViewPager) findViewById(R.id.viewpager_browse_img);
        mOvalViewGroup = (ViewGroup) findViewById(R.id.rl_browse_prompt_oval);
        mViewPagerAdapter = new ViewPagerAdapter(imgModuleBean.getImages());
        mViewPager.setAdapter(mViewPagerAdapter);
        mViewPager.setCurrentItem(imgModuleBean.getIndex());
        mViewPager.setOnPageChangeListener(this);
        initOval(imgModuleBean.getImages().size(), imgModuleBean.getIndex());
    }

    //添加ViewPager追踪点
    private void initOval(int size, int index) {

        for (int i = 0; i < size; i++) {
            ImageView mOvalView = new ImageView(this);
            if (i == index) {
                mOvalView.setImageResource(R.drawable.browse_shape_on);
            } else {
                mOvalView.setImageResource(R.drawable.browse_shape_off);
            }
            mOvalViewGroup.addView(mOvalView);
        }
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

    }

    @Override
    public void onPageSelected(int position) {
        changeIndicator(position);
    }

    @Override
    public void onPageScrollStateChanged(int state) {

    }

    class ViewPagerAdapter extends PagerAdapter {

        List<String> images;

        public ViewPagerAdapter(List<String> images) {
            this.images = images;
        }


        @Override
        public int getCount() {
            return images.size();
        }


        @Override
        public boolean isViewFromObject(View view, Object obj) {
            return view == obj;
        }


        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            Glide.with(WXEnvironment.getApplication()).clear((View) object);
            container.removeView((View) object);
        }

        @Override
        public Object instantiateItem(ViewGroup container, int position) {

            PhotoView imageView = new PhotoView(container.getContext());
            imageView.setScaleType(ImageView.ScaleType.CENTER);
            imageView.setBackgroundColor(Color.WHITE);
            imageView.setZoomable(true);
            Glide.with(BrowseImgActivity.this)
                    .load(images.get(position))
                    .apply(new RequestOptions()
                            .diskCacheStrategy(DiskCacheStrategy.ALL)
                            .fitCenter())
                    .into(imageView);
            container.addView(imageView, LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout
                    .LayoutParams.MATCH_PARENT);
            return imageView;
        }
    }

    //重置追踪点颜色
    private void changeIndicator(int position) {
        for (int i = 0; i < mOvalViewGroup.getChildCount(); i++) {
            ImageView iv = (ImageView) mOvalViewGroup.getChildAt(i);
            if (position == i) {
                iv.setImageResource(R.drawable.browse_shape_on);
            } else {
                iv.setImageResource(R.drawable.browse_shape_off);
            }
        }
    }
}
