const { CLIENT_URL, CLIENT_ID, CLIENT_KEY } = process.env

console.log(process.env)

export default {
  url: CLIENT_URL || 'http://admin.czhait.com/',
  id: CLIENT_ID || 'test_id',
  key: CLIENT_KEY || 'test_key'
}
