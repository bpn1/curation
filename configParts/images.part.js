exports.loadImages = function({ include, exclude, options } = {}) {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          include,
          exclude,

          use: {
            loader: 'url-loader',
            options,
          },
        },
        {
          test: /\.svg$/,
          include,
          exclude,

          use: {
            loader: 'file-loader',
            options,
          },
        },
      ],
    },
  };
};
