(function(modules) { // 启动函数
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
  require("src/index.js");
})( // chunks
{
  "src/index.js": {
    "path": "src/index.js",
    "code": "\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_a[\"default\"], _b[\"default\"]);",
    "denpendencies": {
      "./a.js": "src/a.js",
      "./b.js": "src/b.js"
    }
  },
  "src/a.js": {
    "path": "src/a.js",
    "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar name = \"a a a a\";\nvar _default = name;\nexports[\"default\"] = _default;",
    "denpendencies": {}
  },
  "src/b.js": {
    "path": "src/b.js",
    "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar name = \"b b b b b\";\nvar _default = name;\nexports[\"default\"] = _default;",
    "denpendencies": {}
  }
});