exports.loadCSS = function({ include, exclude } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                modules: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
        },
      ],
    },
  };
};
