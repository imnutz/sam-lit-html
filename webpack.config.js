var path = require('path');

module.exports = {
    context: __dirname,
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    devServer: {
        port: 3000
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
