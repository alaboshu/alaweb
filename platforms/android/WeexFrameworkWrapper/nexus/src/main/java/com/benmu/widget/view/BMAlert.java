package com.benmu.widget.view;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.text.InputType;
import android.text.TextUtils;
import android.text.method.LinkMovementMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.benmu.R;


/**
 * Created by Carry on 17/2/8.
 */

public class BMAlert extends Dialog {
    public void show(float width) {
        try {
            WindowManager.LayoutParams params = getWindow().getAttributes();
            params.flags = WindowManager.LayoutParams.FLAG_DIM_BEHIND;
            params.dimAmount = 0.5f;
            super.show();
            DisplayMetrics metrics = new DisplayMetrics();
            getWindow().getWindowManager().getDefaultDisplay().getMetrics(metrics);
            params.width = (int) (metrics.widthPixels * width);
            getWindow().setAttributes(params);
        } catch (Exception ex) {
        }
    }

    public void showAtHeight(float height) {
        try {
            super.show();
            WindowManager m = getWindow().getWindowManager();
            Display display = m.getDefaultDisplay(); //  获取屏幕宽、高用
            WindowManager.LayoutParams params = getWindow().getAttributes(); // 获取对话框当前的参数值
            DisplayMetrics metrics = new DisplayMetrics();
            getWindow().getWindowManager().getDefaultDisplay().getMetrics(metrics);
            params.width = (int) (display.getWidth() * 0.9); // 宽度设置为屏幕的0.9
            params.height = (int) (metrics.heightPixels * height);
            getWindow().setAttributes(params);
        } catch (Exception ex) {
        }
    }


    @Override
    public void show() {
        super.show();
        //getWindow().setWindowAnimations(R.style.AlertAnim);
        WindowManager m = getWindow().getWindowManager();
        Display display = m.getDefaultDisplay(); //  获取屏幕宽、高用
        WindowManager.LayoutParams params = getWindow().getAttributes(); // 获取对话框当前的参数值
        params.width = (int) (display.getWidth() * 0.9); // 宽度设置为屏幕的0.9
        getWindow().setAttributes(params);

    }

    public BMAlert(Context context, int theme) {
        super(context, theme);
    }

    public BMAlert(Context context) {
        super(context);
    }

    public void setMessage(CharSequence message) {
        TextView messageView = (TextView) findViewById(android.R.id.message);
        if (messageView != null) {
            messageView.setText(message);
        }
    }


    private String mInputValue;
    public String getInputValue() {
        return this.mInputValue;
    }
    /**
     * Helper class for creating a custom dialog
     */
    public static class Builder {

        private Context context;
        private CharSequence title;
        private CharSequence message;
        private CharSequence positiveButtonText;
        private CharSequence negativeButtonText;
        private boolean positiveShow = true;
        private View view;
        private boolean cancelable = true;
        private int maxheight;
        private OnClickListener positiveButtonClickListener, negativeButtonClickListener;
        private OnCancelListener onCancelListener;
        private String mTitleAlign;
        private String mContentAlign;
        private boolean mIsPrompt;
        private String mPromptType;
        private String mPromptPlaceholder;

        public Builder(Context context) {
            this.context = context;
        }

        public Builder setTitleAlign(String align) {
            this.mTitleAlign = align;
            return this;
        }

        public Builder setIsPrompt(boolean isPrompt) {
            this.mIsPrompt = isPrompt;
            return this;
        }
        public Builder setPromptType(String promptType) {
            this.mPromptType = promptType;
            return this;
        }
        public Builder setPromptPlaceholder(String placeholder) {
            this.mPromptPlaceholder = placeholder;
            return this;
        }

        public Builder setMessageAlign(String align) {
            this.mContentAlign = align;
            return this;
        }

        /**
         * Set the Dialog message from String
         */
        public Builder setMessage(CharSequence message) {
            this.message = message;
            return this;
        }

        public Builder setMaxheight(int h) {
            this.maxheight = h;
            return this;
        }

        /**
         * Set the Dialog message from resource
         */
        public Builder setMessage(int message) {
            this.message = context.getText(message);
            return this;
        }

        /**
         * Set the Dialog title from resource
         */
        public Builder setTitle(int title) {
            this.title = context.getText(title);
            return this;
        }

        /**
         * Set the Dialog title from String
         */
        public Builder setTitle(CharSequence title) {
            this.title = title;
            return this;
        }

        /**
         * Set the Dialog view
         */
        public Builder setView(View view) {
            this.view = view;
            return this;
        }

        /**
         * Set the Dialog view
         */
        public Builder setCancelable(boolean cancelable) {
            this.cancelable = cancelable;
            return this;
        }


        public void setOnCancelListenner(OnCancelListener onCancelListenner) {
            this.onCancelListener = onCancelListenner;
        }

        /**
         * Set the positive button resource and it's listener
         */
        public Builder setPositiveButton(int positiveButtonText, OnClickListener listener) {
            return setPositiveButton(context.getText(positiveButtonText), listener);
        }

        /**
         * Set the positive button text and it's listener
         */
        public Builder setPositiveButton(CharSequence positiveButtonText, OnClickListener
                listener) {
            this.positiveButtonText = positiveButtonText;
            this.positiveButtonClickListener = listener;
            return this;
        }

        /**
         * Set the negative button resource and it's listener
         */
        public Builder setNegativeButton(int negativeButtonText, OnClickListener listener) {
            return setNegativeButton(context.getText(negativeButtonText), listener);
        }

        /**
         * Set the negative button text and it's listener
         */
        public Builder setNegativeButton(CharSequence negativeButtonText, OnClickListener
                listener) {
            this.negativeButtonText = negativeButtonText;
            this.negativeButtonClickListener = listener;
            return this;
        }

        public Builder setNegativeButton(int type, CharSequence negativeButtonText,
                                         OnClickListener listener) {
            if (type == 1)
                this.positiveShow = false;
            this.negativeButtonText = negativeButtonText;
            this.negativeButtonClickListener = listener;
            return this;
        }


        /**
         * Create the custom dialog
         */

        private TextView sbtn_p;
        private TextView sbtn_n;


        public TextView getPositieButton() {
            return this.sbtn_p;

        }

        public TextView getNegativeButton() {
            return this.sbtn_n;

        }

        public boolean isPositiveAutodismiss = true;


        public BMAlert create() {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context
                    .LAYOUT_INFLATER_SERVICE);
            // instantiate the dialog with the custom Theme
            final BMAlert dialog = new BMAlert(context, R.style.gAlertDialogTheme);
            View layout = inflater.inflate(R.layout.layout_dialog, null);
            dialog.setContentView(layout);

            View layout_title = layout.findViewById(R.id.layout_title);
            TextView tv_title = (TextView) layout.findViewById(R.id.tv_title);
            TextView tv_message = ((TextView) layout.findViewById(R.id.tv_content));
            MaxScrollView maxScrollView = (MaxScrollView) layout.findViewById(R.id.max_sv);
            final EditText et_value = (EditText) layout.findViewById(R.id.et_value);
            View layout_input = layout.findViewById(R.id.layout_input);
            if (mIsPrompt) {
                layout_input.setVisibility(View.VISIBLE);
                et_value.setHint(mPromptPlaceholder);
                if (mPromptType.equals("password")) {
                    et_value.setInputType(InputType.TYPE_CLASS_TEXT);
                    et_value.setTransformationMethod(PasswordTransformationMethod.getInstance());
                }
            } else {
                layout_input.setVisibility(View.GONE);
            }
            if (mContentAlign != null) {
                if ("left".equals(mContentAlign)) {
                    tv_message.setGravity(Gravity.LEFT);

                } else if ("right".equals(mContentAlign)) {
                    tv_message.setGravity(Gravity.RIGHT);
                }
            }
            if (mTitleAlign != null) {
                if ("left".equals(mTitleAlign)) {
                    tv_title.setGravity(Gravity.LEFT);

                } else if ("right".equals(mTitleAlign)) {
                    tv_title.setGravity(Gravity.RIGHT);
                }
            }
            if (maxheight > 0) {
                maxScrollView.setMaxHeight(maxheight);
            }

            sbtn_p = (TextView) layout.findViewById(R.id.tv_confirm);
            if (!positiveShow)
                sbtn_p.setVisibility(View.GONE);
            sbtn_n = (TextView) layout.findViewById(R.id.tv_cancel);
            FrameLayout frame_view = (FrameLayout) layout.findViewById(R.id.frame_view);
            tv_message.setMovementMethod(LinkMovementMethod.getInstance());

            View.OnClickListener btnListener = new View.OnClickListener() {
                public void onClick(View v) {
                    int itemId = v.getId();
                    if (itemId == R.id.tv_confirm) {
                        if (positiveButtonClickListener != null) {
                            dialog.mInputValue = et_value.getText().toString();
                            positiveButtonClickListener.onClick(dialog, DialogInterface
                                    .BUTTON_POSITIVE);
                            if (isPositiveAutodismiss) {
                                dialog.dismiss();
                            }

                        } else {
                            if (isPositiveAutodismiss) {
                                dialog.dismiss();
                            }

                        }
                    }
                    if (itemId == R.id.tv_cancel) {
                        if (negativeButtonClickListener != null) {
                            negativeButtonClickListener.onClick(dialog, DialogInterface
                                    .BUTTON_NEGATIVE);
                            dialog.dismiss();
                        } else {
                            dialog.dismiss();
                        }
                    }
                }
            };
            // set the dialog title
            if (!TextUtils.isEmpty(title)) {
                tv_title.setText(title);
                layout_title.setVisibility(View.VISIBLE);
            } else {
                layout_title.setVisibility(View.GONE);
            }

            // set the confirm button
            if (positiveButtonText != null) {
                sbtn_p.setText(positiveButtonText);
                sbtn_p.setOnClickListener(btnListener);
            } else {
                // if no confirm button just set the visibility to GONE
                sbtn_p.setVisibility(View.GONE);
            }

            // set the cancel button
            if (negativeButtonText != null) {
                sbtn_n.setText(negativeButtonText);
                sbtn_n.setOnClickListener(btnListener);
            } else {
                // if no confirm button just set the visibility to GONE
                sbtn_n.setVisibility(View.GONE);
                sbtn_p.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams
                        .FILL_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
            }

            // set the content message
            if (message != null) {
                tv_message.setText(message);
            } else {
                tv_message.setVisibility(View.GONE);
            }

            if (view != null) {
                frame_view.setVisibility(View.VISIBLE);
                frame_view.addView(view);
            }
            dialog.setContentView(layout);
            dialog.setCancelable(cancelable);
            if (onCancelListener != null) {
                dialog.setOnCancelListener(onCancelListener);
            }

            return dialog;
        }

        public BMAlert show() {
            BMAlert dialog = create();
            dialog.show();
            return dialog;
        }

    }
}



