const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: "./src/index.js",
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                process.env.NODE_ENV !== "production"
                ? "style-loader"
                : MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                {
                  loader: "sass-loader",
                  options: {
                    sourceMap: true,
                    sassOptions: {
                      outputStyle: "compressed",
                    },
                  },
                },
              ],
            },

        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
  ],
}