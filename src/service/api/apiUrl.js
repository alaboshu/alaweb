//  UserAddress相关的API接口
export const USERADDRESS_ADD_POST = 'Api/UserAddress/Add' // 添加商品到用户地址
export const USERADDRESS_GET_GET = 'Api/UserAddress/Get' // 获取用户地址数据
export const USERADDRESS_DELETE_DELETE = 'Api/UserAddress/Delete' // 删除用户地址
export const USERADDRESS_UPDATE_PUT = 'Api/UserAddress/Update' // 更新用户地址
export const USERADDRESS_SETDEFAULT_POST = 'Api/UserAddress/SetDefault' // 设置默认 地址
export const USERADDRESS_SINGLE_GET = 'Api/UserAddress/Single' // id值为空获取默认地址 如果没有默认地址则返回值为空 id 值存在则获取与id相同的地址

//  UserDetail相关的API接口
export const USERDETAIL_QRCODE_GET = 'Api/UserDetail/QrCode' // 二维码
export const USERDETAIL_TREE_GET = 'Api/UserDetail/Tree' // 组织架构图函数
export const USERDETAIL_IDENTITY_POST = 'Api/UserDetail/Identity' // 实名认证
export const USERDETAIL_GETIDENTITY_GET = 'Api/UserDetail/GetIdentity' // 获取实名认证信息

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

//  Recharge相关的API接口
export const RECHARGE_GETACCOUNTTYPE_GET = 'Api/Recharge/GetAccountType' // 获取允许充值的账户类型
export const RECHARGE_ADDOFFONLINE_POST = 'Api/Recharge/AddOffOnline' // 线下充值
export const RECHARGE_ADDONLINE_POST = 'Api/Recharge/AddOnline' // 线上充值
export const RECHARGE_DELETE_DELETE = 'Api/Recharge/Delete' // 删除用户充值
export const RECHARGE_GET_GET = 'Api/Recharge/Get' // 获取充值详情

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

//  Common相关的API接口
export const COMMON_SENDMOBILEVERIFIYCODE_POST = 'Api/Common/SendMobileVerifiyCode' // 发送手机验证码
export const COMMON_UPLOAD_POST = 'Api/Common/Upload' // 获取上传状态
export const COMMON_GETAUTOCONFIG_GET = 'Api/Common/GetAutoConfig' // 获取参数格式
export const COMMON_GETGET = 'Api/Common/GetApi' // 获取所有的Api地址

//  ApiStore相关的API接口
export const APISTORE_LOGIN_GET = 'Api/ApiStore/Login' // 微信小程序登录，微信公众号登录
export const APISTORE_WEIXINPUBLOGIN_GET = 'Api/ApiStore/WeixinPubLogin' // 微信公众号登录

//  User/Debt相关的API接口
export const USER_DEBT_APPLY_POST = 'Api/User/Debt/Apply'
export const USER_DEBT_DELETE_GET = 'Api/User/Debt/Delete'
export const USER_DEBT_LIST_GET = 'Api/User/Debt/List'
export const USER_DEBT_DEBTBULLETIN_GET = 'Api/User/Debt/DebtBulletin'
export const USER_DEBT_COUNT_GET = 'Api/User/Debt/Count'
export const USER_DEBT_SHOW_GET = 'Api/User/Debt/Show'
export const USER_DEBT_SOLUTION_POST = 'Api/User/Debt/Solution'

//  UserStock相关的API接口
export const USERSTOCK_GETLIST_GET = 'Api/UserStock/GetList'
export const USERSTOCK_GETPRODUCTLIST_GET = 'Api/UserStock/GetProductList'
export const USERSTOCK_OFFLINEDELIVERYPRODUCT_GET = 'Api/UserStock/OfflineDeliveryProduct'
export const USERSTOCK_OFFLINEDELIVERY_POST = 'Api/UserStock/OfflineDelivery'

//  Product相关的API接口
export const PRODUCT_SHOW_GET = 'Api/Product/Show'
export const PRODUCT_LIST_GET = 'Api/Product/List'
export const PRODUCT_CLASS_GET = 'Api/Product/Class'
export const PRODUCT_FAVORITEPRODUCT_GET = 'Api/Product/FavoriteProduct'
export const PRODUCT_FOOTPRINTPRODUCT_GET = 'Api/Product/FootprintProduct'
export const PRODUCT_PRODUCTCARTPRODUCT_GET = 'Api/Product/ProductCartProduct'

//  Cart相关的API接口
export const CART_ADDCART_POST = 'Api/Cart/AddCart'
export const CART_GETCART_GET = 'Api/Cart/GetCart'
export const CART_REMOVECART_DELETE = 'Api/Cart/RemoveCart'
export const CART_UPDATECART_PUT = 'Api/Cart/UpdateCart'

//  Order相关的API接口
export const ORDER_INDEX_GET = 'Api/Order/Index'
export const ORDER_CANCEL_GET = 'Api/Order/Cancel'
export const ORDER_SHOW_GET = 'Api/Order/Show'
export const ORDER_GETPRICE_POST = 'Api/Order/GetPrice'
export const ORDER_BUY_POST = 'Api/Order/Buy'
export const ORDER_BUYINFO_POST = 'Api/Order/BuyInfo'
export const ORDER_RATE_POST = 'Api/Order/Rate'
export const ORDER_CONFIRM_POST = 'Api/Order/Confirm'

//  GroupBuy相关的API接口
export const GROUPBUY_PRODUCTRECORD_GET = 'Api/GroupBuy/ProductRecord'
export const GROUPBUY_LIST_GET = 'Api/GroupBuy/List'
export const GROUPBUY_PRODUCTS_GET = 'Api/GroupBuy/Products'
export const GROUPBUY_ORDERGROUPUSER_GET = 'Api/GroupBuy/OrderGroupUser'

//  User/Reward相关的API接口
export const USER_REWARD_LIST_GET = 'Api/User/Reward/List'
export const USER_REWARD_SHOW_GET = 'Api/User/Reward/Show'

//  Diy相关的API接口
export const DIY_SEARCHKEYWORD_GET = 'Api/Diy/SearchKeyWord'
export const DIY_GETLINK_GET = 'Api/Diy/GetLink'
export const DIY_GETLIST_GET = 'Api/Diy/GetList'
export const DIY_GETLISTBYLOGIN_GET = 'Api/Diy/GetListByLogin'
