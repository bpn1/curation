exports.loadLinter = function({ include, exclude, options }) {
  return {
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          enforce: 'pre',
          use: [{
            loader: 'eslint-loader',
            options
          }],
          include,
          exclude,
        },
      ],
    },
  };
};
