const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");

const JSX_PATH = {
  v1: "v1/core/jsx-runtime.ts",
  v2: "v2/Dj/jsx.ts",
  v3: "v3/Dj/jsx.ts",
  v4: "v4/Dj/jsx.ts",
};

module.exports = (env) => {
  const main = `/${env.version}/index.tsx`;
  const jsxPath = JSX_PATH[env.version];

  return {
    mode: "development",
    entry: {
      main,
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
    devtool: "inline-source-map",
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
        jsx: [path.resolve(path.join(__dirname, jsxPath)), "default"],
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
    ],
  };
};
