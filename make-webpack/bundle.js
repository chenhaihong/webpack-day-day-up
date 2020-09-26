const Webpack = require("./lib/Webpack");
const options = require("./webpack.config");

const compiler = new Webpack(options);
compiler.run();
