exports.loadJavaScript = function({ include, exclude }) {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          include,
          exclude,
          // options: {
            // Enable caching for improved performance during
            // development.
            // It uses default OS directory by default. If you need
            // something more custom, pass a path to it.
            // I.e., { cacheDirectory: '<path>' }
            //cacheDirectory: true,
            // query: {
            //   presets: [["es2015", {"modules": false}], "es2016", "stage-2", "react"]
            // }
          // },
        },
      ],
    },
  };
};
