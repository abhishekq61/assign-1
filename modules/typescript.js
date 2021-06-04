module.exports = function () {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push("ts");
  // Extend build
  this.extendBuild(config => {
    config.module.rules.push({
      loader: 'ts-loader',
      test: /(\.tsx?)$/,
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    });
    if (config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts')
    }
  })
};
