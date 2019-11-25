const CopyWebpackPlugin = require("copy-webpack-plugin");
const ejs = require("ejs");

module.exports = {
  transpileDependencies: ["vuetify"],

  pages: {
    devtools: {
      template: "public/browser-extension.html",
      entry: "./src/devtools/main.js",
      title: "Devtools"
    }
  },

  pluginOptions: {
    browserExtension: {
      componentOptions: {}
    }
  },

  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "src/devtools/devtoolsRunner.html",
          to: "devtoolsRunner.html",
          transform: transformHtml
        },
        {
          from: "src/devtools/devtoolsRunner.js",
          to: "devtoolsRunner.js"
        }
      ])
    ]
  }
};

function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env
  });
}
