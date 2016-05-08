const webpack = require('webpack')
const path = require('path')
const R = require('ramda')

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src', 'index.js')
}

module.exports = {
  entry: ['babel-polyfill', PATHS.src],
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    // add alias for application code directory
    alias:{
      'redux-elm-middleware': path.resolve( __dirname, '..', 'src')
    },
    extensions: [ '', '.js' ]
  },
  externals: [{ 'window': 'window' }],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
