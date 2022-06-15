const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const serve = JSON.parse(process.env.WEBPACK_SERVE || false);

module.exports = merge(common, {
    mode: "development",
    entry: "./src/recursive-dev/test/test.js",
    output: {
        filename: "test.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devtool: "source-map",
    optimization: { minimize: false },
    // plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
    devServer: {
        hot: true,
        liveReload: false,
        static: {
            directory: path.join(__dirname, "public"),
        },
        historyApiFallback: true,
    },
});
