package com.benmu.widget.view;

import android.app.Dialog;
import android.content.Context;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.benmu.R;

import java.util.List;

/**
 * Created by Carry on 2017/6/29.
 */

public class BMGridDialog {
    private Context mContext;
    private Dialog mDialog;
    private RecyclerView mRv;
    private TextView mTv_cancel;

    private BMGridDialog(Context context, int mTheme, int mGravity, String
            mCancelText, View.OnClickListener mOnNegativeClick, Adapter adapter,
                         OnItemClickListener mListenner) {
        this.mContext = context;
        build(mTheme, mGravity, mCancelText, adapter, mOnNegativeClick, mListenner);
    }

    private BMGridDialog(Context mContext, int mTheme, int mGravity, View mContentView) {
        this.mContext = mContext;
        build(mTheme, mGravity, mContentView);
    }

    private void build(int mTheme, int mGravity, View mContentView) {
        //create dialog
        mDialog = new Dialog(mContext, mTheme);
        mDialog.setContentView(mContentView);
        Window window = mDialog.getWindow();
        if (window != null) {
            window.setGravity(mGravity);
            WindowManager.LayoutParams lp = window.getAttributes();
            lp.width = WindowManager.LayoutParams.MATCH_PARENT;
            lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
            window.setAttributes(lp);
        }
    }

    private void build(int mTheme, int mGravity, String mCancelText, Adapter adapter, final View
            .OnClickListener mOnNegativeClick, OnItemClickListener mListenner) {

        //create dialog
        mDialog = new Dialog(mContext, mTheme);

        View inflate = LayoutInflater.from(mContext).inflate(R.layout.layout_grid_dialog, null);
        mRv = (RecyclerView) inflate.findViewById(R.id.rv_items);
        mTv_cancel = (TextView) inflate.findViewById(R.id.btn_cancel);
        if (!TextUtils.isEmpty(mCancelText)) {
            mTv_cancel.setText(mCancelText);
        }
        if (mOnNegativeClick != null) {
            mTv_cancel.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mOnNegativeClick.onClick(v);
                }
            });
        } else {
            mTv_cancel.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    hide();
                }
            });
        }
        // linearLayoutManager
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(mContext);
        linearLayoutManager.setOrientation(LinearLayoutManager.HORIZONTAL);
        mRv.setLayoutManager(linearLayoutManager);
        //setAdapter
        if (adapter != null) {
            //set listener
            if (mListenner != null) {
                adapter.setOnItemClickListenner(mListenner, mDialog);
            }
            mRv.setAdapter(adapter);
        }

        mDialog.setContentView(inflate);
        Window window = mDialog.getWindow();
        if (window != null) {
            window.setGravity(mGravity);
            WindowManager.LayoutParams lp = window.getAttributes();
            lp.width = WindowManager.LayoutParams.MATCH_PARENT;
            lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
            window.setAttributes(lp);
        }
    }


    /**
     * dialog builder
     */
    public static class Builder {
        private int mGravity;
        private Context mContext;
        private int mTheme;
        private String mCancelText;
        private View.OnClickListener mOnNegativeClick;
        private Adapter mAdapter;
        private OnItemClickListener mListenner;
        private View mContentView;

        public Builder(Context context, int theme) {
            mContext = context;
            mTheme = theme;
        }


        public Builder setGravity(int gravity) {
            mGravity = gravity;
            return this;
        }

        public Builder setNegativeButton(String btnText, View.OnClickListener onNegativeClick) {
            mCancelText = btnText;
            mOnNegativeClick = onNegativeClick;
            return this;
        }

        public Builder setAdapter(Adapter adapter) {
            mAdapter = adapter;
            return this;
        }

        public Builder setOnItemClickListenner(OnItemClickListener listenner) {
            mListenner = listenner;
            return this;
        }

        /**
         * the method with highest priority to set view
         *
         * @param view view custom by user
         */
        public Builder setContentView(View view) {
            mContentView = view;
            return this;
        }

        public BMGridDialog build() {
            if (mContext == null) return null;
            if (mContentView != null) {
                return new BMGridDialog(mContext, mTheme, mGravity, mContentView);
            }
            return new BMGridDialog(mContext, mTheme, mGravity, mCancelText, mOnNegativeClick,
                    mAdapter, mListenner);
        }
    }


    public interface OnItemClickListener {
        void onItemClick(int position, View view, GridItem item, Dialog dialog);
    }


    public void show() {
        if (mDialog != null && !mDialog.isShowing()) {
            mDialog.show();
        }
    }


    public void hide() {
        if (mDialog != null && mDialog.isShowing()) {
            mDialog.dismiss();
        }
    }


    public static class GridItem {
        private String imgUrl;
        private int imgResId;
        private String title;
        private Object tag;

        public GridItem(String imgUrl, int imgResId, String title, Object tag) {
            this.imgUrl = imgUrl;
            this.imgResId = imgResId;
            this.title = title;
            this.tag = tag;
        }

        public GridItem() {
        }

        public String getImgUrl() {
            return imgUrl;
        }

        public void setImgUrl(String imgUrl) {
            this.imgUrl = imgUrl;
        }

        public int getImgResId() {
            return imgResId;
        }

        public void setImgResId(int imgResId) {
            this.imgResId = imgResId;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public Object getTag() {
            return tag;
        }

        public void setTag(Object tag) {
            this.tag = tag;
        }
    }


    public static class Adapter extends RecyclerView.Adapter<Adapter.PartItemViewHolder> {
        private List<GridItem> items;
        private Context mContext;
        private OnItemClickListener mItemClickListener;
        private Dialog mDialog;
        private int mPart;

        public Adapter(Context context, List<GridItem> list, int part) {
            items = list;
            mContext = context;
            mPart = part;
        }

        public Adapter(Context context, List<GridItem> list) {
            items = list;
            mContext = context;
        }


        public void setOnItemClickListenner(OnItemClickListener listener, Dialog Dialog) {
            mItemClickListener = listener;
            mDialog = Dialog;
        }

        @Override
        public PartItemViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

            return new PartItemViewHolder(LayoutInflater.from(mContext).inflate(R.layout
                    .layout_grid_item, parent, false));
        }

        @Override
        public void onBindViewHolder(final PartItemViewHolder holder, final int position) {
            final GridItem gridItem = items.get(position);
            if (mPart > 0) {
                holder.mLayout.setPart(mPart);
            }
            holder.tv.setText(gridItem.getTitle());
            holder.iv.setImageResource(gridItem.getImgResId());
            holder.rl.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (mItemClickListener != null) {
                        mItemClickListener.onItemClick(position, holder.rl, gridItem, mDialog);
                    }
                }
            });
        }

        @Override
        public int getItemCount() {
            return items.size();
        }


        class PartItemViewHolder extends RecyclerView.ViewHolder {
            private TextView tv;
            private ImageView iv;
            private RelativeLayout rl;
            private BMPartLayout mLayout;

            PartItemViewHolder(View itemView) {
                super(itemView);
                tv = (TextView) itemView.findViewById(R.id.tv);
                iv = (ImageView) itemView.findViewById(R.id.iv);
                rl = (RelativeLayout) itemView.findViewById(R.id.rl_container);
                mLayout = (BMPartLayout) itemView.findViewById(R.id.rl_root);
            }
        }
    }

}
