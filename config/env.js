//  * 配置编译环境和线上环境之间的切换
//  *
//  * baseUrl: 域名地址
// 项目ID，秘钥，与项目当中的秘钥相同，千万不能泄露，否则会可能会导致数据泄露

// 测试项目
const clientType = 'moblie'

// const key = '5C017EC7FF0045D1B8B00076067D3B3B'
// const projectId = 'b93900e2-26ad-4ae0-bc3f-e639c2d482a0'

// 云债通
const key = 'A2C17ABA-6444-4035-A59F-C3C1848A737D'
const projectId =
    'WNNK5JPZUVAPO6837QT67UJTBP08RJ4EEX8RMX3DKZOPYZOESUWDT3SBE3TQSQHK16U07RRJWZWHQ34BBVPHXALLF6MSENKTRDY2OXGBCMQDGKVL9RYGKKXAUJVBPZFJ'

let baseUrl

let routerMode = 'history'

if (process.env.NODE_ENV === 'development') {
    // baseUrl = 'http://admin.czhait.com'
    // baseUrl = 'http://test.5ug.com'
    // baseUrl = 'http://zkgs.5ug.com'
    // baseUrl = 'http://zkqd.5ug.com'
    // baseUrl = 'http://zqingchun.yiqipingou.com/'
    // baseUrl = 'http://ceshi.5ug.com'
    baseUrl = 'http://localhost:9011'
        // baseUrl = 'http://zkdebt.5ug.com'
        // baseUrl = 'http://lll.5ug.com'
} else {
    // baseUrl = 'http://lll.5ug.com'
    // baseUrl = 'http://localhost:9011'
    // baseUrl = 'http://zkdebt.5ug.com'
    // baseUrl = 'http://admin.czhait.com
    // baseUrl = 'http://zmsd.5ug.com/'
    // baseUrl = 'http://zqingchun.yiqipingou.com/'
}
export {
    baseUrl,
    routerMode,
    key,
    projectId,
    clientType
}
