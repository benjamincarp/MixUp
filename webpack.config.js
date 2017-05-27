const path = require('path');

module.exports = {
    entry: './client/src/jsx/index.jsx',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'client/build/js')
    }
};