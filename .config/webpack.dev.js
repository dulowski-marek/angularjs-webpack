const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const HMRPlugin = webpack.HotModuleReplacementPlugin;

module.exports = {
    devtool: 'eval-source-map',

    context: path.resolve(__dirname, '..'),
    entry: {
        'app/app': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].build.js'
    },

    resolve: {
        alias: {
            '_variables$': path.resolve(__dirname, '..', 'src/style/common/_variables.less'),
            '_common': path.resolve(__dirname, '..', 'src/style/common')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.html$/,
                loaders: 'html-loader'
            }
        ]
    },

    devServer: {
        port: 8000,
        hot: true
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new HMRPlugin()
    ]
};