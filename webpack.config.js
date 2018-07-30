let webpackConfig;

module.exports = () => {
  switch (process.env.MODE) {
    case 'min':
      webpackConfig = require('./build/min/webpack.dev.conf.js');
      break;
    case 'h5':
    default:
      webpackConfig = require('./build/h5/webpack.dev.conf.js');
  }
  return webpackConfig;
}
