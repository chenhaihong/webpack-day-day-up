const path = require("path");
const fs = require("fs");

const parser = require("@babel/parser");
const { traverse, transformFromAst } = require("@babel/core");

module.exports = class Webpack {
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;
  }
  run() {
    // 构建chunks
    const modulesSet = [this.parse(this.entry)]; // 存放模块代码信息的集合
    const existing = new Set([this.entry]); // 给chunk去重
    for (let i = 0; i < modulesSet.length; i++) {
      const { denpendencies } = modulesSet[i];
      for (const [, absPath] of Object.entries(denpendencies)) {
        if (!existing.has(absPath)) {
          existing.add(absPath);
          modulesSet.push(this.parse(absPath));
        }
      }
    }

    const modules = {};
    modulesSet.forEach((module) => {
      modules[module.path] = module;
    });
    this.file(modules);
  }
  parse(entryFile) {
    const sourceCode = fs.readFileSync(entryFile, "utf8");
    // 1 获取语法树
    const ast = parser.parse(sourceCode, {
      sourceType: "module",
    });
    // 2 查找依赖
    const denpendencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const { value } = node.source; // 相对路径
        denpendencies[value] = path.join(path.dirname(entryFile), value); // 绝对路径
      },
    });
    // 3 转换代码
    const { code } = transformFromAst(ast, sourceCode, {
      presets: ["@babel/preset-env"],
    });
    return {
      path: entryFile, // 模块路径
      denpendencies, // 模块依赖信息
      code, // 处理后的代码信息
    };
  }
  file(modules) {
    // 1 构建bundle
    modules = JSON.stringify(modules, null, 2);
    const bundle = `(function(modules) { // 启动函数
  function require(module) {
    function newRequire(relativePath) {
      return require(modules[module].denpendencies[relativePath]);
    }
    var exports = {};
    (function(require, exports, code) {
      eval(code);
    })(newRequire, exports, modules[module].code);
    return exports;
  }
  require("${this.entry}");
})( // chunks
${modules});`;

    // 2 写到磁盘
    const filePath = path.join(this.output.path, this.output.filename);
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};
