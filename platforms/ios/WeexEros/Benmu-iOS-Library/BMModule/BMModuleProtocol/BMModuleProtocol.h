//
//  BMModuleProtocol.h
//  WeexDemo
//
//  Created by XHY on 2017/1/13.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WXModuleProtocol.h>

@protocol BMModuleProtocol <NSObject>

#pragma mark ----- BMRouterModule 相关方法 -------------------------------------
@optional
/**
 js调用native 跳转页面方法
 
 @param info 字典类型：
 {
    url: '/pages/index/index.js',   // 页面对应的 js 地址
    animateType: '',                // 客户端定义动态类型
    params: {},                     // 传到目标页面的参数，params 通过 router.getParams(callback) 获取
    navigationInfo: {
        title: '标题'
        hideNavbar：‘bool类型 是否隐藏native导航栏’
        bgColor: '导航栏背景色'
    }
 }
 @param callback 回调方法
 */
- (void)open:(NSDictionary *)info callback:(WXModuleCallback)callback;

/**
 js调用方法 打开登录页面

 @param callback 登录成功后native回调js方法
 */
- (void)toLogin:(WXModuleCallback)callback;

/**
 登录成功后js调用native方法
 
 @param userInfo 后端返回的用户信息
 */
- (void)loginSuccess:(NSDictionary *)userInfo;

/**
 获取页面参数
 注释：此方法用于页面见传值然后将值在回调给js：比如a页面跳转b页面传的值，到达b页面的时候js会调用此方法将值获取

 @param callback 回调
 */
- (void)getParams:(WXModuleCallback)callback;


/**
 返回页面
 
 @param info 
 {
    length: 1,                      // 返回多少级
    animateType: '',                // 客户端定义动态类型 1. PUSH (将页面压栈到当前容器栈) 2.PRESEN （新建容器栈在进行压栈）
    title: '',                      // 页面title
    params: {}                      // 返回目标页面的参数，params 通过 router.getBackParams(callback) 获取
 }
 @param callback 回调方法
 */
- (void)back:(NSDictionary *)info callback:(WXModuleCallback)callback;


/**
 返回首页
 
 @param info
 {
    homePageIndex: 0,1,2   （返回到首页第几个页面）
 }
 */
- (void)backHome:(NSDictionary *)info;

/**
 提供方法刷新当前页面js
 */
- (void)refreshWeex;


/**
 js调用native方法打开地图进行导航

 @param info 字典类型:
 {
    destination: '导航目的地'
 }
 */
- (void)toMap:(NSDictionary *)info;


/**
 js调用native用webview打开页面

 @param info 字典类型
 {
    title：‘’，
    url：‘’
 }
 */
- (void)toWebView:(NSDictionary *)info;


/**
 js调用方法，拨打电话

 @param info 
 {
    phone: '电话号码'
 }
 */
- (void)callPhone:(NSDictionary *)info;

#pragma mark ----- BMAxiosNetworkModule 相关方法 -------------------------------
/**
 js调用native 请求数据方法
 
 @param info 字典类型:
 {
    method: 'GET'                                                       // 请求类型 GET or POST
    url: 'http://test3.benmu-health.com/pages/index/index.js',          // 请求路径，前端自己拼好 host，发送完整 URL
    header: {},                                                         // header 对象
    noRepeat: true,                                                     // 请求是否允许重复，默认是 false，如果为 true，发现队列中有类似请求需要 cancel 掉
    data: {}                                                            // 请求参数
 }
 @param callback 回调js方法，将请求的数据返回给js处理
 */
- (void)fetch:(NSDictionary *)info callback:(WXModuleCallback)callback;


/**
 获取get请求url

 @param info 
 {
    url: 'http://test3.benmu-health.com/pages/index/index.js',          // 请求路径，前端自己拼好 host，发送完整 URL
    authorize: 'true'                                                   // 是否需要授权，true：需要添加token
    data: {}                                                            // 请求参数
 }
 @param callback 回调方法
 */
- (void)getRequestUrl:(NSDictionary *)info callback:(WXModuleCallback)callback;


#pragma mark ----- BMHeaderModule 相关方法 -------------------------------
/**
 设置导航栏title

 @param info title
 */
- (void)setHeaderTitle:(NSDictionary *)info;

#pragma mark ----- BMGeolocationModule 相关方法 ---------------------------

/**
 js 调用native 获取定位信息

 @param callback 回调 返回经纬度
  @{
    @“locationLat”: ''，
    @“locationLng”: ''
    }
 */
- (void)getGeolocation:(WXModuleCallback)callback;

#pragma mark ----- BMModalModule 相关方法 ---------------------------------


/**
 alert 只有一个确定按钮的alert

 @param info 
 {
    message：‘我是一个弹窗’
    okTitle：‘确认’
 }
 @param callback 点击回调方法
 */
- (void)alert:(NSDictionary *)info callback:(WXModuleCallback)callback;


/**
 alert 两个按钮

 @param info 
 {
    message: '我是一个弹窗',      // 弹窗内容
    okTitle: '确定'               // 确定按钮文字
    cancelTitle: '取消'           // 取消按钮的文字
 }
 @param cancelCallback 点击取消之后的回调
 @param okCallback 点击确定之后的回调
 */
- (void)confirm:(NSDictionary *)info cancelCallback:(WXModuleCallback)cancelCallback okCallback:(WXModuleCallback)okCallback;


/**
 loading框

 @param info 
 {
    message: '我是一个弹窗'      // 弹窗内容
 }
 */
- (void)showLoading:(NSDictionary *)info;


/**
 隐藏HUD弹窗
 */
- (void)hideLoading;


/**
 toast

 @param info
 {
    message: '支付成功'         // toast 信息
 }
 */
- (void)toast:(NSDictionary *)info;

#pragma mark ----- BMCameraModule 相关方法 ---------------------------------

/**
 扫码方法

 @param callback 回调
 */
- (void)scan:(WXModuleCallback)callback;


/**
 上传图片方法
 @param info
 {
    macCount：  一次最大可选图片数量
    imageWidth：图片宽度
    allowCrop： 是否允许编辑（只有当 maxCount == 1时 才会生效）
 }
 @param callback 上传完的图片url返给js
 */
- (void)uploadImage:(NSDictionary *)info callback:(WXModuleCallback)callback;

#pragma mark ----- BMPayModule 相关方法 ---------------------------------

/**
 js调用native通过微信进行支付

 @param info 支付数据
 @param callback 支付结果回调
 */
- (void)payByWechat:(NSDictionary *)info callback:(WXModuleCallback)callback;

#pragma mark ----- BMStorageModule 相关方法 ---------------------------------


/**
 存储数据方法

 @param key key
 @param data data
 @param callback 回调
 */
- (void)setData:(NSString *)key data:(id)data callback:(WXModuleCallback)callback;


/**
 读取数据方法

 @param key key
 @param callback 回调方法
 */
- (void)getData:(NSString *)key callback:(WXModuleCallback)callback;


/**
 删除某一条数据

 @param key key
 @param callback 回调
 */
- (void)deleteData:(NSString *)key callback:(WXModuleCallback)callback;


/**
 删除所有数据方法

 @param callback 回调
 */
- (void)removeData:(WXModuleCallback)callback;

#pragma mark ----- BMShareModule 相关方法 ---------------------------------

/**
 js调用native 调用第三方分享

 @param info 字典类型
 {
    content：‘内容’
    icon：‘图片’
    title：‘标题’
    url：‘链接’
 }
 @param successCallback 分享成功回调
 @param failedCallback 分享失败回调
 */
- (void)share:(NSDictionary *)info successCallback:(WXModuleCallback)successCallback failedCallback:(WXModuleCallback)failedCallback;

#pragma mark ----- BMAppConfigModule 相关方法 ---------------------------------


/**
 js调用native 修改字体大小

 @param info 
 {
    fontSize：“NORM”    NORM：标准 BIG：大号 EXTRALARGE：特大
 }
 */
- (void)changeFontSize:(NSDictionary *)info callback:(WXModuleCallback)callback;


/**
 获取字体大小方法
 callback：
 {
    data = {
        fontSize = NORM;
        scale = 1;
    };
    msg = "";
    resCode = 0;
 }
 */
- (void)getFontSize:(WXModuleCallback)callback;

#pragma mark ----- BMToolsModule 相关方法 ---------------------------------

/**
 辞退键盘

 @param callback 回调
 */
- (void)resignKeyboard:(WXModuleCallback)callback;


@end
