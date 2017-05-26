const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: '#eval-source-map', // To see actual file error
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
              test: /\.jsx?$/,
              exclude: /node_modules/,
              include: path.join(__dirname, 'client'),
              loader: 'babel',
              query: {
                presets: ['react', 'es2015', 'stage-1']
              }
            },
            {
              test: /\.scss$/,
              loaders: ['style', 'css', 'sass', 'postcss']
            },
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
            },
            {
              test: /\.json$/,
              exclude: /node_modules/,
              loader: 'json'
            },
            {
              test: /\.(woff|woff2|eot|ttf)$/i,
              loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: 'file-loader?name=images/[name]-[hash].[ext]'
            }
        ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'bootstrap-css': path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css')
    }
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    contentBase: './',
    port: 3000      // To change server default port
  }
};
