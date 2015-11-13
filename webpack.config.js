module.exports = {
  devtool: 'source-map',
  entry: './index.js',
  output: {
    filename: 'script.js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
