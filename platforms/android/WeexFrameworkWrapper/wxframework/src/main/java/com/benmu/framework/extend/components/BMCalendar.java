package com.benmu.framework.extend.components;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import com.benmu.framework.utils.DateFormatUtil;
import com.benmu.framework.utils.TextUtil;
import com.benmu.widget.utils.ColorUtils;
import com.benmu.widget.view.calendar.CalendarDay;
import com.benmu.widget.view.calendar.MaterialCalendarView;
import com.benmu.widget.view.calendar.OnDateSelectedListener;
import com.benmu.widget.view.calendar.OnRangeSelectedListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Created by Carry on 2017/9/1.
 */

public class BMCalendar extends WXComponent implements OnRangeSelectedListener,
        OnDateSelectedListener {
    private static String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    private String mDateFormat = DEFAULT_DATE_FORMAT;
    private MaterialCalendarView materialCalendarView;
    private String mSeclectType = DEFAULT_SEALED_TYPE;
    private static String DEFAULT_SEALED_TYPE = "single";
    private String mStartDate;
    private String mEndDate;
    private boolean mShow;
    private MaterialCalendarView.StateBuilder mBuilder;
    private String mMinDate;
    private String mMaxDate;
    private static final String TYPE_SINGLE = "single";
    private static final String TYPE_MULTI = "multi";
    private static final String TYPE_RANGE = "range";

    public BMCalendar(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
    }

    public BMCalendar(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, int type) {
        super(instance, dom, parent, type);
    }


    @Override
    protected View initComponentHostView(@NonNull Context context) {
        materialCalendarView = new MaterialCalendarView(context);
        init(materialCalendarView);
        return materialCalendarView;
    }

    private void init(MaterialCalendarView materialCalendarView) {
        materialCalendarView.setPastButtonTextColor(Color.parseColor("#000000"));
        materialCalendarView.setFutureButtonTextColor(Color.parseColor("#000000"));
        materialCalendarView.setTitleTextColor(Color.parseColor("#000000"));
        materialCalendarView.setSelectionColor(ColorUtils.getColor("#aa07ae9c"));
        materialCalendarView.setTitleAnimationOrientation(MaterialCalendarView.HORIZONTAL);
        materialCalendarView.setOnDateChangedListener(this);
        mBuilder = materialCalendarView.newState();
    }

    @WXComponentProp(name = "dataFormat")
    public void setDateFormat(String dateFormat) {
        if (TextUtils.isEmpty(dateFormat)) {
            mDateFormat = DEFAULT_DATE_FORMAT;
        } else {
            mDateFormat = dateFormat;
        }
    }

    @WXComponentProp(name = "minimumDate")
    public void setMinDate(String minDate) {
        if (TextUtils.isEmpty(minDate)) return;
        this.mMinDate = minDate;
        if (mBuilder != null) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(getDate(mMinDate));
            mBuilder.setMinimumDate(calendar);
            if (!TextUtils.isEmpty(mMaxDate)) {
                Calendar maxCalendar = Calendar.getInstance();
                maxCalendar.setTime(getDate(mMaxDate));
                mBuilder.setMaximumDate(maxCalendar);
                mBuilder.commit();

            }
        }
    }

    private Date getDate(String timeString) {
        try {
            return new SimpleDateFormat(mDateFormat, Locale.ENGLISH).parse(timeString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new Date();
    }

    @WXComponentProp(name = "maximumDate")
    public void setMaxDate(String maxDate) {
        if (TextUtils.isEmpty(maxDate)) return;
        this.mMaxDate = maxDate;
        if (mBuilder != null) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(getDate(mMaxDate));
            mBuilder.setMaximumDate(calendar);
            if (!TextUtils.isEmpty(mMinDate)) {
                Calendar minCalendar = Calendar.getInstance();
                minCalendar.setTime(getDate(mMinDate));
                mBuilder.setMinimumDate(minCalendar);
                mBuilder.commit();
            }
        }
    }

    @WXComponentProp(name = "selectType")
    public void setSeclectType(String selectType) {
        if (TextUtils.isEmpty(selectType)) {
            mSeclectType = DEFAULT_SEALED_TYPE;
        } else {
            mSeclectType = selectType;
        }
        if (materialCalendarView != null) {
            materialCalendarView.setSelectionMode(getSelectMode());
        }
    }

    private int getSelectMode() {
        switch (mSeclectType) {
            case TYPE_RANGE:
                materialCalendarView.setOnDateChangedListener(null);
                materialCalendarView.setOnRangeSelectedListener(this);
                return MaterialCalendarView.SELECTION_MODE_RANGE;
            case TYPE_SINGLE:
                materialCalendarView.setOnRangeSelectedListener(null);
                materialCalendarView.setOnDateChangedListener(this);
                return MaterialCalendarView.SELECTION_MODE_SINGLE;
            default:
                return MaterialCalendarView.SELECTION_MODE_MULTIPLE;
        }
    }

    @WXComponentProp(name = "startDate")
    public void setStartDate(String startDate) {
        this.mStartDate = startDate;
        if (!TextUtils.isEmpty(this.mStartDate)) {
            materialCalendarView.setStartDate(DateFormatUtil.strToDate(startDate));
        }
    }

    @WXComponentProp(name = "endDate")
    public void setEndDate(String endDate) {
        this.mEndDate = endDate;
        if ("range".equals(mSeclectType) && !TextUtils.isEmpty(endDate)) {
            materialCalendarView.setEndDate(DateFormatUtil.strToDate(endDate));
        }
    }


    @WXComponentProp(name = "showPlaceholder")
    public void showPlaceHolder(boolean show) {
        this.mShow = show;
    }


    @Override
    protected boolean setProperty(String key, Object param) {
        switch (key) {
            case "monthColor":
                //月份颜色
                String monthColor = WXUtils.getString(param, null);
                setMonthColor(monthColor);
                return true;
            case "weekColor":
                //周几颜色
                String weekColor = WXUtils.getString(param, null);
                setWeekColor(weekColor);
                return true;

            case "weekBgColor":
                //星期背景颜色
                String weekBgColor = WXUtils.getString(param, null);
                setWeekBackground(weekBgColor);
                return true;

            case "weekdayColor":
                String weekdayColor = WXUtils.getString(param, null);
                materialCalendarView.setWeekdayTextColor(weekdayColor);
                return true;
            case "weekendColor":
                String weekendColor = WXUtils.getString(param, null);
                materialCalendarView.setWeekendTextColor(weekendColor);
                return true;
            case "selectColor":
                String selectColor = WXUtils.getString(param, null);
                setSelectColor(selectColor);
                return true;

        }
        return super.setProperty(key, param);
    }

    private void setSelectColor(String selectColor) {
        String c = "#07ae9c";
        if (!TextUtils.isEmpty(selectColor)) {
            c = selectColor;
        }
        materialCalendarView.setCheckColor(c);
    }

    @Override
    protected Object convertEmptyProperty(String propName, Object originalValue) {
        switch (propName) {
            case "weekdayColor":
            case "weekendColor":
                materialCalendarView.setWeekdayTextColor("#000000");
                return "#000000";
            case "selectColor":
                break;

        }
        return super.convertEmptyProperty(propName, originalValue);
    }

    private void setWeekBackground(String weekBgColor) {
        if (TextUtils.isEmpty(weekBgColor)) return;
        materialCalendarView.setWeekViewBackground(ColorUtils.getColor(weekBgColor));
    }

    private void setMonthColor(String monthColor) {
        Log.e("monthColor", "monthColor>>" + monthColor);
        if (TextUtils.isEmpty(monthColor)) return;
        materialCalendarView.setTitleTextColor(ColorUtils.getColor(monthColor));

    }

    private void setWeekColor(String weekColor) {
        if (TextUtils.isEmpty(weekColor)) return;
        materialCalendarView.setWeekViewColor(ColorUtils.getColor(weekColor));
    }

    @JSMethod
    public void goPrve() {
        if (materialCalendarView != null) {
            materialCalendarView.goPrve();
        }
    }

    @JSMethod
    public void goNext() {
        if (materialCalendarView != null) {
            materialCalendarView.goNext();
        }
    }

    private void fireSelectFinish(Map<String, String> params) {
        fireEvent("finish", params);
    }

    @Override
    public void onRangeSelected(@NonNull MaterialCalendarView widget, @NonNull List<CalendarDay>
            dates) {
        if (TYPE_RANGE.equals(mSeclectType)) {
            CalendarDay first = dates.get(0);
            CalendarDay last = dates.get(dates.size() - 1);
            Map<String, String> params = new HashMap<>();
            params.put("startDate", DateFormatUtil.dateToStr(first.getDate(), mDateFormat));
            params.put("endDate", DateFormatUtil.dateToStr(last.getDate(), mDateFormat));
            fireSelectFinish(params);
        }
    }

    @Override
    public void onDateSelected(@NonNull MaterialCalendarView widget, @NonNull CalendarDay date,
                               boolean selected) {

        if (TYPE_SINGLE.equals(mSeclectType)) {
            Map<String, String> params = new HashMap<>();
            params.put("startDate", DateFormatUtil.dateToStr(date.getDate(), mDateFormat));
            params.put("endDate", DateFormatUtil.dateToStr(date.getDate(), mDateFormat));
            fireSelectFinish(params);
        }
    }
}
