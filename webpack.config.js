const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	performance: {
		hints: false
	},
	entry: ['./index.ts'],
	output: {
		path: __dirname + '/dist',
		filename: 'index.js'
	},
	resolve: {
		extensions: ['.ts', '.js', '.css'],
		alias: {
			modules: 'node_modules'
		}
	},
	plugins: [new ExtractTextPlugin('style.css')],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'awesome-typescript-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract('css-loader')
			},
			{
				test: /\.json$/,
				use: 'raw-loader'
			}
		]
	}
};

module.exports = config;
