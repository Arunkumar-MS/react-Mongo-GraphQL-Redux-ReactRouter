var path = require("path");
var ROOT_PATH = path.resolve(__dirname);
module.exports = {
    entry: {
        app: [
            './components/index.js'
        ]
    },
    devtool: 'cheap-module-source-map',
    output: {
        path: ROOT_PATH,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }],
    },
    node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
}
