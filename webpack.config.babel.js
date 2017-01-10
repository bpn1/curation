/* eslint no-console:"off" */
const {resolve} = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {getIfUtils} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env);
  const config = {
    context: resolve('src'),
    entry: './app.js',
    output: {
      filename: 'bundle.js',
      path: resolve('dist'),
      publicPath: '/dist/',
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      rules: [
        {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
        {
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
          ]
        },
        {
          test: /\.(png|jpg)$/,
          use:[
            'url-loader?limit=8192'
          ]
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin()
    ],
  };
  if (env.debug) {
    console.log(config);
    debugger; // eslint-disable-line
  }
  return config
};
