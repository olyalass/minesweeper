const base = require("./base.webpack.js");

module.exports = {
  ...base,

  devServer: {
    port: 8000,
    historyApiFallback: true,
    hot: true,
  },
};
