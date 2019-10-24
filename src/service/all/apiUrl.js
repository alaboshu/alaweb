// Get,GetList等接口，动态参数查询，字段名与数据库一致，不区分大小写
//  == ：Operator.Equal（等于），可省去，默认
//  << ：Operator.scss（小于）
//  <= ：Operator.scssEqual（小于等于）
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

//  Grade相关的API接口
export const GRADE_ALLGRADE_GET = '/api/grade/allgrade' // 所有等级
export const GRADE_GETLOWGRADE_GET = '/api/grade/getlowgrade' // 获取比自己级别低的等级（包括自己等级）
export const GRADE_GETGRADEREPORT_GET = '/api/grade/getgradereport' // 获取会员等级统计
export const GRADE_GETUSERGRADE_GET = '/api/grade/getusergrade' // 根据用户名获取会员等级
export const GRADE_UPDATEGRADE_POST = '/api/grade/updategrade' // 修改会员等级

//  GradeInfo相关的API接口
export const GRADEINFO_QUERYUSERLIST_GET = '/api/gradeinfo/queryuserlist' // 查询登录用户分页数据
export const GRADEINFO_QUERYFIELDVALUE_GET = '/api/gradeinfo/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const GRADEINFO_NEXTBYID_GET = '/api/gradeinfo/nextbyid' // 根据Id获取下一条记录
export const GRADEINFO_PREXBYID_GET = '/api/gradeinfo/prexbyid' // 根据Id获取上一条记录
export const GRADEINFO_QUERYADD_POST = '/api/gradeinfo/queryadd' // 增加单条记录
export const GRADEINFO_QUERYUPDATE_PUT = '/api/gradeinfo/queryupdate' // 修改单条记录
export const GRADEINFO_QUERYPAGELIST_GET = '/api/gradeinfo/querypagelist' // 动态Url分页查询
export const GRADEINFO_QUERYLIST_GET = '/api/gradeinfo/querylist' // 根据Url获取列表
export const GRADEINFO_QUERYLISTASC_GET = '/api/gradeinfo/querylistasc' // 根据Url获取列表
export const GRADEINFO_QUERYDELETE_DELETE = '/api/gradeinfo/querydelete' // 删除单条记录
export const GRADEINFO_QUERYUSERDELETE_DELETE = '/api/gradeinfo/queryuserdelete' // 删除单条记录
export const GRADEINFO_BATCHDELETE_POST = '/api/gradeinfo/batchdelete' // 删除单条记录
export const GRADEINFO_QUERYBYID_GET = '/api/gradeinfo/querybyid' // 根据Id获取单个实例
export const GRADEINFO_QUERYDIC_GET = '/api/gradeinfo/querydic' // 根据Id获取单个实例字典集合

//  Identity相关的API接口
export const IDENTITY_IDENTITY_POST = '/api/identity/identity' // 实名认证
export const IDENTITY_IDENTITYINFO_GET = '/api/identity/identityinfo' // 实名认证
export const IDENTITY_GETIDENTITY_GET = '/api/identity/getidentity' // 获取实名认证信息 
export const IDENTITY_QUERYUSERLIST_GET = '/api/identity/queryuserlist' // 查询登录用户分页数据
export const IDENTITY_QUERYFIELDVALUE_GET = '/api/identity/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const IDENTITY_NEXTBYID_GET = '/api/identity/nextbyid' // 根据Id获取下一条记录
export const IDENTITY_PREXBYID_GET = '/api/identity/prexbyid' // 根据Id获取上一条记录
export const IDENTITY_QUERYADD_POST = '/api/identity/queryadd' // 增加单条记录
export const IDENTITY_QUERYUPDATE_PUT = '/api/identity/queryupdate' // 修改单条记录
export const IDENTITY_QUERYPAGELIST_GET = '/api/identity/querypagelist' // 动态Url分页查询
export const IDENTITY_QUERYLIST_GET = '/api/identity/querylist' // 根据Url获取列表
export const IDENTITY_QUERYLISTASC_GET = '/api/identity/querylistasc' // 根据Url获取列表
export const IDENTITY_QUERYDELETE_DELETE = '/api/identity/querydelete' // 删除单条记录
export const IDENTITY_QUERYUSERDELETE_DELETE = '/api/identity/queryuserdelete' // 删除单条记录
export const IDENTITY_BATCHDELETE_POST = '/api/identity/batchdelete' // 删除单条记录
export const IDENTITY_QUERYBYID_GET = '/api/identity/querybyid' // 根据Id获取单个实例
export const IDENTITY_QUERYDIC_GET = '/api/identity/querydic' // 根据Id获取单个实例字典集合

//  UserAddress相关的API接口
export const USERADDRESS_VANTADDRESS_GET = '/api/useraddress/vantaddress' // vant组件地址json格式
export const USERADDRESS_GETADDADDRESSFORM_GET = '/api/useraddress/getaddaddressform' // 获取添加地址视图
export const USERADDRESS_SAVEORDERADDRESS_POST = '/api/useraddress/saveorderaddress' // 更新、添加、保存收货地址
export const USERADDRESS_SAVEUSERINFOADDRESS_POST = '/api/useraddress/saveuserinfoaddress' // 备案地址修改
export const USERADDRESS_GET_GET = '/api/useraddress/get' // 获取用户地址数据
export const USERADDRESS_DELETE_GET = '/api/useraddress/delete' // 删除用户地址
export const USERADDRESS_SETDEFAULT_POST = '/api/useraddress/setdefault' // 设置默认地址
export const USERADDRESS_SINGLE_GET = '/api/useraddress/single' // id值为空获取默认地址 如果没有默认地址则返回值为空 id 值存在则获取与id相同的地址
export const USERADDRESS_QUERYUSERLIST_GET = '/api/useraddress/queryuserlist' // 查询登录用户分页数据
export const USERADDRESS_QUERYFIELDVALUE_GET = '/api/useraddress/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const USERADDRESS_NEXTBYID_GET = '/api/useraddress/nextbyid' // 根据Id获取下一条记录
export const USERADDRESS_PREXBYID_GET = '/api/useraddress/prexbyid' // 根据Id获取上一条记录
export const USERADDRESS_QUERYADD_POST = '/api/useraddress/queryadd' // 增加单条记录
export const USERADDRESS_QUERYUPDATE_PUT = '/api/useraddress/queryupdate' // 修改单条记录
export const USERADDRESS_QUERYPAGELIST_GET = '/api/useraddress/querypagelist' // 动态Url分页查询
export const USERADDRESS_QUERYLIST_GET = '/api/useraddress/querylist' // 根据Url获取列表
export const USERADDRESS_QUERYLISTASC_GET = '/api/useraddress/querylistasc' // 根据Url获取列表
export const USERADDRESS_QUERYDELETE_DELETE = '/api/useraddress/querydelete' // 删除单条记录
export const USERADDRESS_QUERYUSERDELETE_DELETE = '/api/useraddress/queryuserdelete' // 删除单条记录
export const USERADDRESS_BATCHDELETE_POST = '/api/useraddress/batchdelete' // 删除单条记录
export const USERADDRESS_QUERYBYID_GET = '/api/useraddress/querybyid' // 根据Id获取单个实例
export const USERADDRESS_QUERYDIC_GET = '/api/useraddress/querydic' // 根据Id获取单个实例字典集合

//  User相关的API接口
export const USER_LOGINBYCODE_GET = '/Api/Member/Loginbycode' // 小程序获取Openid
export const USER_RECOMMEND_GET = '/api/user/recommend' // 推荐会员
export const USER_GETUSERSTATISTIC_GET = '/api/user/getuserstatistic' // 商家数据
export const USER_GETEARNSTATISTIC_GET = '/api/user/getearnstatistic' // 收益数据
export const USER_LOGIN_POST = '/Api/Member/Login' // 会员登录
export const USER_LOGINBYOPENID_POST = '/Api/Member/Loginbyopenid' // 使用openid 完成会员登录
export const USER_LOGINBYMOBILE_POST = '/Api/Member/Loginbymobile' // 使用电话号码完成会员登录
export const USER_GETREGFORM_GET = '/api/user/getregform' // 获取注册客户视图
export const USER_GETLOGINFORM_GET = '/api/user/getloginform' // 获取会员登陆视图
export const USER_GETFINDPASSWORDFORM_GET = '/api/user/getfindpasswordform' // 获取会员找回密码视图
export const USER_GETPASSWORDFORM_GET = '/api/user/getpasswordform' // 获取会员修改密码视图
export const USER_REG_POST = '/Api/Member/Reg' // 注册客户
export const USER_UPDATE_POST = '/api/user/update' // 修该用户信息
export const USER_CHANGEPASSWORD_POST = '/api/user/changepassword' // 修改密码，密码传入明文
export const USER_FINDPASSWORD_POST = '/api/user/findpassword' // 找回密码，密码传入明文
export const USER_VIEW_GET = '/api/user/view' // 获取推荐会员详情
export const USER_PREVIEW_GET = '/api/user/preview' // 获取推荐会员详情
export const USER_INFO_GET = '/api/user/info' // 会员详细信息、包括用户名、姓名、手机号地址等新
export const USER_ADDLOG_GET = '/api/user/addlog' // 添加日志
export const USER_CONFIRMPAYPASSWORD_POST = '/api/user/confirmpaypassword' // 确认安全密码，密码传入明文
export const USER_QUERYUSERLIST_GET = '/api/user/queryuserlist' // 查询登录用户分页数据
export const USER_QUERYFIELDVALUE_GET = '/api/user/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const USER_NEXTBYID_GET = '/api/user/nextbyid' // 根据Id获取下一条记录
export const USER_PREXBYID_GET = '/api/user/prexbyid' // 根据Id获取上一条记录
export const USER_QUERYADD_POST = '/api/user/queryadd' // 增加单条记录
export const USER_QUERYUPDATE_PUT = '/api/user/queryupdate' // 修改单条记录
export const USER_QUERYPAGELIST_GET = '/api/user/querypagelist' // 动态Url分页查询
export const USER_QUERYLIST_GET = '/api/user/querylist' // 根据Url获取列表
export const USER_QUERYLISTASC_GET = '/api/user/querylistasc' // 根据Url获取列表
export const USER_QUERYDELETE_DELETE = '/api/user/querydelete' // 删除单条记录
export const USER_QUERYUSERDELETE_DELETE = '/api/user/queryuserdelete' // 删除单条记录
export const USER_BATCHDELETE_POST = '/api/user/batchdelete' // 删除单条记录
export const USER_QUERYBYID_GET = '/api/user/querybyid' // 根据Id获取单个实例
export const USER_QUERYDIC_GET = '/api/user/querydic' // 根据Id获取单个实例字典集合

//  UserDetail相关的API接口
export const USERDETAIL_QRCODE_GET = '/api/userdetail/qrcode' // 二维码
export const USERDETAIL_TREE_GET = '/api/userdetail/tree' // 组织架构图函数
export const USERDETAIL_QUERYUSERLIST_GET = '/api/userdetail/queryuserlist' // 查询登录用户分页数据
export const USERDETAIL_QUERYFIELDVALUE_GET = '/api/userdetail/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const USERDETAIL_NEXTBYID_GET = '/api/userdetail/nextbyid' // 根据Id获取下一条记录
export const USERDETAIL_PREXBYID_GET = '/api/userdetail/prexbyid' // 根据Id获取上一条记录
export const USERDETAIL_QUERYADD_POST = '/api/userdetail/queryadd' // 增加单条记录
export const USERDETAIL_QUERYUPDATE_PUT = '/api/userdetail/queryupdate' // 修改单条记录
export const USERDETAIL_QUERYPAGELIST_GET = '/api/userdetail/querypagelist' // 动态Url分页查询
export const USERDETAIL_QUERYLIST_GET = '/api/userdetail/querylist' // 根据Url获取列表
export const USERDETAIL_QUERYLISTASC_GET = '/api/userdetail/querylistasc' // 根据Url获取列表
export const USERDETAIL_QUERYDELETE_DELETE = '/api/userdetail/querydelete' // 删除单条记录
export const USERDETAIL_QUERYUSERDELETE_DELETE = '/api/userdetail/queryuserdelete' // 删除单条记录
export const USERDETAIL_BATCHDELETE_POST = '/api/userdetail/batchdelete' // 删除单条记录
export const USERDETAIL_QUERYBYID_GET = '/api/userdetail/querybyid' // 根据Id获取单个实例
export const USERDETAIL_QUERYDIC_GET = '/api/userdetail/querydic' // 根据Id获取单个实例字典集合

//  UserMap相关的API接口
export const USERMAP_QUERYUSERLIST_GET = '/api/usermap/queryuserlist' // 查询登录用户分页数据
export const USERMAP_QUERYFIELDVALUE_GET = '/api/usermap/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const USERMAP_NEXTBYID_GET = '/api/usermap/nextbyid' // 根据Id获取下一条记录
export const USERMAP_PREXBYID_GET = '/api/usermap/prexbyid' // 根据Id获取上一条记录
export const USERMAP_QUERYADD_POST = '/api/usermap/queryadd' // 增加单条记录
export const USERMAP_QUERYUPDATE_PUT = '/api/usermap/queryupdate' // 修改单条记录
export const USERMAP_QUERYPAGELIST_GET = '/api/usermap/querypagelist' // 动态Url分页查询
export const USERMAP_QUERYLIST_GET = '/api/usermap/querylist' // 根据Url获取列表
export const USERMAP_QUERYLISTASC_GET = '/api/usermap/querylistasc' // 根据Url获取列表
export const USERMAP_QUERYDELETE_DELETE = '/api/usermap/querydelete' // 删除单条记录
export const USERMAP_QUERYUSERDELETE_DELETE = '/api/usermap/queryuserdelete' // 删除单条记录
export const USERMAP_BATCHDELETE_POST = '/api/usermap/batchdelete' // 删除单条记录
export const USERMAP_QUERYBYID_GET = '/api/usermap/querybyid' // 根据Id获取单个实例
export const USERMAP_QUERYDIC_GET = '/api/usermap/querydic' // 根据Id获取单个实例字典集合

//  TypeGrade相关的API接口
export const TYPEGRADE_QUERYUSERLIST_GET = '/api/typegrade/queryuserlist' // 查询登录用户分页数据
export const TYPEGRADE_QUERYFIELDVALUE_GET = '/api/typegrade/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const TYPEGRADE_NEXTBYID_GET = '/api/typegrade/nextbyid' // 根据Id获取下一条记录
export const TYPEGRADE_PREXBYID_GET = '/api/typegrade/prexbyid' // 根据Id获取上一条记录
export const TYPEGRADE_QUERYADD_POST = '/api/typegrade/queryadd' // 增加单条记录
export const TYPEGRADE_QUERYUPDATE_PUT = '/api/typegrade/queryupdate' // 修改单条记录
export const TYPEGRADE_QUERYPAGELIST_GET = '/api/typegrade/querypagelist' // 动态Url分页查询
export const TYPEGRADE_QUERYLIST_GET = '/api/typegrade/querylist' // 根据Url获取列表
export const TYPEGRADE_QUERYLISTASC_GET = '/api/typegrade/querylistasc' // 根据Url获取列表
export const TYPEGRADE_QUERYDELETE_DELETE = '/api/typegrade/querydelete' // 删除单条记录
export const TYPEGRADE_QUERYUSERDELETE_DELETE = '/api/typegrade/queryuserdelete' // 删除单条记录
export const TYPEGRADE_BATCHDELETE_POST = '/api/typegrade/batchdelete' // 删除单条记录
export const TYPEGRADE_QUERYBYID_GET = '/api/typegrade/querybyid' // 根据Id获取单个实例
export const TYPEGRADE_QUERYDIC_GET = '/api/typegrade/querydic' // 根据Id获取单个实例字典集合

//  TypeUser相关的API接口
export const TYPEUSER_QUERYUSERLIST_GET = '/api/typeuser/queryuserlist' // 查询登录用户分页数据
export const TYPEUSER_QUERYFIELDVALUE_GET = '/api/typeuser/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const TYPEUSER_NEXTBYID_GET = '/api/typeuser/nextbyid' // 根据Id获取下一条记录
export const TYPEUSER_PREXBYID_GET = '/api/typeuser/prexbyid' // 根据Id获取上一条记录
export const TYPEUSER_QUERYADD_POST = '/api/typeuser/queryadd' // 增加单条记录
export const TYPEUSER_QUERYUPDATE_PUT = '/api/typeuser/queryupdate' // 修改单条记录
export const TYPEUSER_QUERYPAGELIST_GET = '/api/typeuser/querypagelist' // 动态Url分页查询
export const TYPEUSER_QUERYLIST_GET = '/api/typeuser/querylist' // 根据Url获取列表
export const TYPEUSER_QUERYLISTASC_GET = '/api/typeuser/querylistasc' // 根据Url获取列表
export const TYPEUSER_QUERYDELETE_DELETE = '/api/typeuser/querydelete' // 删除单条记录
export const TYPEUSER_QUERYUSERDELETE_DELETE = '/api/typeuser/queryuserdelete' // 删除单条记录
export const TYPEUSER_BATCHDELETE_POST = '/api/typeuser/batchdelete' // 删除单条记录
export const TYPEUSER_QUERYBYID_GET = '/api/typeuser/querybyid' // 根据Id获取单个实例
export const TYPEUSER_QUERYDIC_GET = '/api/typeuser/querydic' // 根据Id获取单个实例字典集合

//  UserType相关的API接口
export const USERTYPE_QUERYUSERLIST_GET = '/api/usertype/queryuserlist' // 查询登录用户分页数据
export const USERTYPE_QUERYFIELDVALUE_GET = '/api/usertype/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const USERTYPE_NEXTBYID_GET = '/api/usertype/nextbyid' // 根据Id获取下一条记录
export const USERTYPE_PREXBYID_GET = '/api/usertype/prexbyid' // 根据Id获取上一条记录
export const USERTYPE_QUERYADD_POST = '/api/usertype/queryadd' // 增加单条记录
export const USERTYPE_QUERYUPDATE_PUT = '/api/usertype/queryupdate' // 修改单条记录
export const USERTYPE_QUERYPAGELIST_GET = '/api/usertype/querypagelist' // 动态Url分页查询
export const USERTYPE_QUERYLIST_GET = '/api/usertype/querylist' // 根据Url获取列表
export const USERTYPE_QUERYLISTASC_GET = '/api/usertype/querylistasc' // 根据Url获取列表
export const USERTYPE_QUERYDELETE_DELETE = '/api/usertype/querydelete' // 删除单条记录
export const USERTYPE_QUERYUSERDELETE_DELETE = '/api/usertype/queryuserdelete' // 删除单条记录
export const USERTYPE_BATCHDELETE_POST = '/api/usertype/batchdelete' // 删除单条记录
export const USERTYPE_QUERYBYID_GET = '/api/usertype/querybyid' // 根据Id获取单个实例
export const USERTYPE_QUERYDIC_GET = '/api/usertype/querydic' // 根据Id获取单个实例字典集合

//  Theme相关的API接口
export const THEME_GETPAGEINFO_GET = '/api/theme/getpageinfo' // 获取页面配置
export const THEME_GETALLPAGEINFO_GET = '/api/theme/getallpageinfo' // 获取所有页面配置
export const THEME_GETLINK_GET = '/api/theme/getlink' // 链接
export const THEME_GETLINKGROUP_GET = '/api/theme/getlinkgroup' // 链接分组
export const THEME_GETVALUE_GET = '/api/theme/getvalue' // 链接
export const THEME_GETFOOT_GET = '/api/theme/getfoot' // 获取底部链接
export const THEME_GETSEARCHFORM_GET = '/api/theme/getsearchform' // 链接
export const THEME_GETWEBLIST_GET = '/api/theme/getweblist' // zk-list数据接口
export const THEME_QUERYUSERLIST_GET = '/api/theme/queryuserlist' // 查询登录用户分页数据
export const THEME_QUERYFIELDVALUE_GET = '/api/theme/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const THEME_NEXTBYID_GET = '/api/theme/nextbyid' // 根据Id获取下一条记录
export const THEME_PREXBYID_GET = '/api/theme/prexbyid' // 根据Id获取上一条记录
export const THEME_QUERYADD_POST = '/api/theme/queryadd' // 增加单条记录
export const THEME_QUERYUPDATE_PUT = '/api/theme/queryupdate' // 修改单条记录
export const THEME_QUERYPAGELIST_GET = '/api/theme/querypagelist' // 动态Url分页查询
export const THEME_QUERYLIST_GET = '/api/theme/querylist' // 根据Url获取列表
export const THEME_QUERYLISTASC_GET = '/api/theme/querylistasc' // 根据Url获取列表
export const THEME_QUERYDELETE_DELETE = '/api/theme/querydelete' // 删除单条记录
export const THEME_QUERYUSERDELETE_DELETE = '/api/theme/queryuserdelete' // 删除单条记录
export const THEME_BATCHDELETE_POST = '/api/theme/batchdelete' // 删除单条记录
export const THEME_QUERYBYID_GET = '/api/theme/querybyid' // 根据Id获取单个实例
export const THEME_QUERYDIC_GET = '/api/theme/querydic' // 根据Id获取单个实例字典集合

//  ThemeData相关的API接口
export const THEMEDATA_QUERYUSERLIST_GET = '/api/themedata/queryuserlist' // 查询登录用户分页数据
export const THEMEDATA_QUERYFIELDVALUE_GET = '/api/themedata/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const THEMEDATA_NEXTBYID_GET = '/api/themedata/nextbyid' // 根据Id获取下一条记录
export const THEMEDATA_PREXBYID_GET = '/api/themedata/prexbyid' // 根据Id获取上一条记录
export const THEMEDATA_QUERYADD_POST = '/api/themedata/queryadd' // 增加单条记录
export const THEMEDATA_QUERYUPDATE_PUT = '/api/themedata/queryupdate' // 修改单条记录
export const THEMEDATA_QUERYPAGELIST_GET = '/api/themedata/querypagelist' // 动态Url分页查询
export const THEMEDATA_QUERYLIST_GET = '/api/themedata/querylist' // 根据Url获取列表
export const THEMEDATA_QUERYLISTASC_GET = '/api/themedata/querylistasc' // 根据Url获取列表
export const THEMEDATA_QUERYDELETE_DELETE = '/api/themedata/querydelete' // 删除单条记录
export const THEMEDATA_QUERYUSERDELETE_DELETE = '/api/themedata/queryuserdelete' // 删除单条记录
export const THEMEDATA_BATCHDELETE_POST = '/api/themedata/batchdelete' // 删除单条记录
export const THEMEDATA_QUERYBYID_GET = '/api/themedata/querybyid' // 根据Id获取单个实例
export const THEMEDATA_QUERYDIC_GET = '/api/themedata/querydic' // 根据Id获取单个实例字典集合

//  ThemeOpen相关的API接口
export const THEMEOPEN_SAVEWIDGETDATA_POST = '/api/themeopen/savewidgetdata' // 保存模块数据
export const THEMEOPEN_PUBLISHASYNC_POST = '/api/themeopen/publishasync' // 站点发布
export const THEMEOPEN_SAVEPAGE_POST = '/api/themeopen/savepage' // DIY页面保存

//  ThemePage相关的API接口
export const THEMEPAGE_QUERYUSERLIST_GET = '/api/themepage/queryuserlist' // 查询登录用户分页数据
export const THEMEPAGE_QUERYFIELDVALUE_GET = '/api/themepage/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const THEMEPAGE_NEXTBYID_GET = '/api/themepage/nextbyid' // 根据Id获取下一条记录
export const THEMEPAGE_PREXBYID_GET = '/api/themepage/prexbyid' // 根据Id获取上一条记录
export const THEMEPAGE_QUERYADD_POST = '/api/themepage/queryadd' // 增加单条记录
export const THEMEPAGE_QUERYUPDATE_PUT = '/api/themepage/queryupdate' // 修改单条记录
export const THEMEPAGE_QUERYPAGELIST_GET = '/api/themepage/querypagelist' // 动态Url分页查询
export const THEMEPAGE_QUERYLIST_GET = '/api/themepage/querylist' // 根据Url获取列表
export const THEMEPAGE_QUERYLISTASC_GET = '/api/themepage/querylistasc' // 根据Url获取列表
export const THEMEPAGE_QUERYDELETE_DELETE = '/api/themepage/querydelete' // 删除单条记录
export const THEMEPAGE_QUERYUSERDELETE_DELETE = '/api/themepage/queryuserdelete' // 删除单条记录
export const THEMEPAGE_BATCHDELETE_POST = '/api/themepage/batchdelete' // 删除单条记录
export const THEMEPAGE_QUERYBYID_GET = '/api/themepage/querybyid' // 根据Id获取单个实例
export const THEMEPAGE_QUERYDIC_GET = '/api/themepage/querydic' // 根据Id获取单个实例字典集合

//  Schedule相关的API接口
export const SCHEDULE_QUERYUSERLIST_GET = '/api/schedule/queryuserlist' // 查询登录用户分页数据
export const SCHEDULE_QUERYFIELDVALUE_GET = '/api/schedule/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SCHEDULE_NEXTBYID_GET = '/api/schedule/nextbyid' // 根据Id获取下一条记录
export const SCHEDULE_PREXBYID_GET = '/api/schedule/prexbyid' // 根据Id获取上一条记录
export const SCHEDULE_QUERYADD_POST = '/api/schedule/queryadd' // 增加单条记录
export const SCHEDULE_QUERYUPDATE_PUT = '/api/schedule/queryupdate' // 修改单条记录
export const SCHEDULE_QUERYPAGELIST_GET = '/api/schedule/querypagelist' // 动态Url分页查询
export const SCHEDULE_QUERYLIST_GET = '/api/schedule/querylist' // 根据Url获取列表
export const SCHEDULE_QUERYLISTASC_GET = '/api/schedule/querylistasc' // 根据Url获取列表
export const SCHEDULE_QUERYDELETE_DELETE = '/api/schedule/querydelete' // 删除单条记录
export const SCHEDULE_QUERYUSERDELETE_DELETE = '/api/schedule/queryuserdelete' // 删除单条记录
export const SCHEDULE_BATCHDELETE_POST = '/api/schedule/batchdelete' // 删除单条记录
export const SCHEDULE_QUERYBYID_GET = '/api/schedule/querybyid' // 根据Id获取单个实例
export const SCHEDULE_QUERYDIC_GET = '/api/schedule/querydic' // 根据Id获取单个实例字典集合

//  ShareOrder相关的API接口
export const SHAREORDER_GETSINGLE_GET = '/api/shareorder/getsingle' // 查询单个订单的详细信息，包括任务执行进度、状态等
export const SHAREORDER_GETLIST_GET = '/api/shareorder/getlist' // 查询分润订单列表，根据条件查询分润订单列表
export const SHAREORDER_QUERYUSERLIST_GET = '/api/shareorder/queryuserlist' // 查询登录用户分页数据
export const SHAREORDER_QUERYFIELDVALUE_GET = '/api/shareorder/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SHAREORDER_NEXTBYID_GET = '/api/shareorder/nextbyid' // 根据Id获取下一条记录
export const SHAREORDER_PREXBYID_GET = '/api/shareorder/prexbyid' // 根据Id获取上一条记录
export const SHAREORDER_QUERYADD_POST = '/api/shareorder/queryadd' // 增加单条记录
export const SHAREORDER_QUERYUPDATE_PUT = '/api/shareorder/queryupdate' // 修改单条记录
export const SHAREORDER_QUERYPAGELIST_GET = '/api/shareorder/querypagelist' // 动态Url分页查询
export const SHAREORDER_QUERYLIST_GET = '/api/shareorder/querylist' // 根据Url获取列表
export const SHAREORDER_QUERYLISTASC_GET = '/api/shareorder/querylistasc' // 根据Url获取列表
export const SHAREORDER_QUERYDELETE_DELETE = '/api/shareorder/querydelete' // 删除单条记录
export const SHAREORDER_QUERYUSERDELETE_DELETE = '/api/shareorder/queryuserdelete' // 删除单条记录
export const SHAREORDER_BATCHDELETE_POST = '/api/shareorder/batchdelete' // 删除单条记录
export const SHAREORDER_QUERYBYID_GET = '/api/shareorder/querybyid' // 根据Id获取单个实例
export const SHAREORDER_QUERYDIC_GET = '/api/shareorder/querydic' // 根据Id获取单个实例字典集合

//  ShareOrderReport相关的API接口
export const SHAREORDERREPORT_QUERYUSERLIST_GET = '/api/shareorderreport/queryuserlist' // 查询登录用户分页数据
export const SHAREORDERREPORT_QUERYFIELDVALUE_GET = '/api/shareorderreport/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SHAREORDERREPORT_NEXTBYID_GET = '/api/shareorderreport/nextbyid' // 根据Id获取下一条记录
export const SHAREORDERREPORT_PREXBYID_GET = '/api/shareorderreport/prexbyid' // 根据Id获取上一条记录
export const SHAREORDERREPORT_QUERYADD_POST = '/api/shareorderreport/queryadd' // 增加单条记录
export const SHAREORDERREPORT_QUERYUPDATE_PUT = '/api/shareorderreport/queryupdate' // 修改单条记录
export const SHAREORDERREPORT_QUERYPAGELIST_GET = '/api/shareorderreport/querypagelist' // 动态Url分页查询
export const SHAREORDERREPORT_QUERYLIST_GET = '/api/shareorderreport/querylist' // 根据Url获取列表
export const SHAREORDERREPORT_QUERYLISTASC_GET = '/api/shareorderreport/querylistasc' // 根据Url获取列表
export const SHAREORDERREPORT_QUERYDELETE_DELETE = '/api/shareorderreport/querydelete' // 删除单条记录
export const SHAREORDERREPORT_QUERYUSERDELETE_DELETE = '/api/shareorderreport/queryuserdelete' // 删除单条记录
export const SHAREORDERREPORT_BATCHDELETE_POST = '/api/shareorderreport/batchdelete' // 删除单条记录
export const SHAREORDERREPORT_QUERYBYID_GET = '/api/shareorderreport/querybyid' // 根据Id获取单个实例
export const SHAREORDERREPORT_QUERYDIC_GET = '/api/shareorderreport/querydic' // 根据Id获取单个实例字典集合

//  TaskQueue相关的API接口
export const TASKQUEUE_QUERYUSERLIST_GET = '/api/taskqueue/queryuserlist' // 查询登录用户分页数据
export const TASKQUEUE_QUERYFIELDVALUE_GET = '/api/taskqueue/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const TASKQUEUE_NEXTBYID_GET = '/api/taskqueue/nextbyid' // 根据Id获取下一条记录
export const TASKQUEUE_PREXBYID_GET = '/api/taskqueue/prexbyid' // 根据Id获取上一条记录
export const TASKQUEUE_QUERYADD_POST = '/api/taskqueue/queryadd' // 增加单条记录
export const TASKQUEUE_QUERYUPDATE_PUT = '/api/taskqueue/queryupdate' // 修改单条记录
export const TASKQUEUE_QUERYPAGELIST_GET = '/api/taskqueue/querypagelist' // 动态Url分页查询
export const TASKQUEUE_QUERYLIST_GET = '/api/taskqueue/querylist' // 根据Url获取列表
export const TASKQUEUE_QUERYLISTASC_GET = '/api/taskqueue/querylistasc' // 根据Url获取列表
export const TASKQUEUE_QUERYDELETE_DELETE = '/api/taskqueue/querydelete' // 删除单条记录
export const TASKQUEUE_QUERYUSERDELETE_DELETE = '/api/taskqueue/queryuserdelete' // 删除单条记录
export const TASKQUEUE_BATCHDELETE_POST = '/api/taskqueue/batchdelete' // 删除单条记录
export const TASKQUEUE_QUERYBYID_GET = '/api/taskqueue/querybyid' // 根据Id获取单个实例
export const TASKQUEUE_QUERYDIC_GET = '/api/taskqueue/querydic' // 根据Id获取单个实例字典集合

//  UpgradeRecord相关的API接口
export const UPGRADERECORD_QUERYUSERLIST_GET = '/api/upgraderecord/queryuserlist' // 查询登录用户分页数据
export const UPGRADERECORD_QUERYFIELDVALUE_GET = '/api/upgraderecord/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const UPGRADERECORD_NEXTBYID_GET = '/api/upgraderecord/nextbyid' // 根据Id获取下一条记录
export const UPGRADERECORD_PREXBYID_GET = '/api/upgraderecord/prexbyid' // 根据Id获取上一条记录
export const UPGRADERECORD_QUERYADD_POST = '/api/upgraderecord/queryadd' // 增加单条记录
export const UPGRADERECORD_QUERYUPDATE_PUT = '/api/upgraderecord/queryupdate' // 修改单条记录
export const UPGRADERECORD_QUERYPAGELIST_GET = '/api/upgraderecord/querypagelist' // 动态Url分页查询
export const UPGRADERECORD_QUERYLIST_GET = '/api/upgraderecord/querylist' // 根据Url获取列表
export const UPGRADERECORD_QUERYLISTASC_GET = '/api/upgraderecord/querylistasc' // 根据Url获取列表
export const UPGRADERECORD_QUERYDELETE_DELETE = '/api/upgraderecord/querydelete' // 删除单条记录
export const UPGRADERECORD_QUERYUSERDELETE_DELETE = '/api/upgraderecord/queryuserdelete' // 删除单条记录
export const UPGRADERECORD_BATCHDELETE_POST = '/api/upgraderecord/batchdelete' // 删除单条记录
export const UPGRADERECORD_QUERYBYID_GET = '/api/upgraderecord/querybyid' // 根据Id获取单个实例
export const UPGRADERECORD_QUERYDIC_GET = '/api/upgraderecord/querydic' // 根据Id获取单个实例字典集合

//  Report相关的API接口
export const REPORT_QUERYUSERLIST_GET = '/api/report/queryuserlist' // 查询登录用户分页数据
export const REPORT_QUERYFIELDVALUE_GET = '/api/report/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const REPORT_NEXTBYID_GET = '/api/report/nextbyid' // 根据Id获取下一条记录
export const REPORT_PREXBYID_GET = '/api/report/prexbyid' // 根据Id获取上一条记录
export const REPORT_QUERYADD_POST = '/api/report/queryadd' // 增加单条记录
export const REPORT_QUERYUPDATE_PUT = '/api/report/queryupdate' // 修改单条记录
export const REPORT_QUERYPAGELIST_GET = '/api/report/querypagelist' // 动态Url分页查询
export const REPORT_QUERYLIST_GET = '/api/report/querylist' // 根据Url获取列表
export const REPORT_QUERYLISTASC_GET = '/api/report/querylistasc' // 根据Url获取列表
export const REPORT_QUERYDELETE_DELETE = '/api/report/querydelete' // 删除单条记录
export const REPORT_QUERYUSERDELETE_DELETE = '/api/report/queryuserdelete' // 删除单条记录
export const REPORT_BATCHDELETE_POST = '/api/report/batchdelete' // 删除单条记录
export const REPORT_QUERYBYID_GET = '/api/report/querybyid' // 根据Id获取单个实例
export const REPORT_QUERYDIC_GET = '/api/report/querydic' // 根据Id获取单个实例字典集合

//  Enterprise相关的API接口
export const ENTERPRISE_QUERYUSERLIST_GET = '/api/enterprise/queryuserlist' // 查询登录用户分页数据
export const ENTERPRISE_QUERYFIELDVALUE_GET = '/api/enterprise/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ENTERPRISE_NEXTBYID_GET = '/api/enterprise/nextbyid' // 根据Id获取下一条记录
export const ENTERPRISE_PREXBYID_GET = '/api/enterprise/prexbyid' // 根据Id获取上一条记录
export const ENTERPRISE_QUERYADD_POST = '/api/enterprise/queryadd' // 增加单条记录
export const ENTERPRISE_QUERYUPDATE_PUT = '/api/enterprise/queryupdate' // 修改单条记录
export const ENTERPRISE_QUERYPAGELIST_GET = '/api/enterprise/querypagelist' // 动态Url分页查询
export const ENTERPRISE_QUERYLIST_GET = '/api/enterprise/querylist' // 根据Url获取列表
export const ENTERPRISE_QUERYLISTASC_GET = '/api/enterprise/querylistasc' // 根据Url获取列表
export const ENTERPRISE_QUERYDELETE_DELETE = '/api/enterprise/querydelete' // 删除单条记录
export const ENTERPRISE_QUERYUSERDELETE_DELETE = '/api/enterprise/queryuserdelete' // 删除单条记录
export const ENTERPRISE_BATCHDELETE_POST = '/api/enterprise/batchdelete' // 删除单条记录
export const ENTERPRISE_QUERYBYID_GET = '/api/enterprise/querybyid' // 根据Id获取单个实例
export const ENTERPRISE_QUERYDIC_GET = '/api/enterprise/querydic' // 根据Id获取单个实例字典集合

//  BankCard相关的API接口
export const BANKCARD_ADDBANKCARD_POST = '/api/bankcard/addbankcard' // 更新、添加、保存银行卡地址
export const BANKCARD_GETLIST_GET = '/api/bankcard/getlist' // 获取用户所有银行卡
export const BANKCARD_DELETE_POST = '/api/bankcard/delete' // 删除银行卡
export const BANKCARD_QUERYUSERLIST_GET = '/api/bankcard/queryuserlist' // 查询登录用户分页数据
export const BANKCARD_QUERYFIELDVALUE_GET = '/api/bankcard/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const BANKCARD_NEXTBYID_GET = '/api/bankcard/nextbyid' // 根据Id获取下一条记录
export const BANKCARD_PREXBYID_GET = '/api/bankcard/prexbyid' // 根据Id获取上一条记录
export const BANKCARD_QUERYADD_POST = '/api/bankcard/queryadd' // 增加单条记录
export const BANKCARD_QUERYUPDATE_PUT = '/api/bankcard/queryupdate' // 修改单条记录
export const BANKCARD_QUERYPAGELIST_GET = '/api/bankcard/querypagelist' // 动态Url分页查询
export const BANKCARD_QUERYLIST_GET = '/api/bankcard/querylist' // 根据Url获取列表
export const BANKCARD_QUERYLISTASC_GET = '/api/bankcard/querylistasc' // 根据Url获取列表
export const BANKCARD_QUERYDELETE_DELETE = '/api/bankcard/querydelete' // 删除单条记录
export const BANKCARD_QUERYUSERDELETE_DELETE = '/api/bankcard/queryuserdelete' // 删除单条记录
export const BANKCARD_BATCHDELETE_POST = '/api/bankcard/batchdelete' // 删除单条记录
export const BANKCARD_QUERYBYID_GET = '/api/bankcard/querybyid' // 根据Id获取单个实例
export const BANKCARD_QUERYDIC_GET = '/api/bankcard/querydic' // 根据Id获取单个实例字典集合

//  Bill相关的API接口
export const BILL_QUERYUSERLIST_GET = '/api/bill/queryuserlist' // 查询登录用户分页数据
export const BILL_QUERYFIELDVALUE_GET = '/api/bill/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const BILL_NEXTBYID_GET = '/api/bill/nextbyid' // 根据Id获取下一条记录
export const BILL_PREXBYID_GET = '/api/bill/prexbyid' // 根据Id获取上一条记录
export const BILL_QUERYADD_POST = '/api/bill/queryadd' // 增加单条记录
export const BILL_QUERYUPDATE_PUT = '/api/bill/queryupdate' // 修改单条记录
export const BILL_QUERYPAGELIST_GET = '/api/bill/querypagelist' // 动态Url分页查询
export const BILL_QUERYLIST_GET = '/api/bill/querylist' // 根据Url获取列表
export const BILL_QUERYLISTASC_GET = '/api/bill/querylistasc' // 根据Url获取列表
export const BILL_QUERYDELETE_DELETE = '/api/bill/querydelete' // 删除单条记录
export const BILL_QUERYUSERDELETE_DELETE = '/api/bill/queryuserdelete' // 删除单条记录
export const BILL_BATCHDELETE_POST = '/api/bill/batchdelete' // 删除单条记录
export const BILL_QUERYBYID_GET = '/api/bill/querybyid' // 根据Id获取单个实例
export const BILL_QUERYDIC_GET = '/api/bill/querydic' // 根据Id获取单个实例字典集合

//  Pay相关的API接口
export const PAY_GETLIST_GET = '/api/pay/getlist' // 获取终端类型，返回支付类型
export const PAY_PAY_POST = '/api/pay/pay' // 传入通用订单和支付方式并完成相对应的支付
export const PAY_PAYCHECKLIST_GET = '/api/pay/paychecklist' // 收银台
export const PAY_PREVIEW_GET = '/api/pay/preview' // 收银详情
export const PAY_QUERYUSERLIST_GET = '/api/pay/queryuserlist' // 查询登录用户分页数据
export const PAY_QUERYFIELDVALUE_GET = '/api/pay/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PAY_NEXTBYID_GET = '/api/pay/nextbyid' // 根据Id获取下一条记录
export const PAY_PREXBYID_GET = '/api/pay/prexbyid' // 根据Id获取上一条记录
export const PAY_QUERYADD_POST = '/api/pay/queryadd' // 增加单条记录
export const PAY_QUERYUPDATE_PUT = '/api/pay/queryupdate' // 修改单条记录
export const PAY_QUERYPAGELIST_GET = '/api/pay/querypagelist' // 动态Url分页查询
export const PAY_QUERYLIST_GET = '/api/pay/querylist' // 根据Url获取列表
export const PAY_QUERYLISTASC_GET = '/api/pay/querylistasc' // 根据Url获取列表
export const PAY_QUERYDELETE_DELETE = '/api/pay/querydelete' // 删除单条记录
export const PAY_QUERYUSERDELETE_DELETE = '/api/pay/queryuserdelete' // 删除单条记录
export const PAY_BATCHDELETE_POST = '/api/pay/batchdelete' // 删除单条记录
export const PAY_QUERYBYID_GET = '/api/pay/querybyid' // 根据Id获取单个实例
export const PAY_QUERYDIC_GET = '/api/pay/querydic' // 根据Id获取单个实例字典集合

//  Trade相关的API接口
export const TRADE_QUERYUSERLIST_GET = '/api/trade/queryuserlist' // 查询登录用户分页数据
export const TRADE_QUERYFIELDVALUE_GET = '/api/trade/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const TRADE_NEXTBYID_GET = '/api/trade/nextbyid' // 根据Id获取下一条记录
export const TRADE_PREXBYID_GET = '/api/trade/prexbyid' // 根据Id获取上一条记录
export const TRADE_QUERYADD_POST = '/api/trade/queryadd' // 增加单条记录
export const TRADE_QUERYUPDATE_PUT = '/api/trade/queryupdate' // 修改单条记录
export const TRADE_QUERYPAGELIST_GET = '/api/trade/querypagelist' // 动态Url分页查询
export const TRADE_QUERYLIST_GET = '/api/trade/querylist' // 根据Url获取列表
export const TRADE_QUERYLISTASC_GET = '/api/trade/querylistasc' // 根据Url获取列表
export const TRADE_QUERYDELETE_DELETE = '/api/trade/querydelete' // 删除单条记录
export const TRADE_QUERYUSERDELETE_DELETE = '/api/trade/queryuserdelete' // 删除单条记录
export const TRADE_BATCHDELETE_POST = '/api/trade/batchdelete' // 删除单条记录
export const TRADE_QUERYBYID_GET = '/api/trade/querybyid' // 根据Id获取单个实例
export const TRADE_QUERYDIC_GET = '/api/trade/querydic' // 根据Id获取单个实例字典集合

//  相关的API接口
export const PAY_WAPPAYASYNC_POST = '/pay/wappayasync' // 手机网站支付异步通知
export const PAY_PUBLICPAYASYNC_POST = '/pay/publicpayasync' // 公众号支付异步通知

//  Recharge相关的API接口
export const RECHARGE_GETACCOUNTTYPE_GET = '/api/recharge/getaccounttype' // 获取允许充值的账户类型
export const RECHARGE_ADD_POST = '/api/recharge/add' // 充值，包括线下充值和线下充值
export const RECHARGE_ADDOFFONLINE_POST = '/api/recharge/addoffonline' // 线下充值
export const RECHARGE_ADDONLINE_POST = '/api/recharge/addonline' // 线上充值
export const RECHARGE_DELETE_DELETE = '/api/recharge/delete' // 删除用户充值
export const RECHARGE_GET_GET = '/api/recharge/get' // 获取充值详情
export const RECHARGE_LIST_GET = '/api/recharge/list' // 获取充值列表

//  Transfer相关的API接口
export const TRANSFER_GETTRANSFERCONFIS_GET = '/api/transfer/gettransferconfis'
export const TRANSFER_ADD_POST = '/api/transfer/add'
export const TRANSFER_GET_GET = '/api/transfer/get'
export const TRANSFER_LIST_GET = '/api/transfer/list' // 转账记录

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
export const WITHDRAW_LIST_GET = '/api/withdraw/list' // 用户提现列表
export const WITHDRAW_GET_GET = '/api/withdraw/get' // 获取提现详情
export const WITHDRAW_GETWITHDRAWFORM_GET = '/api/withdraw/getwithdrawform' // 获取转账视图

//  AutoConfig相关的API接口
export const AUTOCONFIG_QUERYUSERLIST_GET = '/api/autoconfig/queryuserlist' // 查询登录用户分页数据
export const AUTOCONFIG_QUERYFIELDVALUE_GET = '/api/autoconfig/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const AUTOCONFIG_NEXTBYID_GET = '/api/autoconfig/nextbyid' // 根据Id获取下一条记录
export const AUTOCONFIG_PREXBYID_GET = '/api/autoconfig/prexbyid' // 根据Id获取上一条记录
export const AUTOCONFIG_QUERYADD_POST = '/api/autoconfig/queryadd' // 增加单条记录
export const AUTOCONFIG_QUERYUPDATE_PUT = '/api/autoconfig/queryupdate' // 修改单条记录
export const AUTOCONFIG_QUERYPAGELIST_GET = '/api/autoconfig/querypagelist' // 动态Url分页查询
export const AUTOCONFIG_QUERYLIST_GET = '/api/autoconfig/querylist' // 根据Url获取列表
export const AUTOCONFIG_QUERYLISTASC_GET = '/api/autoconfig/querylistasc' // 根据Url获取列表
export const AUTOCONFIG_QUERYDELETE_DELETE = '/api/autoconfig/querydelete' // 删除单条记录
export const AUTOCONFIG_QUERYUSERDELETE_DELETE = '/api/autoconfig/queryuserdelete' // 删除单条记录
export const AUTOCONFIG_BATCHDELETE_POST = '/api/autoconfig/batchdelete' // 删除单条记录
export const AUTOCONFIG_QUERYBYID_GET = '/api/autoconfig/querybyid' // 根据Id获取单个实例
export const AUTOCONFIG_QUERYDIC_GET = '/api/autoconfig/querydic' // 根据Id获取单个实例字典集合

//  Circle相关的API接口
export const CIRCLE_QUERYUSERLIST_GET = '/api/circle/queryuserlist' // 查询登录用户分页数据
export const CIRCLE_QUERYFIELDVALUE_GET = '/api/circle/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const CIRCLE_NEXTBYID_GET = '/api/circle/nextbyid' // 根据Id获取下一条记录
export const CIRCLE_PREXBYID_GET = '/api/circle/prexbyid' // 根据Id获取上一条记录
export const CIRCLE_QUERYADD_POST = '/api/circle/queryadd' // 增加单条记录
export const CIRCLE_QUERYUPDATE_PUT = '/api/circle/queryupdate' // 修改单条记录
export const CIRCLE_QUERYPAGELIST_GET = '/api/circle/querypagelist' // 动态Url分页查询
export const CIRCLE_QUERYLIST_GET = '/api/circle/querylist' // 根据Url获取列表
export const CIRCLE_QUERYLISTASC_GET = '/api/circle/querylistasc' // 根据Url获取列表
export const CIRCLE_QUERYDELETE_DELETE = '/api/circle/querydelete' // 删除单条记录
export const CIRCLE_QUERYUSERDELETE_DELETE = '/api/circle/queryuserdelete' // 删除单条记录
export const CIRCLE_BATCHDELETE_POST = '/api/circle/batchdelete' // 删除单条记录
export const CIRCLE_QUERYBYID_GET = '/api/circle/querybyid' // 根据Id获取单个实例
export const CIRCLE_QUERYDIC_GET = '/api/circle/querydic' // 根据Id获取单个实例字典集合

//  Common相关的API接口
export const COMMON_GETKEYVALUESBYENUM_GET = '/api/common/getkeyvaluesbyenum' // 根据枚举获取KeyValues
export const COMMON_SENDMESSAGE_GET = '/api/common/sendmessage' // 发送短信
export const COMMON_UPLOAD_POST = '/api/common/upload' // 获取上传状态
export const COMMON_GETAUTOCONFIG_GET = '/api/common/getautoconfig' // 获取AutoConfig
export const COMMON_GETKEYVALUESBYAUTOCONFIG_GET = '/api/common/getkeyvaluesbyautoconfig' // 根据AutoConfig获取KeyValues
export const COMMON_GETGET = '/api/common/getapi' // 获取所有的Api地址

//  MessageQueue相关的API接口
export const MESSAGEQUEUE_QUERYUSERLIST_GET = '/api/messagequeue/queryuserlist' // 查询登录用户分页数据
export const MESSAGEQUEUE_QUERYFIELDVALUE_GET = '/api/messagequeue/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const MESSAGEQUEUE_NEXTBYID_GET = '/api/messagequeue/nextbyid' // 根据Id获取下一条记录
export const MESSAGEQUEUE_PREXBYID_GET = '/api/messagequeue/prexbyid' // 根据Id获取上一条记录
export const MESSAGEQUEUE_QUERYADD_POST = '/api/messagequeue/queryadd' // 增加单条记录
export const MESSAGEQUEUE_QUERYUPDATE_PUT = '/api/messagequeue/queryupdate' // 修改单条记录
export const MESSAGEQUEUE_QUERYPAGELIST_GET = '/api/messagequeue/querypagelist' // 动态Url分页查询
export const MESSAGEQUEUE_QUERYLIST_GET = '/api/messagequeue/querylist' // 根据Url获取列表
export const MESSAGEQUEUE_QUERYLISTASC_GET = '/api/messagequeue/querylistasc' // 根据Url获取列表
export const MESSAGEQUEUE_QUERYDELETE_DELETE = '/api/messagequeue/querydelete' // 删除单条记录
export const MESSAGEQUEUE_QUERYUSERDELETE_DELETE = '/api/messagequeue/queryuserdelete' // 删除单条记录
export const MESSAGEQUEUE_BATCHDELETE_POST = '/api/messagequeue/batchdelete' // 删除单条记录
export const MESSAGEQUEUE_QUERYBYID_GET = '/api/messagequeue/querybyid' // 根据Id获取单个实例
export const MESSAGEQUEUE_QUERYDIC_GET = '/api/messagequeue/querydic' // 根据Id获取单个实例字典集合

//  Record相关的API接口
export const RECORD_QUERYUSERLIST_GET = '/api/record/queryuserlist' // 查询登录用户分页数据
export const RECORD_QUERYFIELDVALUE_GET = '/api/record/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const RECORD_NEXTBYID_GET = '/api/record/nextbyid' // 根据Id获取下一条记录
export const RECORD_PREXBYID_GET = '/api/record/prexbyid' // 根据Id获取上一条记录
export const RECORD_QUERYADD_POST = '/api/record/queryadd' // 增加单条记录
export const RECORD_QUERYUPDATE_PUT = '/api/record/queryupdate' // 修改单条记录
export const RECORD_QUERYPAGELIST_GET = '/api/record/querypagelist' // 动态Url分页查询
export const RECORD_QUERYLIST_GET = '/api/record/querylist' // 根据Url获取列表
export const RECORD_QUERYLISTASC_GET = '/api/record/querylistasc' // 根据Url获取列表
export const RECORD_QUERYDELETE_DELETE = '/api/record/querydelete' // 删除单条记录
export const RECORD_QUERYUSERDELETE_DELETE = '/api/record/queryuserdelete' // 删除单条记录
export const RECORD_BATCHDELETE_POST = '/api/record/batchdelete' // 删除单条记录
export const RECORD_QUERYBYID_GET = '/api/record/querybyid' // 根据Id获取单个实例
export const RECORD_QUERYDIC_GET = '/api/record/querydic' // 根据Id获取单个实例字典集合

//  Region相关的API接口
export const REGION_TREE_GET = '/api/region/tree' // 国家区域树形结构
export const REGION_ALL_GET = '/api/region/all' // 国家区域树形结构
export const REGION_QUERYUSERLIST_GET = '/api/region/queryuserlist' // 查询登录用户分页数据
export const REGION_QUERYFIELDVALUE_GET = '/api/region/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const REGION_NEXTBYID_GET = '/api/region/nextbyid' // 根据Id获取下一条记录
export const REGION_PREXBYID_GET = '/api/region/prexbyid' // 根据Id获取上一条记录
export const REGION_QUERYADD_POST = '/api/region/queryadd' // 增加单条记录
export const REGION_QUERYUPDATE_PUT = '/api/region/queryupdate' // 修改单条记录
export const REGION_QUERYPAGELIST_GET = '/api/region/querypagelist' // 动态Url分页查询
export const REGION_QUERYLIST_GET = '/api/region/querylist' // 根据Url获取列表
export const REGION_QUERYLISTASC_GET = '/api/region/querylistasc' // 根据Url获取列表
export const REGION_QUERYDELETE_DELETE = '/api/region/querydelete' // 删除单条记录
export const REGION_QUERYUSERDELETE_DELETE = '/api/region/queryuserdelete' // 删除单条记录
export const REGION_BATCHDELETE_POST = '/api/region/batchdelete' // 删除单条记录
export const REGION_QUERYBYID_GET = '/api/region/querybyid' // 根据Id获取单个实例
export const REGION_QUERYDIC_GET = '/api/region/querydic' // 根据Id获取单个实例字典集合

//  Relation相关的API接口
export const RELATION_GETALLTYPE_GET = '/api/relation/getalltype'
export const RELATION_GETCLASS_GET = '/api/relation/getclass' // 分类
export const RELATION_GETFATHERCLASS_GET = '/api/relation/getfatherclass' // 父级分类
export const RELATION_GETFATHERKEYVALUES_GET = '/api/relation/getfatherkeyvalues' // 父级分类
export const RELATION_GETTAG_GET = '/api/relation/gettag' // 父级分类
export const RELATION_GETKEYVALUES_GET = '/api/relation/getkeyvalues' // 父级分类
export const RELATION_QUERYUSERLIST_GET = '/api/relation/queryuserlist' // 查询登录用户分页数据
export const RELATION_QUERYFIELDVALUE_GET = '/api/relation/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const RELATION_NEXTBYID_GET = '/api/relation/nextbyid' // 根据Id获取下一条记录
export const RELATION_PREXBYID_GET = '/api/relation/prexbyid' // 根据Id获取上一条记录
export const RELATION_QUERYADD_POST = '/api/relation/queryadd' // 增加单条记录
export const RELATION_QUERYUPDATE_PUT = '/api/relation/queryupdate' // 修改单条记录
export const RELATION_QUERYPAGELIST_GET = '/api/relation/querypagelist' // 动态Url分页查询
export const RELATION_QUERYLIST_GET = '/api/relation/querylist' // 根据Url获取列表
export const RELATION_QUERYLISTASC_GET = '/api/relation/querylistasc' // 根据Url获取列表
export const RELATION_QUERYDELETE_DELETE = '/api/relation/querydelete' // 删除单条记录
export const RELATION_QUERYUSERDELETE_DELETE = '/api/relation/queryuserdelete' // 删除单条记录
export const RELATION_BATCHDELETE_POST = '/api/relation/batchdelete' // 删除单条记录
export const RELATION_QUERYBYID_GET = '/api/relation/querybyid' // 根据Id获取单个实例
export const RELATION_QUERYDIC_GET = '/api/relation/querydic' // 根据Id获取单个实例字典集合

//  RelationIndex相关的API接口
export const RELATIONINDEX_QUERYUSERLIST_GET = '/api/relationindex/queryuserlist' // 查询登录用户分页数据
export const RELATIONINDEX_QUERYFIELDVALUE_GET = '/api/relationindex/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const RELATIONINDEX_NEXTBYID_GET = '/api/relationindex/nextbyid' // 根据Id获取下一条记录
export const RELATIONINDEX_PREXBYID_GET = '/api/relationindex/prexbyid' // 根据Id获取上一条记录
export const RELATIONINDEX_QUERYADD_POST = '/api/relationindex/queryadd' // 增加单条记录
export const RELATIONINDEX_QUERYUPDATE_PUT = '/api/relationindex/queryupdate' // 修改单条记录
export const RELATIONINDEX_QUERYPAGELIST_GET = '/api/relationindex/querypagelist' // 动态Url分页查询
export const RELATIONINDEX_QUERYLIST_GET = '/api/relationindex/querylist' // 根据Url获取列表
export const RELATIONINDEX_QUERYLISTASC_GET = '/api/relationindex/querylistasc' // 根据Url获取列表
export const RELATIONINDEX_QUERYDELETE_DELETE = '/api/relationindex/querydelete' // 删除单条记录
export const RELATIONINDEX_QUERYUSERDELETE_DELETE = '/api/relationindex/queryuserdelete' // 删除单条记录
export const RELATIONINDEX_BATCHDELETE_POST = '/api/relationindex/batchdelete' // 删除单条记录
export const RELATIONINDEX_QUERYBYID_GET = '/api/relationindex/querybyid' // 根据Id获取单个实例
export const RELATIONINDEX_QUERYDIC_GET = '/api/relationindex/querydic' // 根据Id获取单个实例字典集合

//  StorageFile相关的API接口
export const STORAGEFILE_QUERYUSERLIST_GET = '/api/storagefile/queryuserlist' // 查询登录用户分页数据
export const STORAGEFILE_QUERYFIELDVALUE_GET = '/api/storagefile/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const STORAGEFILE_NEXTBYID_GET = '/api/storagefile/nextbyid' // 根据Id获取下一条记录
export const STORAGEFILE_PREXBYID_GET = '/api/storagefile/prexbyid' // 根据Id获取上一条记录
export const STORAGEFILE_QUERYADD_POST = '/api/storagefile/queryadd' // 增加单条记录
export const STORAGEFILE_QUERYUPDATE_PUT = '/api/storagefile/queryupdate' // 修改单条记录
export const STORAGEFILE_QUERYPAGELIST_GET = '/api/storagefile/querypagelist' // 动态Url分页查询
export const STORAGEFILE_QUERYLIST_GET = '/api/storagefile/querylist' // 根据Url获取列表
export const STORAGEFILE_QUERYLISTASC_GET = '/api/storagefile/querylistasc' // 根据Url获取列表
export const STORAGEFILE_QUERYDELETE_DELETE = '/api/storagefile/querydelete' // 删除单条记录
export const STORAGEFILE_QUERYUSERDELETE_DELETE = '/api/storagefile/queryuserdelete' // 删除单条记录
export const STORAGEFILE_BATCHDELETE_POST = '/api/storagefile/batchdelete' // 删除单条记录
export const STORAGEFILE_QUERYBYID_GET = '/api/storagefile/querybyid' // 根据Id获取单个实例
export const STORAGEFILE_QUERYDIC_GET = '/api/storagefile/querydic' // 根据Id获取单个实例字典集合

//  ApiStore相关的API接口
export const APISTORE_LOGIN_GET = '/api/apistore/login' // 微信小程序登录，微信公众号登录
export const APISTORE_WEIXINPUBLOGIN_GET = '/api/apistore/weixinpublogin' // 微信公众号登录
export const APISTORE_SHARE_GET = '/api/apistore/share' // 微信分享

//  Logs相关的API接口
export const LOGS_QUERYUSERLIST_GET = '/api/logs/queryuserlist' // 查询登录用户分页数据
export const LOGS_QUERYFIELDVALUE_GET = '/api/logs/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const LOGS_NEXTBYID_GET = '/api/logs/nextbyid' // 根据Id获取下一条记录
export const LOGS_PREXBYID_GET = '/api/logs/prexbyid' // 根据Id获取上一条记录
export const LOGS_QUERYADD_POST = '/api/logs/queryadd' // 增加单条记录
export const LOGS_QUERYUPDATE_PUT = '/api/logs/queryupdate' // 修改单条记录
export const LOGS_QUERYPAGELIST_GET = '/api/logs/querypagelist' // 动态Url分页查询
export const LOGS_QUERYLIST_GET = '/api/logs/querylist' // 根据Url获取列表
export const LOGS_QUERYLISTASC_GET = '/api/logs/querylistasc' // 根据Url获取列表
export const LOGS_QUERYDELETE_DELETE = '/api/logs/querydelete' // 删除单条记录
export const LOGS_QUERYUSERDELETE_DELETE = '/api/logs/queryuserdelete' // 删除单条记录
export const LOGS_BATCHDELETE_POST = '/api/logs/batchdelete' // 删除单条记录
export const LOGS_QUERYBYID_GET = '/api/logs/querybyid' // 根据Id获取单个实例
export const LOGS_QUERYDIC_GET = '/api/logs/querydic' // 根据Id获取单个实例字典集合

//  Table相关的API接口
export const TABLE_QUERYUSERLIST_GET = '/api/table/queryuserlist' // 查询登录用户分页数据
export const TABLE_QUERYFIELDVALUE_GET = '/api/table/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const TABLE_NEXTBYID_GET = '/api/table/nextbyid' // 根据Id获取下一条记录
export const TABLE_PREXBYID_GET = '/api/table/prexbyid' // 根据Id获取上一条记录
export const TABLE_QUERYADD_POST = '/api/table/queryadd' // 增加单条记录
export const TABLE_QUERYUPDATE_PUT = '/api/table/queryupdate' // 修改单条记录
export const TABLE_QUERYPAGELIST_GET = '/api/table/querypagelist' // 动态Url分页查询
export const TABLE_QUERYLIST_GET = '/api/table/querylist' // 根据Url获取列表
export const TABLE_QUERYLISTASC_GET = '/api/table/querylistasc' // 根据Url获取列表
export const TABLE_QUERYDELETE_DELETE = '/api/table/querydelete' // 删除单条记录
export const TABLE_QUERYUSERDELETE_DELETE = '/api/table/queryuserdelete' // 删除单条记录
export const TABLE_BATCHDELETE_POST = '/api/table/batchdelete' // 删除单条记录
export const TABLE_QUERYBYID_GET = '/api/table/querybyid' // 根据Id获取单个实例
export const TABLE_QUERYDIC_GET = '/api/table/querydic' // 根据Id获取单个实例字典集合

//  Widget相关的API接口
export const WIDGET_CLASS_GET = '/api/widget/class' // 模块分类
export const WIDGET_GETLISTBYURL_POST = '/api/widget/getlistbyurl' // 模块列表
export const WIDGET_ADD_POST = '/api/widget/add' // 模块添加
export const WIDGET_GETEDITVIEW_POST = '/api/widget/geteditview' // 获取模块编辑视图
export const WIDGET_QUERYUSERLIST_GET = '/api/widget/queryuserlist' // 查询登录用户分页数据
export const WIDGET_QUERYFIELDVALUE_GET = '/api/widget/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const WIDGET_NEXTBYID_GET = '/api/widget/nextbyid' // 根据Id获取下一条记录
export const WIDGET_PREXBYID_GET = '/api/widget/prexbyid' // 根据Id获取上一条记录
export const WIDGET_QUERYADD_POST = '/api/widget/queryadd' // 增加单条记录
export const WIDGET_QUERYUPDATE_PUT = '/api/widget/queryupdate' // 修改单条记录
export const WIDGET_QUERYPAGELIST_GET = '/api/widget/querypagelist' // 动态Url分页查询
export const WIDGET_QUERYLIST_GET = '/api/widget/querylist' // 根据Url获取列表
export const WIDGET_QUERYLISTASC_GET = '/api/widget/querylistasc' // 根据Url获取列表
export const WIDGET_QUERYDELETE_DELETE = '/api/widget/querydelete' // 删除单条记录
export const WIDGET_QUERYUSERDELETE_DELETE = '/api/widget/queryuserdelete' // 删除单条记录
export const WIDGET_BATCHDELETE_POST = '/api/widget/batchdelete' // 删除单条记录
export const WIDGET_QUERYBYID_GET = '/api/widget/querybyid' // 根据Id获取单个实例
export const WIDGET_QUERYDIC_GET = '/api/widget/querydic' // 根据Id获取单个实例字典集合

//  WidgetData相关的API接口
export const WIDGETDATA_GETVIEW_POST = '/api/widgetdata/getview' // 视图与输数据
export const WIDGETDATA_SAVE_POST = '/api/widgetdata/save' // 模块数据保存
export const WIDGETDATA_ADDORUPDATE_POST = '/api/widgetdata/addorupdate' // 模块数据保存
export const WIDGETDATA_DELETE_POST = '/api/widgetdata/delete' // 模块数据保存
export const WIDGETDATA_QUERYUSERLIST_GET = '/api/widgetdata/queryuserlist' // 查询登录用户分页数据
export const WIDGETDATA_QUERYFIELDVALUE_GET = '/api/widgetdata/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const WIDGETDATA_NEXTBYID_GET = '/api/widgetdata/nextbyid' // 根据Id获取下一条记录
export const WIDGETDATA_PREXBYID_GET = '/api/widgetdata/prexbyid' // 根据Id获取上一条记录
export const WIDGETDATA_QUERYADD_POST = '/api/widgetdata/queryadd' // 增加单条记录
export const WIDGETDATA_QUERYUPDATE_PUT = '/api/widgetdata/queryupdate' // 修改单条记录
export const WIDGETDATA_QUERYPAGELIST_GET = '/api/widgetdata/querypagelist' // 动态Url分页查询
export const WIDGETDATA_QUERYLIST_GET = '/api/widgetdata/querylist' // 根据Url获取列表
export const WIDGETDATA_QUERYLISTASC_GET = '/api/widgetdata/querylistasc' // 根据Url获取列表
export const WIDGETDATA_QUERYDELETE_DELETE = '/api/widgetdata/querydelete' // 删除单条记录
export const WIDGETDATA_QUERYUSERDELETE_DELETE = '/api/widgetdata/queryuserdelete' // 删除单条记录
export const WIDGETDATA_BATCHDELETE_POST = '/api/widgetdata/batchdelete' // 删除单条记录
export const WIDGETDATA_QUERYBYID_GET = '/api/widgetdata/querybyid' // 根据Id获取单个实例
export const WIDGETDATA_QUERYDIC_GET = '/api/widgetdata/querydic' // 根据Id获取单个实例字典集合

//  WidgetHistory相关的API接口
export const WIDGETHISTORY_QUERYUSERLIST_GET = '/api/widgethistory/queryuserlist' // 查询登录用户分页数据
export const WIDGETHISTORY_QUERYFIELDVALUE_GET = '/api/widgethistory/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const WIDGETHISTORY_NEXTBYID_GET = '/api/widgethistory/nextbyid' // 根据Id获取下一条记录
export const WIDGETHISTORY_PREXBYID_GET = '/api/widgethistory/prexbyid' // 根据Id获取上一条记录
export const WIDGETHISTORY_QUERYADD_POST = '/api/widgethistory/queryadd' // 增加单条记录
export const WIDGETHISTORY_QUERYUPDATE_PUT = '/api/widgethistory/queryupdate' // 修改单条记录
export const WIDGETHISTORY_QUERYPAGELIST_GET = '/api/widgethistory/querypagelist' // 动态Url分页查询
export const WIDGETHISTORY_QUERYLIST_GET = '/api/widgethistory/querylist' // 根据Url获取列表
export const WIDGETHISTORY_QUERYLISTASC_GET = '/api/widgethistory/querylistasc' // 根据Url获取列表
export const WIDGETHISTORY_QUERYDELETE_DELETE = '/api/widgethistory/querydelete' // 删除单条记录
export const WIDGETHISTORY_QUERYUSERDELETE_DELETE = '/api/widgethistory/queryuserdelete' // 删除单条记录
export const WIDGETHISTORY_BATCHDELETE_POST = '/api/widgethistory/batchdelete' // 删除单条记录
export const WIDGETHISTORY_QUERYBYID_GET = '/api/widgethistory/querybyid' // 根据Id获取单个实例
export const WIDGETHISTORY_QUERYDIC_GET = '/api/widgethistory/querydic' // 根据Id获取单个实例字典集合

//  WidgetPageOwner相关的API接口
export const WIDGETPAGEOWNER_QUERYUSERLIST_GET = '/api/widgetpageowner/queryuserlist' // 查询登录用户分页数据
export const WIDGETPAGEOWNER_QUERYFIELDVALUE_GET = '/api/widgetpageowner/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const WIDGETPAGEOWNER_NEXTBYID_GET = '/api/widgetpageowner/nextbyid' // 根据Id获取下一条记录
export const WIDGETPAGEOWNER_PREXBYID_GET = '/api/widgetpageowner/prexbyid' // 根据Id获取上一条记录
export const WIDGETPAGEOWNER_QUERYADD_POST = '/api/widgetpageowner/queryadd' // 增加单条记录
export const WIDGETPAGEOWNER_QUERYUPDATE_PUT = '/api/widgetpageowner/queryupdate' // 修改单条记录
export const WIDGETPAGEOWNER_QUERYPAGELIST_GET = '/api/widgetpageowner/querypagelist' // 动态Url分页查询
export const WIDGETPAGEOWNER_QUERYLIST_GET = '/api/widgetpageowner/querylist' // 根据Url获取列表
export const WIDGETPAGEOWNER_QUERYLISTASC_GET = '/api/widgetpageowner/querylistasc' // 根据Url获取列表
export const WIDGETPAGEOWNER_QUERYDELETE_DELETE = '/api/widgetpageowner/querydelete' // 删除单条记录
export const WIDGETPAGEOWNER_QUERYUSERDELETE_DELETE = '/api/widgetpageowner/queryuserdelete' // 删除单条记录
export const WIDGETPAGEOWNER_BATCHDELETE_POST = '/api/widgetpageowner/batchdelete' // 删除单条记录
export const WIDGETPAGEOWNER_QUERYBYID_GET = '/api/widgetpageowner/querybyid' // 根据Id获取单个实例
export const WIDGETPAGEOWNER_QUERYDIC_GET = '/api/widgetpageowner/querydic' // 根据Id获取单个实例字典集合

//  WidgetSystemData相关的API接口
export const WIDGETSYSTEMDATA_QUERYUSERLIST_GET = '/api/widgetsystemdata/queryuserlist' // 查询登录用户分页数据
export const WIDGETSYSTEMDATA_QUERYFIELDVALUE_GET = '/api/widgetsystemdata/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const WIDGETSYSTEMDATA_NEXTBYID_GET = '/api/widgetsystemdata/nextbyid' // 根据Id获取下一条记录
export const WIDGETSYSTEMDATA_PREXBYID_GET = '/api/widgetsystemdata/prexbyid' // 根据Id获取上一条记录
export const WIDGETSYSTEMDATA_QUERYADD_POST = '/api/widgetsystemdata/queryadd' // 增加单条记录
export const WIDGETSYSTEMDATA_QUERYUPDATE_PUT = '/api/widgetsystemdata/queryupdate' // 修改单条记录
export const WIDGETSYSTEMDATA_QUERYPAGELIST_GET = '/api/widgetsystemdata/querypagelist' // 动态Url分页查询
export const WIDGETSYSTEMDATA_QUERYLIST_GET = '/api/widgetsystemdata/querylist' // 根据Url获取列表
export const WIDGETSYSTEMDATA_QUERYLISTASC_GET = '/api/widgetsystemdata/querylistasc' // 根据Url获取列表
export const WIDGETSYSTEMDATA_QUERYDELETE_DELETE = '/api/widgetsystemdata/querydelete' // 删除单条记录
export const WIDGETSYSTEMDATA_QUERYUSERDELETE_DELETE = '/api/widgetsystemdata/queryuserdelete' // 删除单条记录
export const WIDGETSYSTEMDATA_BATCHDELETE_POST = '/api/widgetsystemdata/batchdelete' // 删除单条记录
export const WIDGETSYSTEMDATA_QUERYBYID_GET = '/api/widgetsystemdata/querybyid' // 根据Id获取单个实例
export const WIDGETSYSTEMDATA_QUERYDIC_GET = '/api/widgetsystemdata/querydic' // 根据Id获取单个实例字典集合

//  SiteTheme相关的API接口
export const SITETHEME_SECURITYVERIFICATION_POST = '/api/sitetheme/securityverification' // 安全验证
export const SITETHEME_QUERYUSERLIST_GET = '/api/sitetheme/queryuserlist' // 查询登录用户分页数据
export const SITETHEME_QUERYFIELDVALUE_GET = '/api/sitetheme/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SITETHEME_NEXTBYID_GET = '/api/sitetheme/nextbyid' // 根据Id获取下一条记录
export const SITETHEME_PREXBYID_GET = '/api/sitetheme/prexbyid' // 根据Id获取上一条记录
export const SITETHEME_QUERYADD_POST = '/api/sitetheme/queryadd' // 增加单条记录
export const SITETHEME_QUERYUPDATE_PUT = '/api/sitetheme/queryupdate' // 修改单条记录
export const SITETHEME_QUERYPAGELIST_GET = '/api/sitetheme/querypagelist' // 动态Url分页查询
export const SITETHEME_QUERYLIST_GET = '/api/sitetheme/querylist' // 根据Url获取列表
export const SITETHEME_QUERYLISTASC_GET = '/api/sitetheme/querylistasc' // 根据Url获取列表
export const SITETHEME_QUERYDELETE_DELETE = '/api/sitetheme/querydelete' // 删除单条记录
export const SITETHEME_QUERYUSERDELETE_DELETE = '/api/sitetheme/queryuserdelete' // 删除单条记录
export const SITETHEME_BATCHDELETE_POST = '/api/sitetheme/batchdelete' // 删除单条记录
export const SITETHEME_QUERYBYID_GET = '/api/sitetheme/querybyid' // 根据Id获取单个实例
export const SITETHEME_QUERYDIC_GET = '/api/sitetheme/querydic' // 根据Id获取单个实例字典集合

//  ThemeSetting相关的API接口
export const THEMESETTING_QUERYUSERLIST_GET = '/api/themesetting/queryuserlist' // 查询登录用户分页数据
export const THEMESETTING_QUERYFIELDVALUE_GET = '/api/themesetting/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const THEMESETTING_NEXTBYID_GET = '/api/themesetting/nextbyid' // 根据Id获取下一条记录
export const THEMESETTING_PREXBYID_GET = '/api/themesetting/prexbyid' // 根据Id获取上一条记录
export const THEMESETTING_QUERYADD_POST = '/api/themesetting/queryadd' // 增加单条记录
export const THEMESETTING_QUERYUPDATE_PUT = '/api/themesetting/queryupdate' // 修改单条记录
export const THEMESETTING_QUERYPAGELIST_GET = '/api/themesetting/querypagelist' // 动态Url分页查询
export const THEMESETTING_QUERYLIST_GET = '/api/themesetting/querylist' // 根据Url获取列表
export const THEMESETTING_QUERYLISTASC_GET = '/api/themesetting/querylistasc' // 根据Url获取列表
export const THEMESETTING_QUERYDELETE_DELETE = '/api/themesetting/querydelete' // 删除单条记录
export const THEMESETTING_QUERYUSERDELETE_DELETE = '/api/themesetting/queryuserdelete' // 删除单条记录
export const THEMESETTING_BATCHDELETE_POST = '/api/themesetting/batchdelete' // 删除单条记录
export const THEMESETTING_QUERYBYID_GET = '/api/themesetting/querybyid' // 根据Id获取单个实例
export const THEMESETTING_QUERYDIC_GET = '/api/themesetting/querydic' // 根据Id获取单个实例字典集合

//  AutoForm相关的API接口
export const AUTOFORM_EDIT_POST = '/api/autoform/edit' // 表单编辑
export const AUTOFORM_QUERYUSERLIST_GET = '/api/autoform/queryuserlist' // 查询登录用户分页数据
export const AUTOFORM_QUERYFIELDVALUE_GET = '/api/autoform/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const AUTOFORM_NEXTBYID_GET = '/api/autoform/nextbyid' // 根据Id获取下一条记录
export const AUTOFORM_PREXBYID_GET = '/api/autoform/prexbyid' // 根据Id获取上一条记录
export const AUTOFORM_QUERYADD_POST = '/api/autoform/queryadd' // 增加单条记录
export const AUTOFORM_QUERYUPDATE_PUT = '/api/autoform/queryupdate' // 修改单条记录
export const AUTOFORM_QUERYPAGELIST_GET = '/api/autoform/querypagelist' // 动态Url分页查询
export const AUTOFORM_QUERYLIST_GET = '/api/autoform/querylist' // 根据Url获取列表
export const AUTOFORM_QUERYLISTASC_GET = '/api/autoform/querylistasc' // 根据Url获取列表
export const AUTOFORM_QUERYDELETE_DELETE = '/api/autoform/querydelete' // 删除单条记录
export const AUTOFORM_QUERYUSERDELETE_DELETE = '/api/autoform/queryuserdelete' // 删除单条记录
export const AUTOFORM_BATCHDELETE_POST = '/api/autoform/batchdelete' // 删除单条记录
export const AUTOFORM_QUERYBYID_GET = '/api/autoform/querybyid' // 根据Id获取单个实例
export const AUTOFORM_QUERYDIC_GET = '/api/autoform/querydic' // 根据Id获取单个实例字典集合

//  AutoFormHistory相关的API接口
export const AUTOFORMHISTORY_RESTORE_POST = '/api/autoformhistory/restore' // 表单还原
export const AUTOFORMHISTORY_QUERYUSERLIST_GET = '/api/autoformhistory/queryuserlist' // 查询登录用户分页数据
export const AUTOFORMHISTORY_QUERYFIELDVALUE_GET = '/api/autoformhistory/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const AUTOFORMHISTORY_NEXTBYID_GET = '/api/autoformhistory/nextbyid' // 根据Id获取下一条记录
export const AUTOFORMHISTORY_PREXBYID_GET = '/api/autoformhistory/prexbyid' // 根据Id获取上一条记录
export const AUTOFORMHISTORY_QUERYADD_POST = '/api/autoformhistory/queryadd' // 增加单条记录
export const AUTOFORMHISTORY_QUERYUPDATE_PUT = '/api/autoformhistory/queryupdate' // 修改单条记录
export const AUTOFORMHISTORY_QUERYPAGELIST_GET = '/api/autoformhistory/querypagelist' // 动态Url分页查询
export const AUTOFORMHISTORY_QUERYLIST_GET = '/api/autoformhistory/querylist' // 根据Url获取列表
export const AUTOFORMHISTORY_QUERYLISTASC_GET = '/api/autoformhistory/querylistasc' // 根据Url获取列表
export const AUTOFORMHISTORY_QUERYDELETE_DELETE = '/api/autoformhistory/querydelete' // 删除单条记录
export const AUTOFORMHISTORY_QUERYUSERDELETE_DELETE = '/api/autoformhistory/queryuserdelete' // 删除单条记录
export const AUTOFORMHISTORY_BATCHDELETE_POST = '/api/autoformhistory/batchdelete' // 删除单条记录
export const AUTOFORMHISTORY_QUERYBYID_GET = '/api/autoformhistory/querybyid' // 根据Id获取单个实例
export const AUTOFORMHISTORY_QUERYDIC_GET = '/api/autoformhistory/querydic' // 根据Id获取单个实例字典集合

//  AutoFormStyle相关的API接口
export const AUTOFORMSTYLE_QUERYUSERLIST_GET = '/api/autoformstyle/queryuserlist' // 查询登录用户分页数据
export const AUTOFORMSTYLE_QUERYFIELDVALUE_GET = '/api/autoformstyle/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const AUTOFORMSTYLE_NEXTBYID_GET = '/api/autoformstyle/nextbyid' // 根据Id获取下一条记录
export const AUTOFORMSTYLE_PREXBYID_GET = '/api/autoformstyle/prexbyid' // 根据Id获取上一条记录
export const AUTOFORMSTYLE_QUERYADD_POST = '/api/autoformstyle/queryadd' // 增加单条记录
export const AUTOFORMSTYLE_QUERYUPDATE_PUT = '/api/autoformstyle/queryupdate' // 修改单条记录
export const AUTOFORMSTYLE_QUERYPAGELIST_GET = '/api/autoformstyle/querypagelist' // 动态Url分页查询
export const AUTOFORMSTYLE_QUERYLIST_GET = '/api/autoformstyle/querylist' // 根据Url获取列表
export const AUTOFORMSTYLE_QUERYLISTASC_GET = '/api/autoformstyle/querylistasc' // 根据Url获取列表
export const AUTOFORMSTYLE_QUERYDELETE_DELETE = '/api/autoformstyle/querydelete' // 删除单条记录
export const AUTOFORMSTYLE_QUERYUSERDELETE_DELETE = '/api/autoformstyle/queryuserdelete' // 删除单条记录
export const AUTOFORMSTYLE_BATCHDELETE_POST = '/api/autoformstyle/batchdelete' // 删除单条记录
export const AUTOFORMSTYLE_QUERYBYID_GET = '/api/autoformstyle/querybyid' // 根据Id获取单个实例
export const AUTOFORMSTYLE_QUERYDIC_GET = '/api/autoformstyle/querydic' // 根据Id获取单个实例字典集合

//  DataForm相关的API接口
export const DATAFORM_QUERYUSERLIST_GET = '/api/dataform/queryuserlist' // 查询登录用户分页数据
export const DATAFORM_QUERYFIELDVALUE_GET = '/api/dataform/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const DATAFORM_NEXTBYID_GET = '/api/dataform/nextbyid' // 根据Id获取下一条记录
export const DATAFORM_PREXBYID_GET = '/api/dataform/prexbyid' // 根据Id获取上一条记录
export const DATAFORM_QUERYADD_POST = '/api/dataform/queryadd' // 增加单条记录
export const DATAFORM_QUERYUPDATE_PUT = '/api/dataform/queryupdate' // 修改单条记录
export const DATAFORM_QUERYPAGELIST_GET = '/api/dataform/querypagelist' // 动态Url分页查询
export const DATAFORM_QUERYLIST_GET = '/api/dataform/querylist' // 根据Url获取列表
export const DATAFORM_QUERYLISTASC_GET = '/api/dataform/querylistasc' // 根据Url获取列表
export const DATAFORM_QUERYDELETE_DELETE = '/api/dataform/querydelete' // 删除单条记录
export const DATAFORM_QUERYUSERDELETE_DELETE = '/api/dataform/queryuserdelete' // 删除单条记录
export const DATAFORM_BATCHDELETE_POST = '/api/dataform/batchdelete' // 删除单条记录
export const DATAFORM_QUERYBYID_GET = '/api/dataform/querybyid' // 根据Id获取单个实例
export const DATAFORM_QUERYDIC_GET = '/api/dataform/querydic' // 根据Id获取单个实例字典集合

//  DataFormRecord相关的API接口
export const DATAFORMRECORD_QUERYUSERLIST_GET = '/api/dataformrecord/queryuserlist' // 查询登录用户分页数据
export const DATAFORMRECORD_QUERYFIELDVALUE_GET = '/api/dataformrecord/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const DATAFORMRECORD_NEXTBYID_GET = '/api/dataformrecord/nextbyid' // 根据Id获取下一条记录
export const DATAFORMRECORD_PREXBYID_GET = '/api/dataformrecord/prexbyid' // 根据Id获取上一条记录
export const DATAFORMRECORD_QUERYADD_POST = '/api/dataformrecord/queryadd' // 增加单条记录
export const DATAFORMRECORD_QUERYUPDATE_PUT = '/api/dataformrecord/queryupdate' // 修改单条记录
export const DATAFORMRECORD_QUERYPAGELIST_GET = '/api/dataformrecord/querypagelist' // 动态Url分页查询
export const DATAFORMRECORD_QUERYLIST_GET = '/api/dataformrecord/querylist' // 根据Url获取列表
export const DATAFORMRECORD_QUERYLISTASC_GET = '/api/dataformrecord/querylistasc' // 根据Url获取列表
export const DATAFORMRECORD_QUERYDELETE_DELETE = '/api/dataformrecord/querydelete' // 删除单条记录
export const DATAFORMRECORD_QUERYUSERDELETE_DELETE = '/api/dataformrecord/queryuserdelete' // 删除单条记录
export const DATAFORMRECORD_BATCHDELETE_POST = '/api/dataformrecord/batchdelete' // 删除单条记录
export const DATAFORMRECORD_QUERYBYID_GET = '/api/dataformrecord/querybyid' // 根据Id获取单个实例
export const DATAFORMRECORD_QUERYDIC_GET = '/api/dataformrecord/querydic' // 根据Id获取单个实例字典集合

//  Site相关的API接口
export const SITE_PUBLISH_POST = '/api/site/publish' // 发布
export const SITE_QUERYUSERLIST_GET = '/api/site/queryuserlist' // 查询登录用户分页数据
export const SITE_QUERYFIELDVALUE_GET = '/api/site/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SITE_NEXTBYID_GET = '/api/site/nextbyid' // 根据Id获取下一条记录
export const SITE_PREXBYID_GET = '/api/site/prexbyid' // 根据Id获取上一条记录
export const SITE_QUERYADD_POST = '/api/site/queryadd' // 增加单条记录
export const SITE_QUERYUPDATE_PUT = '/api/site/queryupdate' // 修改单条记录
export const SITE_QUERYPAGELIST_GET = '/api/site/querypagelist' // 动态Url分页查询
export const SITE_QUERYLIST_GET = '/api/site/querylist' // 根据Url获取列表
export const SITE_QUERYLISTASC_GET = '/api/site/querylistasc' // 根据Url获取列表
export const SITE_QUERYDELETE_DELETE = '/api/site/querydelete' // 删除单条记录
export const SITE_QUERYUSERDELETE_DELETE = '/api/site/queryuserdelete' // 删除单条记录
export const SITE_BATCHDELETE_POST = '/api/site/batchdelete' // 删除单条记录
export const SITE_QUERYBYID_GET = '/api/site/querybyid' // 根据Id获取单个实例
export const SITE_QUERYDIC_GET = '/api/site/querydic' // 根据Id获取单个实例字典集合

//  SiteSetting相关的API接口
export const SITESETTING_QUERYUSERLIST_GET = '/api/sitesetting/queryuserlist' // 查询登录用户分页数据
export const SITESETTING_QUERYFIELDVALUE_GET = '/api/sitesetting/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SITESETTING_NEXTBYID_GET = '/api/sitesetting/nextbyid' // 根据Id获取下一条记录
export const SITESETTING_PREXBYID_GET = '/api/sitesetting/prexbyid' // 根据Id获取上一条记录
export const SITESETTING_QUERYADD_POST = '/api/sitesetting/queryadd' // 增加单条记录
export const SITESETTING_QUERYUPDATE_PUT = '/api/sitesetting/queryupdate' // 修改单条记录
export const SITESETTING_QUERYPAGELIST_GET = '/api/sitesetting/querypagelist' // 动态Url分页查询
export const SITESETTING_QUERYLIST_GET = '/api/sitesetting/querylist' // 根据Url获取列表
export const SITESETTING_QUERYLISTASC_GET = '/api/sitesetting/querylistasc' // 根据Url获取列表
export const SITESETTING_QUERYDELETE_DELETE = '/api/sitesetting/querydelete' // 删除单条记录
export const SITESETTING_QUERYUSERDELETE_DELETE = '/api/sitesetting/queryuserdelete' // 删除单条记录
export const SITESETTING_BATCHDELETE_POST = '/api/sitesetting/batchdelete' // 删除单条记录
export const SITESETTING_QUERYBYID_GET = '/api/sitesetting/querybyid' // 根据Id获取单个实例
export const SITESETTING_QUERYDIC_GET = '/api/sitesetting/querydic' // 根据Id获取单个实例字典集合

//  PageAction相关的API接口
export const PAGEACTION_RESTORE_POST = '/api/pageaction/restore' // 页面还原
export const PAGEACTION_QUERYUSERLIST_GET = '/api/pageaction/queryuserlist' // 查询登录用户分页数据
export const PAGEACTION_QUERYFIELDVALUE_GET = '/api/pageaction/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PAGEACTION_NEXTBYID_GET = '/api/pageaction/nextbyid' // 根据Id获取下一条记录
export const PAGEACTION_PREXBYID_GET = '/api/pageaction/prexbyid' // 根据Id获取上一条记录
export const PAGEACTION_QUERYADD_POST = '/api/pageaction/queryadd' // 增加单条记录
export const PAGEACTION_QUERYUPDATE_PUT = '/api/pageaction/queryupdate' // 修改单条记录
export const PAGEACTION_QUERYPAGELIST_GET = '/api/pageaction/querypagelist' // 动态Url分页查询
export const PAGEACTION_QUERYLIST_GET = '/api/pageaction/querylist' // 根据Url获取列表
export const PAGEACTION_QUERYLISTASC_GET = '/api/pageaction/querylistasc' // 根据Url获取列表
export const PAGEACTION_QUERYDELETE_DELETE = '/api/pageaction/querydelete' // 删除单条记录
export const PAGEACTION_QUERYUSERDELETE_DELETE = '/api/pageaction/queryuserdelete' // 删除单条记录
export const PAGEACTION_BATCHDELETE_POST = '/api/pageaction/batchdelete' // 删除单条记录
export const PAGEACTION_QUERYBYID_GET = '/api/pageaction/querybyid' // 根据Id获取单个实例
export const PAGEACTION_QUERYDIC_GET = '/api/pageaction/querydic' // 根据Id获取单个实例字典集合

//  PageData相关的API接口
export const PAGEDATA_QUERYUSERLIST_GET = '/api/pagedata/queryuserlist' // 查询登录用户分页数据
export const PAGEDATA_QUERYFIELDVALUE_GET = '/api/pagedata/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PAGEDATA_NEXTBYID_GET = '/api/pagedata/nextbyid' // 根据Id获取下一条记录
export const PAGEDATA_PREXBYID_GET = '/api/pagedata/prexbyid' // 根据Id获取上一条记录
export const PAGEDATA_QUERYADD_POST = '/api/pagedata/queryadd' // 增加单条记录
export const PAGEDATA_QUERYUPDATE_PUT = '/api/pagedata/queryupdate' // 修改单条记录
export const PAGEDATA_QUERYPAGELIST_GET = '/api/pagedata/querypagelist' // 动态Url分页查询
export const PAGEDATA_QUERYLIST_GET = '/api/pagedata/querylist' // 根据Url获取列表
export const PAGEDATA_QUERYLISTASC_GET = '/api/pagedata/querylistasc' // 根据Url获取列表
export const PAGEDATA_QUERYDELETE_DELETE = '/api/pagedata/querydelete' // 删除单条记录
export const PAGEDATA_QUERYUSERDELETE_DELETE = '/api/pagedata/queryuserdelete' // 删除单条记录
export const PAGEDATA_BATCHDELETE_POST = '/api/pagedata/batchdelete' // 删除单条记录
export const PAGEDATA_QUERYBYID_GET = '/api/pagedata/querybyid' // 根据Id获取单个实例
export const PAGEDATA_QUERYDIC_GET = '/api/pagedata/querydic' // 根据Id获取单个实例字典集合

//  SitePage相关的API接口
export const SITEPAGE_GETTHEMEPAGE_GET = '/api/sitepage/getthemepage' // 获取当前页面的配置信息
export const SITEPAGE_EDIT_POST = '/api/sitepage/edit' // 模块添加
export const SITEPAGE_GETPAGEINFO_GET = '/api/sitepage/getpageinfo' // 获取页面配置
export const SITEPAGE_GETTHEMEPAGELIST_GET = '/api/sitepage/getthemepagelist' // 获取当前终端的页面，构建左侧菜单
export const SITEPAGE_SAVE_POST = '/api/sitepage/save' // Diy保存
export const SITEPAGE_QUERYUSERLIST_GET = '/api/sitepage/queryuserlist' // 查询登录用户分页数据
export const SITEPAGE_QUERYFIELDVALUE_GET = '/api/sitepage/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SITEPAGE_NEXTBYID_GET = '/api/sitepage/nextbyid' // 根据Id获取下一条记录
export const SITEPAGE_PREXBYID_GET = '/api/sitepage/prexbyid' // 根据Id获取上一条记录
export const SITEPAGE_QUERYADD_POST = '/api/sitepage/queryadd' // 增加单条记录
export const SITEPAGE_QUERYUPDATE_PUT = '/api/sitepage/queryupdate' // 修改单条记录
export const SITEPAGE_QUERYPAGELIST_GET = '/api/sitepage/querypagelist' // 动态Url分页查询
export const SITEPAGE_QUERYLIST_GET = '/api/sitepage/querylist' // 根据Url获取列表
export const SITEPAGE_QUERYLISTASC_GET = '/api/sitepage/querylistasc' // 根据Url获取列表
export const SITEPAGE_QUERYDELETE_DELETE = '/api/sitepage/querydelete' // 删除单条记录
export const SITEPAGE_QUERYUSERDELETE_DELETE = '/api/sitepage/queryuserdelete' // 删除单条记录
export const SITEPAGE_BATCHDELETE_POST = '/api/sitepage/batchdelete' // 删除单条记录
export const SITEPAGE_QUERYBYID_GET = '/api/sitepage/querybyid' // 根据Id获取单个实例
export const SITEPAGE_QUERYDIC_GET = '/api/sitepage/querydic' // 根据Id获取单个实例字典集合

//  SystemPage相关的API接口
export const SYSTEMPAGE_QUERYUSERLIST_GET = '/api/systempage/queryuserlist' // 查询登录用户分页数据
export const SYSTEMPAGE_QUERYFIELDVALUE_GET = '/api/systempage/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SYSTEMPAGE_NEXTBYID_GET = '/api/systempage/nextbyid' // 根据Id获取下一条记录
export const SYSTEMPAGE_PREXBYID_GET = '/api/systempage/prexbyid' // 根据Id获取上一条记录
export const SYSTEMPAGE_QUERYADD_POST = '/api/systempage/queryadd' // 增加单条记录
export const SYSTEMPAGE_QUERYUPDATE_PUT = '/api/systempage/queryupdate' // 修改单条记录
export const SYSTEMPAGE_QUERYPAGELIST_GET = '/api/systempage/querypagelist' // 动态Url分页查询
export const SYSTEMPAGE_QUERYLIST_GET = '/api/systempage/querylist' // 根据Url获取列表
export const SYSTEMPAGE_QUERYLISTASC_GET = '/api/systempage/querylistasc' // 根据Url获取列表
export const SYSTEMPAGE_QUERYDELETE_DELETE = '/api/systempage/querydelete' // 删除单条记录
export const SYSTEMPAGE_QUERYUSERDELETE_DELETE = '/api/systempage/queryuserdelete' // 删除单条记录
export const SYSTEMPAGE_BATCHDELETE_POST = '/api/systempage/batchdelete' // 删除单条记录
export const SYSTEMPAGE_QUERYBYID_GET = '/api/systempage/querybyid' // 根据Id获取单个实例
export const SYSTEMPAGE_QUERYDIC_GET = '/api/systempage/querydic' // 根据Id获取单个实例字典集合

//  ImageClass相关的API接口
export const IMAGECLASS_EDIT_POST = '/api/imageclass/edit' // 图片分类
export const IMAGECLASS_QUERYUSERLIST_GET = '/api/imageclass/queryuserlist' // 查询登录用户分页数据
export const IMAGECLASS_QUERYFIELDVALUE_GET = '/api/imageclass/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const IMAGECLASS_NEXTBYID_GET = '/api/imageclass/nextbyid' // 根据Id获取下一条记录
export const IMAGECLASS_PREXBYID_GET = '/api/imageclass/prexbyid' // 根据Id获取上一条记录
export const IMAGECLASS_QUERYADD_POST = '/api/imageclass/queryadd' // 增加单条记录
export const IMAGECLASS_QUERYUPDATE_PUT = '/api/imageclass/queryupdate' // 修改单条记录
export const IMAGECLASS_QUERYPAGELIST_GET = '/api/imageclass/querypagelist' // 动态Url分页查询
export const IMAGECLASS_QUERYLIST_GET = '/api/imageclass/querylist' // 根据Url获取列表
export const IMAGECLASS_QUERYLISTASC_GET = '/api/imageclass/querylistasc' // 根据Url获取列表
export const IMAGECLASS_QUERYDELETE_DELETE = '/api/imageclass/querydelete' // 删除单条记录
export const IMAGECLASS_QUERYUSERDELETE_DELETE = '/api/imageclass/queryuserdelete' // 删除单条记录
export const IMAGECLASS_BATCHDELETE_POST = '/api/imageclass/batchdelete' // 删除单条记录
export const IMAGECLASS_QUERYBYID_GET = '/api/imageclass/querybyid' // 根据Id获取单个实例
export const IMAGECLASS_QUERYDIC_GET = '/api/imageclass/querydic' // 根据Id获取单个实例字典集合

//  Layout相关的API接口
export const LAYOUT_QUERYUSERLIST_GET = '/api/layout/queryuserlist' // 查询登录用户分页数据
export const LAYOUT_QUERYFIELDVALUE_GET = '/api/layout/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const LAYOUT_NEXTBYID_GET = '/api/layout/nextbyid' // 根据Id获取下一条记录
export const LAYOUT_PREXBYID_GET = '/api/layout/prexbyid' // 根据Id获取上一条记录
export const LAYOUT_QUERYADD_POST = '/api/layout/queryadd' // 增加单条记录
export const LAYOUT_QUERYUPDATE_PUT = '/api/layout/queryupdate' // 修改单条记录
export const LAYOUT_QUERYPAGELIST_GET = '/api/layout/querypagelist' // 动态Url分页查询
export const LAYOUT_QUERYLIST_GET = '/api/layout/querylist' // 根据Url获取列表
export const LAYOUT_QUERYLISTASC_GET = '/api/layout/querylistasc' // 根据Url获取列表
export const LAYOUT_QUERYDELETE_DELETE = '/api/layout/querydelete' // 删除单条记录
export const LAYOUT_QUERYUSERDELETE_DELETE = '/api/layout/queryuserdelete' // 删除单条记录
export const LAYOUT_BATCHDELETE_POST = '/api/layout/batchdelete' // 删除单条记录
export const LAYOUT_QUERYBYID_GET = '/api/layout/querybyid' // 根据Id获取单个实例
export const LAYOUT_QUERYDIC_GET = '/api/layout/querydic' // 根据Id获取单个实例字典集合

//  Union相关的API接口
export const UNION_QUERYUSERLIST_GET = '/api/union/queryuserlist' // 查询登录用户分页数据
export const UNION_QUERYFIELDVALUE_GET = '/api/union/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const UNION_NEXTBYID_GET = '/api/union/nextbyid' // 根据Id获取下一条记录
export const UNION_PREXBYID_GET = '/api/union/prexbyid' // 根据Id获取上一条记录
export const UNION_QUERYADD_POST = '/api/union/queryadd' // 增加单条记录
export const UNION_QUERYUPDATE_PUT = '/api/union/queryupdate' // 修改单条记录
export const UNION_QUERYPAGELIST_GET = '/api/union/querypagelist' // 动态Url分页查询
export const UNION_QUERYLIST_GET = '/api/union/querylist' // 根据Url获取列表
export const UNION_QUERYLISTASC_GET = '/api/union/querylistasc' // 根据Url获取列表
export const UNION_QUERYDELETE_DELETE = '/api/union/querydelete' // 删除单条记录
export const UNION_QUERYUSERDELETE_DELETE = '/api/union/queryuserdelete' // 删除单条记录
export const UNION_BATCHDELETE_POST = '/api/union/batchdelete' // 删除单条记录
export const UNION_QUERYBYID_GET = '/api/union/querybyid' // 根据Id获取单个实例
export const UNION_QUERYDIC_GET = '/api/union/querydic' // 根据Id获取单个实例字典集合

//  Site5ug相关的API接口
export const SITE5UG_LOGIN_POST = '/api/site5ug/login' // 登录接口

//  Element相关的API接口
export const ELEMENT_QUERYUSERLIST_GET = '/api/element/queryuserlist' // 查询登录用户分页数据
export const ELEMENT_QUERYFIELDVALUE_GET = '/api/element/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ELEMENT_NEXTBYID_GET = '/api/element/nextbyid' // 根据Id获取下一条记录
export const ELEMENT_PREXBYID_GET = '/api/element/prexbyid' // 根据Id获取上一条记录
export const ELEMENT_QUERYADD_POST = '/api/element/queryadd' // 增加单条记录
export const ELEMENT_QUERYUPDATE_PUT = '/api/element/queryupdate' // 修改单条记录
export const ELEMENT_QUERYPAGELIST_GET = '/api/element/querypagelist' // 动态Url分页查询
export const ELEMENT_QUERYLIST_GET = '/api/element/querylist' // 根据Url获取列表
export const ELEMENT_QUERYLISTASC_GET = '/api/element/querylistasc' // 根据Url获取列表
export const ELEMENT_QUERYDELETE_DELETE = '/api/element/querydelete' // 删除单条记录
export const ELEMENT_QUERYUSERDELETE_DELETE = '/api/element/queryuserdelete' // 删除单条记录
export const ELEMENT_BATCHDELETE_POST = '/api/element/batchdelete' // 删除单条记录
export const ELEMENT_QUERYBYID_GET = '/api/element/querybyid' // 根据Id获取单个实例
export const ELEMENT_QUERYDIC_GET = '/api/element/querydic' // 根据Id获取单个实例字典集合

//  Component相关的API接口
export const COMPONENT_GETCOMPONENTSINGLE_GET = '/api/component/getcomponentsingle'
export const COMPONENT_GETCOMPONENTPAGELIST_GET = '/api/component/getcomponentpagelist'
export const COMPONENT_EDIT_POST = '/api/component/edit' // 组件编辑
export const COMPONENT_QUERYUSERLIST_GET = '/api/component/queryuserlist' // 查询登录用户分页数据
export const COMPONENT_QUERYFIELDVALUE_GET = '/api/component/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const COMPONENT_NEXTBYID_GET = '/api/component/nextbyid' // 根据Id获取下一条记录
export const COMPONENT_PREXBYID_GET = '/api/component/prexbyid' // 根据Id获取上一条记录
export const COMPONENT_QUERYADD_POST = '/api/component/queryadd' // 增加单条记录
export const COMPONENT_QUERYUPDATE_PUT = '/api/component/queryupdate' // 修改单条记录
export const COMPONENT_QUERYPAGELIST_GET = '/api/component/querypagelist' // 动态Url分页查询
export const COMPONENT_QUERYLIST_GET = '/api/component/querylist' // 根据Url获取列表
export const COMPONENT_QUERYLISTASC_GET = '/api/component/querylistasc' // 根据Url获取列表
export const COMPONENT_QUERYDELETE_DELETE = '/api/component/querydelete' // 删除单条记录
export const COMPONENT_QUERYUSERDELETE_DELETE = '/api/component/queryuserdelete' // 删除单条记录
export const COMPONENT_BATCHDELETE_POST = '/api/component/batchdelete' // 删除单条记录
export const COMPONENT_QUERYBYID_GET = '/api/component/querybyid' // 根据Id获取单个实例
export const COMPONENT_QUERYDIC_GET = '/api/component/querydic' // 根据Id获取单个实例字典集合

//  Border相关的API接口
export const BORDER_QUERYUSERLIST_GET = '/api/border/queryuserlist' // 查询登录用户分页数据
export const BORDER_QUERYFIELDVALUE_GET = '/api/border/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const BORDER_NEXTBYID_GET = '/api/border/nextbyid' // 根据Id获取下一条记录
export const BORDER_PREXBYID_GET = '/api/border/prexbyid' // 根据Id获取上一条记录
export const BORDER_QUERYADD_POST = '/api/border/queryadd' // 增加单条记录
export const BORDER_QUERYUPDATE_PUT = '/api/border/queryupdate' // 修改单条记录
export const BORDER_QUERYPAGELIST_GET = '/api/border/querypagelist' // 动态Url分页查询
export const BORDER_QUERYLIST_GET = '/api/border/querylist' // 根据Url获取列表
export const BORDER_QUERYLISTASC_GET = '/api/border/querylistasc' // 根据Url获取列表
export const BORDER_QUERYDELETE_DELETE = '/api/border/querydelete' // 删除单条记录
export const BORDER_QUERYUSERDELETE_DELETE = '/api/border/queryuserdelete' // 删除单条记录
export const BORDER_BATCHDELETE_POST = '/api/border/batchdelete' // 删除单条记录
export const BORDER_QUERYBYID_GET = '/api/border/querybyid' // 根据Id获取单个实例
export const BORDER_QUERYDIC_GET = '/api/border/querydic' // 根据Id获取单个实例字典集合

//  ApiAddress相关的API接口
export const APIADDRESS_QUERYUSERLIST_GET = '/api/apiaddress/queryuserlist' // 查询登录用户分页数据
export const APIADDRESS_QUERYFIELDVALUE_GET = '/api/apiaddress/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const APIADDRESS_NEXTBYID_GET = '/api/apiaddress/nextbyid' // 根据Id获取下一条记录
export const APIADDRESS_PREXBYID_GET = '/api/apiaddress/prexbyid' // 根据Id获取上一条记录
export const APIADDRESS_QUERYADD_POST = '/api/apiaddress/queryadd' // 增加单条记录
export const APIADDRESS_QUERYUPDATE_PUT = '/api/apiaddress/queryupdate' // 修改单条记录
export const APIADDRESS_QUERYPAGELIST_GET = '/api/apiaddress/querypagelist' // 动态Url分页查询
export const APIADDRESS_QUERYLIST_GET = '/api/apiaddress/querylist' // 根据Url获取列表
export const APIADDRESS_QUERYLISTASC_GET = '/api/apiaddress/querylistasc' // 根据Url获取列表
export const APIADDRESS_QUERYDELETE_DELETE = '/api/apiaddress/querydelete' // 删除单条记录
export const APIADDRESS_QUERYUSERDELETE_DELETE = '/api/apiaddress/queryuserdelete' // 删除单条记录
export const APIADDRESS_BATCHDELETE_POST = '/api/apiaddress/batchdelete' // 删除单条记录
export const APIADDRESS_QUERYBYID_GET = '/api/apiaddress/querybyid' // 根据Id获取单个实例
export const APIADDRESS_QUERYDIC_GET = '/api/apiaddress/querydic' // 根据Id获取单个实例字典集合

//  WorkOrder相关的API接口
export const WORKORDER_ADD_POST = '/api/workorder/add'
export const WORKORDER_QUERYUSERLIST_GET = '/api/workorder/queryuserlist' // 查询登录用户分页数据
export const WORKORDER_QUERYFIELDVALUE_GET = '/api/workorder/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const WORKORDER_NEXTBYID_GET = '/api/workorder/nextbyid' // 根据Id获取下一条记录
export const WORKORDER_PREXBYID_GET = '/api/workorder/prexbyid' // 根据Id获取上一条记录
export const WORKORDER_QUERYADD_POST = '/api/workorder/queryadd' // 增加单条记录
export const WORKORDER_QUERYUPDATE_PUT = '/api/workorder/queryupdate' // 修改单条记录
export const WORKORDER_QUERYPAGELIST_GET = '/api/workorder/querypagelist' // 动态Url分页查询
export const WORKORDER_QUERYLIST_GET = '/api/workorder/querylist' // 根据Url获取列表
export const WORKORDER_QUERYLISTASC_GET = '/api/workorder/querylistasc' // 根据Url获取列表
export const WORKORDER_QUERYDELETE_DELETE = '/api/workorder/querydelete' // 删除单条记录
export const WORKORDER_QUERYUSERDELETE_DELETE = '/api/workorder/queryuserdelete' // 删除单条记录
export const WORKORDER_BATCHDELETE_POST = '/api/workorder/batchdelete' // 删除单条记录
export const WORKORDER_QUERYBYID_GET = '/api/workorder/querybyid' // 根据Id获取单个实例
export const WORKORDER_QUERYDIC_GET = '/api/workorder/querydic' // 根据Id获取单个实例字典集合

//  About相关的API接口
export const ABOUT_QUERYUSERLIST_GET = '/api/about/queryuserlist' // 查询登录用户分页数据
export const ABOUT_QUERYFIELDVALUE_GET = '/api/about/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ABOUT_NEXTBYID_GET = '/api/about/nextbyid' // 根据Id获取下一条记录
export const ABOUT_PREXBYID_GET = '/api/about/prexbyid' // 根据Id获取上一条记录
export const ABOUT_QUERYADD_POST = '/api/about/queryadd' // 增加单条记录
export const ABOUT_QUERYUPDATE_PUT = '/api/about/queryupdate' // 修改单条记录
export const ABOUT_QUERYPAGELIST_GET = '/api/about/querypagelist' // 动态Url分页查询
export const ABOUT_QUERYLIST_GET = '/api/about/querylist' // 根据Url获取列表
export const ABOUT_QUERYLISTASC_GET = '/api/about/querylistasc' // 根据Url获取列表
export const ABOUT_QUERYDELETE_DELETE = '/api/about/querydelete' // 删除单条记录
export const ABOUT_QUERYUSERDELETE_DELETE = '/api/about/queryuserdelete' // 删除单条记录
export const ABOUT_BATCHDELETE_POST = '/api/about/batchdelete' // 删除单条记录
export const ABOUT_QUERYBYID_GET = '/api/about/querybyid' // 根据Id获取单个实例
export const ABOUT_QUERYDIC_GET = '/api/about/querydic' // 根据Id获取单个实例字典集合

//  Article相关的API接口
export const ARTICLE_AGREEMENT_GET = '/api/article/agreement' // 注册协议
export const ARTICLE_ARTICLEDETAIL_GET = '/api/article/articledetail' // 内容详情页面
export const ARTICLE_USERNOTICELIST_GET = '/api/article/usernoticelist' // 公告
export const ARTICLE_TOPLINELIST_GET = '/api/article/toplinelist' // 头条列表
export const ARTICLE_ARTICLELIST_GET = '/api/article/articlelist' // 文章列表
export const ARTICLE_HELPLIST_GET = '/api/article/helplist' // 客服列表
export const ARTICLE_ABOUTDETAIL_GET = '/api/article/aboutdetail' // 帮助内容
export const ARTICLE_ARTICLECLASSIFY_GET = '/api/article/articleclassify' // 头条分类
export const ARTICLE_HELPCLASSIFY_GET = '/api/article/helpclassify' // 帮助分类
export const ARTICLE_TOPHELPLIST_GET = '/api/article/tophelplist' // 热门问答
export const ARTICLE_QUERYUSERLIST_GET = '/api/article/queryuserlist' // 查询登录用户分页数据
export const ARTICLE_QUERYFIELDVALUE_GET = '/api/article/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ARTICLE_NEXTBYID_GET = '/api/article/nextbyid' // 根据Id获取下一条记录
export const ARTICLE_PREXBYID_GET = '/api/article/prexbyid' // 根据Id获取上一条记录
export const ARTICLE_QUERYADD_POST = '/api/article/queryadd' // 增加单条记录
export const ARTICLE_QUERYUPDATE_PUT = '/api/article/queryupdate' // 修改单条记录
export const ARTICLE_QUERYPAGELIST_GET = '/api/article/querypagelist' // 动态Url分页查询
export const ARTICLE_QUERYLIST_GET = '/api/article/querylist' // 根据Url获取列表
export const ARTICLE_QUERYLISTASC_GET = '/api/article/querylistasc' // 根据Url获取列表
export const ARTICLE_QUERYDELETE_DELETE = '/api/article/querydelete' // 删除单条记录
export const ARTICLE_QUERYUSERDELETE_DELETE = '/api/article/queryuserdelete' // 删除单条记录
export const ARTICLE_BATCHDELETE_POST = '/api/article/batchdelete' // 删除单条记录
export const ARTICLE_QUERYBYID_GET = '/api/article/querybyid' // 根据Id获取单个实例
export const ARTICLE_QUERYDIC_GET = '/api/article/querydic' // 根据Id获取单个实例字典集合

//  Channel相关的API接口
export const CHANNEL_QUERYUSERLIST_GET = '/api/channel/queryuserlist' // 查询登录用户分页数据
export const CHANNEL_QUERYFIELDVALUE_GET = '/api/channel/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const CHANNEL_NEXTBYID_GET = '/api/channel/nextbyid' // 根据Id获取下一条记录
export const CHANNEL_PREXBYID_GET = '/api/channel/prexbyid' // 根据Id获取上一条记录
export const CHANNEL_QUERYADD_POST = '/api/channel/queryadd' // 增加单条记录
export const CHANNEL_QUERYUPDATE_PUT = '/api/channel/queryupdate' // 修改单条记录
export const CHANNEL_QUERYPAGELIST_GET = '/api/channel/querypagelist' // 动态Url分页查询
export const CHANNEL_QUERYLIST_GET = '/api/channel/querylist' // 根据Url获取列表
export const CHANNEL_QUERYLISTASC_GET = '/api/channel/querylistasc' // 根据Url获取列表
export const CHANNEL_QUERYDELETE_DELETE = '/api/channel/querydelete' // 删除单条记录
export const CHANNEL_QUERYUSERDELETE_DELETE = '/api/channel/queryuserdelete' // 删除单条记录
export const CHANNEL_BATCHDELETE_POST = '/api/channel/batchdelete' // 删除单条记录
export const CHANNEL_QUERYBYID_GET = '/api/channel/querybyid' // 根据Id获取单个实例
export const CHANNEL_QUERYDIC_GET = '/api/channel/querydic' // 根据Id获取单个实例字典集合

//  Help相关的API接口
export const HELP_NAV_GET = '/api/help/nav' // Pc端帮助中心导航
export const HELP_LIST_GET = '/api/help/list' // 客服列表

//  SinglePage相关的API接口
export const SINGLEPAGE_QUERYUSERLIST_GET = '/api/singlepage/queryuserlist' // 查询登录用户分页数据
export const SINGLEPAGE_QUERYFIELDVALUE_GET = '/api/singlepage/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SINGLEPAGE_NEXTBYID_GET = '/api/singlepage/nextbyid' // 根据Id获取下一条记录
export const SINGLEPAGE_PREXBYID_GET = '/api/singlepage/prexbyid' // 根据Id获取上一条记录
export const SINGLEPAGE_QUERYADD_POST = '/api/singlepage/queryadd' // 增加单条记录
export const SINGLEPAGE_QUERYUPDATE_PUT = '/api/singlepage/queryupdate' // 修改单条记录
export const SINGLEPAGE_QUERYPAGELIST_GET = '/api/singlepage/querypagelist' // 动态Url分页查询
export const SINGLEPAGE_QUERYLIST_GET = '/api/singlepage/querylist' // 根据Url获取列表
export const SINGLEPAGE_QUERYLISTASC_GET = '/api/singlepage/querylistasc' // 根据Url获取列表
export const SINGLEPAGE_QUERYDELETE_DELETE = '/api/singlepage/querydelete' // 删除单条记录
export const SINGLEPAGE_QUERYUSERDELETE_DELETE = '/api/singlepage/queryuserdelete' // 删除单条记录
export const SINGLEPAGE_BATCHDELETE_POST = '/api/singlepage/batchdelete' // 删除单条记录
export const SINGLEPAGE_QUERYBYID_GET = '/api/singlepage/querybyid' // 根据Id获取单个实例
export const SINGLEPAGE_QUERYDIC_GET = '/api/singlepage/querydic' // 根据Id获取单个实例字典集合

//  Special相关的API接口
export const SPECIAL_QUERYUSERLIST_GET = '/api/special/queryuserlist' // 查询登录用户分页数据
export const SPECIAL_QUERYFIELDVALUE_GET = '/api/special/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SPECIAL_NEXTBYID_GET = '/api/special/nextbyid' // 根据Id获取下一条记录
export const SPECIAL_PREXBYID_GET = '/api/special/prexbyid' // 根据Id获取上一条记录
export const SPECIAL_QUERYADD_POST = '/api/special/queryadd' // 增加单条记录
export const SPECIAL_QUERYUPDATE_PUT = '/api/special/queryupdate' // 修改单条记录
export const SPECIAL_QUERYPAGELIST_GET = '/api/special/querypagelist' // 动态Url分页查询
export const SPECIAL_QUERYLIST_GET = '/api/special/querylist' // 根据Url获取列表
export const SPECIAL_QUERYLISTASC_GET = '/api/special/querylistasc' // 根据Url获取列表
export const SPECIAL_QUERYDELETE_DELETE = '/api/special/querydelete' // 删除单条记录
export const SPECIAL_QUERYUSERDELETE_DELETE = '/api/special/queryuserdelete' // 删除单条记录
export const SPECIAL_BATCHDELETE_POST = '/api/special/batchdelete' // 删除单条记录
export const SPECIAL_QUERYBYID_GET = '/api/special/querybyid' // 根据Id获取单个实例
export const SPECIAL_QUERYDIC_GET = '/api/special/querydic' // 根据Id获取单个实例字典集合

//  DataSyn相关的API接口
export const DATASYN_ORDERUPLOADS_POST = '/api/datasyn/orderuploads'
export const DATASYN_QUERYUSERLIST_GET = '/api/datasyn/queryuserlist' // 查询登录用户分页数据
export const DATASYN_QUERYFIELDVALUE_GET = '/api/datasyn/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const DATASYN_NEXTBYID_GET = '/api/datasyn/nextbyid' // 根据Id获取下一条记录
export const DATASYN_PREXBYID_GET = '/api/datasyn/prexbyid' // 根据Id获取上一条记录
export const DATASYN_QUERYADD_POST = '/api/datasyn/queryadd' // 增加单条记录
export const DATASYN_QUERYUPDATE_PUT = '/api/datasyn/queryupdate' // 修改单条记录
export const DATASYN_QUERYPAGELIST_GET = '/api/datasyn/querypagelist' // 动态Url分页查询
export const DATASYN_QUERYLIST_GET = '/api/datasyn/querylist' // 根据Url获取列表
export const DATASYN_QUERYLISTASC_GET = '/api/datasyn/querylistasc' // 根据Url获取列表
export const DATASYN_QUERYDELETE_DELETE = '/api/datasyn/querydelete' // 删除单条记录
export const DATASYN_QUERYUSERDELETE_DELETE = '/api/datasyn/queryuserdelete' // 删除单条记录
export const DATASYN_BATCHDELETE_POST = '/api/datasyn/batchdelete' // 删除单条记录
export const DATASYN_QUERYBYID_GET = '/api/datasyn/querybyid' // 根据Id获取单个实例
export const DATASYN_QUERYDIC_GET = '/api/datasyn/querydic' // 根据Id获取单个实例字典集合

//  ProductBuyStock相关的API接口
export const PRODUCTBUYSTOCK_QUERYUSERLIST_GET = '/api/productbuystock/queryuserlist' // 查询登录用户分页数据
export const PRODUCTBUYSTOCK_QUERYFIELDVALUE_GET = '/api/productbuystock/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PRODUCTBUYSTOCK_NEXTBYID_GET = '/api/productbuystock/nextbyid' // 根据Id获取下一条记录
export const PRODUCTBUYSTOCK_PREXBYID_GET = '/api/productbuystock/prexbyid' // 根据Id获取上一条记录
export const PRODUCTBUYSTOCK_QUERYADD_POST = '/api/productbuystock/queryadd' // 增加单条记录
export const PRODUCTBUYSTOCK_QUERYUPDATE_PUT = '/api/productbuystock/queryupdate' // 修改单条记录
export const PRODUCTBUYSTOCK_QUERYPAGELIST_GET = '/api/productbuystock/querypagelist' // 动态Url分页查询
export const PRODUCTBUYSTOCK_QUERYLIST_GET = '/api/productbuystock/querylist' // 根据Url获取列表
export const PRODUCTBUYSTOCK_QUERYLISTASC_GET = '/api/productbuystock/querylistasc' // 根据Url获取列表
export const PRODUCTBUYSTOCK_QUERYDELETE_DELETE = '/api/productbuystock/querydelete' // 删除单条记录
export const PRODUCTBUYSTOCK_QUERYUSERDELETE_DELETE = '/api/productbuystock/queryuserdelete' // 删除单条记录
export const PRODUCTBUYSTOCK_BATCHDELETE_POST = '/api/productbuystock/batchdelete' // 删除单条记录
export const PRODUCTBUYSTOCK_QUERYBYID_GET = '/api/productbuystock/querybyid' // 根据Id获取单个实例
export const PRODUCTBUYSTOCK_QUERYDIC_GET = '/api/productbuystock/querydic' // 根据Id获取单个实例字典集合

//  UserStock相关的API接口
export const USERSTOCK_GETLIST_GET = '/api/userstock/getlist' // 查询用户库存列表，根据条件查询用户库存列表
export const USERSTOCK_GETPRODUCTLIST_GET = '/api/userstock/getproductlist' // 查询摘要
export const USERSTOCK_OFFLINEDELIVERYPRODUCT_GET = '/api/userstock/offlinedeliveryproduct' // 根据订单，查询订单发货商品以及发货商品数量
export const USERSTOCK_OFFLINEDELIVERY_GET = '/api/userstock/offlinedelivery' // 线下发货
export const USERSTOCK_CONFIRM_GET = '/api/userstock/confirm' // 确认收货
export const USERSTOCK_QUERYUSERLIST_GET = '/api/userstock/queryuserlist' // 查询登录用户分页数据
export const USERSTOCK_QUERYFIELDVALUE_GET = '/api/userstock/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const USERSTOCK_NEXTBYID_GET = '/api/userstock/nextbyid' // 根据Id获取下一条记录
export const USERSTOCK_PREXBYID_GET = '/api/userstock/prexbyid' // 根据Id获取上一条记录
export const USERSTOCK_QUERYADD_POST = '/api/userstock/queryadd' // 增加单条记录
export const USERSTOCK_QUERYUPDATE_PUT = '/api/userstock/queryupdate' // 修改单条记录
export const USERSTOCK_QUERYPAGELIST_GET = '/api/userstock/querypagelist' // 动态Url分页查询
export const USERSTOCK_QUERYLIST_GET = '/api/userstock/querylist' // 根据Url获取列表
export const USERSTOCK_QUERYLISTASC_GET = '/api/userstock/querylistasc' // 根据Url获取列表
export const USERSTOCK_QUERYDELETE_DELETE = '/api/userstock/querydelete' // 删除单条记录
export const USERSTOCK_QUERYUSERDELETE_DELETE = '/api/userstock/queryuserdelete' // 删除单条记录
export const USERSTOCK_BATCHDELETE_POST = '/api/userstock/batchdelete' // 删除单条记录
export const USERSTOCK_QUERYBYID_GET = '/api/userstock/querybyid' // 根据Id获取单个实例
export const USERSTOCK_QUERYDIC_GET = '/api/userstock/querydic' // 根据Id获取单个实例字典集合

//  PresellOrder相关的API接口
export const PRESELLORDER_QUERYUSERLIST_GET = '/api/presellorder/queryuserlist' // 查询登录用户分页数据
export const PRESELLORDER_QUERYFIELDVALUE_GET = '/api/presellorder/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PRESELLORDER_NEXTBYID_GET = '/api/presellorder/nextbyid' // 根据Id获取下一条记录
export const PRESELLORDER_PREXBYID_GET = '/api/presellorder/prexbyid' // 根据Id获取上一条记录
export const PRESELLORDER_QUERYADD_POST = '/api/presellorder/queryadd' // 增加单条记录
export const PRESELLORDER_QUERYUPDATE_PUT = '/api/presellorder/queryupdate' // 修改单条记录
export const PRESELLORDER_QUERYPAGELIST_GET = '/api/presellorder/querypagelist' // 动态Url分页查询
export const PRESELLORDER_QUERYLIST_GET = '/api/presellorder/querylist' // 根据Url获取列表
export const PRESELLORDER_QUERYLISTASC_GET = '/api/presellorder/querylistasc' // 根据Url获取列表
export const PRESELLORDER_QUERYDELETE_DELETE = '/api/presellorder/querydelete' // 删除单条记录
export const PRESELLORDER_QUERYUSERDELETE_DELETE = '/api/presellorder/queryuserdelete' // 删除单条记录
export const PRESELLORDER_BATCHDELETE_POST = '/api/presellorder/batchdelete' // 删除单条记录
export const PRESELLORDER_QUERYBYID_GET = '/api/presellorder/querybyid' // 根据Id获取单个实例
export const PRESELLORDER_QUERYDIC_GET = '/api/presellorder/querydic' // 根据Id获取单个实例字典集合

//  PresellProduct相关的API接口
export const PRESELLPRODUCT_QUERYUSERLIST_GET = '/api/presellproduct/queryuserlist' // 查询登录用户分页数据
export const PRESELLPRODUCT_QUERYFIELDVALUE_GET = '/api/presellproduct/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PRESELLPRODUCT_NEXTBYID_GET = '/api/presellproduct/nextbyid' // 根据Id获取下一条记录
export const PRESELLPRODUCT_PREXBYID_GET = '/api/presellproduct/prexbyid' // 根据Id获取上一条记录
export const PRESELLPRODUCT_QUERYADD_POST = '/api/presellproduct/queryadd' // 增加单条记录
export const PRESELLPRODUCT_QUERYUPDATE_PUT = '/api/presellproduct/queryupdate' // 修改单条记录
export const PRESELLPRODUCT_QUERYPAGELIST_GET = '/api/presellproduct/querypagelist' // 动态Url分页查询
export const PRESELLPRODUCT_QUERYLIST_GET = '/api/presellproduct/querylist' // 根据Url获取列表
export const PRESELLPRODUCT_QUERYLISTASC_GET = '/api/presellproduct/querylistasc' // 根据Url获取列表
export const PRESELLPRODUCT_QUERYDELETE_DELETE = '/api/presellproduct/querydelete' // 删除单条记录
export const PRESELLPRODUCT_QUERYUSERDELETE_DELETE = '/api/presellproduct/queryuserdelete' // 删除单条记录
export const PRESELLPRODUCT_BATCHDELETE_POST = '/api/presellproduct/batchdelete' // 删除单条记录
export const PRESELLPRODUCT_QUERYBYID_GET = '/api/presellproduct/querybyid' // 根据Id获取单个实例
export const PRESELLPRODUCT_QUERYDIC_GET = '/api/presellproduct/querydic' // 根据Id获取单个实例字典集合

//  UserRights相关的API接口
export const USERRIGHTS_GETVIEW_GET = '/api/userrights/getview' // 商家权益
export const USERRIGHTS_BUY_POST = '/api/userrights/buy' // 商家服务订购
export const USERRIGHTS_GETUSERINTRO_GET = '/api/userrights/getuserintro' // 获取用户信息
export const USERRIGHTS_QUERYUSERLIST_GET = '/api/userrights/queryuserlist' // 查询登录用户分页数据
export const USERRIGHTS_QUERYFIELDVALUE_GET = '/api/userrights/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const USERRIGHTS_NEXTBYID_GET = '/api/userrights/nextbyid' // 根据Id获取下一条记录
export const USERRIGHTS_PREXBYID_GET = '/api/userrights/prexbyid' // 根据Id获取上一条记录
export const USERRIGHTS_QUERYADD_POST = '/api/userrights/queryadd' // 增加单条记录
export const USERRIGHTS_QUERYUPDATE_PUT = '/api/userrights/queryupdate' // 修改单条记录
export const USERRIGHTS_QUERYPAGELIST_GET = '/api/userrights/querypagelist' // 动态Url分页查询
export const USERRIGHTS_QUERYLIST_GET = '/api/userrights/querylist' // 根据Url获取列表
export const USERRIGHTS_QUERYLISTASC_GET = '/api/userrights/querylistasc' // 根据Url获取列表
export const USERRIGHTS_QUERYDELETE_DELETE = '/api/userrights/querydelete' // 删除单条记录
export const USERRIGHTS_QUERYUSERDELETE_DELETE = '/api/userrights/queryuserdelete' // 删除单条记录
export const USERRIGHTS_BATCHDELETE_POST = '/api/userrights/batchdelete' // 删除单条记录
export const USERRIGHTS_QUERYBYID_GET = '/api/userrights/querybyid' // 根据Id获取单个实例
export const USERRIGHTS_QUERYDIC_GET = '/api/userrights/querydic' // 根据Id获取单个实例字典集合

//  Team相关的API接口
export const TEAM_LIST_GET = '/api/team/list' // 获取团队成员列表
export const TEAM_QUERYUSERLIST_GET = '/api/team/queryuserlist' // 查询登录用户分页数据
export const TEAM_QUERYFIELDVALUE_GET = '/api/team/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const TEAM_NEXTBYID_GET = '/api/team/nextbyid' // 根据Id获取下一条记录
export const TEAM_PREXBYID_GET = '/api/team/prexbyid' // 根据Id获取上一条记录
export const TEAM_QUERYADD_POST = '/api/team/queryadd' // 增加单条记录
export const TEAM_QUERYUPDATE_PUT = '/api/team/queryupdate' // 修改单条记录
export const TEAM_QUERYPAGELIST_GET = '/api/team/querypagelist' // 动态Url分页查询
export const TEAM_QUERYLIST_GET = '/api/team/querylist' // 根据Url获取列表
export const TEAM_QUERYLISTASC_GET = '/api/team/querylistasc' // 根据Url获取列表
export const TEAM_QUERYDELETE_DELETE = '/api/team/querydelete' // 删除单条记录
export const TEAM_QUERYUSERDELETE_DELETE = '/api/team/queryuserdelete' // 删除单条记录
export const TEAM_BATCHDELETE_POST = '/api/team/batchdelete' // 删除单条记录
export const TEAM_QUERYBYID_GET = '/api/team/querybyid' // 根据Id获取单个实例
export const TEAM_QUERYDIC_GET = '/api/team/querydic' // 根据Id获取单个实例字典集合

//  Cases相关的API接口
export const CASES_LIST_GET = '/api/cases/list' // 获取成功案例列表
export const CASES_QUERYUSERLIST_GET = '/api/cases/queryuserlist' // 查询登录用户分页数据
export const CASES_QUERYFIELDVALUE_GET = '/api/cases/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const CASES_NEXTBYID_GET = '/api/cases/nextbyid' // 根据Id获取下一条记录
export const CASES_PREXBYID_GET = '/api/cases/prexbyid' // 根据Id获取上一条记录
export const CASES_QUERYADD_POST = '/api/cases/queryadd' // 增加单条记录
export const CASES_QUERYUPDATE_PUT = '/api/cases/queryupdate' // 修改单条记录
export const CASES_QUERYPAGELIST_GET = '/api/cases/querypagelist' // 动态Url分页查询
export const CASES_QUERYLIST_GET = '/api/cases/querylist' // 根据Url获取列表
export const CASES_QUERYLISTASC_GET = '/api/cases/querylistasc' // 根据Url获取列表
export const CASES_QUERYDELETE_DELETE = '/api/cases/querydelete' // 删除单条记录
export const CASES_QUERYUSERDELETE_DELETE = '/api/cases/queryuserdelete' // 删除单条记录
export const CASES_BATCHDELETE_POST = '/api/cases/batchdelete' // 删除单条记录
export const CASES_QUERYBYID_GET = '/api/cases/querybyid' // 根据Id获取单个实例
export const CASES_QUERYDIC_GET = '/api/cases/querydic' // 根据Id获取单个实例字典集合

//  SmallTarget相关的API接口
export const SMALLTARGET_QUERYUSERLIST_GET = '/api/smalltarget/queryuserlist' // 查询登录用户分页数据
export const SMALLTARGET_QUERYFIELDVALUE_GET = '/api/smalltarget/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SMALLTARGET_NEXTBYID_GET = '/api/smalltarget/nextbyid' // 根据Id获取下一条记录
export const SMALLTARGET_PREXBYID_GET = '/api/smalltarget/prexbyid' // 根据Id获取上一条记录
export const SMALLTARGET_QUERYADD_POST = '/api/smalltarget/queryadd' // 增加单条记录
export const SMALLTARGET_QUERYUPDATE_PUT = '/api/smalltarget/queryupdate' // 修改单条记录
export const SMALLTARGET_QUERYPAGELIST_GET = '/api/smalltarget/querypagelist' // 动态Url分页查询
export const SMALLTARGET_QUERYLIST_GET = '/api/smalltarget/querylist' // 根据Url获取列表
export const SMALLTARGET_QUERYLISTASC_GET = '/api/smalltarget/querylistasc' // 根据Url获取列表
export const SMALLTARGET_QUERYDELETE_DELETE = '/api/smalltarget/querydelete' // 删除单条记录
export const SMALLTARGET_QUERYUSERDELETE_DELETE = '/api/smalltarget/queryuserdelete' // 删除单条记录
export const SMALLTARGET_BATCHDELETE_POST = '/api/smalltarget/batchdelete' // 删除单条记录
export const SMALLTARGET_QUERYBYID_GET = '/api/smalltarget/querybyid' // 根据Id获取单个实例
export const SMALLTARGET_QUERYDIC_GET = '/api/smalltarget/querydic' // 根据Id获取单个实例字典集合

//  SmallTargetRanking相关的API接口
export const SMALLTARGETRANKING_QUERYUSERLIST_GET = '/api/smalltargetranking/queryuserlist' // 查询登录用户分页数据
export const SMALLTARGETRANKING_QUERYFIELDVALUE_GET = '/api/smalltargetranking/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const SMALLTARGETRANKING_NEXTBYID_GET = '/api/smalltargetranking/nextbyid' // 根据Id获取下一条记录
export const SMALLTARGETRANKING_PREXBYID_GET = '/api/smalltargetranking/prexbyid' // 根据Id获取上一条记录
export const SMALLTARGETRANKING_QUERYADD_POST = '/api/smalltargetranking/queryadd' // 增加单条记录
export const SMALLTARGETRANKING_QUERYUPDATE_PUT = '/api/smalltargetranking/queryupdate' // 修改单条记录
export const SMALLTARGETRANKING_QUERYPAGELIST_GET = '/api/smalltargetranking/querypagelist' // 动态Url分页查询
export const SMALLTARGETRANKING_QUERYLIST_GET = '/api/smalltargetranking/querylist' // 根据Url获取列表
export const SMALLTARGETRANKING_QUERYLISTASC_GET = '/api/smalltargetranking/querylistasc' // 根据Url获取列表
export const SMALLTARGETRANKING_QUERYDELETE_DELETE = '/api/smalltargetranking/querydelete' // 删除单条记录
export const SMALLTARGETRANKING_QUERYUSERDELETE_DELETE = '/api/smalltargetranking/queryuserdelete' // 删除单条记录
export const SMALLTARGETRANKING_BATCHDELETE_POST = '/api/smalltargetranking/batchdelete' // 删除单条记录
export const SMALLTARGETRANKING_QUERYBYID_GET = '/api/smalltargetranking/querybyid' // 根据Id获取单个实例
export const SMALLTARGETRANKING_QUERYDIC_GET = '/api/smalltargetranking/querydic' // 根据Id获取单个实例字典集合

//  UserSmallTarget相关的API接口
export const USERSMALLTARGET_QUERYUSERLIST_GET = '/api/usersmalltarget/queryuserlist' // 查询登录用户分页数据
export const USERSMALLTARGET_QUERYFIELDVALUE_GET = '/api/usersmalltarget/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const USERSMALLTARGET_NEXTBYID_GET = '/api/usersmalltarget/nextbyid' // 根据Id获取下一条记录
export const USERSMALLTARGET_PREXBYID_GET = '/api/usersmalltarget/prexbyid' // 根据Id获取上一条记录
export const USERSMALLTARGET_QUERYADD_POST = '/api/usersmalltarget/queryadd' // 增加单条记录
export const USERSMALLTARGET_QUERYUPDATE_PUT = '/api/usersmalltarget/queryupdate' // 修改单条记录
export const USERSMALLTARGET_QUERYPAGELIST_GET = '/api/usersmalltarget/querypagelist' // 动态Url分页查询
export const USERSMALLTARGET_QUERYLIST_GET = '/api/usersmalltarget/querylist' // 根据Url获取列表
export const USERSMALLTARGET_QUERYLISTASC_GET = '/api/usersmalltarget/querylistasc' // 根据Url获取列表
export const USERSMALLTARGET_QUERYDELETE_DELETE = '/api/usersmalltarget/querydelete' // 删除单条记录
export const USERSMALLTARGET_QUERYUSERDELETE_DELETE = '/api/usersmalltarget/queryuserdelete' // 删除单条记录
export const USERSMALLTARGET_BATCHDELETE_POST = '/api/usersmalltarget/batchdelete' // 删除单条记录
export const USERSMALLTARGET_QUERYBYID_GET = '/api/usersmalltarget/querybyid' // 根据Id获取单个实例
export const USERSMALLTARGET_QUERYDIC_GET = '/api/usersmalltarget/querydic' // 根据Id获取单个实例字典集合

//  Course相关的API接口
export const COURSE_CLASSLIST_GET = '/api/course/classlist' // 获取商学院课程列表
export const COURSE_SLIDERLIST_GET = '/api/course/sliderlist' // 获取商学院首页轮播列表
export const COURSE_GETCOURSELISTBYCLASS_GET = '/api/course/getcourselistbyclass' // 根据课程分类获取课程列表
export const COURSE_QUERYUSERLIST_GET = '/api/course/queryuserlist' // 查询登录用户分页数据
export const COURSE_QUERYFIELDVALUE_GET = '/api/course/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const COURSE_NEXTBYID_GET = '/api/course/nextbyid' // 根据Id获取下一条记录
export const COURSE_PREXBYID_GET = '/api/course/prexbyid' // 根据Id获取上一条记录
export const COURSE_QUERYADD_POST = '/api/course/queryadd' // 增加单条记录
export const COURSE_QUERYUPDATE_PUT = '/api/course/queryupdate' // 修改单条记录
export const COURSE_QUERYPAGELIST_GET = '/api/course/querypagelist' // 动态Url分页查询
export const COURSE_QUERYLIST_GET = '/api/course/querylist' // 根据Url获取列表
export const COURSE_QUERYLISTASC_GET = '/api/course/querylistasc' // 根据Url获取列表
export const COURSE_QUERYDELETE_DELETE = '/api/course/querydelete' // 删除单条记录
export const COURSE_QUERYUSERDELETE_DELETE = '/api/course/queryuserdelete' // 删除单条记录
export const COURSE_BATCHDELETE_POST = '/api/course/batchdelete' // 删除单条记录
export const COURSE_QUERYBYID_GET = '/api/course/querybyid' // 根据Id获取单个实例
export const COURSE_QUERYDIC_GET = '/api/course/querydic' // 根据Id获取单个实例字典集合

//  RelationshipIndex相关的API接口
export const RELATIONSHIPINDEX_QUERYUSERLIST_GET = '/api/relationshipindex/queryuserlist' // 查询登录用户分页数据
export const RELATIONSHIPINDEX_QUERYFIELDVALUE_GET = '/api/relationshipindex/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const RELATIONSHIPINDEX_NEXTBYID_GET = '/api/relationshipindex/nextbyid' // 根据Id获取下一条记录
export const RELATIONSHIPINDEX_PREXBYID_GET = '/api/relationshipindex/prexbyid' // 根据Id获取上一条记录
export const RELATIONSHIPINDEX_QUERYADD_POST = '/api/relationshipindex/queryadd' // 增加单条记录
export const RELATIONSHIPINDEX_QUERYUPDATE_PUT = '/api/relationshipindex/queryupdate' // 修改单条记录
export const RELATIONSHIPINDEX_QUERYPAGELIST_GET = '/api/relationshipindex/querypagelist' // 动态Url分页查询
export const RELATIONSHIPINDEX_QUERYLIST_GET = '/api/relationshipindex/querylist' // 根据Url获取列表
export const RELATIONSHIPINDEX_QUERYLISTASC_GET = '/api/relationshipindex/querylistasc' // 根据Url获取列表
export const RELATIONSHIPINDEX_QUERYDELETE_DELETE = '/api/relationshipindex/querydelete' // 删除单条记录
export const RELATIONSHIPINDEX_QUERYUSERDELETE_DELETE = '/api/relationshipindex/queryuserdelete' // 删除单条记录
export const RELATIONSHIPINDEX_BATCHDELETE_POST = '/api/relationshipindex/batchdelete' // 删除单条记录
export const RELATIONSHIPINDEX_QUERYBYID_GET = '/api/relationshipindex/querybyid' // 根据Id获取单个实例
export const RELATIONSHIPINDEX_QUERYDIC_GET = '/api/relationshipindex/querydic' // 根据Id获取单个实例字典集合

//  Material相关的API接口
export const MATERIAL_LIST_GET = '/api/material/list' // 获取宣传材料列表
export const MATERIAL_QUERYUSERLIST_GET = '/api/material/queryuserlist' // 查询登录用户分页数据
export const MATERIAL_QUERYFIELDVALUE_GET = '/api/material/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const MATERIAL_NEXTBYID_GET = '/api/material/nextbyid' // 根据Id获取下一条记录
export const MATERIAL_PREXBYID_GET = '/api/material/prexbyid' // 根据Id获取上一条记录
export const MATERIAL_QUERYADD_POST = '/api/material/queryadd' // 增加单条记录
export const MATERIAL_QUERYUPDATE_PUT = '/api/material/queryupdate' // 修改单条记录
export const MATERIAL_QUERYPAGELIST_GET = '/api/material/querypagelist' // 动态Url分页查询
export const MATERIAL_QUERYLIST_GET = '/api/material/querylist' // 根据Url获取列表
export const MATERIAL_QUERYLISTASC_GET = '/api/material/querylistasc' // 根据Url获取列表
export const MATERIAL_QUERYDELETE_DELETE = '/api/material/querydelete' // 删除单条记录
export const MATERIAL_QUERYUSERDELETE_DELETE = '/api/material/queryuserdelete' // 删除单条记录
export const MATERIAL_BATCHDELETE_POST = '/api/material/batchdelete' // 删除单条记录
export const MATERIAL_QUERYBYID_GET = '/api/material/querybyid' // 根据Id获取单个实例
export const MATERIAL_QUERYDIC_GET = '/api/material/querydic' // 根据Id获取单个实例字典集合

//  DataBackup相关的API接口
export const DATABACKUP_QUERYUSERLIST_GET = '/api/databackup/queryuserlist' // 查询登录用户分页数据
export const DATABACKUP_QUERYFIELDVALUE_GET = '/api/databackup/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const DATABACKUP_NEXTBYID_GET = '/api/databackup/nextbyid' // 根据Id获取下一条记录
export const DATABACKUP_PREXBYID_GET = '/api/databackup/prexbyid' // 根据Id获取上一条记录
export const DATABACKUP_QUERYADD_POST = '/api/databackup/queryadd' // 增加单条记录
export const DATABACKUP_QUERYUPDATE_PUT = '/api/databackup/queryupdate' // 修改单条记录
export const DATABACKUP_QUERYPAGELIST_GET = '/api/databackup/querypagelist' // 动态Url分页查询
export const DATABACKUP_QUERYLIST_GET = '/api/databackup/querylist' // 根据Url获取列表
export const DATABACKUP_QUERYLISTASC_GET = '/api/databackup/querylistasc' // 根据Url获取列表
export const DATABACKUP_QUERYDELETE_DELETE = '/api/databackup/querydelete' // 删除单条记录
export const DATABACKUP_QUERYUSERDELETE_DELETE = '/api/databackup/queryuserdelete' // 删除单条记录
export const DATABACKUP_BATCHDELETE_POST = '/api/databackup/batchdelete' // 删除单条记录
export const DATABACKUP_QUERYBYID_GET = '/api/databackup/querybyid' // 根据Id获取单个实例
export const DATABACKUP_QUERYDIC_GET = '/api/databackup/querydic' // 根据Id获取单个实例字典集合

//  Reward相关的API接口
export const REWARD_SHOW_GET = '/api/reward/show' // 列出指定的参数
export const REWARD_LIST_GET = '/api/reward/list' // 分润数据
export const REWARD_PREVIEW_GET = '/api/reward/preview' // 分润详情
export const REWARD_QUERYUSERLIST_GET = '/api/reward/queryuserlist' // 查询登录用户分页数据
export const REWARD_QUERYFIELDVALUE_GET = '/api/reward/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const REWARD_NEXTBYID_GET = '/api/reward/nextbyid' // 根据Id获取下一条记录
export const REWARD_PREXBYID_GET = '/api/reward/prexbyid' // 根据Id获取上一条记录
export const REWARD_QUERYADD_POST = '/api/reward/queryadd' // 增加单条记录
export const REWARD_QUERYUPDATE_PUT = '/api/reward/queryupdate' // 修改单条记录
export const REWARD_QUERYPAGELIST_GET = '/api/reward/querypagelist' // 动态Url分页查询
export const REWARD_QUERYLIST_GET = '/api/reward/querylist' // 根据Url获取列表
export const REWARD_QUERYLISTASC_GET = '/api/reward/querylistasc' // 根据Url获取列表
export const REWARD_QUERYDELETE_DELETE = '/api/reward/querydelete' // 删除单条记录
export const REWARD_QUERYUSERDELETE_DELETE = '/api/reward/queryuserdelete' // 删除单条记录
export const REWARD_BATCHDELETE_POST = '/api/reward/batchdelete' // 删除单条记录
export const REWARD_QUERYBYID_GET = '/api/reward/querybyid' // 根据Id获取单个实例
export const REWARD_QUERYDIC_GET = '/api/reward/querydic' // 根据Id获取单个实例字典集合

//  GradeKpi相关的API接口
export const GRADEKPI_QUERYUSERLIST_GET = '/api/gradekpi/queryuserlist' // 查询登录用户分页数据
export const GRADEKPI_QUERYFIELDVALUE_GET = '/api/gradekpi/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const GRADEKPI_NEXTBYID_GET = '/api/gradekpi/nextbyid' // 根据Id获取下一条记录
export const GRADEKPI_PREXBYID_GET = '/api/gradekpi/prexbyid' // 根据Id获取上一条记录
export const GRADEKPI_QUERYADD_POST = '/api/gradekpi/queryadd' // 增加单条记录
export const GRADEKPI_QUERYUPDATE_PUT = '/api/gradekpi/queryupdate' // 修改单条记录
export const GRADEKPI_QUERYPAGELIST_GET = '/api/gradekpi/querypagelist' // 动态Url分页查询
export const GRADEKPI_QUERYLIST_GET = '/api/gradekpi/querylist' // 根据Url获取列表
export const GRADEKPI_QUERYLISTASC_GET = '/api/gradekpi/querylistasc' // 根据Url获取列表
export const GRADEKPI_QUERYDELETE_DELETE = '/api/gradekpi/querydelete' // 删除单条记录
export const GRADEKPI_QUERYUSERDELETE_DELETE = '/api/gradekpi/queryuserdelete' // 删除单条记录
export const GRADEKPI_BATCHDELETE_POST = '/api/gradekpi/batchdelete' // 删除单条记录
export const GRADEKPI_QUERYBYID_GET = '/api/gradekpi/querybyid' // 根据Id获取单个实例
export const GRADEKPI_QUERYDIC_GET = '/api/gradekpi/querydic' // 根据Id获取单个实例字典集合

//  Kpi相关的API接口
export const KPI_GETKPICONFIGS_GET = '/api/kpi/getkpiconfigs'
export const KPI_QUERYUSERLIST_GET = '/api/kpi/queryuserlist' // 查询登录用户分页数据
export const KPI_QUERYFIELDVALUE_GET = '/api/kpi/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const KPI_NEXTBYID_GET = '/api/kpi/nextbyid' // 根据Id获取下一条记录
export const KPI_PREXBYID_GET = '/api/kpi/prexbyid' // 根据Id获取上一条记录
export const KPI_QUERYADD_POST = '/api/kpi/queryadd' // 增加单条记录
export const KPI_QUERYUPDATE_PUT = '/api/kpi/queryupdate' // 修改单条记录
export const KPI_QUERYPAGELIST_GET = '/api/kpi/querypagelist' // 动态Url分页查询
export const KPI_QUERYLIST_GET = '/api/kpi/querylist' // 根据Url获取列表
export const KPI_QUERYLISTASC_GET = '/api/kpi/querylistasc' // 根据Url获取列表
export const KPI_QUERYDELETE_DELETE = '/api/kpi/querydelete' // 删除单条记录
export const KPI_QUERYUSERDELETE_DELETE = '/api/kpi/queryuserdelete' // 删除单条记录
export const KPI_BATCHDELETE_POST = '/api/kpi/batchdelete' // 删除单条记录
export const KPI_QUERYBYID_GET = '/api/kpi/querybyid' // 根据Id获取单个实例
export const KPI_QUERYDIC_GET = '/api/kpi/querydic' // 根据Id获取单个实例字典集合

//  Comment相关的API接口
export const COMMENT_QUERYUSERLIST_GET = '/api/comment/queryuserlist' // 查询登录用户分页数据
export const COMMENT_QUERYFIELDVALUE_GET = '/api/comment/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const COMMENT_NEXTBYID_GET = '/api/comment/nextbyid' // 根据Id获取下一条记录
export const COMMENT_PREXBYID_GET = '/api/comment/prexbyid' // 根据Id获取上一条记录
export const COMMENT_QUERYADD_POST = '/api/comment/queryadd' // 增加单条记录
export const COMMENT_QUERYUPDATE_PUT = '/api/comment/queryupdate' // 修改单条记录
export const COMMENT_QUERYPAGELIST_GET = '/api/comment/querypagelist' // 动态Url分页查询
export const COMMENT_QUERYLIST_GET = '/api/comment/querylist' // 根据Url获取列表
export const COMMENT_QUERYLISTASC_GET = '/api/comment/querylistasc' // 根据Url获取列表
export const COMMENT_QUERYDELETE_DELETE = '/api/comment/querydelete' // 删除单条记录
export const COMMENT_QUERYUSERDELETE_DELETE = '/api/comment/queryuserdelete' // 删除单条记录
export const COMMENT_BATCHDELETE_POST = '/api/comment/batchdelete' // 删除单条记录
export const COMMENT_QUERYBYID_GET = '/api/comment/querybyid' // 根据Id获取单个实例
export const COMMENT_QUERYDIC_GET = '/api/comment/querydic' // 根据Id获取单个实例字典集合

//  Extend相关的API接口
export const EXTEND_QUERYUSERLIST_GET = '/api/extend/queryuserlist' // 查询登录用户分页数据
export const EXTEND_QUERYFIELDVALUE_GET = '/api/extend/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const EXTEND_NEXTBYID_GET = '/api/extend/nextbyid' // 根据Id获取下一条记录
export const EXTEND_PREXBYID_GET = '/api/extend/prexbyid' // 根据Id获取上一条记录
export const EXTEND_QUERYADD_POST = '/api/extend/queryadd' // 增加单条记录
export const EXTEND_QUERYUPDATE_PUT = '/api/extend/queryupdate' // 修改单条记录
export const EXTEND_QUERYPAGELIST_GET = '/api/extend/querypagelist' // 动态Url分页查询
export const EXTEND_QUERYLIST_GET = '/api/extend/querylist' // 根据Url获取列表
export const EXTEND_QUERYLISTASC_GET = '/api/extend/querylistasc' // 根据Url获取列表
export const EXTEND_QUERYDELETE_DELETE = '/api/extend/querydelete' // 删除单条记录
export const EXTEND_QUERYUSERDELETE_DELETE = '/api/extend/queryuserdelete' // 删除单条记录
export const EXTEND_BATCHDELETE_POST = '/api/extend/batchdelete' // 删除单条记录
export const EXTEND_QUERYBYID_GET = '/api/extend/querybyid' // 根据Id获取单个实例
export const EXTEND_QUERYDIC_GET = '/api/extend/querydic' // 根据Id获取单个实例字典集合

//  Favorite相关的API接口
export const FAVORITE_ADD_GET = '/api/favorite/add' // 收藏
export const FAVORITE_REMOVE_GET = '/api/favorite/remove' // 删除收藏
export const FAVORITE_LIST_GET = '/api/favorite/list' // 我的收藏
export const FAVORITE_QUERYUSERLIST_GET = '/api/favorite/queryuserlist' // 查询登录用户分页数据
export const FAVORITE_QUERYFIELDVALUE_GET = '/api/favorite/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const FAVORITE_NEXTBYID_GET = '/api/favorite/nextbyid' // 根据Id获取下一条记录
export const FAVORITE_PREXBYID_GET = '/api/favorite/prexbyid' // 根据Id获取上一条记录
export const FAVORITE_QUERYADD_POST = '/api/favorite/queryadd' // 增加单条记录
export const FAVORITE_QUERYUPDATE_PUT = '/api/favorite/queryupdate' // 修改单条记录
export const FAVORITE_QUERYPAGELIST_GET = '/api/favorite/querypagelist' // 动态Url分页查询
export const FAVORITE_QUERYLIST_GET = '/api/favorite/querylist' // 根据Url获取列表
export const FAVORITE_QUERYLISTASC_GET = '/api/favorite/querylistasc' // 根据Url获取列表
export const FAVORITE_QUERYDELETE_DELETE = '/api/favorite/querydelete' // 删除单条记录
export const FAVORITE_QUERYUSERDELETE_DELETE = '/api/favorite/queryuserdelete' // 删除单条记录
export const FAVORITE_BATCHDELETE_POST = '/api/favorite/batchdelete' // 删除单条记录
export const FAVORITE_QUERYBYID_GET = '/api/favorite/querybyid' // 根据Id获取单个实例
export const FAVORITE_QUERYDIC_GET = '/api/favorite/querydic' // 根据Id获取单个实例字典集合

//  Footprint相关的API接口
export const FOOTPRINT_LIST_GET = '/api/footprint/list' // 足迹列表
export const FOOTPRINT_ADD_GET = '/api/footprint/add' // 添加足迹
export const FOOTPRINT_CLEAR_GET = '/api/footprint/clear' // 添加足迹
export const FOOTPRINT_QUERYUSERLIST_GET = '/api/footprint/queryuserlist' // 查询登录用户分页数据
export const FOOTPRINT_QUERYFIELDVALUE_GET = '/api/footprint/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const FOOTPRINT_NEXTBYID_GET = '/api/footprint/nextbyid' // 根据Id获取下一条记录
export const FOOTPRINT_PREXBYID_GET = '/api/footprint/prexbyid' // 根据Id获取上一条记录
export const FOOTPRINT_QUERYADD_POST = '/api/footprint/queryadd' // 增加单条记录
export const FOOTPRINT_QUERYUPDATE_PUT = '/api/footprint/queryupdate' // 修改单条记录
export const FOOTPRINT_QUERYPAGELIST_GET = '/api/footprint/querypagelist' // 动态Url分页查询
export const FOOTPRINT_QUERYLIST_GET = '/api/footprint/querylist' // 根据Url获取列表
export const FOOTPRINT_QUERYLISTASC_GET = '/api/footprint/querylistasc' // 根据Url获取列表
export const FOOTPRINT_QUERYDELETE_DELETE = '/api/footprint/querydelete' // 删除单条记录
export const FOOTPRINT_QUERYUSERDELETE_DELETE = '/api/footprint/queryuserdelete' // 删除单条记录
export const FOOTPRINT_BATCHDELETE_POST = '/api/footprint/batchdelete' // 删除单条记录
export const FOOTPRINT_QUERYBYID_GET = '/api/footprint/querybyid' // 根据Id获取单个实例
export const FOOTPRINT_QUERYDIC_GET = '/api/footprint/querydic' // 根据Id获取单个实例字典集合

//  Letter相关的API接口
export const LETTER_QUERYUSERLIST_GET = '/api/letter/queryuserlist' // 查询登录用户分页数据
export const LETTER_QUERYFIELDVALUE_GET = '/api/letter/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const LETTER_NEXTBYID_GET = '/api/letter/nextbyid' // 根据Id获取下一条记录
export const LETTER_PREXBYID_GET = '/api/letter/prexbyid' // 根据Id获取上一条记录
export const LETTER_QUERYADD_POST = '/api/letter/queryadd' // 增加单条记录
export const LETTER_QUERYUPDATE_PUT = '/api/letter/queryupdate' // 修改单条记录
export const LETTER_QUERYPAGELIST_GET = '/api/letter/querypagelist' // 动态Url分页查询
export const LETTER_QUERYLIST_GET = '/api/letter/querylist' // 根据Url获取列表
export const LETTER_QUERYLISTASC_GET = '/api/letter/querylistasc' // 根据Url获取列表
export const LETTER_QUERYDELETE_DELETE = '/api/letter/querydelete' // 删除单条记录
export const LETTER_QUERYUSERDELETE_DELETE = '/api/letter/queryuserdelete' // 删除单条记录
export const LETTER_BATCHDELETE_POST = '/api/letter/batchdelete' // 删除单条记录
export const LETTER_QUERYBYID_GET = '/api/letter/querybyid' // 根据Id获取单个实例
export const LETTER_QUERYDIC_GET = '/api/letter/querydic' // 根据Id获取单个实例字典集合

//  Store相关的API接口
export const STORE_QUERYUSERLIST_GET = '/api/store/queryuserlist' // 查询登录用户分页数据
export const STORE_QUERYFIELDVALUE_GET = '/api/store/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const STORE_NEXTBYID_GET = '/api/store/nextbyid' // 根据Id获取下一条记录
export const STORE_PREXBYID_GET = '/api/store/prexbyid' // 根据Id获取上一条记录
export const STORE_QUERYADD_POST = '/api/store/queryadd' // 增加单条记录
export const STORE_QUERYUPDATE_PUT = '/api/store/queryupdate' // 修改单条记录
export const STORE_QUERYPAGELIST_GET = '/api/store/querypagelist' // 动态Url分页查询
export const STORE_QUERYLIST_GET = '/api/store/querylist' // 根据Url获取列表
export const STORE_QUERYLISTASC_GET = '/api/store/querylistasc' // 根据Url获取列表
export const STORE_QUERYDELETE_DELETE = '/api/store/querydelete' // 删除单条记录
export const STORE_QUERYUSERDELETE_DELETE = '/api/store/queryuserdelete' // 删除单条记录
export const STORE_BATCHDELETE_POST = '/api/store/batchdelete' // 删除单条记录
export const STORE_QUERYBYID_GET = '/api/store/querybyid' // 根据Id获取单个实例
export const STORE_QUERYDIC_GET = '/api/store/querydic' // 根据Id获取单个实例字典集合

//  Product相关的API接口
export const PRODUCT_SHOW_GET = '/api/product/show' // 商品详情
export const PRODUCT_LIST_GET = '/api/product/list' // 商品列表，对应zk-product-item
export const PRODUCT_GETLISTITEM_GET = '/api/product/getlistitem' // 商品列表，对应zk-product-item
export const PRODUCT_CLASS_GET = '/api/product/class' // 商品分类Api接口
export const PRODUCT_QUERYUSERLIST_GET = '/api/product/queryuserlist' // 查询登录用户分页数据
export const PRODUCT_QUERYFIELDVALUE_GET = '/api/product/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PRODUCT_NEXTBYID_GET = '/api/product/nextbyid' // 根据Id获取下一条记录
export const PRODUCT_PREXBYID_GET = '/api/product/prexbyid' // 根据Id获取上一条记录
export const PRODUCT_QUERYADD_POST = '/api/product/queryadd' // 增加单条记录
export const PRODUCT_QUERYUPDATE_PUT = '/api/product/queryupdate' // 修改单条记录
export const PRODUCT_QUERYPAGELIST_GET = '/api/product/querypagelist' // 动态Url分页查询
export const PRODUCT_QUERYLIST_GET = '/api/product/querylist' // 根据Url获取列表
export const PRODUCT_QUERYLISTASC_GET = '/api/product/querylistasc' // 根据Url获取列表
export const PRODUCT_QUERYDELETE_DELETE = '/api/product/querydelete' // 删除单条记录
export const PRODUCT_QUERYUSERDELETE_DELETE = '/api/product/queryuserdelete' // 删除单条记录
export const PRODUCT_BATCHDELETE_POST = '/api/product/batchdelete' // 删除单条记录
export const PRODUCT_QUERYBYID_GET = '/api/product/querybyid' // 根据Id获取单个实例
export const PRODUCT_QUERYDIC_GET = '/api/product/querydic' // 根据Id获取单个实例字典集合

//  ProductDetail相关的API接口
export const PRODUCTDETAIL_QUERYUSERLIST_GET = '/api/productdetail/queryuserlist' // 查询登录用户分页数据
export const PRODUCTDETAIL_QUERYFIELDVALUE_GET = '/api/productdetail/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PRODUCTDETAIL_NEXTBYID_GET = '/api/productdetail/nextbyid' // 根据Id获取下一条记录
export const PRODUCTDETAIL_PREXBYID_GET = '/api/productdetail/prexbyid' // 根据Id获取上一条记录
export const PRODUCTDETAIL_QUERYADD_POST = '/api/productdetail/queryadd' // 增加单条记录
export const PRODUCTDETAIL_QUERYUPDATE_PUT = '/api/productdetail/queryupdate' // 修改单条记录
export const PRODUCTDETAIL_QUERYPAGELIST_GET = '/api/productdetail/querypagelist' // 动态Url分页查询
export const PRODUCTDETAIL_QUERYLIST_GET = '/api/productdetail/querylist' // 根据Url获取列表
export const PRODUCTDETAIL_QUERYLISTASC_GET = '/api/productdetail/querylistasc' // 根据Url获取列表
export const PRODUCTDETAIL_QUERYDELETE_DELETE = '/api/productdetail/querydelete' // 删除单条记录
export const PRODUCTDETAIL_QUERYUSERDELETE_DELETE = '/api/productdetail/queryuserdelete' // 删除单条记录
export const PRODUCTDETAIL_BATCHDELETE_POST = '/api/productdetail/batchdelete' // 删除单条记录
export const PRODUCTDETAIL_QUERYBYID_GET = '/api/productdetail/querybyid' // 根据Id获取单个实例
export const PRODUCTDETAIL_QUERYDIC_GET = '/api/productdetail/querydic' // 根据Id获取单个实例字典集合

//  ProductLine相关的API接口
export const PRODUCTLINE_QUERYUSERLIST_GET = '/api/productline/queryuserlist' // 查询登录用户分页数据
export const PRODUCTLINE_QUERYFIELDVALUE_GET = '/api/productline/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PRODUCTLINE_NEXTBYID_GET = '/api/productline/nextbyid' // 根据Id获取下一条记录
export const PRODUCTLINE_PREXBYID_GET = '/api/productline/prexbyid' // 根据Id获取上一条记录
export const PRODUCTLINE_QUERYADD_POST = '/api/productline/queryadd' // 增加单条记录
export const PRODUCTLINE_QUERYUPDATE_PUT = '/api/productline/queryupdate' // 修改单条记录
export const PRODUCTLINE_QUERYPAGELIST_GET = '/api/productline/querypagelist' // 动态Url分页查询
export const PRODUCTLINE_QUERYLIST_GET = '/api/productline/querylist' // 根据Url获取列表
export const PRODUCTLINE_QUERYLISTASC_GET = '/api/productline/querylistasc' // 根据Url获取列表
export const PRODUCTLINE_QUERYDELETE_DELETE = '/api/productline/querydelete' // 删除单条记录
export const PRODUCTLINE_QUERYUSERDELETE_DELETE = '/api/productline/queryuserdelete' // 删除单条记录
export const PRODUCTLINE_BATCHDELETE_POST = '/api/productline/batchdelete' // 删除单条记录
export const PRODUCTLINE_QUERYBYID_GET = '/api/productline/querybyid' // 根据Id获取单个实例
export const PRODUCTLINE_QUERYDIC_GET = '/api/productline/querydic' // 根据Id获取单个实例字典集合

//  ProductSku相关的API接口
export const PRODUCTSKU_QUERYUSERLIST_GET = '/api/productsku/queryuserlist' // 查询登录用户分页数据
export const PRODUCTSKU_QUERYFIELDVALUE_GET = '/api/productsku/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const PRODUCTSKU_NEXTBYID_GET = '/api/productsku/nextbyid' // 根据Id获取下一条记录
export const PRODUCTSKU_PREXBYID_GET = '/api/productsku/prexbyid' // 根据Id获取上一条记录
export const PRODUCTSKU_QUERYADD_POST = '/api/productsku/queryadd' // 增加单条记录
export const PRODUCTSKU_QUERYUPDATE_PUT = '/api/productsku/queryupdate' // 修改单条记录
export const PRODUCTSKU_QUERYPAGELIST_GET = '/api/productsku/querypagelist' // 动态Url分页查询
export const PRODUCTSKU_QUERYLIST_GET = '/api/productsku/querylist' // 根据Url获取列表
export const PRODUCTSKU_QUERYLISTASC_GET = '/api/productsku/querylistasc' // 根据Url获取列表
export const PRODUCTSKU_QUERYDELETE_DELETE = '/api/productsku/querydelete' // 删除单条记录
export const PRODUCTSKU_QUERYUSERDELETE_DELETE = '/api/productsku/queryuserdelete' // 删除单条记录
export const PRODUCTSKU_BATCHDELETE_POST = '/api/productsku/batchdelete' // 删除单条记录
export const PRODUCTSKU_QUERYBYID_GET = '/api/productsku/querybyid' // 根据Id获取单个实例
export const PRODUCTSKU_QUERYDIC_GET = '/api/productsku/querydic' // 根据Id获取单个实例字典集合

//  Cart相关的API接口
export const CART_ADDCART_POST = '/api/cart/addcart' // 添加商品到购物车
export const CART_GETCART_GET = '/api/cart/getcart' // 获取购物车数据
export const CART_REMOVECART_GET = '/api/cart/removecart' // 删除购物车
export const CART_UPDATECART_PUT = '/api/cart/updatecart' // 更新购物车
export const CART_QUERYUSERLIST_GET = '/api/cart/queryuserlist' // 查询登录用户分页数据
export const CART_QUERYFIELDVALUE_GET = '/api/cart/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const CART_NEXTBYID_GET = '/api/cart/nextbyid' // 根据Id获取下一条记录
export const CART_PREXBYID_GET = '/api/cart/prexbyid' // 根据Id获取上一条记录
export const CART_QUERYADD_POST = '/api/cart/queryadd' // 增加单条记录
export const CART_QUERYUPDATE_PUT = '/api/cart/queryupdate' // 修改单条记录
export const CART_QUERYPAGELIST_GET = '/api/cart/querypagelist' // 动态Url分页查询
export const CART_QUERYLIST_GET = '/api/cart/querylist' // 根据Url获取列表
export const CART_QUERYLISTASC_GET = '/api/cart/querylistasc' // 根据Url获取列表
export const CART_QUERYDELETE_DELETE = '/api/cart/querydelete' // 删除单条记录
export const CART_QUERYUSERDELETE_DELETE = '/api/cart/queryuserdelete' // 删除单条记录
export const CART_BATCHDELETE_POST = '/api/cart/batchdelete' // 删除单条记录
export const CART_QUERYBYID_GET = '/api/cart/querybyid' // 根据Id获取单个实例
export const CART_QUERYDIC_GET = '/api/cart/querydic' // 根据Id获取单个实例字典集合

//  OrderAction相关的API接口
export const ORDERACTION_QUERYUSERLIST_GET = '/api/orderaction/queryuserlist' // 查询登录用户分页数据
export const ORDERACTION_QUERYFIELDVALUE_GET = '/api/orderaction/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ORDERACTION_NEXTBYID_GET = '/api/orderaction/nextbyid' // 根据Id获取下一条记录
export const ORDERACTION_PREXBYID_GET = '/api/orderaction/prexbyid' // 根据Id获取上一条记录
export const ORDERACTION_QUERYADD_POST = '/api/orderaction/queryadd' // 增加单条记录
export const ORDERACTION_QUERYUPDATE_PUT = '/api/orderaction/queryupdate' // 修改单条记录
export const ORDERACTION_QUERYPAGELIST_GET = '/api/orderaction/querypagelist' // 动态Url分页查询
export const ORDERACTION_QUERYLIST_GET = '/api/orderaction/querylist' // 根据Url获取列表
export const ORDERACTION_QUERYLISTASC_GET = '/api/orderaction/querylistasc' // 根据Url获取列表
export const ORDERACTION_QUERYDELETE_DELETE = '/api/orderaction/querydelete' // 删除单条记录
export const ORDERACTION_QUERYUSERDELETE_DELETE = '/api/orderaction/queryuserdelete' // 删除单条记录
export const ORDERACTION_BATCHDELETE_POST = '/api/orderaction/batchdelete' // 删除单条记录
export const ORDERACTION_QUERYBYID_GET = '/api/orderaction/querybyid' // 根据Id获取单个实例
export const ORDERACTION_QUERYDIC_GET = '/api/orderaction/querydic' // 根据Id获取单个实例字典集合

//  Order相关的API接口
export const ORDER_PAY_GET = '/api/order/pay' // 代付款订单支付
export const ORDER_CANCEL_GET = '/api/order/cancel' // 订单取消
export const ORDER_SHOW_GET = '/api/order/show' // 订单详情
export const ORDER_GETPRICE_POST = '/api/order/getprice' // 获取价格
export const ORDER_BUY_POST = '/api/order/buy' // 立即购买，商品购买，提交订单时候用，包括购物车购买
export const ORDER_INDEX_GET = '/api/order/index' // 我的订单
export const ORDER_BUYINFO_POST = '/api/order/buyinfo' // 商品的SKUid，确认订单页面，获取商品购买信息，每次修改ORDER_BUYINFO_POST价格通过此方法计算，在/order/buy页面使用
export const ORDER_RATE_POST = '/api/order/rate' // 用户评论
export const ORDER_CONFIRM_POST = '/api/order/confirm' // 收货确认
export const ORDER_QUERYUSERLIST_GET = '/api/order/queryuserlist' // 查询登录用户分页数据
export const ORDER_QUERYFIELDVALUE_GET = '/api/order/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ORDER_NEXTBYID_GET = '/api/order/nextbyid' // 根据Id获取下一条记录
export const ORDER_PREXBYID_GET = '/api/order/prexbyid' // 根据Id获取上一条记录
export const ORDER_QUERYADD_POST = '/api/order/queryadd' // 增加单条记录
export const ORDER_QUERYUPDATE_PUT = '/api/order/queryupdate' // 修改单条记录
export const ORDER_QUERYPAGELIST_GET = '/api/order/querypagelist' // 动态Url分页查询
export const ORDER_QUERYLIST_GET = '/api/order/querylist' // 根据Url获取列表
export const ORDER_QUERYLISTASC_GET = '/api/order/querylistasc' // 根据Url获取列表
export const ORDER_QUERYDELETE_DELETE = '/api/order/querydelete' // 删除单条记录
export const ORDER_QUERYUSERDELETE_DELETE = '/api/order/queryuserdelete' // 删除单条记录
export const ORDER_BATCHDELETE_POST = '/api/order/batchdelete' // 删除单条记录
export const ORDER_QUERYBYID_GET = '/api/order/querybyid' // 根据Id获取单个实例
export const ORDER_QUERYDIC_GET = '/api/order/querydic' // 根据Id获取单个实例字典集合

//  OrderDelivery相关的API接口
export const ORDERDELIVERY_QUERYUSERLIST_GET = '/api/orderdelivery/queryuserlist' // 查询登录用户分页数据
export const ORDERDELIVERY_QUERYFIELDVALUE_GET = '/api/orderdelivery/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ORDERDELIVERY_NEXTBYID_GET = '/api/orderdelivery/nextbyid' // 根据Id获取下一条记录
export const ORDERDELIVERY_PREXBYID_GET = '/api/orderdelivery/prexbyid' // 根据Id获取上一条记录
export const ORDERDELIVERY_QUERYADD_POST = '/api/orderdelivery/queryadd' // 增加单条记录
export const ORDERDELIVERY_QUERYUPDATE_PUT = '/api/orderdelivery/queryupdate' // 修改单条记录
export const ORDERDELIVERY_QUERYPAGELIST_GET = '/api/orderdelivery/querypagelist' // 动态Url分页查询
export const ORDERDELIVERY_QUERYLIST_GET = '/api/orderdelivery/querylist' // 根据Url获取列表
export const ORDERDELIVERY_QUERYLISTASC_GET = '/api/orderdelivery/querylistasc' // 根据Url获取列表
export const ORDERDELIVERY_QUERYDELETE_DELETE = '/api/orderdelivery/querydelete' // 删除单条记录
export const ORDERDELIVERY_QUERYUSERDELETE_DELETE = '/api/orderdelivery/queryuserdelete' // 删除单条记录
export const ORDERDELIVERY_BATCHDELETE_POST = '/api/orderdelivery/batchdelete' // 删除单条记录
export const ORDERDELIVERY_QUERYBYID_GET = '/api/orderdelivery/querybyid' // 根据Id获取单个实例
export const ORDERDELIVERY_QUERYDIC_GET = '/api/orderdelivery/querydic' // 根据Id获取单个实例字典集合

//  OrderProduct相关的API接口
export const ORDERPRODUCT_QUERYUSERLIST_GET = '/api/orderproduct/queryuserlist' // 查询登录用户分页数据
export const ORDERPRODUCT_QUERYFIELDVALUE_GET = '/api/orderproduct/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ORDERPRODUCT_NEXTBYID_GET = '/api/orderproduct/nextbyid' // 根据Id获取下一条记录
export const ORDERPRODUCT_PREXBYID_GET = '/api/orderproduct/prexbyid' // 根据Id获取上一条记录
export const ORDERPRODUCT_QUERYADD_POST = '/api/orderproduct/queryadd' // 增加单条记录
export const ORDERPRODUCT_QUERYUPDATE_PUT = '/api/orderproduct/queryupdate' // 修改单条记录
export const ORDERPRODUCT_QUERYPAGELIST_GET = '/api/orderproduct/querypagelist' // 动态Url分页查询
export const ORDERPRODUCT_QUERYLIST_GET = '/api/orderproduct/querylist' // 根据Url获取列表
export const ORDERPRODUCT_QUERYLISTASC_GET = '/api/orderproduct/querylistasc' // 根据Url获取列表
export const ORDERPRODUCT_QUERYDELETE_DELETE = '/api/orderproduct/querydelete' // 删除单条记录
export const ORDERPRODUCT_QUERYUSERDELETE_DELETE = '/api/orderproduct/queryuserdelete' // 删除单条记录
export const ORDERPRODUCT_BATCHDELETE_POST = '/api/orderproduct/batchdelete' // 删除单条记录
export const ORDERPRODUCT_QUERYBYID_GET = '/api/orderproduct/querybyid' // 根据Id获取单个实例
export const ORDERPRODUCT_QUERYDIC_GET = '/api/orderproduct/querydic' // 根据Id获取单个实例字典集合

//  Category相关的API接口
export const CATEGORY_QUERYUSERLIST_GET = '/api/category/queryuserlist' // 查询登录用户分页数据
export const CATEGORY_QUERYFIELDVALUE_GET = '/api/category/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const CATEGORY_NEXTBYID_GET = '/api/category/nextbyid' // 根据Id获取下一条记录
export const CATEGORY_PREXBYID_GET = '/api/category/prexbyid' // 根据Id获取上一条记录
export const CATEGORY_QUERYADD_POST = '/api/category/queryadd' // 增加单条记录
export const CATEGORY_QUERYUPDATE_PUT = '/api/category/queryupdate' // 修改单条记录
export const CATEGORY_QUERYPAGELIST_GET = '/api/category/querypagelist' // 动态Url分页查询
export const CATEGORY_QUERYLIST_GET = '/api/category/querylist' // 根据Url获取列表
export const CATEGORY_QUERYLISTASC_GET = '/api/category/querylistasc' // 根据Url获取列表
export const CATEGORY_QUERYDELETE_DELETE = '/api/category/querydelete' // 删除单条记录
export const CATEGORY_QUERYUSERDELETE_DELETE = '/api/category/queryuserdelete' // 删除单条记录
export const CATEGORY_BATCHDELETE_POST = '/api/category/batchdelete' // 删除单条记录
export const CATEGORY_QUERYBYID_GET = '/api/category/querybyid' // 根据Id获取单个实例
export const CATEGORY_QUERYDIC_GET = '/api/category/querydic' // 根据Id获取单个实例字典集合

//  CategoryProperty相关的API接口
export const CATEGORYPROPERTY_QUERYUSERLIST_GET = '/api/categoryproperty/queryuserlist' // 查询登录用户分页数据
export const CATEGORYPROPERTY_QUERYFIELDVALUE_GET = '/api/categoryproperty/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const CATEGORYPROPERTY_NEXTBYID_GET = '/api/categoryproperty/nextbyid' // 根据Id获取下一条记录
export const CATEGORYPROPERTY_PREXBYID_GET = '/api/categoryproperty/prexbyid' // 根据Id获取上一条记录
export const CATEGORYPROPERTY_QUERYADD_POST = '/api/categoryproperty/queryadd' // 增加单条记录
export const CATEGORYPROPERTY_QUERYUPDATE_PUT = '/api/categoryproperty/queryupdate' // 修改单条记录
export const CATEGORYPROPERTY_QUERYPAGELIST_GET = '/api/categoryproperty/querypagelist' // 动态Url分页查询
export const CATEGORYPROPERTY_QUERYLIST_GET = '/api/categoryproperty/querylist' // 根据Url获取列表
export const CATEGORYPROPERTY_QUERYLISTASC_GET = '/api/categoryproperty/querylistasc' // 根据Url获取列表
export const CATEGORYPROPERTY_QUERYDELETE_DELETE = '/api/categoryproperty/querydelete' // 删除单条记录
export const CATEGORYPROPERTY_QUERYUSERDELETE_DELETE = '/api/categoryproperty/queryuserdelete' // 删除单条记录
export const CATEGORYPROPERTY_BATCHDELETE_POST = '/api/categoryproperty/batchdelete' // 删除单条记录
export const CATEGORYPROPERTY_QUERYBYID_GET = '/api/categoryproperty/querybyid' // 根据Id获取单个实例
export const CATEGORYPROPERTY_QUERYDIC_GET = '/api/categoryproperty/querydic' // 根据Id获取单个实例字典集合

//  CategoryPropertyValue相关的API接口
export const CATEGORYPROPERTYVALUE_QUERYUSERLIST_GET = '/api/categorypropertyvalue/queryuserlist' // 查询登录用户分页数据
export const CATEGORYPROPERTYVALUE_QUERYFIELDVALUE_GET = '/api/categorypropertyvalue/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const CATEGORYPROPERTYVALUE_NEXTBYID_GET = '/api/categorypropertyvalue/nextbyid' // 根据Id获取下一条记录
export const CATEGORYPROPERTYVALUE_PREXBYID_GET = '/api/categorypropertyvalue/prexbyid' // 根据Id获取上一条记录
export const CATEGORYPROPERTYVALUE_QUERYADD_POST = '/api/categorypropertyvalue/queryadd' // 增加单条记录
export const CATEGORYPROPERTYVALUE_QUERYUPDATE_PUT = '/api/categorypropertyvalue/queryupdate' // 修改单条记录
export const CATEGORYPROPERTYVALUE_QUERYPAGELIST_GET = '/api/categorypropertyvalue/querypagelist' // 动态Url分页查询
export const CATEGORYPROPERTYVALUE_QUERYLIST_GET = '/api/categorypropertyvalue/querylist' // 根据Url获取列表
export const CATEGORYPROPERTYVALUE_QUERYLISTASC_GET = '/api/categorypropertyvalue/querylistasc' // 根据Url获取列表
export const CATEGORYPROPERTYVALUE_QUERYDELETE_DELETE = '/api/categorypropertyvalue/querydelete' // 删除单条记录
export const CATEGORYPROPERTYVALUE_QUERYUSERDELETE_DELETE = '/api/categorypropertyvalue/queryuserdelete' // 删除单条记录
export const CATEGORYPROPERTYVALUE_BATCHDELETE_POST = '/api/categorypropertyvalue/batchdelete' // 删除单条记录
export const CATEGORYPROPERTYVALUE_QUERYBYID_GET = '/api/categorypropertyvalue/querybyid' // 根据Id获取单个实例
export const CATEGORYPROPERTYVALUE_QUERYDIC_GET = '/api/categorypropertyvalue/querydic' // 根据Id获取单个实例字典集合

//  Refund相关的API接口
export const REFUND_QUERYUSERLIST_GET = '/api/refund/queryuserlist' // 查询登录用户分页数据
export const REFUND_QUERYFIELDVALUE_GET = '/api/refund/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const REFUND_NEXTBYID_GET = '/api/refund/nextbyid' // 根据Id获取下一条记录
export const REFUND_PREXBYID_GET = '/api/refund/prexbyid' // 根据Id获取上一条记录
export const REFUND_QUERYADD_POST = '/api/refund/queryadd' // 增加单条记录
export const REFUND_QUERYUPDATE_PUT = '/api/refund/queryupdate' // 修改单条记录
export const REFUND_QUERYPAGELIST_GET = '/api/refund/querypagelist' // 动态Url分页查询
export const REFUND_QUERYLIST_GET = '/api/refund/querylist' // 根据Url获取列表
export const REFUND_QUERYLISTASC_GET = '/api/refund/querylistasc' // 根据Url获取列表
export const REFUND_QUERYDELETE_DELETE = '/api/refund/querydelete' // 删除单条记录
export const REFUND_QUERYUSERDELETE_DELETE = '/api/refund/queryuserdelete' // 删除单条记录
export const REFUND_BATCHDELETE_POST = '/api/refund/batchdelete' // 删除单条记录
export const REFUND_QUERYBYID_GET = '/api/refund/querybyid' // 根据Id获取单个实例
export const REFUND_QUERYDIC_GET = '/api/refund/querydic' // 根据Id获取单个实例字典集合

//  GroupBuy相关的API接口
export const GROUPBUY_PRODUCTRECORD_GET = '/api/groupbuy/productrecord' // 拼团记录，根据商品id获取商品id获取商品的拼团记录
export const GROUPBUY_LIST_GET = '/api/groupbuy/list' // 拼团记录列表
export const GROUPBUY_GETLISTITEM_GET = '/api/groupbuy/getlistitem' // 拼团商品列表，对应zk-groupbuy
export const GROUPBUY_PRODUCTS_GET = '/api/groupbuy/products' // 拼团商品列表
export const GROUPBUY_ORDERGROUPUSER_GET = '/api/groupbuy/ordergroupuser' // 订单拼团用户，根据订单id获取订单拼团用户

//  Activity相关的API接口
export const ACTIVITY_QUERYUSERLIST_GET = '/api/activity/queryuserlist' // 查询登录用户分页数据
export const ACTIVITY_QUERYFIELDVALUE_GET = '/api/activity/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ACTIVITY_NEXTBYID_GET = '/api/activity/nextbyid' // 根据Id获取下一条记录
export const ACTIVITY_PREXBYID_GET = '/api/activity/prexbyid' // 根据Id获取上一条记录
export const ACTIVITY_QUERYADD_POST = '/api/activity/queryadd' // 增加单条记录
export const ACTIVITY_QUERYUPDATE_PUT = '/api/activity/queryupdate' // 修改单条记录
export const ACTIVITY_QUERYPAGELIST_GET = '/api/activity/querypagelist' // 动态Url分页查询
export const ACTIVITY_QUERYLIST_GET = '/api/activity/querylist' // 根据Url获取列表
export const ACTIVITY_QUERYLISTASC_GET = '/api/activity/querylistasc' // 根据Url获取列表
export const ACTIVITY_QUERYDELETE_DELETE = '/api/activity/querydelete' // 删除单条记录
export const ACTIVITY_QUERYUSERDELETE_DELETE = '/api/activity/queryuserdelete' // 删除单条记录
export const ACTIVITY_BATCHDELETE_POST = '/api/activity/batchdelete' // 删除单条记录
export const ACTIVITY_QUERYBYID_GET = '/api/activity/querybyid' // 根据Id获取单个实例
export const ACTIVITY_QUERYDIC_GET = '/api/activity/querydic' // 根据Id获取单个实例字典集合

//  ActivityRecord相关的API接口
export const ACTIVITYRECORD_QUERYUSERLIST_GET = '/api/activityrecord/queryuserlist' // 查询登录用户分页数据
export const ACTIVITYRECORD_QUERYFIELDVALUE_GET = '/api/activityrecord/queryfieldvalue' //  根据Id和字段名称,获取单个字段的值
export const ACTIVITYRECORD_NEXTBYID_GET = '/api/activityrecord/nextbyid' // 根据Id获取下一条记录
export const ACTIVITYRECORD_PREXBYID_GET = '/api/activityrecord/prexbyid' // 根据Id获取上一条记录
export const ACTIVITYRECORD_QUERYADD_POST = '/api/activityrecord/queryadd' // 增加单条记录
export const ACTIVITYRECORD_QUERYUPDATE_PUT = '/api/activityrecord/queryupdate' // 修改单条记录
export const ACTIVITYRECORD_QUERYPAGELIST_GET = '/api/activityrecord/querypagelist' // 动态Url分页查询
export const ACTIVITYRECORD_QUERYLIST_GET = '/api/activityrecord/querylist' // 根据Url获取列表
export const ACTIVITYRECORD_QUERYLISTASC_GET = '/api/activityrecord/querylistasc' // 根据Url获取列表
export const ACTIVITYRECORD_QUERYDELETE_DELETE = '/api/activityrecord/querydelete' // 删除单条记录
export const ACTIVITYRECORD_QUERYUSERDELETE_DELETE = '/api/activityrecord/queryuserdelete' // 删除单条记录
export const ACTIVITYRECORD_BATCHDELETE_POST = '/api/activityrecord/batchdelete' // 删除单条记录
export const ACTIVITYRECORD_QUERYBYID_GET = '/api/activityrecord/querybyid' // 根据Id获取单个实例
export const ACTIVITYRECORD_QUERYDIC_GET = '/api/activityrecord/querydic' // 根据Id获取单个实例字典集合

