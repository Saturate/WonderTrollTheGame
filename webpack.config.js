'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

module.exports = {

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/dist/',
        filename: 'project.bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true
    },

    module: {
        rules: [
          {
            test: [ /\.vert$/, /\.frag$/ ],
            use: 'raw-loader'
          }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([ 
            { from: 'src/assets/**', to: 'dist/assets' },
            { from: 'src/index.html', to: 'dist/index.html' }
        ]),
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]

};
