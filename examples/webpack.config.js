const webpack = require('webpack')
const path = require('path')
const R = require('ramda')

const TARGET = R.compose(
  R.last,
  R.split(':')
)(process.env.npm_lifecycle_event)
console.log('Target: ' + TARGET)

const PATHS = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src')
}

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(TARGET === 'dev' || 'true')),
  __TESTING__: JSON.stringify(JSON.parse(false))
})

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    // add alias for application code directory
    alias:{
      'redux-elm-middleware': path.resolve( __dirname, '..')
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
    contentBase: __dirname,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    definePlugin
  ]
}
