## 根据教程申请微信支付相关信息

- http://ui.5ug.com/static/jc/weixin.pdf

## 后台配置微信支付相关信息

- https://s-open.qiniuniu99.com/Admin/AutoConfig/Edit?key=ZKCloud.App.Core.ApiStore.CallBacks.WeChatPaymentConfig

## 调试

# 第一步 service/core/weixin.js 中验证 code 获取是否成功

- 可在微信开发工具中直接打开：theme.allPageInfo().site.weiXinUrl
- 分为静默授权（不能获取头像、地址等信息） scope=snsapi_userinfo
- 用户手动授权：可获取头像，地址等信息 scope=snsapi_base

# 第二步：通过服务器接口获取 openId

# 用户登录成功后，如果存在的话，将 openId 写入缓存。所以无需再登录 user.weixinPublogin

# 用户再次登录或者注册的时候，或读取缓存中的 openId,将 openId 更新到用户中，详情请查看 user.js

-
