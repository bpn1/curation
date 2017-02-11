exports.loadLinter = function({ include, exclude }) {
  return {
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          enforce: 'pre',
          use: [{
            loader: 'eslint-loader',
            options: {
              formatter: require("eslint/lib/formatters/table"),
              cache: true,
              fix: false
            }
          }],
          include,
          exclude,
        },
      ],
    },
  };
};
