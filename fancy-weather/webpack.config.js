const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {

	const { mode = 'development' } = env;

	const isProd = mode === 'production';
	const isDev = mode === 'development';

	const getStyleLoaders = () => [
		isProd ? MiniCssExtractPlugin.loader : 'style-loader',
		'css-loader'
	];

	const getImageLoaders = () => {
		const imageLoaderConfig = {
			loader: 'image-webpack-loader',
			options: {
				bypassOnDebug : true,
				mozjpeg: {
					progressive: true,
					quality: 75
				},
				optipng: {
					enabled: false,
				},
				pngquant: {
					quality: [0.65, 0.90],
					speed: 4
				},
				gifsicle: {
					interlaced: false,
					optimizationLevel: 1
				},
				webp: {
					quality: 75
				}
			}
		};

		const loaders = [
			{
				loader: 'file-loader',
				options: {
					outputPath: 'images',
					name: '[name]-[sha1:hash:7].[ext]'
				}
			}
		];

		if (isProd) {
			loaders.push(imageLoaderConfig)
		};

		return loaders;
	}

	const getPlugins = () => {
		const plugins = [
			new HtmlWebpackPlugin({
				title: 'Hello world',
				buildTime: new Date().toISOString(),
				template: 'public/index.html'
			})
		];

		if (isProd) {
			plugins.push(new MiniCssExtractPlugin({
					filename: 'main-[hash:8].css'
				})
			);
		}

		return plugins;
	}

	return {
		mode: isProd ? 'production': isDev && 'development' ,

		//entry: './src/index.js',
		output: {
			filename: isProd ? 'main-[hash:8].js' : undefined
		},

		module: {
			rules: [

				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				// Loading images
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					use: getImageLoaders()
				},

				// Loading fonts
				{
					test: /\.(ttf|otf|eot|woff|woff2)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'fonts',
								name: '[name].[ext]'
							}
						}
					]
				},

				// Loading CSS
				{
					test: /\.(css)$/,
					use: getStyleLoaders()
				},

				// Loading SASS/SCSS
				{
					test: /\.(s[ac]ss)$/,
					use: [ ...getStyleLoaders(), 'sass-loader' ]
				},
			]
		},

		plugins: getPlugins(),

		devServer: {
			open: true,
			compress: true,
			https: true,
			port: 3013,
			hot: true,
			clientLogLevel: 'debug',
		}
	}
};
