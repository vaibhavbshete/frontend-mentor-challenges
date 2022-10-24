const webpack = require("webpack");
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProductionMode = process.env.NODE_ENV === "production";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/main.js',
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.htm',
            filename: '../index.htm'
        }),
        new MiniCssExtractPlugin({
            filename: isProductionMode ? "[name].[contenthash].css" : "[name].css",
        }),
   ]
}