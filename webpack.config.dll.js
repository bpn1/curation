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

const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: {
    vendor: [path.join(__dirname, 'src', 'vendor.js')]
  },
  output: {
    path: path.join(__dirname, 'dist', 'dll'),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  module: {
    rules: [{
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
      include: path.resolve(__dirname, 'node_modules')
    }]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, 'src')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        unsafe: true,
        screw_ie8: true,
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: false,
        conditionals: true,
        evaluate: true,
        drop_console: false,
        sequences: true,
        booleans: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ProgressBarPlugin(),
  ]
}
;
