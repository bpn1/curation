module.exports = {
  devServer: require('./devServer.part').devServer,
  loadJavaScript: require('./babel.part').loadJavaScript,
  loadCSS: require('./css.part').loadCSS,
  loadImages: require('./images.part').loadImages,
  loadLinter: require('./linter.part').loadLinter
};
