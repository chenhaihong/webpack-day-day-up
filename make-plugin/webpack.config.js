const path = require("path");

const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestWebpackPlugin = require("./plugins/manifest-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:6].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 2048,
          },
        },
      },
      {
        test: /\.woff2$/,
        use: "file-loader",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:9092/",
      },
    },
    hot: true,
    hotOnly: true,
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/index-[contenthash:6].css",
    }),
    new ManifestWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
