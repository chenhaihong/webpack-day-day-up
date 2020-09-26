const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash:6].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          "local-style-loader",
          "local-css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          "local-style-loader",
          "local-css-loader",
          {
            loader: "local-less-loader",
            options: {
              name: "hello local-less-loader",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
  resolveLoader: {
    modules: ["./node_modules", "./loaders"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "css/index-[contenthash:6].css",
    // }),
  ],
};
