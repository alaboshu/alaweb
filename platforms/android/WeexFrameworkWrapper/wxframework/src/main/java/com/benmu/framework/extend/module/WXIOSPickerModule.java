package com.benmu.framework.extend.module;

import android.graphics.Color;
import android.view.View;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.util.TypeUtils;
import com.bigkoo.pickerview.OptionsPickerView;
import com.bigkoo.pickerview.TimePickerView;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Created by lfg on 2017/11/29.
 */

public class WXIOSPickerModule extends WXModule {
    private static final String KEY_VALUE = "value";
    private static final String KEY_INDEX = "index";
    private static final String KEY_TITLE = "title";
    private static final String KEY_MAX = "max";
    private static final String KEY_MIN = "min";
    private static final String KEY_ITEMS = "items";
    private static final String SUCCESS = "success";
    private static final String CANCEL = "cancel";
    private static final String DAY = "0";
    private static final String MONTH = "1";

    private static final String RESULT = "result";
    private static final String DATA = "data";
    private static final String KEY_TITLE_COLOR = "titleColor";
    private static final String KEY_CANCEL_TITLE_COLOR = "cancelTitleColor";
    private static final String KEY_CONFIRM_TITLE = "confirmTitle";
    private static final String KEY_CANCEL_TITLE = "cancelTitle";
    private static final String KEY_CONFIRM_TITLE_COLOR = "confirmTitleColor";
    private static final String KEY_TITLE_BACKGROUND_COLOR = "titleBackgroundColor";
    private static final String KEY_TEXT_COLOR = "textColor";
    private static final String KEY_SELECTION_COLOR = "selectionColor";
    private final ArrayList<String> items1 = new ArrayList<>();
    private final ArrayList<ArrayList<String>> items2 = new ArrayList<>();
    private final ArrayList<ArrayList<ArrayList<String>>> items3 = new ArrayList<>();
    private boolean isLink = false;
    private ArrayList<Integer> value = new ArrayList<>();
    @JSMethod
    public void pick(Map<String, Object> options, JSCallback callback) {
        this.items1.clear();
        this.items2.clear();
        this.items3.clear();
        if (!getData(options, KEY_ITEMS)) {
            if (callback != null) {
                Map<String, Object> ret = new HashMap<>(2);
                ret.put(RESULT, "error");
                callback.invoke(ret);
            }
            return;
        }
        try {
            iosLinkPicker(options, callback);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
    @JSMethod
    public void pickDate(Map<String, Object> options, JSCallback callback) {
        iosPickDate(options, callback);
    }

    @JSMethod
    public void pickTime(Map<String, Object> options, JSCallback callback) {
        iosPickDate(options, callback);
    }
    private  void iosLinkPicker(final Map<String, Object> options, final JSCallback callback) {
        for (int i = 0; i < 3 - this.value.size(); i++) {
            this.value.add(0);
            i--;
        }
        if (this.isLink) {
            if (this.value.get(0) < 0 || this.value.get(0) > this.items1.size()) this.value.set(0, 0);
            if (this.value.get(1) < 0 || this.value.get(1) > this.items2.get(this.value.get(0)).size()) this.value.set(1, 0);
            if (this.items3.size() == 0 || this.value.get(2) < 0 || this.value.get(2) > this.items3.get(this.value.get(0)).get(this.value.get(1)).size()) this.value.set(2, 0);
        } else {
            if (this.items2.size() == 0 && (this.value.get(0) < 0 || this.value.get(0) > this.items1.size())) this.value.set(0, 0);
            if (this.items2.size() > 0) {
                if (this.value.get(0) < 0 || this.value.get(0) > this.items2.get(0).size()) this.value.set(0,0);
                for (int i = 0; i < this.items2.size(); i++) {
                    if (this.value.get(i) < 0 || this.value.get(i) > this.items2.get(i).size())
                        this.value.set(i, 0);
                }
            }
        }
        OptionsPickerView pvOptions = new OptionsPickerView.Builder(mWXSDKInstance.getContext(), new OptionsPickerView.OnOptionsSelectListener() {
            @Override
            public void onOptionsSelect(int options1, int options2, int options3, View v) {
                items1.clear();
                items2.clear();
                items3.clear();
                if (callback != null) {
                    Map<String, Object> ret = new HashMap<>(2);
                    ArrayList<Object> arr = new ArrayList<>();
                    arr.add(options1);
                    arr.add(options2);
                    arr.add(options3);

                    ret.put(RESULT, SUCCESS);
                    ret.put(DATA, arr);
                    callback.invoke(ret);
                }
            }
        })
                .setCancelText(options.containsKey(KEY_CANCEL_TITLE) ? options.get(KEY_CANCEL_TITLE).toString(): "取消")
                .setSubmitText(options.containsKey(KEY_CONFIRM_TITLE) ? options.get(KEY_CONFIRM_TITLE).toString(): "确定")
                .setCancelColor(WXResourceUtils.getColor(options.containsKey(KEY_CANCEL_TITLE_COLOR) ? options.get(KEY_CANCEL_TITLE_COLOR).toString(): "#309bf8"))
                .setSubmitColor(WXResourceUtils.getColor(options.containsKey(KEY_CONFIRM_TITLE_COLOR) ? options.get(KEY_CONFIRM_TITLE_COLOR).toString(): "#309bf8"))
                .setTitleText(options.containsKey(KEY_TITLE) ? options.get(KEY_TITLE).toString(): "")
                .setTitleColor(WXResourceUtils.getColor(options.containsKey(KEY_TITLE_COLOR) ? options.get(KEY_TITLE_COLOR).toString(): "#555555"))
                .setSelectOptions(this.value.get(0),this.value.get(1),this.value.get(2))
                .build();
        if (this.items2.size() > 0 && this.items1.size() == 0) {

            pvOptions.setNPicker(items2.get(0), items2.size() > 1 ? items2.get(1) : null, items2.size() > 2 ? items2.get(2) : null);
        }
        else if (this.items3.size() > 0) pvOptions.setPicker(this.items1,this.items2,this.items3);
        else if (this.items2.size() > 0) pvOptions.setPicker(this.items1,this.items2);
        else if (this.items1.size() > 0) pvOptions.setPicker(this.items1);
        else {
            if (callback != null) {
                Map<String, Object> ret = new HashMap<>(2);
                ret.put(RESULT, "error");
                callback.invoke(ret);
            }
            return;
        }
        pvOptions.show();
    }
    private  void iosPicker(List<String> items, final Map<String, Object> options, final JSCallback callback) {
        OptionsPickerView pickerView = new OptionsPickerView.Builder(mWXSDKInstance.getContext(), new OptionsPickerView.OnOptionsSelectListener() {
            @Override
            public void onOptionsSelect(int options1, int options2, int options3, View v) {
                if (callback != null) {
                    Map<String, Object> ret = new HashMap<>(2);
                    ret.put(RESULT, SUCCESS);
                    ret.put(DATA, options1);
                    callback.invoke(ret);
                }
            }
        })
        .setCancelText(options.containsKey(KEY_CANCEL_TITLE) ? options.get(KEY_CANCEL_TITLE).toString(): "取消")
        .setSubmitText(options.containsKey(KEY_CONFIRM_TITLE) ? options.get(KEY_CONFIRM_TITLE).toString(): "确定")
        .setCancelColor(WXResourceUtils.getColor(options.containsKey(KEY_CANCEL_TITLE_COLOR) ? options.get(KEY_CANCEL_TITLE_COLOR).toString(): "#309bf8"))
        .setSubmitColor(WXResourceUtils.getColor(options.containsKey(KEY_CONFIRM_TITLE_COLOR) ? options.get(KEY_CONFIRM_TITLE_COLOR).toString(): "#309bf8"))
        .setTitleText(options.containsKey(KEY_TITLE) ? options.get(KEY_TITLE).toString(): "")
        .setTitleColor(WXResourceUtils.getColor(options.containsKey(KEY_TITLE_COLOR) ? options.get(KEY_TITLE_COLOR).toString(): "#555555"))
        .build();
        pickerView.setPicker(items);
        pickerView.show();
    }
    private void iosPickDate(Map<String, Object> options, final JSCallback callback) {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        String value = getOption(options, KEY_VALUE, "");
        Date max = new Date();
        Date min = new Date();
        try {
            max = formatter.parse(getOption(options, KEY_MAX, ""));
            min = formatter.parse(getOption(options, KEY_MIN, ""));
        } catch (ParseException e) {
            WXLogUtils.w("[iosPickDate] " + e.toString());
        }
        final String type = options.containsKey("type") ? options.get("type").toString() : DAY;

        //控制时间范围(如果不设置范围，则使用默认时间1900-2100年，此段代码可注释)
        //因为系统Calendar的月份是从0-11的,所以如果是调用Calendar的set方法来设置时间,月份的范围也要是从0-11
        Calendar selectedDate = Calendar.getInstance();
        Calendar startDate = Calendar.getInstance();
        startDate.set(min.getYear()+1900, min.getMonth(), min.getDate());
        Calendar endDate = Calendar.getInstance();
        endDate.set(max.getYear()+1900, max.getMonth(), max.getDate());
        //时间选择器
        TimePickerView pvTime = new TimePickerView.Builder(mWXSDKInstance.getContext(), new TimePickerView.OnTimeSelectListener() {
            @Override
            public void onTimeSelect(Date date, View v) {//选中事件回调
                if (callback != null) {
                    Map<String, Object> ret = new HashMap<>(2);
                    ret.put(RESULT, SUCCESS);
                    ret.put(DATA, date);
                    callback.invoke(ret);
                }
            }
        })
                //年月日时分秒 的显示与否，不设置则默认全部显示
                .setType(new boolean[]{true, type.equals(DAY) || type.equals(MONTH), type.equals(DAY), false, false, false})
                .setLabel("", "", "", "", "", "")
                .isCenterLabel(false)
                .setDividerColor(Color.DKGRAY)
                .setContentSize(21)
                .setDate(selectedDate)
                .setRangDate(startDate, endDate)
                // .setBackgroundId(0x00FFFFFF) //设置外部遮罩颜色
                .setDecorView(null)
                // .setLabel("年","月","日","","","")
                .isCyclic(true)
                .setCancelText(options.containsKey(KEY_CANCEL_TITLE) ? options.get(KEY_CANCEL_TITLE).toString(): "取消")
                .setSubmitText(options.containsKey(KEY_CONFIRM_TITLE) ? options.get(KEY_CONFIRM_TITLE).toString(): "确定")
                .setCancelColor(WXResourceUtils.getColor(options.containsKey(KEY_CANCEL_TITLE_COLOR) ? options.get(KEY_CANCEL_TITLE_COLOR).toString(): "#309bf8"))
                .setSubmitColor(WXResourceUtils.getColor(options.containsKey(KEY_CONFIRM_TITLE_COLOR) ? options.get(KEY_CONFIRM_TITLE_COLOR).toString(): "#309bf8"))
                .setTitleText(options.containsKey(KEY_TITLE) ? options.get(KEY_TITLE).toString(): "")
                .setTitleColor(WXResourceUtils.getColor(options.containsKey(KEY_TITLE_COLOR) ? options.get(KEY_TITLE_COLOR).toString(): "#555555"))
                .build();
        pvTime.show();
    }
    private String getTime(Date date, String pattern) {//可根据需要自行截取数据显示
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        return format.format(date);
    }

    private List<String> safeConvert(List src) {
        List<String> result = new ArrayList<>(src.size());
        for (Object obj : src) {
            result.add(String.valueOf(obj));
        }
        return result;
    }
    private <T> T getOption(Map<String, Object> options, String key, T defValue) {
        Object value = options.get(key);
        if (value == null) {
            return defValue;
        } else {
            try {
                return (T) value;
            } catch (Exception e) {
                e.printStackTrace();
                return defValue;
            }
        }
    }
    private boolean getUnlinkData(Object val) {
        if (val instanceof JSONArray) {
            for (int i = 0; i < ((JSONArray) val).size(); i++) {
                if (((JSONArray) val).get(i) instanceof JSONArray && ((JSONArray) ((JSONArray) val).get(i)).size() > 1) {
                    this.items2.add(getArray((JSONArray)((JSONArray) val).get(i), String.class));
                    continue;
                } else if (((JSONArray) val).get(i) instanceof String){
                    this.items1.add((String) ((JSONArray) val).get(i));
                    continue;
                }
                this.items2.clear();
                this.items1.clear();
                return false;
            }
        }
        if (!(this.items1.size() == ((JSONArray) val).size() || this.items2.size() == ((JSONArray) val).size())) {
            this.items2.clear();
            this.items1.clear();
        }
        return true;
    }
    private boolean getData(Map<String, Object> options, String key) {
        Object items = options.get(key);
        if (options.get("isLink") instanceof Boolean) {
            this.isLink = (Boolean) options.get("isLink");
        }
        Object value = options.get("value");
        if (value instanceof JSONArray) {
             this.value = getArray((JSONArray) value, Integer.class);
        }
        if (items instanceof JSONArray) {
            if (this.isLink) {
                if (!(((JSONArray) items).size() > 1 && ((JSONArray) items).get(0) instanceof JSONArray
                        && ((JSONArray) items).get(1) instanceof JSONArray)) {
                    return false;
                }
                JSONArray option1 = (JSONArray) ((JSONArray) items).get(0);
                JSONArray option2 = (JSONArray) ((JSONArray) items).get(1);

                if (option1.size() != option2.size()) return false; // 数据格式错误
                for (int i = 0;i< option1.size();i ++) {
                    this.items1.add(option1.get(i).toString());
                    if (!(option2.get(i) instanceof JSONArray)) return false;
                    this.items2.add(getArray((JSONArray) option2.get(i), String.class));
                }
                if (((JSONArray) items).size() > 2) {
                    if (!(((JSONArray) items).get(2) instanceof JSONArray)) return false;
                    JSONArray option3 = (JSONArray) ((JSONArray) items).get(2);
                    if (option3.size() != option1.size()) return false;
                    for (int i = 0; i < option1.size(); i ++) {
                        JSONArray city = (JSONArray) option2.get(i);
                        JSONArray dis_p = (JSONArray) option3.get(i);
                        if (dis_p.size() != city.size()) return false;
                        ArrayList<ArrayList<String>> dis_c = new ArrayList<>();
                        for (int j = 0; j < city.size(); j ++) {
                            dis_c.add(getArray((JSONArray) dis_p.get(i), String.class));
                        }
                        this.items3.add(dis_c);
                    }
                }
            } else {
               return this.getUnlinkData(items);
            }
        }
        return true;
    }
    private <T> ArrayList<T>  getArray(JSONArray array, Class<T> clazz) {
        ArrayList<T> arrayList = new ArrayList<>();
        for (int i = 0; i < array.size(); i ++) {
            arrayList.add(TypeUtils.castToJavaBean(array.get(i), clazz));
        }
        return arrayList;
    }

}
