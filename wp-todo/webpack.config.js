const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HTMLplugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");//将css单独打包
//定义一个变量来；确定当前环境是否是开发环境；process.env.NODE_ENV是在我们设置在package.json命令行的值；
const isDEV = process.env.NODE_ENV === "development";
config = {
  target: "web",
  mode: "development", // 设置mode
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDEV ? '"development"' : '"production"'
      }
    }),
    new HTMLplugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name]-aaa.[ext]"
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader",
        {
          loader:'postcss-loader',
          options:{
            sourceMap:true
          }
        },
        "stylus-loader"]
      }
    ]
  }
};
if (isDEV) {
  config.devtool = "#cheap-module-source-map",
    config.devServer = {
      port: 8080,
      host: "0.0.0.0",
      overlay: {
        errors: true
      },
      // historyFallback:{
      // },
      // open: true,
      hot: true
    },
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
}
module.exports = config;
