const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
var ghpages = require("gh-pages");

ghpages.publish("build");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.join(__dirname, "../src/", "index.js"),
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "../build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/", "index.html"),
      filename: "index.html",
      chunks: ["main"],
      favicon: "./assets/icons/favicon.ico",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [path.join(__dirname, "../assets/icons/favicon.ico")],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("images", "[name].[ext]"),
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[ext]"),
        },
      },
    ],
  },
};
