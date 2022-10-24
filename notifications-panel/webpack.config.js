const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProductionMode = process.env.NODE_ENV === "production";
// const compiler = require('vue-template-compiler')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');


module.exports = {
    entry: './src/main.js',
    // mode: 'production',
    
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[name].[ext]'
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
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
              },
        ],
    },
    plugins: [
        new VueLoaderPlugin({
            reactivityTransform: true
        }),
        // new compiler(),
        new HtmlWebpackPlugin({
            template: './src/index.htm',
            filename: '../index.htm',
            favicon: './assets/images/favicon-32x32.png',
            title: 'Helo'
        }),
        new MiniCssExtractPlugin({
            filename: isProductionMode ? "[name].[contenthash].css" : "[name].css",
        }),
        new WebpackBar({profile:true,fancy:true})
    ],
    resolve: {
        alias: {
            vue$:path.resolve(__dirname,'node_modules/vue/dist/vue.esm-bundler')
        }
        // alias: {
        //     // this isn't technically needed, since the default `vue` entry for bundlers
        //     // is a simple `export * from '@vue/runtime-dom`. However having this
        //     // extra re-export somehow causes webpack to always invalidate the module
        //     // on the first HMR update and causes the page to reload.
        //     vue: "@vue/runtime-dom"
        //   }
    }
}