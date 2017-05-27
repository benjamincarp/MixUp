const { resolve } = require('path');

module.exports = {
    entry: './client/src/index.jsx',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'client/build')
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [ 'babel-loader', ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader?modules', ],
            },
        ],
    }
};