package com.benmu.framework.utils;

/**
 * Created by lfg on 2018/1/2.
 */

public class LanguageUtil {

    public static String locale = "zh";

    public static String languageInjector() {
        return "Vue.prototype.$locale = '"+ locale +"';";
    }
}
