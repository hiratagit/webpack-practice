const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/scripts/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "scripts/main.js",
    },
    resolve: {
        extensions: [".js", ".glsl"],   // 拡張子の記述を省く事が出来る
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // "style-loader"から変更する
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
            // Image
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: "asset/resource",     // souceではなく、resouce
                generator: {             
                    filename: "images/[hash][ext]",  //.[ext]とはしない
                }
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/style.css',
        }),
        new HtmlWebpackPlugin({
            template: "./src/templates/index.html",
        }),
        new CleanWebpackPlugin(),
    ],
}