/* eslint-disable */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const dotenv = require('dotenv')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

// call dotenv and it will return an Object with a parsed key
// const env = dotenv.config().parsed

// reduce it to a nice object, the same as before
// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next])
//   return prev
// }, {})

const BUILD_DIR = resolve(__dirname, 'build')

const config = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: './src/index.tsx'
  },
  devServer: {
    contentBase: './',
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    alias: {
      assets: resolve(__dirname, './src/assets'),
      '@src': resolve(__dirname, './src'),
      '@stores': resolve(__dirname, './src/stores'),
      '@components': resolve(__dirname, './src/components'),
      '@screens': resolve(__dirname, './src/screens'),
      '@utils': resolve(__dirname, './src/utils'),
      '@services': resolve(__dirname, './src/services'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@routes': resolve(__dirname, './src/routes'),
      '@constants': resolve(__dirname, './src/constants'),
      '@containers': resolve(__dirname, './src/containers'),
      '@img': resolve(__dirname, './src/img'),
      types: resolve(__dirname, './src/types')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isProd
            }
          },
          'css-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|env|gif|ico)$/,
        use: [
          {
            // loader: 'url-loader'
            loader: 'file-loader',
            options: {
              name: './img/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.p?css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [require('tailwindcss'), require('autoprefixer')]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CryptiPics',
      template: 'src/index.html',
      favicon: 'src/assets/img/favicon.png'
    }),
    new webpack.DefinePlugin({

    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isProd ? '[name].css' : '[name].[hash].css',
      chunkFilename: isProd ? '[id].css' : '[id].[hash].css'
    }),
    new CopyWebpackPlugin([{ from: './src/assets/img', to: 'img' }], { copyUnmodified: false }),
    new CopyWebpackPlugin([{ from: './src/assets/fonts', to: 'fonts' }], { copyUnmodified: false })
  ]
}
if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()]
  }
} else {
  // for more information, see https://webpack.js.org/configuration/dev-server
  config.devServer = {
    port: 8081,
    open: true,
    hot: true,
    compress: true,
    stats: 'errors-only',
    overlay: true,
    historyApiFallback: true,
    publicPath: '/'
  }
}

module.exports = config
