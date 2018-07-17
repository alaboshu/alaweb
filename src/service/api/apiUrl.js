// Get,GetList等接口，动态参数查询，字段名与数据库一致，不区分大小写
//  == ：Operator.Equal（等于），可省去，默认
//  << ：Operator.Less（小于）
//  <= ：Operator.LessEqual（小于等于）
//  >> ：Operator.Greater（大于）
//  >= ：Operator.GreaterEqual（大于等于）
//  != ：Operator.NotEqual（不等于）
//  s% ：Operator.Starts（头匹配）
//  e% ：Operator.Ends（尾匹配）
//  c% ：Operator.Contains（包含）
//  const para= {
//    userId: '>=10',
//    userName: 'c%admin',
//    mobile: '13989646465'
//  }

//  UserAddress相关的API接口
export const USERADDRESS_ADD_POST = 'Api/UserAddress/Add' // 添加商品到用户地址
export const USERADDRESS_GET_GET = 'Api/UserAddress/Get' // 获取用户地址数据
export const USERADDRESS_DELETE_DELETE = 'Api/UserAddress/Delete' // 删除用户地址
export const USERADDRESS_UPDATE_PUT = 'Api/UserAddress/Update' // 更新用户地址
export const USERADDRESS_SETDEFAULT_POST = 'Api/UserAddress/SetDefault' // 设置默认 地址
export const USERADDRESS_SINGLE_GET = 'Api/UserAddress/Single' // id值为空获取默认地址 如果没有默认地址则返回值为空 id 值存在则获取与id相同的地址

//  User相关的API接口
export const USER_LOGIN_POST = 'Api/User/Login'
export const USER_LOGINBYOPENID_POST = 'Api/User/LoginByOpenId' // 使用openid 完成会员登录
export const USER_GETREGFORM_GET = 'Api/User/GetRegForm' // 获取会员注册视图
export const USER_REG_POST = 'Api/User/Reg' // 会员注册
export const USER_UPDATE_PUT = 'Api/User/Update' // 修改用户信息
export const USER_CHANGEPASSWORD_PUT = 'Api/User/ChangePassword' // 修改密码，密码传入明文
export const USER_FINDPASSWORD_PUT = 'Api/User/FindPassword' // 找回密码，密码传入明文
export const USER_VIEW_GET = 'Api/User/View' // 获取推荐会员详情
export const USER_INFO_GET = 'Api/User/Info' // 会员详细信息、包括用户名、姓名、手机号地址等新
export const USER_ADDACTION_POST = 'Api/User/AddAction' // 添加操作纪律，比如添加购物车 添加收藏夹等等
export const USER_GETACTION_GET = 'Api/User/GetAction' // 获取操作记录 添加收藏夹等等
export const USER_REMOVEACTION_DELETE = 'Api/User/RemoveAction' // 移除操作记录 比如删除购物车等

//  UserDetail相关的API接口
export const USERDETAIL_QRCODE_GET = 'Api/UserDetail/QrCode' // 二维码
export const USERDETAIL_TREE_GET = 'Api/UserDetail/Tree' // 组织架构图函数
export const USERDETAIL_IDENTITY_POST = 'Api/UserDetail/Identity' // 实名认证
export const USERDETAIL_GETIDENTITY_GET = 'Api/UserDetail/GetIdentity' // 获取实名认证信息 

//  UserType相关的API接口
export const USERTYPE_GETSINGLE_GET = 'Api/UserType/GetSingle' // 查询单个用户类型的详细信息，包括部门相信信息，员工详细信息等
export const USERTYPE_GETLIST_GET = 'Api/UserType/GetList' // 查询用户类型列表，根据条件查询用户类型（部门、员工）列表
export const USERTYPE_GET_GET = 'Api/UserType/Get' // 根据Url获取单条记录
export const USERTYPE_ADD_POST = 'Api/UserType/Add' // 增加单条记录
export const USERTYPE_UPDATE_GET = 'Api/UserType/Update' // 修改单条记录
export const USERTYPE_DELETE_GET = 'Api/UserType/Delete' // 删除单条记录

//  ShareOrder相关的API接口
export const SHAREORDER_GETSINGLE_GET = 'Api/ShareOrder/GetSingle' // 查询单个订单的详细信息，包括任务执行进度、状态等
export const SHAREORDER_GETLIST_GET = 'Api/ShareOrder/GetList' // 查询分润订单列表，根据条件查询分润订单列表
export const SHAREORDER_GET_GET = 'Api/ShareOrder/Get' // 根据Url获取单条记录
export const SHAREORDER_ADD_POST = 'Api/ShareOrder/Add' // 增加单条记录
export const SHAREORDER_UPDATE_GET = 'Api/ShareOrder/Update' // 修改单条记录
export const SHAREORDER_DELETE_GET = 'Api/ShareOrder/Delete' // 删除单条记录

//  BankCard相关的API接口
export const BANKCARD_GETBANKTYPE_GET = 'Api/BankCard/GetBankType' // 获取银行卡类型
export const BANKCARD_ADD_POST = 'Api/BankCard/Add' // 添加商品到用户银行卡
export const BANKCARD_GETLIST_GET = 'Api/BankCard/GetList' // 获取用户所有银行卡数据
export const BANKCARD_DELETE_DELETE = 'Api/BankCard/Delete' // 删除用户银行卡
export const BANKCARD_UPDATE_PUT = 'Api/BankCard/Update' // 更新用户银行卡
export const BANKCARD_GET_GET = 'Api/BankCard/Get' // 获取单个银行卡信息

//  Pay相关的API接口
export const PAY_GETLIST_GET = 'Api/Pay/GetList' // 获取终端类型，返回支付类型
export const PAY_PAY_POST = 'Api/Pay/Pay' // 传入通用订单和支付方式并完成相对应的支付

//  相关的API接口
export const PAY_WAPPAYASYNC_POST = 'Pay/WapPayAsync' // 手机网站支付异步通知
export const PAY_PUBLICPAYASYNC_POST = 'Pay/PublicPayAsync' // 公众号支付异步通知

//  Recharge相关的API接口
export const RECHARGE_GETACCOUNTTYPE_GET = 'Api/Recharge/GetAccountType' // 获取允许充值的账户类型
export const RECHARGE_ADDOFFONLINE_POST = 'Api/Recharge/AddOffOnline' // 线下充值
export const RECHARGE_ADDONLINE_POST = 'Api/Recharge/AddOnline' // 线上充值
export const RECHARGE_DELETE_DELETE = 'Api/Recharge/Delete' // 删除用户充值
export const RECHARGE_GET_GET = 'Api/Recharge/Get' // 获取充值详情
export const RECHARGE_GETRECHARGEVIEW_GET = 'Api/Recharge/GetRechargeView' // 获取充值视图

//  Transfer相关的API接口
export const TRANSFER_GETTRANSFERCONFIS_GET = 'Api/Transfer/GetTransferConfis'
export const TRANSFER_ADD_POST = 'Api/Transfer/Add' // 增加单条记录
export const TRANSFER_GETREGFORM_GET = 'Api/Transfer/GetRegForm' // 获取会员注册视图
export const TRANSFER_GET_GET = 'Api/Transfer/Get' // 获取会员注册视图
export const TRANSFER_GETLIST_GET = 'Api/Transfer/GetList' // 根据Url获取列表
export const TRANSFER_UPDATE_GET = 'Api/Transfer/Update' // 修改单条记录
export const TRANSFER_DELETE_GET = 'Api/Transfer/Delete' // 删除单条记录

//  User/account相关的API接口
export const USER_ACCOUNT_ALLACCOUNTS_GET = 'Api/User/account/AllAccounts' // 所有S the accounts
export const USER_ACCOUNT_BILL_GET = 'Api/User/account/Bill' // bill  the  soecified parameter
export const USER_ACCOUNT_BILLVIEW_GET = 'Api/User/account/BillView' // bills the 视图 
export const USER_ACCOUNT_TRANSFER_GET = 'Api/User/account/Transfer' // transfers the specified parameter

//  WithDraw相关的API接口
export const WITHDRAW_GETACCOUNTTYPE_GET = 'Api/WithDraw/GetAccountType' // 获取允许提现的账户类型
export const WITHDRAW_ADD_POST = 'Api/WithDraw/Add' // 用户申请提现
export const WITHDRAW_GETUSERLIST_GET = 'Api/WithDraw/GetUserList' // 获取用户所有提现数据
export const WITHDRAW_DELETE_DELETE = 'Api/WithDraw/Delete' // 删除用户提现
export const WITHDRAW_GET_GET = 'Api/WithDraw/Get' // 获取提现详情
export const WITHDRAW_GETWITHDRAWVIEW_GET = 'Api/WithDraw/GetWithDrawView' // 获取转账视图

//  Common相关的API接口
export const COMMON_GETKEYVALUESBYENUM_GET = 'Api/Common/GetKeyValuesByEnum' // 根据枚举获取KeyValues
export const COMMON_SENDMOBILEVERIFIYCODE_POST = 'Api/Common/SendMobileVerifiyCode' // 发送手机验证码
export const COMMON_UPLOAD_POST = 'Api/Common/Upload' // 获取上传状态
export const COMMON_GETAUTOCONFIG_GET = 'Api/Common/GetAutoConfig' // 获取参数格式
export const COMMON_GETGET = 'Api/Common/GetApi' // 获取所有的Api地址

//  ApiStore相关的API接口
export const APISTORE_LOGIN_GET = 'Api/ApiStore/Login' // 微信小程序登录，微信公众号登录
export const APISTORE_WEIXINPUBLOGIN_GET = 'Api/ApiStore/WeixinPubLogin' // 微信公众号登录

//  Widget相关的API接口
export const WIDGET_CLASS_GET = 'Api/Widget/Class' // 模块分类
export const WIDGET_GET_GET = 'Api/Widget/Get' // 根据Url获取单条记录
export const WIDGET_GETLIST_GET = 'Api/Widget/GetList' // 根据Url获取列表
export const WIDGET_ADD_POST = 'Api/Widget/Add' // 增加单条记录
export const WIDGET_UPDATE_GET = 'Api/Widget/Update' // 修改单条记录
export const WIDGET_DELETE_GET = 'Api/Widget/Delete' // 删除单条记录

//  WidgetData相关的API接口
export const WIDGETDATA_GETVIEW_GET = 'Api/WidgetData/GetView' // 视图与输数据
export const WIDGETDATA_SAVE_POST = 'Api/WidgetData/Save' // 模块数据保存
export const WIDGETDATA_GET_GET = 'Api/WidgetData/Get' // 根据Url获取单条记录
export const WIDGETDATA_GETLIST_GET = 'Api/WidgetData/GetList' // 根据Url获取列表
export const WIDGETDATA_ADD_POST = 'Api/WidgetData/Add' // 增加单条记录
export const WIDGETDATA_UPDATE_GET = 'Api/WidgetData/Update' // 修改单条记录
export const WIDGETDATA_DELETE_GET = 'Api/WidgetData/Delete' // 删除单条记录

//  WidgetHistory相关的API接口
export const WIDGETHISTORY_GET_GET = 'Api/WidgetHistory/Get' // 根据Url获取单条记录
export const WIDGETHISTORY_GETLIST_GET = 'Api/WidgetHistory/GetList' // 根据Url获取列表
export const WIDGETHISTORY_ADD_POST = 'Api/WidgetHistory/Add' // 增加单条记录
export const WIDGETHISTORY_UPDATE_GET = 'Api/WidgetHistory/Update' // 修改单条记录
export const WIDGETHISTORY_DELETE_GET = 'Api/WidgetHistory/Delete' // 删除单条记录

//  WidgetSystemData相关的API接口
export const WIDGETSYSTEMDATA_GET_GET = 'Api/WidgetSystemData/Get' // 根据Url获取单条记录
export const WIDGETSYSTEMDATA_GETLIST_GET = 'Api/WidgetSystemData/GetList' // 根据Url获取列表
export const WIDGETSYSTEMDATA_ADD_POST = 'Api/WidgetSystemData/Add' // 增加单条记录
export const WIDGETSYSTEMDATA_UPDATE_GET = 'Api/WidgetSystemData/Update' // 修改单条记录
export const WIDGETSYSTEMDATA_DELETE_GET = 'Api/WidgetSystemData/Delete' // 删除单条记录

//  Site相关的API接口
export const SITE_GET_GET = 'Api/Site/Get' // 根据Url获取单条记录
export const SITE_GETLIST_GET = 'Api/Site/GetList' // 根据Url获取列表
export const SITE_ADD_POST = 'Api/Site/Add' // 增加单条记录
export const SITE_UPDATE_GET = 'Api/Site/Update' // 修改单条记录
export const SITE_DELETE_GET = 'Api/Site/Delete' // 删除单条记录

//  PageAction相关的API接口
export const PAGEACTION_GET_GET = 'Api/PageAction/Get' // 根据Url获取单条记录
export const PAGEACTION_GETLIST_GET = 'Api/PageAction/GetList' // 根据Url获取列表
export const PAGEACTION_ADD_POST = 'Api/PageAction/Add' // 增加单条记录
export const PAGEACTION_UPDATE_GET = 'Api/PageAction/Update' // 修改单条记录
export const PAGEACTION_DELETE_GET = 'Api/PageAction/Delete' // 删除单条记录

//  PageData相关的API接口
export const PAGEDATA_GET_GET = 'Api/PageData/Get' // 根据Url获取单条记录
export const PAGEDATA_GETLIST_GET = 'Api/PageData/GetList' // 根据Url获取列表
export const PAGEDATA_ADD_POST = 'Api/PageData/Add' // 增加单条记录
export const PAGEDATA_UPDATE_GET = 'Api/PageData/Update' // 修改单条记录
export const PAGEDATA_DELETE_GET = 'Api/PageData/Delete' // 删除单条记录

//  SystemPage相关的API接口
export const SYSTEMPAGE_GET_GET = 'Api/SystemPage/Get' // 根据Url获取单条记录
export const SYSTEMPAGE_GETLIST_GET = 'Api/SystemPage/GetList' // 根据Url获取列表
export const SYSTEMPAGE_ADD_POST = 'Api/SystemPage/Add' // 增加单条记录
export const SYSTEMPAGE_UPDATE_GET = 'Api/SystemPage/Update' // 修改单条记录
export const SYSTEMPAGE_DELETE_GET = 'Api/SystemPage/Delete' // 删除单条记录

//  ThemePage相关的API接口
export const THEMEPAGE_GETTHEMEPAGE_GET = 'Api/ThemePage/GetThemePage' // 获取当前页面的配置信息
export const THEMEPAGE_GETTHEMEPAGELIST_GET = 'Api/ThemePage/GetThemePageList' // 获取当前终端的页面，构建左侧菜单
export const THEMEPAGE_SAVE_POST = 'Api/ThemePage/Save' // Diy保存
export const THEMEPAGE_GET_GET = 'Api/ThemePage/Get' // 根据Url获取单条记录
export const THEMEPAGE_GETLIST_GET = 'Api/ThemePage/GetList' // 根据Url获取列表
export const THEMEPAGE_ADD_POST = 'Api/ThemePage/Add' // 增加单条记录
export const THEMEPAGE_UPDATE_GET = 'Api/ThemePage/Update' // 修改单条记录
export const THEMEPAGE_DELETE_GET = 'Api/ThemePage/Delete' // 删除单条记录

//  Layout相关的API接口
export const LAYOUT_GET_GET = 'Api/Layout/Get' // 根据Url获取单条记录
export const LAYOUT_GETLIST_GET = 'Api/Layout/GetList' // 根据Url获取列表
export const LAYOUT_ADD_POST = 'Api/Layout/Add' // 增加单条记录
export const LAYOUT_UPDATE_GET = 'Api/Layout/Update' // 修改单条记录
export const LAYOUT_DELETE_GET = 'Api/Layout/Delete' // 删除单条记录

//  Union相关的API接口
export const UNION_GET_GET = 'Api/Union/Get' // 根据Url获取单条记录
export const UNION_GETLIST_GET = 'Api/Union/GetList' // 根据Url获取列表
export const UNION_ADD_POST = 'Api/Union/Add' // 增加单条记录
export const UNION_UPDATE_GET = 'Api/Union/Update' // 修改单条记录
export const UNION_DELETE_GET = 'Api/Union/Delete' // 删除单条记录

//  Element相关的API接口
export const ELEMENT_GET_GET = 'Api/Element/Get' // 根据Url获取单条记录
export const ELEMENT_GETLIST_GET = 'Api/Element/GetList' // 根据Url获取列表
export const ELEMENT_ADD_POST = 'Api/Element/Add' // 增加单条记录
export const ELEMENT_UPDATE_GET = 'Api/Element/Update' // 修改单条记录
export const ELEMENT_DELETE_GET = 'Api/Element/Delete' // 删除单条记录

//  Component相关的API接口
export const COMPONENT_GET_GET = 'Api/Component/Get' // 根据Url获取单条记录
export const COMPONENT_GETLIST_GET = 'Api/Component/GetList' // 根据Url获取列表
export const COMPONENT_ADD_POST = 'Api/Component/Add' // 增加单条记录
export const COMPONENT_UPDATE_GET = 'Api/Component/Update' // 修改单条记录
export const COMPONENT_DELETE_GET = 'Api/Component/Delete' // 删除单条记录

//  Border相关的API接口
export const BORDER_GET_GET = 'Api/Border/Get' // 根据Url获取单条记录
export const BORDER_GETLIST_GET = 'Api/Border/GetList' // 根据Url获取列表
export const BORDER_ADD_POST = 'Api/Border/Add' // 增加单条记录
export const BORDER_UPDATE_GET = 'Api/Border/Update' // 修改单条记录
export const BORDER_DELETE_GET = 'Api/Border/Delete' // 删除单条记录

//  ApiAddress相关的API接口
export const APIADDRESS_GET_GET = 'Api/ApiAddress/Get' // 根据Url获取单条记录
export const APIADDRESS_GETLIST_GET = 'Api/ApiAddress/GetList' // 根据Url获取列表
export const APIADDRESS_ADD_POST = 'Api/ApiAddress/Add' // 增加单条记录
export const APIADDRESS_UPDATE_GET = 'Api/ApiAddress/Update' // 修改单条记录
export const APIADDRESS_DELETE_GET = 'Api/ApiAddress/Delete' // 删除单条记录

//  WorkOrder相关的API接口
export const WORKORDER_FEEDBACK_GET = 'Api/WorkOrder/FeedBack'
export const WORKORDER_FEEDBACK_POST = 'Api/WorkOrder/FeedBack'
export const WORKORDER_GET_GET = 'Api/WorkOrder/Get' // 根据Url获取单条记录
export const WORKORDER_GETLIST_GET = 'Api/WorkOrder/GetList' // 根据Url获取列表
export const WORKORDER_ADD_POST = 'Api/WorkOrder/Add' // 增加单条记录
export const WORKORDER_UPDATE_GET = 'Api/WorkOrder/Update' // 修改单条记录
export const WORKORDER_DELETE_GET = 'Api/WorkOrder/Delete' // 删除单条记录

//  Article相关的API接口
export const ARTICLE_ARTICLEDETAIL_GET = 'Api/Article/ArticleDetail' // 内容详情页面
export const ARTICLE_ABOUTDETAIL_GET = 'Api/Article/AboutDetail' // 帮助内容
export const ARTICLE_GET_GET = 'Api/Article/Get' // 根据Url获取单条记录
export const ARTICLE_GETLIST_GET = 'Api/Article/GetList' // 根据Url获取列表
export const ARTICLE_ADD_POST = 'Api/Article/Add' // 增加单条记录
export const ARTICLE_UPDATE_GET = 'Api/Article/Update' // 修改单条记录
export const ARTICLE_DELETE_GET = 'Api/Article/Delete' // 删除单条记录

//  User/Debt相关的API接口
export const USER_DEBT_APPLY_POST = 'Api/User/Debt/Apply' // 债事提交
export const USER_DEBT_DELETE_GET = 'Api/User/Debt/Delete' // 债事删除
export const USER_DEBT_LIST_GET = 'Api/User/Debt/List' // 我的债事
export const USER_DEBT_DEBTBULLETIN_GET = 'Api/User/Debt/DebtBulletin' // 债事详细
export const USER_DEBT_COUNT_GET = 'Api/User/Debt/Count' // 数据统计
export const USER_DEBT_SHOW_GET = 'Api/User/Debt/Show' // 债事显示
export const USER_DEBT_SOLUTION_POST = 'Api/User/Debt/Solution' // 解决方案选择

//  UserStock相关的API接口
export const USERSTOCK_GETLIST_GET = 'Api/UserStock/GetList' // 查询用户库存列表，根据条件查询用户库存列表
export const USERSTOCK_GETPRODUCTLIST_GET = 'Api/UserStock/GetProductList' // 查询摘要
export const USERSTOCK_OFFLINEDELIVERYPRODUCT_GET = 'Api/UserStock/OfflineDeliveryProduct' // 根据订单，查询订单发货商品以及发货商品数量
export const USERSTOCK_OFFLINEDELIVERY_POST = 'Api/UserStock/OfflineDelivery' // 线下发货
export const USERSTOCK_GET_GET = 'Api/UserStock/Get' // 根据Url获取单条记录
export const USERSTOCK_ADD_POST = 'Api/UserStock/Add' // 增加单条记录
export const USERSTOCK_UPDATE_GET = 'Api/UserStock/Update' // 修改单条记录
export const USERSTOCK_DELETE_GET = 'Api/UserStock/Delete' // 删除单条记录

//  User/Reward相关的API接口
export const USER_REWARD_LIST_GET = 'Api/User/Reward/List' // 列出指定的参数
export const USER_REWARD_SHOW_GET = 'Api/User/Reward/Show' // 列出指定的参数

//  Theme相关的API接口
export const THEME_GETPAGE_GET = 'Api/Theme/GetPage' // 获取页面配置
export const THEME_GETLINK_GET = 'Api/Theme/GetLink' // 链接
export const THEME_GET_GET = 'Api/Theme/Get' // 根据Url获取单条记录
export const THEME_GETLIST_GET = 'Api/Theme/GetList' // 根据Url获取列表
export const THEME_ADD_POST = 'Api/Theme/Add' // 增加单条记录
export const THEME_UPDATE_GET = 'Api/Theme/Update' // 修改单条记录
export const THEME_DELETE_GET = 'Api/Theme/Delete' // 删除单条记录

//  ThemePageWidget相关的API接口
export const THEMEPAGEWIDGET_SAVEASYNC_POST = 'Api/ThemePageWidget/SaveAsync' // 保存模块
export const THEMEPAGEWIDGET_GET_GET = 'Api/ThemePageWidget/Get' // 根据Url获取单条记录
export const THEMEPAGEWIDGET_GETLIST_GET = 'Api/ThemePageWidget/GetList' // 根据Url获取列表
export const THEMEPAGEWIDGET_ADD_POST = 'Api/ThemePageWidget/Add' // 增加单条记录
export const THEMEPAGEWIDGET_UPDATE_GET = 'Api/ThemePageWidget/Update' // 修改单条记录
export const THEMEPAGEWIDGET_DELETE_GET = 'Api/ThemePageWidget/Delete' // 删除单条记录

//  Product相关的API接口
export const PRODUCT_SHOW_GET = 'Api/Product/Show' // 商品详情
export const PRODUCT_LIST_GET = 'Api/Product/List' // 商品列表，对应zk-product-item
export const PRODUCT_CLASS_GET = 'Api/Product/Class' // 商品分类Api接口
export const PRODUCT_FAVORITEPRODUCT_GET = 'Api/Product/FavoriteProduct' // 我的分类收藏夹
export const PRODUCT_FOOTPRINTPRODUCT_GET = 'Api/Product/FootprintProduct' // 我的足迹
export const PRODUCT_PRODUCTCARTPRODUCT_GET = 'Api/Product/ProductCartProduct' // 我的购物车
export const PRODUCT_GET_GET = 'Api/Product/Get' // 根据Url获取单条记录
export const PRODUCT_GETLIST_GET = 'Api/Product/GetList' // 根据Url获取列表
export const PRODUCT_ADD_POST = 'Api/Product/Add' // 增加单条记录
export const PRODUCT_UPDATE_GET = 'Api/Product/Update' // 修改单条记录
export const PRODUCT_DELETE_GET = 'Api/Product/Delete' // 删除单条记录

//  Cart相关的API接口
export const CART_ADDCART_POST = 'Api/Cart/AddCart' // 添加商品到购物车
export const CART_GETCART_GET = 'Api/Cart/GetCart' // 获取购物车数据
export const CART_REMOVECART_DELETE = 'Api/Cart/RemoveCart' // 删除购物车
export const CART_UPDATECART_PUT = 'Api/Cart/UpdateCart' // 更新购物车

//  Order相关的API接口
export const ORDER_INDEX_GET = 'Api/Order/Index' // 我的订单
export const ORDER_CANCEL_GET = 'Api/Order/Cancel' // 订单取消
export const ORDER_SHOW_GET = 'Api/Order/Show' // 订单详情
export const ORDER_GETPRICE_POST = 'Api/Order/GetPrice' // 获取价格
export const ORDER_BUY_POST = 'Api/Order/Buy' // 立即购买，商品购买，提交订单时候用，包括购物车购买
export const ORDER_BUYINFO_POST = 'Api/Order/BuyInfo' // 商品的SKUid，确认订单页面，获取商品购买信息，每次修改价格通过此方法计算，在/order/buy页面使用
export const ORDER_RATE_POST = 'Api/Order/Rate' // 用户评论
export const ORDER_CONFIRM_POST = 'Api/Order/Confirm' // 收货确认

//  GroupBuy相关的API接口
export const GROUPBUY_PRODUCTRECORD_GET = 'Api/GroupBuy/ProductRecord' // 拼团记录，根据商品id获取商品id获取商品的拼团记录
export const GROUPBUY_LIST_GET = 'Api/GroupBuy/List' // 拼团记录列表
export const GROUPBUY_PRODUCTS_GET = 'Api/GroupBuy/Products' // 拼团商品列表
export const GROUPBUY_ORDERGROUPUSER_GET = 'Api/GroupBuy/OrderGroupUser' // 订单拼团用户，根据订单id获取订单拼团用户

//  Activity相关的API接口
export const ACTIVITY_GET_GET = 'Api/Activity/Get' // 根据Url获取单条记录
export const ACTIVITY_GETLIST_GET = 'Api/Activity/GetList' // 根据Url获取列表
export const ACTIVITY_ADD_POST = 'Api/Activity/Add' // 增加单条记录
export const ACTIVITY_UPDATE_GET = 'Api/Activity/Update' // 修改单条记录
export const ACTIVITY_DELETE_GET = 'Api/Activity/Delete' // 删除单条记录

