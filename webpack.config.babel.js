const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const parts = require('./configParts');

const PATHS = {
  APP: './bootstrap.js',
  VENDOR: './vendor.js',
  SRC: resolve(__dirname, 'src/'),
  DIST: resolve(__dirname, 'dist'),
  TEMPLATE: resolve('./src/index.html'),
  NODE_MODULES: resolve(__dirname, 'node_modules')
};

const common = merge([
  {
    context: PATHS.SRC,
    entry: {
      vendor: [
        'react-hot-loader/patch',
        // 'webpack-hot-middleware/client',
        'webpack-dev-server/client',
        PATHS.VENDOR
      ],
      app: PATHS.APP
    },
    output: {
      filename: '[name].bundle.js',
      path: PATHS.DIST,
      publicPath: '/'
    },
    plugins: [
      new ProgressBarPlugin(),
      new HtmlWebpackPlugin({
        title: 'ReactUI Template',
        template: PATHS.TEMPLATE
      })
    ]
  },
  parts.loadJavaScript({ include: [PATHS.SRC], exclude: /node_modules/ }),
  // parts.loadLinter({
  //   include: [PATHS.SRC],
  //   exclude: /node_modules/,
  //   options: {
  //     formatter: require("eslint/lib/formatters/table"),
  //     cache: true,
  //     fix: false
  //   }
  // }),
  parts.loadCSS({ include: [PATHS.SRC, PATHS.NODE_MODULES] }),
  parts.loadImages({
    options: {
      limit: 15000
    }
  })
]);

module.exports = function (env) {
  // Production configuration
  if (env === 'production') {
    return merge([
      common,
      {
        performance: {
          hints: 'warning'
        },
        devtool: 'source-map',
        plugins: [
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"',
            },
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              screw_ie8: true,
              warnings: false,
            },
          })
        ]
      },
      //parts.lintJavaScript({ include: PATHS.app }),
    ]);
  }

  // Development configuration
  return merge(
    common,
    {
      output: {
        pathinfo: true
      },
      devtool: 'eval',
      // Disable performance hints during development
      performance: {
        hints: false
      },
      plugins: [
        new webpack.NamedModulesPlugin()
      ]
    },
    parts.devServer({
      host: '0.0.0.0',
      port: 8080,
      content_base: PATHS.DIST,
      env: env
    })
  );
};
