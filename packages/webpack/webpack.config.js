const {join, resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (options) => {
  return {
    entry: options.entry,
    mode: options.env,
    output: {
      path: resolve(options.buildDir),
    },
    resolve: {
      extensions: ['.css', '.js', '.jsx'],
      modules: ['node_modules', join(options.webpackPath, 'node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
                configFile: join(options.webpackPath, 'babel.config.js')
              }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: options.env === 'production' ? MiniCssExtractPlugin.loader : require.resolve('style-loader')
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: [
                    options.env === 'production' ? require.resolve('cssnano') : null
                  ].filter(Boolean)
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new StylelintPlugin({
        configFile: join(options.webpackPath, './.stylelintrc.json'),
        ignoreFile: join(options.webpackPath, './.stylelintignore'),
        context: options.appPath,
        files: ['**/*.css']
      })
    ]
  };
};
