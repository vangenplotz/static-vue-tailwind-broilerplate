const path = require('path')
const glob = require("glob-all")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const PurgecssPlugin = require("purgecss-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackCleanPlugin = require('webpack-clean')

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

let plugins = [
  new MiniCssExtractPlugin,
  new VueLoaderPlugin(),
  new WebpackCleanPlugin([
    // This removes the main.js file that is added with main.css
    // If you add more CSS-files, add the corresponding js-file to this array
    '/dist/css/main.js'
  ])
]

if ( process.env.NODE_ENV == 'production' ) {
  plugins.push(
    new PurgecssPlugin({
      // Specify the locations of any files you want to scan for class names.
      paths: glob.sync([
        path.join(__dirname, "./src/_proto/**/*.html"),
        path.join(__dirname, "./src/vue/**/*.vue")
        // Add path to other templates containing css classes
        // If you need to keep classes that are not in a template, create a dummy-file with the classes
      ]),
      extractors: [
        {
          extractor: TailwindExtractor,

          // Specify the file extensions to include when scanning for
          // class names.
          extensions: ["cshtml", "html", "js", "php", "vue"]
        }
      ]
    })
  )
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'css/main': './src/css/main.css',
    'js/componentName': './src/vue/componentName'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: process.env.NODE_ENV == 'production',
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins
}