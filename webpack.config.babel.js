const {resolve} = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {getIfUtils} = require('webpack-config-utils');

module.exports = env => {

  console.log(resolve('./src/index.html'));

  const {ifProd, ifNotProd} = getIfUtils(env);
  const config = {
    context: resolve('./src'),
    entry:{
      vendor: [
        'react-hot-loader/patch',
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        'react-hot-loader',
        './vendor'
      ],
      main: './bootstrap.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: resolve('./dist'),
      //publicPath: resolve('./dist'),
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    devServer: {
      contentBase: resolve('./dist'),
      host: '0.0.0.0',
      port: 8080
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          include: resolve('./src'),
          exclude: /node_modules/
        },
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
            'url-loader?limit=4096'
          ]
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      new HTMLWebpackPlugin({
        template: resolve('./src/index.html')
      })
    ],
  };
  if (env.debug) {
    console.log(config);
    debugger; // eslint-disable-line
  }
  return config
};
