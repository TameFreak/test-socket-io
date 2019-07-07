require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/app/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },

    mode: 'development',

    node: {
        fs: 'empty',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: process.env.UI_PORT || 8080,
        progress: true,
        proxy: {
            '/api/': {
                target: `http://localhost:${process.env.API_PORT || 3000}`,
                ws: true,
            },
            '/socket.io/': {
                target: `http://localhost:${process.env.SOCKET_PORT || 3001}`,
                ws: true,
            },
        },
    },
};
