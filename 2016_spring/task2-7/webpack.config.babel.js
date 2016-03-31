export default {
    entry: {
        index: "./src/scripts/index.jsx"
    },
    output: {
        filename: "bundle.js"
    },  
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: "babel"
        }]
    }
};