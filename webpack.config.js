const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const plugins = [
  new ExtractTextPlugin({
    filename: './bundle.css',
    allChunks: true,
  }),
  new BabiliPlugin(),
];

module.exports = function webpackStuff() {
  return {
    entry: [
      './src/index.js',
      './styles/bulma.css',
      './styles/app.css',
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './'),
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
          ],
          plugins: [],
        },
        include: [
          path.resolve(__dirname, './'),
        ],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
        }),
      }],
    },
    plugins,
  };
};
