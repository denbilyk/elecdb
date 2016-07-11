'use strict';
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

var args = obtainArguments();

module.exports = {
    context: __dirname + '/src',
    colorized: true,
    devtool: 'eval-source-map',
    debug: false,


    entry: [
        './js/App'
    ],

    output: {
        path: __dirname + '/target/classes/WEB-INF',
        publicPath: '/',
        filename: '[hash].js',
        chunkFilename: '[chunkhash].js'

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
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
                loaders: [
                    'transform-loader/cacheable?brfs',
                    'transform-loader/cacheable?packageify'
                ]
            }, {
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
                loader: 'transform-loader/cacheable?ejsify'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    plugins: [
        {
            apply: function (compiler) {
                rimraf.sync(compiler.options.output.path);
            }
        },
        new ExtractTextPlugin('[hash].css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        HTMLWebpackPluginConfig,
        new webpack.DefinePlugin(
            {
                API_URL_CFG: JSON.stringify(args.host),
                TIMEOUT_CFG: args.timeout,
                'process.env.NODE_ENV': JSON.stringify('production')
            }
        ),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })

    ]
};