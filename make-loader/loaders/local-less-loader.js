const less = require("less");

module.exports = function (source) {
  console.log(this.query); // 打印options参数

  less.render(source, (e, output) => {
    this.callback(e, output.css);
  });
};
