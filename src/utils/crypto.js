import globalConfig from '@/service/config'
import CryptoJS from './crypto-js'
import api from '@/service/api'
var {
  projectId,
  key
} = globalConfig
export default {
  // md5加密
  md5 (str) {
    return CryptoJS.MD5(str).toString()
  },
  // ace 加密
  encrypt (text, aceKey) {
    var encryptText = CryptoJS.AES.encrypt(text, this.getKey(aceKey)).toString()
    return encryptText
  },
  // ace 解密
  decrypt (text, aceKey) {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(text, this.getKey(aceKey))
    var originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  },
  userTokenKey () {

  },
  // 本地用户缓存信息key,反正被他人负责恶意修改，每个用户不一样
  userKey () {
    var token = api.localGet('user_token')
    if (api.isEmpty(token)) {
      return null
    }
    var tokenKey = token + token.substring(3, 10) + projectId.substring(1, 4)
    var userKey = CryptoJS.MD5(tokenKey)
    userKey = 'user_' + userKey.toString().substring(4, 24)
    return userKey
  },
  getKey (aceKey) {
    if (aceKey === null || aceKey === undefined) {
      aceKey = ''
    }
    aceKey = aceKey + projectId.substring(1, 4) + key.substring(2, 10)
    return aceKey
  },
  base64 (text) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
  },
  utf8 (text) {
    return CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8)
  }
}
