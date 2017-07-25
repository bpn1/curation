/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV || 'development');
const isNotProduction = process.env.NODE_ENV === 'development';

const PATHS = {
  APP: ['./bootstrap.js'],
  APP_DEV: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './bootstrap.js'],
  VENDOR: './vendor.js',
  SRC: resolve(__dirname, 'src/'),
  DIST: resolve(__dirname, 'dist'),
  TEMPLATE: resolve('./src/index.html'),
  NODE_MODULES: resolve(__dirname, 'node_modules')
};

const config = {
  cache: true,
  context: PATHS.SRC,
  entry: removeEmpty({
    vendor: ifProduction(PATHS.VENDOR),
    app: ifProduction(PATHS.APP, PATHS.APP_DEV)
  }),
  output: {
    filename: '[name].bundle.js',
    path: PATHS.DIST,
    publicPath: '/',
    pathinfo: ifProduction(true, false)
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory'],
        include: PATHS.SRC,
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
          PATHS.NODE_MODULES,
          PATHS.SRC
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
  resolve: {
    unsafeCache: true
  },
  performance: {
    hints: ifProduction('warning', false)
  },
  devtool: ifProduction('source-map', 'eval'),
  plugins: removeEmpty([
    ifProduction(new webpack.HashedModuleIdsPlugin(), new webpack.NamedModulesPlugin()),
    ifProduction(new webpack.LoaderOptionsPlugin({
      minimize: true,
      quiet: true,
    })),
    ifNotProduction(new webpack.HotModuleReplacementPlugin()),
    ifProduction(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })),
    ifNotProduction(new webpack.DllReferencePlugin({
      context: PATHS.SRC,
      manifest: isNotProduction && require('./dll/vendor-manifest.json')
    })),
    ifProduction(new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })),
    ifProduction(new webpack.optimize.OccurrenceOrderPlugin()),
    ifProduction(new webpack.optimize.AggressiveMergingPlugin()),
    ifProduction(new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        unsafe: true,
        screw_ie8: true,
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true,
        sequences: true,
        booleans: true,
      },
    })),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: PATHS.TEMPLATE
    }),
    ifNotProduction(new AddAssetHtmlPlugin({ includeSourcemap: false, filepath: resolve(__dirname, 'dist/dll/dll.vendor.js') })),
  ]),
  /* devServer: {
    historyApiFallback: true,
    hotOnly: true,
    stats: {
      warnings: false
    },
    host: '0.0.0.0',
    port: 8080,
    content_base: PATHS.DIST
  }*/
};

module.exports = config;
