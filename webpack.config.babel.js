const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV || 'development');

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
        use: ['babel-loader'],
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
  performance: {
    hints: ifProduction('warning', 'warning')
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
      title: 'Curation',
      template: PATHS.TEMPLATE
    })
  ]),
  /*devServer: {
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
