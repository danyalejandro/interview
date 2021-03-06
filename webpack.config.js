const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// true when Webpack is in development mode
const DEV_MODE = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devtool: DEV_MODE ? "eval-cheap-source-map" : "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        watchOptions: {
            ignored: [
                path.resolve(__dirname, 'build'),
                path.resolve(__dirname, 'node_modules')
            ]
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: DEV_MODE } },
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: DEV_MODE ? '[name].css' : '[name].[hash].css',
            chunkFilename: DEV_MODE ? '[id].css' : '[id].[hash].css',
        })
    ]
}