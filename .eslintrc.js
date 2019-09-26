module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'arrow-parens': 0,
    'no-multiple-empty-lines': 0,
    'no-trailing-spaces': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-duplicates': 0,
    'no-tabs': 0,
    'indent': 0,
    semi: 2,
    eqeqeq: 2,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-redeclare': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    uni: true,
    getApp: true,
    getPage: true,
    getCurrentPages: true,
    requirePlugin: true
  }
}
