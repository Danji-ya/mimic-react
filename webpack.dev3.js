const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ProvidePlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./v3/index.tsx",
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
  devtool: 'inline-source-map',
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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      jsx: [
        path.resolve(path.join(__dirname, "v3/Dj/jsx.ts")),
        "default",
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
