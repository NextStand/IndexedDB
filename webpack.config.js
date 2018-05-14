const webpack=require("webpack");
module.exports = {
    entry: {
        build: __dirname + '/main.js',
        //"ExcelSpirit.min": __dirname + '/ExcelSpirit.js',
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'js/[name].js'
    },
     module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }, 
    plugins:[
       /*  new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
              },
            compress: {
              warnings: false
            }
          }) */
      ]
}