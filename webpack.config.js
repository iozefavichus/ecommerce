/* eslint-disable no-undef */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
            {
                test: /\.html$/i,
                use: 'html-loader',
            },
        ],
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.css'],
        plugins: [new TsconfigPathsPlugin()],
        modules: ['node_modules'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new EslingPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [{ from: 'src/images', to: '../dist/images' }],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode
        ? require('./webpack.prod.config.js')
        : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
