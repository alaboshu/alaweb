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

//  Theme相关的API接口
export const THEME_GETLINK_GET = '/api/theme/getlink' // 链接

