const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const serve = JSON.parse(process.env.WEBPACK_SERVE || false);

module.exports = merge(common, {
    mode: "development",
    entry: "./dev/experimental/dev.js",
    output: {
        filename: "dev.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devtool: "source-map",
    optimization: { minimize: false },
});
