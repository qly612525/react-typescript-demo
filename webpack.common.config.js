module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".ts", ".tsx",".js",".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },
    plugins: []
};