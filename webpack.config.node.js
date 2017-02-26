const { resolve } = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { removeEmpty } = require('webpack-config-utils');

// get the absolute path to the src & node_modules dir
const SRC = resolve(__dirname, 'src');
const DIST = resolve(__dirname, 'dist');
const NODE_MODULES = resolve(__dirname, 'node_modules');

module.exports = {
  context: SRC,
  entry: {
    vendor: [
      'react-hot-loader/patch',
      // 'webpack-hot-middleware/client',
      'webpack-dev-server/client',
      // 'webpack/hot/only-dev-server',
      // 'react-hot-loader',
      './vendor'
    ],
    main: './bootstrap.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: DIST,
    publicPath: '/',
    pathinfo: true,
  },
  devtool: 'eval',
  devServer: {
    contentBase: DIST,
    host: '0.0.0.0',
    port: 8080
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: SRC,
        exclude: /node_modules/
      },
      removeEmpty({
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'postcss-loader'
        ],
        include: [
          NODE_MODULES,
          SRC
        ]
      }),
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 15000
          }
        }
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ]
  },
  plugins: removeEmpty([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ProgressBarPlugin(),
    new HTMLWebpackPlugin({
      template: resolve('./src/index.html')
    })
  ]),
};

