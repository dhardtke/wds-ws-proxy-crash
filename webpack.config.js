const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const _root = path.resolve(__dirname);

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

module.exports = {
    entry: {
        "client": "./client.js"
    },
    resolve: {
        extensions: [".js"],

        modules: [
            root("node_modules")
        ]
    },

    output: {
        path: root("dist"),
        publicPath: "/",
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devServer: {
        disableHostCheck: true, // per https://github.com/webpack/webpack-dev-server/issues/1604
        port: 8081,
        proxy: {
            "/server": {
                target: "http://localhost:8080",
                ws: true
            }
        },
    },

    bail: true,
    node: false,

    mode: "development"
};
