const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index_bundle.js",
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
              loader: "babel-loader",
            }],
          },
          { 
              test: /\.tsx?$/, 
              exclude: /node_modules/,
              loader: 'ts-loader' 
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader",
            ],
          },
        ],
      },
      resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new CopyPlugin({
          patterns: [
            { from: "src/images", to: "images" }
          ],
        }),
      ]
  };