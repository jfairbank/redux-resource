var path = require('path');

module.exports = {
  devtool: '#inline-source-map',

  entry: path.resolve(__dirname, 'src/client'),

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
};
