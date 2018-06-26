module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: ['plugin:vue/essential', 'standard'],
  plugins: ['vue'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'no-tabs': 0,
    indent: 0,
    'space-before-function-parentheses': 0,
    'no-multiple-empty-lines': 0,

    //  要求使用 === 和 !== (eqeqeq)  否则错误
    eqeqeq: 2,
    //  要求或禁止使用分号代替 ASI (semi)
    semi: 2,
    'no-labels': 0,
    'space-unary-ops': [0, { words: true, nonwords: false }]
  }
}
