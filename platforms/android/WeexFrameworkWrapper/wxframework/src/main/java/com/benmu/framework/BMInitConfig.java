package com.benmu.framework;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Carry on 2017/8/23.
 */

public class BMInitConfig {

    private Map<String, String> mEnvs;
    private String mActice;

    private BMInitConfig() {
    }

    public Map<String, String> getmEnvs() {
        return mEnvs;
    }

    public void setmEnvs(Map<String, String> mEnvs) {
        this.mEnvs = mEnvs;
    }

    public String getmActice() {
        return mActice;
    }

    public void setmActice(String mActice) {
        this.mActice = mActice;
    }

    public static class Builder {
        HashMap<String, String> mCustomerEnv;
        private String mActiveInterceptor;

        public Builder setCustomerEnv(HashMap<String, String> mCustomerEnv) {
            this.mCustomerEnv = mCustomerEnv;
            return this;
        }

        public Builder isActiceInterceptor(String active) {
            this.mActiveInterceptor = active;
            return this;
        }

        public BMInitConfig build() {
            BMInitConfig initConfig = new BMInitConfig();
            initConfig.mEnvs = this.mCustomerEnv;
            initConfig.mActice = this.mActiveInterceptor;
            return initConfig;
        }
    }
}
