const autoprefixer = require("autoprefixer");
const lost = require("lost");
const linter = require("stylelint");
const reporter = require("postcss-reporter");

//const precss = require("precss");
//const cssnext = require("postcss-cssnext");

module.exports = {
  plugins: [
    linter,
    //precss({}),
    lost,
    autoprefixer,
    //cssnext({})
    reporter
  ]
};
