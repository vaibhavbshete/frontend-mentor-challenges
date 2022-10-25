const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProductionMode = process.env.NODE_ENV === "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');


console.log(this.entry);
module.exports = {
    entry: './src/main.js',
    
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[name][ext]'
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
            hash: true,
            inject:false,
            title: 'Notification Page | Frontend Mentor'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new WebpackBar({ profile: true, fancy: true }),
    ],
    devServer: {
        static: {
            directory: '.',
            staticOptions:{index:'./index.htm'}
        },
        devMiddleware: {
            index: false,
            serverSideRender: true,
            writeToDisk: true,
          },
        client: {
            progress: true,
        overlay:false},
        watchFiles:['./src/**/*']
    },
   
    resolve: {
        alias: {
            vue$:path.resolve(__dirname,'node_modules/vue/dist/vue.esm-bundler')
        }
    }
}