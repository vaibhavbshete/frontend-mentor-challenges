const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: '.',
  
       hot: true,
      },
    entry: './src/form.js',
    output: {
        path: __dirname + '/built-assets',
        filename: 'form.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
                    }
                }
            }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //       title: 'Hot Module Replacement',
    //     }),
    //   ],
}