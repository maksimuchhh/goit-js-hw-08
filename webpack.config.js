const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
      filename: 'my-bundle.js',
    },
    module: {
      rules: [
         {
        test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // use: ['style-loader', 'css-loader'],
      },
        {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: (content) => svgToMiniDataURI(content.toString()),
            },
          },
        ],
        },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
        },
      ]
  },
  plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' }),
  new MiniCssExtractPlugin()],
    devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
        port: 9000,
  }
    
};
