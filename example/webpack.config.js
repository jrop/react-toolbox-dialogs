'use strict'

const webpack = require('webpack')

const PROD = process.env.NODE_ENV == 'production'

module.exports = {
	devtool: !PROD ? '#source-map' : '',
	entry: {
		'app': './src/app',
	},
	output: {
		filename: '[name].js',
		path: `${__dirname}/build/`,
	},
	module: {
		loaders: [ {
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			loader: 'style!css',
		}, {
			test: /\.scss$/,
			loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:5]!sass',
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'url',
		} ],
	},
	resolve: {
		root: `${__dirname}/node_modules`,
	},
	resolveLoader: {
		root: `${__dirname}/node_modules`,
	},
	plugins: PROD ? [
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: { warnings: false },
			minimize: true,
		}),
	] : [],
}
