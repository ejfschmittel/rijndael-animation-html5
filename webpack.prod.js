var path = require("path")
const common = require("./webpack.common");

const { merge } = require('webpack-merge');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
          }),
     
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: "frame.html",
            template: "./src/frame.html"
        }),
    ],
    optimization: {
        	splitChunks: { chunks: "all", },
    },
})