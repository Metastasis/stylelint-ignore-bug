const {join, resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = (options) => {
  return {
    entry: options.entry,
    mode: 'production',
    output: {
      path: resolve(options.buildDir),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
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
              loader: require.resolve('style-loader')
            },
            {
              loader: require.resolve('css-loader')
            },
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new StylelintPlugin({
        configFile: join(options.webpackPath, './.stylelintrc.json'),
        ignoreFile: join(options.webpackPath, './.stylelintignore'),
        context: options.appPath,
        files: ['**/*.css']
      })
    ]
  };
};
