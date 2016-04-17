var webpack = require("webpack"),
    path = require("path"),
    rucksack = require("rucksack-css"),
    ROOT_PATH = path.resolve(__dirname),
    SRC_PATH = path.resolve(ROOT_PATH, "src"),
    BUILD_PATH = path.resolve(ROOT_PATH, "build");

module.exports = {
    context: SRC_PATH,
    entry: {
        jsx: "./index.jsx", 
        html: "./index.html",
        vendor: [
            "react",
            "react-dom",
            "react-redux",
            "redux"
        ]
    },
    output: {
        path: BUILD_PATH,
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.css$/,
                include: [path.resolve(SRC_PATH, "containers"), path.resolve(SRC_PATH, "components")],
                loaders: [
                    "style",
                    "css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                    "postcss"
                ]
            },
            {
                test: /\.css$/,
                exclude: [path.resolve(SRC_PATH, "containers"), path.resolve(SRC_PATH, "components")],
                loader: "style!css"
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    "react-hot",
                    "babel"
                ]
            },
        ],
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    postcss: [
        rucksack({
            autoprefixer: true
        })
    ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify("production") }
        })
    ],
    devServer: {
        contentBase: SRC_PATH,
        hot: true
    }
}
