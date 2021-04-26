var path = require("path")
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "rijndael.bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        open: true,
        
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
    ]
})