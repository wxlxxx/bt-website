const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const fs = require('fs')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const ip = require('ip')
const { merge } = require('webpack-merge')
const portFinderSync = require('portfinder-sync')
// site config
// server path config
// const productionPublicPath = 'https://cdn.shopify.com/s/files/1/0415/2072/6176/t/11/'
// const productionImagePath = '.'
// test server path config
// const productionPublicPath = 'http://62.234.217.81/'
// const productionImagePath = 'http://62.234.217.81'
// local path config
const productionPublicPath = './'
const productionImagePath = '.'

function generateHtmlPlugins (templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      minify: false
    })
  })
}
const htmlPlugins = generateHtmlPlugins('./src/html/page')

const baseConfig = {
  entry: {
    app: './src/script/main.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: productionPublicPath
            },
          },
          // Translates CSS into CommonJS
          'css-loader',
          // postcss
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require('autoprefixer')({
                  'overrideBrowserslist': ['> 1%', 'last 2 versions']
              })]
            }
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        exclude: /(images|image)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'assets/fonts/[name].[ext]',
              limit:20000
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minChunks: 2,
      automaticNameDelimiter: '-'
    }
  }
}
const devConfig = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    host: ip.address(),
    port: portFinderSync.getPort(8080)
  },
  output: {
    filename: 'assets/[name].bundle.js',
    chunkFilename: 'assets/[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(fonts|font)/,
        use: [
          {
            loader:'url-loader',
            options:{
                name: 'assets/images/[name].[ext]',
                limit: 20000,
                publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname, './public'), to: path.resolve(__dirname, './dist') }
    ]),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
      chunkFilename: 'assets/[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env.IMAGE_PATH': JSON.stringify(''),
      'process.env.PUBLIC_PATH': JSON.stringify('/')
    })
  ].concat(htmlPlugins)
}

const prodConfig = {
  output: {
    filename: 'assets/[name].bundle.js',
    chunkFilename: 'assets/[name].bundle.js?v='+new Date().getTime(),
    path: path.resolve(__dirname, './dist'),
    publicPath: productionPublicPath,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(fonts|font)/,
        use: [
          {
            loader:'url-loader',
            options:{
                name: 'assets/images/[name].[ext]',
                limit: 20000,
                publicPath: productionPublicPath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: path.resolve(__dirname, './public'), to: path.resolve(__dirname, './dist') }
    ]),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css?v='+new Date().getTime(),
      chunkFilename: 'assets/[name].css?v='+new Date().getTime(),
    }),
    new webpack.DefinePlugin({
      'process.env.IMAGE_PATH': JSON.stringify(productionImagePath),
      'process.env.PUBLIC_PATH': JSON.stringify(productionPublicPath)
    })
  ].concat(htmlPlugins)
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return merge(baseConfig, devConfig)
  }
  if (argv.mode === 'production') {
    return merge(baseConfig, prodConfig)
  }
}
