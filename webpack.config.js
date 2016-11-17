module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_componenets)/,
        loader: 'babel',
        query: {presets: ['react', 'es2015']}
      }
    ]
  }
}
