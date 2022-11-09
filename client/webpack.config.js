const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
    },
    // Added and configured workbox plugins for a service worker and manifest file.
    plugins: [
      // Configuration for HTML Webpack Plugin.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      // Configuration for InjectManifest Plugin
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js',
      }),
      // Configuration for WebpackPwaManifest Plugin
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        publicPath: './',
        start_url: '/',
        short_name: 'J.A.T.E.',
        description: 'A useful TextEditor',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: [path.join('assets', 'icons')]
          },
        ]
      }),
    ],

    // Added CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        // Babel Loader to convert new flavors of JS to older JS for older versions of browser.
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};