const path = require("path");

module.exports = {
    entry: "./src/recursive-dev/dev.js",
    output: {
        filename: "dev.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
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
