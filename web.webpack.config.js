const path = require("path");
const webpack = require('webpack');

module.exports = {
  entry: './src/frontend/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, "client/dist/assets"),
    publicPath: "/assets/",
  },
  target: 'web',
  externals: [
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname,
      exclude: /node_modules/,
    }],
  },
  devtool: 'source-map',
};

