exports.loadCSS = function({ include, exclude } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

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
        },
      ],
    },
  };
};
