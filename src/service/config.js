const apiBaseUrl = 'http://localhost:1800'

const themeId = '5d43d6c143a2c710d49e3ba5' // h5标签版本
// const tenant = 'test_5ug_com'
const tenant = ''
const version = '1.9.821415'
const isTenant = false

const key =
  'LUPGHODKYFWYO0YARAWNTKMA9WKWIO4ABXPYZAAFLKVI1L9BQA0LTZEYMOKVP6DMABP0K3PBF7M8QZQ8L1BA7ZMLEAE53V6NQS7ZWJ1WU' // 公钥
const projectId = 'C94E355F-79DC-44E8-8EF1-CBF886129EDA' // 私钥ID
// const projectId = 'be1395a6-3419-9844-ab71-45db4519b75a'
const privateKey = 'zhonghuarenmingonghegouchenglile' // 私钥


module.exports = {
  apiBaseUrl,
  themeId,
  projectId,
  key,
  isTenant,
  tenant,
  privateKey,
  version
}
