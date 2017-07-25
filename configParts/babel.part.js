/*
Copyright 2016-17, Hasso-Plattner-Institut fuer Softwaresystemtechnik GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

exports.loadJavaScript = function({ include, exclude }) {
  return {
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
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
