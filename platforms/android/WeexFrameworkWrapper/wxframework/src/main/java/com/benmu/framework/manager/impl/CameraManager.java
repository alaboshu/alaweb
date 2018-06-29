package com.benmu.framework.manager.impl;

import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.Manager;
import com.google.zxing.integration.android.IntentIntegrator;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;

import java.util.Collection;

/**
 * Created by Carry on 2017/8/16.
 */

public class CameraManager extends Manager {
    public void scanCode(ScanConfig config) {
        IntentIntegrator integrator = new IntentIntegrator(config.getContext());
        integrator.setDesiredBarcodeFormats(config.getDesiredBarcodeFormats());
        integrator.setPrompt(config.getPrompt());
        //integrator.setCameraId(0);  // Use a specific camera of the device
        integrator.setBeepEnabled(config.isBeep());
        integrator.setOrientationLocked(false);
        integrator.setBarcodeImageEnabled(true);
        integrator.initiateScan();
    }


    public static void takePhoto(Activity activity, Uri path) {
        Intent cameraIntent = new Intent(
                MediaStore.ACTION_IMAGE_CAPTURE);
        cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, path);
        cameraIntent.putExtra("outputFormat", Bitmap.CompressFormat.JPEG.toString());
        activity.startActivityForResult(cameraIntent, Constant.ImageConstants.PICK_FROM_CAMERA);
    }


    public static class ScanConfig {
        private Activity context;
        private Collection<String> desiredBarcodeFormats;
        private String prompt;
        private boolean beep;

        public Activity getContext() {
            return context;
        }

        public void setContext(Activity context) {
            this.context = context;
        }

        public Collection<String> getDesiredBarcodeFormats() {
            return desiredBarcodeFormats;
        }

        public void setDesiredBarcodeFormats(Collection<String> desiredBarcodeFormats) {
            this.desiredBarcodeFormats = desiredBarcodeFormats;
        }

        public String getPrompt() {
            return prompt;
        }

        public void setPrompt(String prompt) {
            this.prompt = prompt;
        }

        public boolean isBeep() {
            return beep;
        }

        public void setBeep(boolean beep) {
            this.beep = beep;
        }

        private ScanConfig(Activity context, Collection<String> desiredBarcodeFormats, String
                prompt, boolean beep) {
            this.context = context;
            this.desiredBarcodeFormats = desiredBarcodeFormats;
            this.prompt = prompt;
            this.beep = beep;
        }

        public static class ConfigBuilder {
            private Activity context;
            private Collection<String> desiredBarcodeFormats;
            private String prompt;
            private boolean beep;

            public ConfigBuilder setContext(Activity context) {
                this.context = context;
                return this;
            }

            public ConfigBuilder setCodeFormat(Collection<String> format) {
                this.desiredBarcodeFormats = format;
                return this;
            }

            public ConfigBuilder setPrompt(String prompt) {
                this.prompt = prompt;
                return this;
            }

            public ConfigBuilder setBeepEnable(boolean beepEnable) {
                this.beep = beepEnable;
                return this;
            }

            public ScanConfig build() {
                return new ScanConfig(context, desiredBarcodeFormats, prompt, beep);
            }
        }
    }

}
