//const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config/index.h5');
const baseWebpackConfig = require('./webpack.baseH5.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devtool: 'inline-source-map', //'source-map'
  devServer: {
    contentBase: './dist',
    port: config.dev.port,
    host: config.dev.host,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable
  },
  plugins: [
    new webpack.DefinePlugin(config.systemEnv()),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
});
