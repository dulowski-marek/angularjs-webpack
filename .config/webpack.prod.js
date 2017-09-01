const path = require('path');
const webpack = require('webpack');

// Require plugins
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const EnableProductionMode = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
});

module.exports = {
    devtool: 'eval-source-map',

    context: path.resolve(__dirname, '..'),
    entry: {
        'app/app': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../release'),
        filename: '[name].build.js'
    },

    resolve: {
        extensions: ['.less'],
        alias: {
            'style:variables$': path.resolve(__dirname, '..', 'src/style/common/_variables.less'),
            'style:common': path.resolve(__dirname, '..', 'src/style/common')
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.html$/,
                loaders: 'html-loader'
            }
        ]
    },

    plugins: [
        // // EnableProductionMode,
        // new HTMLWebpackPlugin({
        //     template: './src/index.html',
        //     inject: 'body'
        // }),
        new ExtractTextPlugin('styles.css'),
        // // new CommonsChunkPlugin({
        // //     name: 'common',
        // //     filename: 'common.js'
        // // }),
        // // new MinifyPlugin(),
        // new BundleAnalyzer({
        //     analyzerMode: 'static',
        //     reportFilename: 'bundle-analysis.html'
        // })
    ]
};