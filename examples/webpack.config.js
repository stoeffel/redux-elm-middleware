const path = require('path')

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src', 'index.js')
}

module.exports = {
  entry: [PATHS.src],
  output: {
    // path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack-loader?verbose=true&warn=true'
      }
    ],
    noParse: /\.elm$/
  },
  resolve: {
    alias: {
      'redux-elm-middleware': path.resolve(__dirname, '..', 'src')
    },
    extensions: ['*', '.js', '.jsx', '.elm']
  },
  devServer: {
    contentBase: PATHS.build
  }
}
