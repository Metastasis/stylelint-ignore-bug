const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const {join} = require('path');

function build() {
  const root = process.cwd();
  const options = {
    appPath: root,
    buildDir: join(root, 'dist'),
    webpackPath: join(root, 'packages/webpack'),
    env: 'production'
  };
  const optionsProject1 = {
    ...options,
    buildDir: join(options.buildDir, 'project1'),
    entry: join(options.appPath, 'packages/project1/src/App.jsx')
  };
  const optionsProject2 = {
    ...options,
    buildDir: join(options.buildDir, 'project2'),
    entry: join(options.appPath, 'packages/project2/src/App.jsx')
  };
  const compiler = webpack([
    webpackConfig(optionsProject1),
    webpackConfig(optionsProject2)
  ]);
  compiler.run((err, stats) => onSuccess(err, stats, compiler));
}

function onSuccess(err, stats, compiler) {
  if (err) {
    console.error(err);
    compiler.close(onCloseCompiler);
    process.exit(1);
  }
  const output = stats.toString({color: true, children: false});
  console.log(output);
  compiler.close(onCloseCompiler);
  if (stats.hasErrors() || stats.hasWarnings()) {
    process.exit(1);
  }
}

function onCloseCompiler(closeErr) {
  if (closeErr) console.error(closeErr);
}

build();
