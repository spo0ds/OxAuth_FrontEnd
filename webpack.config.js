const path = require("path")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|node)$/,
                use: ["file-loader"],
            },
        ],
    },
}
