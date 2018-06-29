package com.benmu.framework.event.router;

import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.model.NavModule;
import com.benmu.framework.utils.GeoUtils;

/**
 * Created by Carry on 2018/1/10.
 */

public class EventNav {
    public void nav(String params, Context context) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        NavModule navModule = parseManager.parseObject(params, NavModule.class);
        if (navModule != null) {
            String type = navModule.getType();
            if ("amap".equals(type)) {
                navByAmap(context, navModule);
            } else if ("baidu".equals(type)) {
                navByBaidumap(context, navModule);
            }
        }
    }


    private void navByAmap(Context context, NavModule info) {
        try {
            Intent intent = new Intent();
            intent.setData(Uri.parse(String.format("amapuri://route/plan/?sourceApplication=%s" +
                    "&sname=%s&dlat=%s&dlon=%s&dname=%s&dev=0&t=0", "jyt", "我的位置", info
                    .getLatitude(), info.getLongitude(), info
                    .getTitle()
            )));
            intent.setAction(Intent.ACTION_VIEW);
            intent.addCategory(Intent.CATEGORY_DEFAULT);
            intent.setPackage("com.autonavi.minimap");
            context.startActivity(intent);
        } catch (Exception e) {
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(String.format("http://uri.amap.com/navigation?from=%s," +
                    "%s&to=%s," +
                    "%s&mode=car", info.getCurrentLongitude(), info.getCurrentLatitude(), info
                    .getLongitude(), info.getLatitude
                    ())));
            context.startActivity(intent);
        }

    }

    private void navByBaidumap(Context context, NavModule info) {
        double[] origin_bd = GeoUtils.gcj02_To_Bd09(Double.parseDouble(info.getCurrentLatitude())
                , Double.parseDouble(info.getCurrentLongitude()));
        double[] destination_bd = GeoUtils.gcj02_To_Bd09(Double.parseDouble(info.getLatitude()),
                Double
                .parseDouble(info.getLongitude()));
        try {
            Intent intent = new Intent();
            intent.setData(Uri.parse
                    (String.format("baidumap://map/direction?origin=我的位置" +
                                    "|latlng:%s,%s&destination=name:%s|latlng:%s," +
                                    "%s&mode=driving&sy=0&target=1", origin_bd[0], origin_bd[1],
                            info.getTitle(), destination_bd[0], destination_bd[1]
                    )));
            context.startActivity(intent);
        } catch (ActivityNotFoundException e) {
            String uri = "http://api.map.baidu" +
                    ".com/direction?origin=latlng:%s,%s|name:我的位置&destination=latlng:%s," +
                    "%s|name:%s&mode=driving&output=html&src=jyt&region=北京";
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(String.format(uri, origin_bd[0], origin_bd[1],
                    destination_bd[0], destination_bd[1],
                    info.getTitle())));
            context.startActivity(intent);
        }
    }

}
