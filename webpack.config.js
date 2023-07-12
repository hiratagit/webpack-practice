const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development", // "production"
    entry: "./src/scripts/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "scripts/main.js",
    },
    devServer: {
        // static: "./dist",
        static: path.resolve(__dirname, "src"),
    },
    resolve: {
        extensions: [".js", ".glsl"],   // 拡張子の記述を省く事が出来る
    },
    module: {
        rules: [
            // css, sass
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // "style-loader"から変更する
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
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
            //pug
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            pretty: true,
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/style.css',
        }),
        new HtmlWebpackPlugin({
            template: "./src/templates/index.pug",
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/templates/access.pug",
            filename: "access.html",
        }),
        new CleanWebpackPlugin(),
    ],
}