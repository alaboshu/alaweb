package com.benmu.widget.view.calendar;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.RippleDrawable;
import android.graphics.drawable.ShapeDrawable;
import android.graphics.drawable.StateListDrawable;
import android.graphics.drawable.shapes.OvalShape;
import android.graphics.drawable.shapes.RectShape;
import android.os.Build;
import android.support.annotation.NonNull;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.CheckedTextView;

import com.benmu.R;
import com.benmu.widget.utils.ColorUtils;
import com.benmu.widget.view.calendar.format.DayFormatter;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static com.benmu.widget.view.calendar.MaterialCalendarView.showDecoratedDisabled;
import static com.benmu.widget.view.calendar.MaterialCalendarView.showOtherMonths;
import static com.benmu.widget.view.calendar.MaterialCalendarView.showOutOfRange;

/**
 * Display one day of a {@linkplain MaterialCalendarView}
 */
@SuppressLint("ViewConstructor")
class DayView extends CheckedTextView {

    private CalendarDay date;
    private int selectionColor = Color.GRAY;

    private final int fadeTime;
    private Drawable customBackground = null;
    private Drawable selectionDrawable;
    private Drawable mCircleDrawable;
    private DayFormatter formatter = DayFormatter.DEFAULT;

    private boolean isInRange = true;
    private boolean isInMonth = true;
    private boolean isDecoratedDisabled = false;
    @MaterialCalendarView.ShowOtherDates
    private int showOtherDates = MaterialCalendarView.SHOW_DEFAULTS;

    public DayView(Context context, CalendarDay day) {
        super(context);

        fadeTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

        setSelectionColor(this.selectionColor);

        setGravity(Gravity.CENTER);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            setTextAlignment(TEXT_ALIGNMENT_CENTER);
        }
        setDay(day);
    }

    public void setDay(CalendarDay date) {
        this.date = date;
        String s = getLabel();
        setText(getLabel());
        setTextSize(18);
    }

    /**
     * Set the new label formatter and reformat the current label. This preserves current spans.
     *
     * @param formatter new label formatter
     */
    public void setDayFormatter(DayFormatter formatter) {
        this.formatter = formatter == null ? DayFormatter.DEFAULT : formatter;
        CharSequence currentLabel = getText();
        Object[] spans = null;
        if (currentLabel instanceof Spanned) {
            spans = ((Spanned) currentLabel).getSpans(0, currentLabel.length(), Object.class);
        }
        SpannableString newLabel = new SpannableString(getLabel());
        if (spans != null) {
            for (Object span : spans) {
                newLabel.setSpan(span, 0, newLabel.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
            }
        }
        setText(newLabel);
        setTextSize(20);
    }

    @NonNull
    public String getLabel() {
        if (!isEnabled()) {
            setTextColor(Color.parseColor("#b2b2b2"));
        } else {
            setWeekend(getDate().toString());
        }

        if (CalendarDay.today().equals(getDate())) {
            return "今";
        }
        return formatter.format(date);
    }

    public void setSelectionColor(int color) {
        this.selectionColor = color;
        regenerateBackground();
    }

    private void setWeekend(String dateString) {
        DateFormat weekFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = weekFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (date != null) {
            Calendar instance = Calendar.getInstance();
            instance.setTime(date);
            if (instance.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY || instance.get(Calendar
                    .DAY_OF_WEEK) == Calendar.SUNDAY) {
                //周末
                if (!TextUtils.isEmpty(CustomerStyle.WEEKEND_COLOR)) {
                    setTextColor(Color.parseColor(CustomerStyle.WEEKEND_COLOR));
                }

            } else {
                //非周末
                if (!TextUtils.isEmpty(CustomerStyle.WEEKDAY_COLOR)) {
                    setTextColor(Color.parseColor(CustomerStyle.WEEKDAY_COLOR));
                }
            }
        }
    }

    /**
     * @param drawable custom selection drawable
     */
    public void setSelectionDrawable(Drawable drawable) {
        if (drawable == null) {
            this.selectionDrawable = null;
        } else {
            this.selectionDrawable = drawable.getConstantState().newDrawable(getResources());
        }
        regenerateBackground();
    }

    /**
     * @param drawable background to draw behind everything else
     */
    public void setCustomBackground(Drawable drawable) {
        if (drawable == null) {
            this.customBackground = null;
        } else {
            this.customBackground = drawable.getConstantState().newDrawable(getResources());
        }
        invalidate();
    }

    public CalendarDay getDate() {
        return date;
    }

    private void setEnabled() {
        boolean enabled = isInMonth && isInRange && !isDecoratedDisabled;
        super.setEnabled(isInRange && !isDecoratedDisabled);

        boolean showOtherMonths = showOtherMonths(showOtherDates);
        boolean showOutOfRange = showOutOfRange(showOtherDates) || showOtherMonths;
        boolean showDecoratedDisabled = showDecoratedDisabled(showOtherDates);

        boolean shouldBeVisible = enabled;

        if (!isInMonth && showOtherMonths) {
            shouldBeVisible = true;
        }

        if (!isInRange && showOutOfRange) {
            shouldBeVisible |= isInMonth;
        }

        if (isDecoratedDisabled && showDecoratedDisabled) {
            shouldBeVisible |= isInMonth && isInRange;
        }

        if (!isInMonth && shouldBeVisible) {
            setTextColor(getTextColors().getColorForState(
                    new int[]{-android.R.attr.state_enabled}, Color.GRAY));
        }
        setVisibility(isInMonth ? View.VISIBLE : View.INVISIBLE);
//        setVisibility(shouldBeVisible ? View.VISIBLE : View.INVISIBLE);

    }

    protected void setupSelection(@MaterialCalendarView.ShowOtherDates int showOtherDates,
                                  boolean inRange, boolean
                                          inMonth) {
        this.showOtherDates = showOtherDates;
        this.isInMonth = inMonth;
        this.isInRange = inRange;
        setEnabled();

    }

    private final Rect tempRect = new Rect();
    private final Rect circleDrawableRect = new Rect();

    @Override
    protected void onDraw(@NonNull Canvas canvas) {
        if (customBackground != null) {
            customBackground.setBounds(tempRect);
            customBackground.setState(getDrawableState());
            customBackground.draw(canvas);
        }

        mCircleDrawable.setBounds(circleDrawableRect);

        super.onDraw(canvas);
    }

    private void regenerateBackground() {
        if (selectionDrawable != null) {
            setBackgroundDrawable(selectionDrawable);
        } else {
            mCircleDrawable = generateBackground(selectionColor, fadeTime, circleDrawableRect);
            setBackgroundDrawable(mCircleDrawable);
        }

    }

    private int[] STATE_EXCALTY_CHECKED = {R.attr.exactly_checked};

    private boolean mIsExcatlyChecked;

    @Override
    protected int[] onCreateDrawableState(int extraSpace) {
        if (mIsExcatlyChecked) {
            int[] ints = super.onCreateDrawableState(extraSpace + 1);
            mergeDrawableStates(ints, STATE_EXCALTY_CHECKED);
            return ints;
        } else {
            return super.onCreateDrawableState(extraSpace);
        }

    }


    public void setExactlyDaySelected(boolean exactly) {
        Log.e("exactly", getDate().getDay() + "ex" + exactly);
        if (this.mIsExcatlyChecked != exactly) {
//            this.date.setExacyltSameDay(exactly);
            this.mIsExcatlyChecked = exactly;
            refreshDrawableState();
        }
    }

    private static Drawable generateBackground(int color, int fadeTime, Rect bounds) {
        StateListDrawable drawable = new StateListDrawable();
        drawable.setExitFadeDuration(fadeTime);
        drawable.addState(new int[]{R.attr.exactly_checked}, generateRectDrawable(ColorUtils.getColor(CustomerStyle.CHECKED_COLOR)));
        drawable.addState(new int[]{android.R.attr.state_checked}, generateRectDrawable(color));

        //按压时的状态
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//            drawable.addState(new int[]{android.R.attr.state_pressed}, generateRectDrawable
// (color));
//        } else {
//            drawable.addState(new int[]{android.R.attr.state_pressed}, generateRectDrawable
//                    (color));
//        }

        drawable.addState(new int[]{}, generateCircleDrawable(Color.TRANSPARENT));

        return drawable;
    }


    private static Drawable generateRectDrawable(final int color) {
        ShapeDrawable drawable = new ShapeDrawable(new RectShape());
        drawable.getPaint().setColor(color);
        return drawable;
    }

    private static Drawable generateCircleDrawable(final int color) {
        ShapeDrawable drawable = new ShapeDrawable(new OvalShape());
        drawable.getPaint().setColor(color);
        return drawable;
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    private static Drawable generateRippleDrawable(final int color, Rect bounds) {
        ColorStateList list = ColorStateList.valueOf(color);
        Drawable mask = generateCircleDrawable(Color.WHITE);
        RippleDrawable rippleDrawable = new RippleDrawable(list, null, mask);
//        API 21
        if (Build.VERSION.SDK_INT == Build.VERSION_CODES.LOLLIPOP) {
            rippleDrawable.setBounds(bounds);
        }

//        API 22. Technically harmless to leave on for API 21 and 23, but not worth risking for 23+
        if (Build.VERSION.SDK_INT == Build.VERSION_CODES.LOLLIPOP_MR1) {
            int center = (bounds.left + bounds.right) / 2;
            rippleDrawable.setHotspotBounds(center, bounds.top, center, bounds.bottom);
        }

        return rippleDrawable;
    }

    /**
     * @param facade apply the facade to us
     */
    void applyFacade(DayViewFacade facade) {
        this.isDecoratedDisabled = facade.areDaysDisabled();
        setEnabled();

        setCustomBackground(facade.getBackgroundDrawable());
        setSelectionDrawable(facade.getSelectionDrawable());

        // Facade has spans
        List<DayViewFacade.Span> spans = facade.getSpans();
        if (!spans.isEmpty()) {
            String label = getLabel();
            SpannableString formattedLabel = new SpannableString(getLabel());
            for (DayViewFacade.Span span : spans) {
                formattedLabel.setSpan(span.span, 0, label.length(), Spanned
                        .SPAN_EXCLUSIVE_EXCLUSIVE);
            }
            setText(formattedLabel);
        }
        // Reset in case it was customized previously
        else {
            setText(getLabel());
        }
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        calculateBounds(right - left, bottom - top);
        regenerateBackground();
    }

    private void calculateBounds(int width, int height) {
        final int radius = Math.min(height, width);
        final int offset = Math.abs(height - width) / 2;

        // Lollipop platform bug. Circle drawable offset needs to be half of normal offset
        final int circleOffset = Build.VERSION.SDK_INT == Build.VERSION_CODES.LOLLIPOP ? offset /
                2 : offset;

        if (width >= height) {
            tempRect.set(offset, 0, radius + offset, height);
            circleDrawableRect.set(circleOffset, 0, radius + circleOffset, height);
        } else {
            tempRect.set(0, offset, width, radius + offset);
            circleDrawableRect.set(0, circleOffset, width, radius + circleOffset);
        }
    }
}
