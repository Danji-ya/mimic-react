const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ProvidePlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./v2/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                {
                  runtime: "classic",
                  pragma: "jsx",
                },
              ],
            ],
          },
        },
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      jsx: [
        path.resolve(path.join(__dirname, "v2/Dj/jsx.ts")),
        "default",
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};