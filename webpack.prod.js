var path = require("path")
const common = require("./webpack.common");

const { merge } = require('webpack-merge');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: "frame.html",
            template: "./src/frame.html"
        })
    ],
    optimization: {
        	splitChunks: { chunks: "all", },
    },
})