const { AureliaPlugin } = require('aurelia-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['.ts'],
        modules: ['node_modules']
    },
    entry: {
        './src/components/components': ['aurelia-bootstrapper']
        //vendor: ['bluebird', 'jquery', 'bootstrap', 'aurelia-dialog'],
    },
    output: {
        path: path.resolve('dist'),
        //filename: 'components.js'
    },
    plugins: [ new AureliaPlugin() ]
};
