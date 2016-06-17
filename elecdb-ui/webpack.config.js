'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const rimraf = require("rimraf");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/pages/index.html',
    filename: 'index.html',
    inject: 'body'
});

function obtainArguments() {
    var args = {};
    var p = process.argv.slice(2);
    p.map(function (item) {
        if (item.indexOf("--timeout=") > -1) args.timeout = item.substr(10);
        if (item.indexOf("--host=") > -1) args.host = item.substr(7);
        if (item.indexOf("--app=") > -1) args.name = item.substr(6);
    });

    if (!args.timeout) args.timeout = 10000;
    if (!args.host) args.host = "http://localhost:8080";
    if (!args.name) args.name = "";
    return args;
}


function mode(template, hash) {
    return NODE_ENV === 'production' ?
        hash : template;
}

var args = obtainArguments();

module.exports = {
    context: __dirname + '/src',
    colorized: true,
    devtool: NODE_ENV == 'development' ? 'cheap-module-source-map' : null,
    debug: true,


    entry: [
        './js/App'
    ],

    output: {
        path: __dirname + '/target',
        publicPath: mode('/', ''),
        filename: mode('[name].js?hash=[hash:8]', '[hash].js'),
        chunkFilename: mode('[id].js?hash=[hash:8]', '[chunkhash].js')

    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.styl'],
        modulesDirectories: ["lib", "node_modules"]
    },

    module: {
        loaders: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url?limit=4096&name=img/[hash:16].[ext]"
            },
            {
                test: /\.js[x]$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css!postcss?last 2 versions"
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('css!stylus?resolve url')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },

            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)$/,
                loader: "file-loader"
            }
        ]
    },

    plugins: [
        {
            apply: function (compiler) {
                rimraf.sync(compiler.options.output.path);
            }
        },
        new ExtractTextPlugin(mode('style.css?hash=[hash:6]', '[hash].css')),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        HTMLWebpackPluginConfig,
        new webpack.DefinePlugin(
            {
                API_URL_CFG: JSON.stringify(args.host + "/" + args.name),
                TIMEOUT_CFG: args.timeout
            }
        ),
        /*
         new webpack.optimize.DedupePlugin(),
         new webpack.optimize.UglifyJsPlugin({
         compress: {
         warnings: false
         }
         })
         */
    ],

    devServer: {
        host: 'localhost',
        port: '9001'
    }
};