const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
    entry: "./dev/dev.js",
    output: {
        filename: "dev.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [new HtmlWebpackPlugin({ template: "./dev/index.html" })],
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
    stats: { warnings: false },
    devServer: {
        hot: true,
        liveReload: false,
        static: {
            directory: path.join(__dirname, "public"),
        },
        historyApiFallback: true,
        client: {
            overlay: {
                warnings: false,
            },
        },
    },
};
