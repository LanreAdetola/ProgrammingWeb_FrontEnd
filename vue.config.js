const path = require('path');

module.exports = {
  // other configurations
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
};
