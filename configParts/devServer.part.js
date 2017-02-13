const webpack = require('webpack');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');

exports.devServer = function({ host, port, content_base, env }) {

  // documentation: https://doclets.io/kentcdodds/webpack-config-utils/master
  const {ifProd, ifNotProd} = getIfUtils(env);

  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Don't refresh if hot loading fails. If you want
      // refresh behavior, set hot: true instead.
      hotOnly: true,

      // Display only errors to reduce the amount of output.
      stats: {
        warnings: false
      },

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host, // Defaults to `localhost`
      port, // Defaults to 8080
      contentBase: content_base
    },
    plugins: removeEmpty([
      ifNotProd(new webpack.HotModuleReplacementPlugin())
    ])
  }
};
