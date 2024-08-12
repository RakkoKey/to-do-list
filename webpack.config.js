const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode:'development',
  entry: './src/domControl.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  plugins:[
    new HtmlWebpackPlugin({
      title: 'Webpack 5',
      filename: 'index.html',
      inject: 'body',
      template: './src/index.html',
    }),
  ],
  module:{
    rules:[
      {test: /\.css$/i,
      use:['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use:[
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      },
      {
        test:/\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};