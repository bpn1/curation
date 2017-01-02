/* eslint no-console:"off" */
const {resolve} = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpackValidator = require('webpack-validator');
const {getIfUtils} = require('webpack-config-utils');

module.exports = env => {
    const {ifProd, ifNotProd} = getIfUtils(env);
    const config = webpackValidator({
        context: resolve('src'),
        entry: './app.js',
        output: {
            filename: 'bundle.js',
            path: resolve('dist'),
            publicPath: '/dist/',
            pathinfo: ifNotProd(),
        },
        devtool: ifProd('source-map', 'eval'),
        module: {
            loaders: [
                {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                    //loader: 'style!css?modules',
                    //include: /flexboxgrid/
                },
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
            ],
        },
        plugins: [
            new ProgressBarPlugin()
        ],
    });
    if (env.debug) {
        console.log(config);
        debugger; // eslint-disable-line
    }
    return config
};
