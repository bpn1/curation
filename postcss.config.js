const autoprefixer = require("autoprefixer");
const lost = require("lost");
//const precss = require("precss");
//const cssnext = require("postcss-cssnext");

module.exports = {
  plugins: [
    //precss({}),
    lost,
    autoprefixer,
    //cssnext({})
  ]
};
