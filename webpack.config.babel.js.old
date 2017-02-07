const {resolve} = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');

module.exports = env => {

  // get the absolute path to the src & node_modules dir
  const SRC = resolve(__dirname, "src");
  const DIST = resolve(__dirname, "dist");
  const NODE_MODULES = resolve(__dirname, "node_modules");

  // documentation: https://doclets.io/kentcdodds/webpack-config-utils/master
  const {ifProd, ifNotProd} = getIfUtils(env);

  const config = {
    context: SRC,
    entry:{
      vendor: [
        'react-hot-loader/patch',
        //'webpack-hot-middleware/client',
        'webpack-dev-server/client',
        //'webpack/hot/only-dev-server',
        //'react-hot-loader',
        './vendor'
      ],
      main: './bootstrap.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: DIST,
      publicPath: '/',
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    devServer: {
      contentBase: DIST,
      host: '0.0.0.0',
      port: 8080
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
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
          include:[
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
      ifNotProd(new webpack.HotModuleReplacementPlugin()),
      ifNotProd(new webpack.NamedModulesPlugin()),
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
      })),
      ifProd(new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})),
      new ProgressBarPlugin(),
      new HTMLWebpackPlugin({
        template: resolve('./src/index.html')
      })
    ]),
  };
  if (env.debug) {
    debugger; // eslint-disable-line
  }
  return config
};
