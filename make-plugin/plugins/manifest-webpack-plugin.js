module.exports = class ManifestWebpackPlugin {
  // constructor(options) {
  //   console.log(options);
  // }
  apply(compiler) {
    // 在assets输出前，添加manifest清单
    // https://webpack.docschina.org/api/compiler-hooks/#emit
    compiler.hooks.emit.tapAsync(
      "ManifestWebpackPlugin",
      (compilation, callback) => {
        const names = compilation.getAssets().map((item) => item.name);
        const arr = [];
        arr.push(`文件的数量：${names.length}`);
        names.forEach((name) => {
          arr.push(`    ${name}`);
        });

        // 添加manifest清单
        const result = arr.join("\n");
        compilation.emitAsset("manifest.txt", {
          source: function () {
            return result;
          },
          size: function () {
            return result.length;
          },
        });

        callback();
      }
    );
  }
};
