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
export const USERADDRESS_GETADDADDRESSFORM_GET = '/api/useraddress/getaddaddressform' // 获取添加地址视图
export const USERADDRESS_ADD_POST = '/api/useraddress/add' // 添加商品到用户地址
export const USERADDRESS_GET_GET = '/api/useraddress/get' // 获取用户地址数据
export const USERADDRESS_DELETE_DELETE = '/api/useraddress/delete' // 删除用户地址
export const USERADDRESS_UPDATE_PUT = '/api/useraddress/update' // 更新用户地址
export const USERADDRESS_SETDEFAULT_POST = '/api/useraddress/setdefault' // 设置默认 地址
export const USERADDRESS_SINGLE_GET = '/api/useraddress/single' // id值为空获取默认地址 如果没有默认地址则返回值为空 id 值存在则获取与id相同的地址

//  User相关的API接口
export const USER_RECOMMEND_GET = '/api/user/recommend' // 推荐会员
export const USER_LOGIN_POST = '/api/user/login' // 会员登录
export const USER_LOGINBYOPENID_POST = '/api/user/loginbyopenid' // 使用openid 完成会员登录
export const USER_GETREGFORM_GET = '/api/user/getregform' // 获取会员注册视图
export const USER_GETLOGINFORM_GET = '/api/user/getloginform' // 获取会员登陆视图
export const USER_GETFINDPASSWORDFORM_GET = '/api/user/getfindpasswordform' // 获取会员找回密码视图
export const USER_GETPASSWORDFORM_GET = '/api/user/getpasswordform' // 获取会员修改密码视图
export const USER_REG_POST = '/api/user/reg' // 会员注册
export const USER_UPDATE_PUT = '/api/user/update' // 修改用户信息
export const USER_CHANGEPASSWORD_PUT = '/api/user/changepassword' // 修改密码，密码传入明文
export const USER_FINDPASSWORD_PUT = '/api/user/findpassword' // 找回密码，密码传入明文
export const USER_VIEW_GET = '/api/user/view' // 获取推荐会员详情
export const USER_PREVIEW_GET = '/api/user/preview' // 获取推荐会员详情
export const USER_INFO_GET = '/api/user/info' // 会员详细信息、包括用户名、姓名、手机号地址等新
export const USER_ADDACTION_POST = '/api/user/addaction' // 添加操作纪律，比如添加购物车 添加收藏夹等等
export const USER_GETACTION_GET = '/api/user/getaction' // 获取操作记录 添加收藏夹等等
export const USER_REMOVEACTION_DELETE = '/api/user/removeaction' // 移除操作记录 比如删除购物车等

//  UserDetail相关的API接口
export const USERDETAIL_QRCODE_GET = '/api/userdetail/qrcode' // 二维码
export const USERDETAIL_TREE_GET = '/api/userdetail/tree' // 组织架构图函数
export const USERDETAIL_GETIDENTITYFORM_GET = '/api/userdetail/getidentityform' // 获取实名认证视图
export const USERDETAIL_IDENTITY_POST = '/api/userdetail/identity' // 实名认证
export const USERDETAIL_GETIDENTITY_GET = '/api/userdetail/getidentity' // 获取实名认证信息 

//  UserType相关的API接口
export const USERTYPE_GETSINGLE_GET = '/api/usertype/getsingle' // 查询单个用户类型的详细信息，包括部门相信信息，员工详细信息等
export const USERTYPE_GETLIST_GET = '/api/usertype/getlist' // 查询用户类型列表，根据条件查询用户类型（部门、员工）列表
export const USERTYPE_GET_GET = '/api/usertype/get' // 根据Url获取单条记录
export const USERTYPE_ADD_POST = '/api/usertype/add' // 增加单条记录
export const USERTYPE_UPDATE_GET = '/api/usertype/update' // 修改单条记录
export const USERTYPE_DELETE_GET = '/api/usertype/delete' // 删除单条记录

//  ShareOrder相关的API接口
export const SHAREORDER_GETSINGLE_GET = '/api/shareorder/getsingle' // 查询单个订单的详细信息，包括任务执行进度、状态等
export const SHAREORDER_GETLIST_GET = '/api/shareorder/getlist' // 查询分润订单列表，根据条件查询分润订单列表
export const SHAREORDER_GET_GET = '/api/shareorder/get' // 根据Url获取单条记录
export const SHAREORDER_ADD_POST = '/api/shareorder/add' // 增加单条记录
export const SHAREORDER_UPDATE_GET = '/api/shareorder/update' // 修改单条记录
export const SHAREORDER_DELETE_GET = '/api/shareorder/delete' // 删除单条记录

//  BankCard相关的API接口
export const BANKCARD_GETBANKTYPE_GET = '/api/bankcard/getbanktype' // 获取银行卡类型
export const BANKCARD_ADD_POST = '/api/bankcard/add' // 添加商品到用户银行卡
export const BANKCARD_GETLIST_GET = '/api/bankcard/getlist' // 获取用户所有银行卡数据
export const BANKCARD_DELETE_DELETE = '/api/bankcard/delete' // 删除用户银行卡
export const BANKCARD_UPDATE_PUT = '/api/bankcard/update' // 更新用户银行卡
export const BANKCARD_GET_GET = '/api/bankcard/get' // 获取单个银行卡信息

//  Pay相关的API接口
export const PAY_GETLIST_GET = '/api/pay/getlist' // 获取终端类型，返回支付类型
export const PAY_PAY_POST = '/api/pay/pay' // 传入通用订单和支付方式并完成相对应的支付

//  相关的API接口
export const PAY_WAPPAYASYNC_POST = '/pay/wappayasync' // 手机网站支付异步通知
export const PAY_PUBLICPAYASYNC_POST = '/pay/publicpayasync' // 公众号支付异步通知

//  Recharge相关的API接口
export const RECHARGE_GETACCOUNTTYPE_GET = '/api/recharge/getaccounttype' // 获取允许充值的账户类型
export const RECHARGE_ADDOFFONLINE_POST = '/api/recharge/addoffonline' // 线下充值
export const RECHARGE_ADDONLINE_POST = '/api/recharge/addonline' // 线上充值
export const RECHARGE_DELETE_DELETE = '/api/recharge/delete' // 删除用户充值
export const RECHARGE_GET_GET = '/api/recharge/get' // 获取充值详情
export const RECHARGE_GETRECHARGEVIEW_GET = '/api/recharge/getrechargeview' // 获取充值视图

//  Transfer相关的API接口
export const TRANSFER_GETTRANSFERCONFIS_GET = '/api/transfer/gettransferconfis'
export const TRANSFER_ADD_POST = '/api/transfer/add'
export const TRANSFER_GETREGFORM_GET = '/api/transfer/getregform' // 获取转账视图
export const TRANSFER_GET_GET = '/api/transfer/get' // 获取转账视图
export const TRANSFER_GETLIST_GET = '/api/transfer/getlist' // 根据Url获取列表
export const TRANSFER_UPDATE_GET = '/api/transfer/update' // 修改单条记录
export const TRANSFER_DELETE_GET = '/api/transfer/delete' // 删除单条记录

//  User/account相关的API接口
export const USER_ACCOUNT_ALLACCOUNTS_GET = '/api/user/account/allaccounts' // 所有S the accounts
export const USER_ACCOUNT_BILL_GET = '/api/user/account/bill' // bill  the  soecified parameter
export const USER_ACCOUNT_BILLVIEW_GET = '/api/user/account/billview' // bills the 视图 
export const USER_ACCOUNT_TRANSFER_GET = '/api/user/account/transfer' // transfers the specified parameter

//  WithDraw相关的API接口
export const WITHDRAW_GETACCOUNTTYPE_GET = '/api/withdraw/getaccounttype' // 获取允许提现的账户类型
export const WITHDRAW_ADD_POST = '/api/withdraw/add' // 用户申请提现
export const WITHDRAW_GETUSERLIST_GET = '/api/withdraw/getuserlist' // 获取用户所有提现数据
export const WITHDRAW_DELETE_DELETE = '/api/withdraw/delete' // 删除用户提现
export const WITHDRAW_GET_GET = '/api/withdraw/get' // 获取提现详情
export const WITHDRAW_GETWITHDRAWFORM_GET = '/api/withdraw/getwithdrawform' // 获取转账视图

//  Common相关的API接口
export const COMMON_GETKEYVALUESBYENUM_GET = '/api/common/getkeyvaluesbyenum' // 根据枚举获取KeyValues
export const COMMON_SENDMOBILEVERIFIYCODE_POST = '/api/common/sendmobileverifiycode' // 发送手机验证码
export const COMMON_UPLOAD_POST = '/api/common/upload' // 获取上传状态
export const COMMON_GETAUTOCONFIG_GET = '/api/common/getautoconfig' // 获取参数格式
export const COMMON_GETGET = '/api/common/getapi' // 获取所有的Api地址

//  ApiStore相关的API接口
export const APISTORE_LOGIN_GET = '/api/apistore/login' // 微信小程序登录，微信公众号登录
export const APISTORE_WEIXINPUBLOGIN_GET = '/api/apistore/weixinpublogin' // 微信公众号登录

//  Widget相关的API接口
export const WIDGET_CLASS_GET = '/api/widget/class' // 模块分类
export const WIDGET_GET_GET = '/api/widget/get' // 根据Url获取单条记录
export const WIDGET_GETLIST_GET = '/api/widget/getlist' // 根据Url获取列表
export const WIDGET_ADD_POST = '/api/widget/add' // 增加单条记录
export const WIDGET_UPDATE_GET = '/api/widget/update' // 修改单条记录
export const WIDGET_DELETE_GET = '/api/widget/delete' // 删除单条记录

//  WidgetData相关的API接口
export const WIDGETDATA_GETVIEW_GET = '/api/widgetdata/getview' // 视图与输数据
export const WIDGETDATA_SAVE_POST = '/api/widgetdata/save' // 模块数据保存
export const WIDGETDATA_GET_GET = '/api/widgetdata/get' // 根据Url获取单条记录
export const WIDGETDATA_GETLIST_GET = '/api/widgetdata/getlist' // 根据Url获取列表
export const WIDGETDATA_ADD_POST = '/api/widgetdata/add' // 增加单条记录
export const WIDGETDATA_UPDATE_GET = '/api/widgetdata/update' // 修改单条记录
export const WIDGETDATA_DELETE_GET = '/api/widgetdata/delete' // 删除单条记录

//  WidgetHistory相关的API接口
export const WIDGETHISTORY_GET_GET = '/api/widgethistory/get' // 根据Url获取单条记录
export const WIDGETHISTORY_GETLIST_GET = '/api/widgethistory/getlist' // 根据Url获取列表
export const WIDGETHISTORY_ADD_POST = '/api/widgethistory/add' // 增加单条记录
export const WIDGETHISTORY_UPDATE_GET = '/api/widgethistory/update' // 修改单条记录
export const WIDGETHISTORY_DELETE_GET = '/api/widgethistory/delete' // 删除单条记录

//  WidgetSystemData相关的API接口
export const WIDGETSYSTEMDATA_GET_GET = '/api/widgetsystemdata/get' // 根据Url获取单条记录
export const WIDGETSYSTEMDATA_GETLIST_GET = '/api/widgetsystemdata/getlist' // 根据Url获取列表
export const WIDGETSYSTEMDATA_ADD_POST = '/api/widgetsystemdata/add' // 增加单条记录
export const WIDGETSYSTEMDATA_UPDATE_GET = '/api/widgetsystemdata/update' // 修改单条记录
export const WIDGETSYSTEMDATA_DELETE_GET = '/api/widgetsystemdata/delete' // 删除单条记录

//  Site相关的API接口
export const SITE_GET_GET = '/api/site/get' // 根据Url获取单条记录
export const SITE_GETLIST_GET = '/api/site/getlist' // 根据Url获取列表
export const SITE_ADD_POST = '/api/site/add' // 增加单条记录
export const SITE_UPDATE_GET = '/api/site/update' // 修改单条记录
export const SITE_DELETE_GET = '/api/site/delete' // 删除单条记录

//  PageAction相关的API接口
export const PAGEACTION_GET_GET = '/api/pageaction/get' // 根据Url获取单条记录
export const PAGEACTION_GETLIST_GET = '/api/pageaction/getlist' // 根据Url获取列表
export const PAGEACTION_ADD_POST = '/api/pageaction/add' // 增加单条记录
export const PAGEACTION_UPDATE_GET = '/api/pageaction/update' // 修改单条记录
export const PAGEACTION_DELETE_GET = '/api/pageaction/delete' // 删除单条记录

//  PageData相关的API接口
export const PAGEDATA_GET_GET = '/api/pagedata/get' // 根据Url获取单条记录
export const PAGEDATA_GETLIST_GET = '/api/pagedata/getlist' // 根据Url获取列表
export const PAGEDATA_ADD_POST = '/api/pagedata/add' // 增加单条记录
export const PAGEDATA_UPDATE_GET = '/api/pagedata/update' // 修改单条记录
export const PAGEDATA_DELETE_GET = '/api/pagedata/delete' // 删除单条记录

//  SystemPage相关的API接口
export const SYSTEMPAGE_GET_GET = '/api/systempage/get' // 根据Url获取单条记录
export const SYSTEMPAGE_GETLIST_GET = '/api/systempage/getlist' // 根据Url获取列表
export const SYSTEMPAGE_ADD_POST = '/api/systempage/add' // 增加单条记录
export const SYSTEMPAGE_UPDATE_GET = '/api/systempage/update' // 修改单条记录
export const SYSTEMPAGE_DELETE_GET = '/api/systempage/delete' // 删除单条记录

//  ThemePage相关的API接口
export const THEMEPAGE_GETTHEMEPAGE_GET = '/api/themepage/getthemepage' // 获取当前页面的配置信息
export const THEMEPAGE_GETTHEMEPAGELIST_GET = '/api/themepage/getthemepagelist' // 获取当前终端的页面，构建左侧菜单
export const THEMEPAGE_SAVE_POST = '/api/themepage/save' // Diy保存
export const THEMEPAGE_GET_GET = '/api/themepage/get' // 根据Url获取单条记录
export const THEMEPAGE_GETLIST_GET = '/api/themepage/getlist' // 根据Url获取列表
export const THEMEPAGE_ADD_POST = '/api/themepage/add' // 增加单条记录
export const THEMEPAGE_UPDATE_GET = '/api/themepage/update' // 修改单条记录
export const THEMEPAGE_DELETE_GET = '/api/themepage/delete' // 删除单条记录
export const THEMEPAGE_SAVEASYNC_POST = '/api/themepage/saveasync' // DIY页面保存

//  Layout相关的API接口
export const LAYOUT_GET_GET = '/api/layout/get' // 根据Url获取单条记录
export const LAYOUT_GETLIST_GET = '/api/layout/getlist' // 根据Url获取列表
export const LAYOUT_ADD_POST = '/api/layout/add' // 增加单条记录
export const LAYOUT_UPDATE_GET = '/api/layout/update' // 修改单条记录
export const LAYOUT_DELETE_GET = '/api/layout/delete' // 删除单条记录

//  Union相关的API接口
export const UNION_GET_GET = '/api/union/get' // 根据Url获取单条记录
export const UNION_GETLIST_GET = '/api/union/getlist' // 根据Url获取列表
export const UNION_ADD_POST = '/api/union/add' // 增加单条记录
export const UNION_UPDATE_GET = '/api/union/update' // 修改单条记录
export const UNION_DELETE_GET = '/api/union/delete' // 删除单条记录

//  Element相关的API接口
export const ELEMENT_GET_GET = '/api/element/get' // 根据Url获取单条记录
export const ELEMENT_GETLIST_GET = '/api/element/getlist' // 根据Url获取列表
export const ELEMENT_ADD_POST = '/api/element/add' // 增加单条记录
export const ELEMENT_UPDATE_GET = '/api/element/update' // 修改单条记录
export const ELEMENT_DELETE_GET = '/api/element/delete' // 删除单条记录

//  Component相关的API接口
export const COMPONENT_GET_GET = '/api/component/get' // 根据Url获取单条记录
export const COMPONENT_GETLIST_GET = '/api/component/getlist' // 根据Url获取列表
export const COMPONENT_ADD_POST = '/api/component/add' // 增加单条记录
export const COMPONENT_UPDATE_GET = '/api/component/update' // 修改单条记录
export const COMPONENT_DELETE_GET = '/api/component/delete' // 删除单条记录

//  Border相关的API接口
export const BORDER_GET_GET = '/api/border/get' // 根据Url获取单条记录
export const BORDER_GETLIST_GET = '/api/border/getlist' // 根据Url获取列表
export const BORDER_ADD_POST = '/api/border/add' // 增加单条记录
export const BORDER_UPDATE_GET = '/api/border/update' // 修改单条记录
export const BORDER_DELETE_GET = '/api/border/delete' // 删除单条记录

//  ApiAddress相关的API接口
export const APIADDRESS_GET_GET = '/api/apiaddress/get' // 根据Url获取单条记录
export const APIADDRESS_GETLIST_GET = '/api/apiaddress/getlist' // 根据Url获取列表
export const APIADDRESS_ADD_POST = '/api/apiaddress/add' // 增加单条记录
export const APIADDRESS_UPDATE_GET = '/api/apiaddress/update' // 修改单条记录
export const APIADDRESS_DELETE_GET = '/api/apiaddress/delete' // 删除单条记录

//  WorkOrder相关的API接口
export const WORKORDER_GET_GET = '/api/workorder/get' // 根据Url获取单条记录
export const WORKORDER_GETLIST_GET = '/api/workorder/getlist' // 根据Url获取列表
export const WORKORDER_ADD_POST = '/api/workorder/add' // 增加单条记录
export const WORKORDER_UPDATE_GET = '/api/workorder/update' // 修改单条记录
export const WORKORDER_DELETE_GET = '/api/workorder/delete' // 删除单条记录

//  About相关的API接口
export const ABOUT_GET_GET = '/api/about/get' // 根据Url获取单条记录
export const ABOUT_GETLIST_GET = '/api/about/getlist' // 根据Url获取列表
export const ABOUT_ADD_POST = '/api/about/add' // 增加单条记录
export const ABOUT_UPDATE_GET = '/api/about/update' // 修改单条记录
export const ABOUT_DELETE_GET = '/api/about/delete' // 删除单条记录

//  Article相关的API接口
export const ARTICLE_ARTICLEDETAIL_GET = '/api/article/articledetail' // 内容详情页面
export const ARTICLE_USERNOTICELIST_GET = '/api/article/usernoticelist' // 公告
export const ARTICLE_TOPLINELIST_GET = '/api/article/toplinelist' // 头条列表
export const ARTICLE_ARTICLELIST_GET = '/api/article/articlelist' // 文章列表
export const ARTICLE_HELPLIST_GET = '/api/article/helplist' // 客服列表
export const ARTICLE_ABOUTDETAIL_GET = '/api/article/aboutdetail' // 帮助内容
export const ARTICLE_GET_GET = '/api/article/get' // 根据Url获取单条记录
export const ARTICLE_GETLIST_GET = '/api/article/getlist' // 根据Url获取列表
export const ARTICLE_ADD_POST = '/api/article/add' // 增加单条记录
export const ARTICLE_UPDATE_GET = '/api/article/update' // 修改单条记录
export const ARTICLE_DELETE_GET = '/api/article/delete' // 删除单条记录

//  Channel相关的API接口
export const CHANNEL_GET_GET = '/api/channel/get' // 根据Url获取单条记录
export const CHANNEL_GETLIST_GET = '/api/channel/getlist' // 根据Url获取列表
export const CHANNEL_ADD_POST = '/api/channel/add' // 增加单条记录
export const CHANNEL_UPDATE_GET = '/api/channel/update' // 修改单条记录
export const CHANNEL_DELETE_GET = '/api/channel/delete' // 删除单条记录

//  SinglePage相关的API接口
export const SINGLEPAGE_GET_GET = '/api/singlepage/get' // 根据Url获取单条记录
export const SINGLEPAGE_GETLIST_GET = '/api/singlepage/getlist' // 根据Url获取列表
export const SINGLEPAGE_ADD_POST = '/api/singlepage/add' // 增加单条记录
export const SINGLEPAGE_UPDATE_GET = '/api/singlepage/update' // 修改单条记录
export const SINGLEPAGE_DELETE_GET = '/api/singlepage/delete' // 删除单条记录

//  Special相关的API接口
export const SPECIAL_GET_GET = '/api/special/get' // 根据Url获取单条记录
export const SPECIAL_GETLIST_GET = '/api/special/getlist' // 根据Url获取列表
export const SPECIAL_ADD_POST = '/api/special/add' // 增加单条记录
export const SPECIAL_UPDATE_GET = '/api/special/update' // 修改单条记录
export const SPECIAL_DELETE_GET = '/api/special/delete' // 删除单条记录

//  Diy相关的API接口
export const DIY_SEARCHKEYWORD_GET = '/api/diy/searchkeyword' // 获取搜索关键字
export const DIY_GETLINK_GET = '/api/diy/getlink' // 获取链接地址，比如轮播图，首页链接地址等
export const DIY_GETLIST_GET = '/api/diy/getlist' // 获取ZKList数据，不需要会员登录
export const DIY_GETLISTBYLOGIN_GET = '/api/diy/getlistbylogin' // 获取ZKList数据，需要会员登录

//  User/Debt相关的API接口
export const USER_DEBT_APPLY_POST = '/api/user/debt/apply' // 债事提交
export const USER_DEBT_DELETE_GET = '/api/user/debt/delete' // 债事删除
export const USER_DEBT_LIST_GET = '/api/user/debt/list' // 我的债事
export const USER_DEBT_DEBTBULLETIN_GET = '/api/user/debt/debtbulletin' // 债事详细
export const USER_DEBT_COUNT_GET = '/api/user/debt/count' // 数据统计
export const USER_DEBT_SHOW_GET = '/api/user/debt/show' // 债事显示
export const USER_DEBT_SOLUTION_POST = '/api/user/debt/solution' // 解决方案选择

//  UserStock相关的API接口
export const USERSTOCK_GETLIST_GET = '/api/userstock/getlist' // 查询用户库存列表，根据条件查询用户库存列表
export const USERSTOCK_GETPRODUCTLIST_GET = '/api/userstock/getproductlist' // 查询摘要
export const USERSTOCK_OFFLINEDELIVERYPRODUCT_GET = '/api/userstock/offlinedeliveryproduct' // 根据订单，查询订单发货商品以及发货商品数量
export const USERSTOCK_OFFLINEDELIVERY_POST = '/api/userstock/offlinedelivery' // 线下发货
export const USERSTOCK_GET_GET = '/api/userstock/get' // 根据Url获取单条记录
export const USERSTOCK_ADD_POST = '/api/userstock/add' // 增加单条记录
export const USERSTOCK_UPDATE_GET = '/api/userstock/update' // 修改单条记录
export const USERSTOCK_DELETE_GET = '/api/userstock/delete' // 删除单条记录

//  User/Reward相关的API接口
export const USER_REWARD_REWARDLIST_GET = '/api/user/reward/rewardlist' // 分润数据
export const USER_REWARD_LIST_GET = '/api/user/reward/list' // 列出指定的参数
export const USER_REWARD_SHOW_GET = '/api/user/reward/show' // 列出指定的参数
export const USER_REWARD_GET_GET = '/api/user/reward/get' // 根据Url获取单条记录
export const USER_REWARD_GETLIST_GET = '/api/user/reward/getlist' // 根据Url获取列表
export const USER_REWARD_ADD_POST = '/api/user/reward/add' // 增加单条记录
export const USER_REWARD_UPDATE_GET = '/api/user/reward/update' // 修改单条记录
export const USER_REWARD_DELETE_GET = '/api/user/reward/delete' // 删除单条记录

//  Theme相关的API接口
export const THEME_GETPAGE_GET = '/api/theme/getpage' // 获取页面配置
export const THEME_GETLINK_GET = '/api/theme/getlink' // 链接
export const THEME_GETVALUE_GET = '/api/theme/getvalue' // 链接
export const THEME_GETLIST_GET = '/api/theme/getlist' // zk-list数据接口
export const THEME_GET_GET = '/api/theme/get' // 根据Url获取单条记录
export const THEME_ADD_POST = '/api/theme/add' // 增加单条记录
export const THEME_UPDATE_GET = '/api/theme/update' // 修改单条记录
export const THEME_DELETE_GET = '/api/theme/delete' // 删除单条记录

//  ThemePageWidget相关的API接口
export const THEMEPAGEWIDGET_SAVEASYNC_POST = '/api/themepagewidget/saveasync' // 保存模块数据
export const THEMEPAGEWIDGET_GET_GET = '/api/themepagewidget/get' // 根据Url获取单条记录
export const THEMEPAGEWIDGET_GETLIST_GET = '/api/themepagewidget/getlist' // 根据Url获取列表
export const THEMEPAGEWIDGET_ADD_POST = '/api/themepagewidget/add' // 增加单条记录
export const THEMEPAGEWIDGET_UPDATE_GET = '/api/themepagewidget/update' // 修改单条记录
export const THEMEPAGEWIDGET_DELETE_GET = '/api/themepagewidget/delete' // 删除单条记录

//  Product相关的API接口
export const PRODUCT_SHOW_GET = '/api/product/show' // 商品详情
export const PRODUCT_LIST_GET = '/api/product/list' // 商品列表，对应zk-product-item
export const PRODUCT_CLASS_GET = '/api/product/class' // 商品分类Api接口
export const PRODUCT_FAVORITEPRODUCT_GET = '/api/product/favoriteproduct' // 我的分类收藏夹
export const PRODUCT_FOOTPRINTPRODUCT_GET = '/api/product/footprintproduct' // 我的足迹
export const PRODUCT_PRODUCTCARTPRODUCT_GET = '/api/product/productcartproduct' // 我的购物车
export const PRODUCT_GET_GET = '/api/product/get' // 根据Url获取单条记录
export const PRODUCT_GETLIST_GET = '/api/product/getlist' // 根据Url获取列表
export const PRODUCT_ADD_POST = '/api/product/add' // 增加单条记录
export const PRODUCT_UPDATE_GET = '/api/product/update' // 修改单条记录
export const PRODUCT_DELETE_GET = '/api/product/delete' // 删除单条记录

//  Cart相关的API接口
export const CART_ADDCART_POST = '/api/cart/addcart' // 添加商品到购物车
export const CART_GETCART_GET = '/api/cart/getcart' // 获取购物车数据
export const CART_REMOVECART_DELETE = '/api/cart/removecart' // 删除购物车
export const CART_UPDATECART_PUT = '/api/cart/updatecart' // 更新购物车

//  Order相关的API接口
export const ORDER_INDEX_GET = '/api/order/index' // 我的订单
export const ORDER_CANCEL_GET = '/api/order/cancel' // 订单取消
export const ORDER_SHOW_GET = '/api/order/show' // 订单详情
export const ORDER_GETPRICE_POST = '/api/order/getprice' // 获取价格
export const ORDER_BUY_POST = '/api/order/buy' // 立即购买，商品购买，提交订单时候用，包括购物车购买
export const ORDER_BUYINFO_POST = '/api/order/buyinfo' // 商品的SKUid，确认订单页面，获取商品购买信息，每次修改价格通过此方法计算，在/order/buy页面使用
export const ORDER_RATE_POST = '/api/order/rate' // 用户评论
export const ORDER_CONFIRM_POST = '/api/order/confirm' // 收货确认

//  GroupBuy相关的API接口
export const GROUPBUY_PRODUCTRECORD_GET = '/api/groupbuy/productrecord' // 拼团记录，根据商品id获取商品id获取商品的拼团记录
export const GROUPBUY_LIST_GET = '/api/groupbuy/list' // 拼团记录列表
export const GROUPBUY_PRODUCTS_GET = '/api/groupbuy/products' // 拼团商品列表
export const GROUPBUY_ORDERGROUPUSER_GET = '/api/groupbuy/ordergroupuser' // 订单拼团用户，根据订单id获取订单拼团用户

//  Activity相关的API接口
export const ACTIVITY_GET_GET = '/api/activity/get' // 根据Url获取单条记录
export const ACTIVITY_GETLIST_GET = '/api/activity/getlist' // 根据Url获取列表
export const ACTIVITY_ADD_POST = '/api/activity/add' // 增加单条记录
export const ACTIVITY_UPDATE_GET = '/api/activity/update' // 修改单条记录
export const ACTIVITY_DELETE_GET = '/api/activity/delete' // 删除单条记录

