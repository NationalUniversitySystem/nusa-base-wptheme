import TerserPlugin from 'terser-webpack-plugin';

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
			},
		],
	},
	mode: 'production',
	devtool: 'source-map',
	externals: {
		jquery: 'jQuery',
	},
	output: {
		filename: '[name].min.js',
	},
	optimization: {
		minimize: true,
		minimizer: [ new TerserPlugin( {
			terserOptions: {
				output: {
					comments: false,
				},
			},
			extractComments: false,
			sourceMap: true,
		} ) ],
	},
	stats: {
		chunks: false,
		entrypoints: false,
	},
};
