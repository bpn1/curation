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
