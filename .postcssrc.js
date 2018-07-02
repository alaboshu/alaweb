// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = process.env.MODE === 'min' ? {
  "plugins": {
    "postcss-mpvue-wxss": {}
  }
} : {}
