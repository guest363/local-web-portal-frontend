'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
require("babel-core/register");

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
    },
    {
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ]
    },
    {
      test: /\.less$/,
      use: [
        { loader: "style-loader" },
        { loader: "less-loader" }
      ]
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      loader: 'file-loader?name=[name].[hash].[ext]',
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      loader: 'file-loader?name=[name].[ext]?[hash]',
    }

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    host: '127.0.0.1',
    open: true,
    inline: true,
    hot: true,
    noInfo: false,
    quiet: false,
    stats: 'errors-only'
  },
  devtool: '#cheap-module-eval-source-map',
};