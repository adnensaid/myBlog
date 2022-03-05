const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          // for bootstrap
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/images/*",
          to: "assets/images/[name][ext]",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/index.html"),
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: "src/form/form.html",
    }),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    port: 4000,
  },
};
