const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/handler.js',
  target: 'node',
  externals: [
    'babel-runtime',
    nodeExternals(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname,
      exclude: /node_modules/,
    }],
  },
};
