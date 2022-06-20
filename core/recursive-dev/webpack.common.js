const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
    entry: "./core/recursive-dev/dev.js",
    output: {
        filename: "dev.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [new HtmlWebpackPlugin({ template: "./core/recursive-dev/index.html" })],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            { test: /\.html$/, use: ["html-loader"] },
            {
                test: /\.svg|png|jpg|gif$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "[name].[hash].[ext]",
                            outputPath: "imgs",
                        },
                    },
                ],
                type: "javascript/auto",
            },
        ],
    },
};
