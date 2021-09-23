const { resolve } = require("path");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "build"),
  },
  devServer: {
    contentBase: path.join(__dirname, "www"),
    compress: false,
    port: 8081,
    publicPath: "/xuni/",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
};
