const fs = require("fs");
const path = require("path");

module.exports = {
  webpack: config => {
    const src = path.join(__dirname, "src");
    config.resolve.modules.push(src);
    return config;
  },
  devServer: config => {
    return config;
  },
  jest: config => {
    const newConfig = {
      ...config,
      modulePaths: [...config.modulePaths, "src"]
    };
    return newConfig;
  }
};
