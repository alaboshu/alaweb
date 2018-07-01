const { Url, Id, Key } = process.env

console.log(process.env)

export default {
  url: Url || 'http://admin.czhait.com/',
  id: Id || 'test_id',
  key: Key || 'test_key'
}
