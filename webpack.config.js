// webpack.config.js
'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const port = 8000;

module.exports = {
    entry: './dev_server_example/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    performance: { hints: false },
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        compress: true,
        host: 'localhost',
        port: port,
        publicPath: '/',
        after(app) {
            console.log(
                `Your application is running here: http://localhost:${port}`
            );
        },
        quiet: true, // necessary for FriendlyErrorsPlugin
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['raw-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true,
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve(
                                    '@ckeditor/ckeditor5-theme-lark'
                                ),
                            },
                            minify: true,
                        }),
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'dev_server_example',
            template: 'dev_server_example/index.html',
        }),
    ],
};
