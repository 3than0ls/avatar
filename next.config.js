const path = require('path');

module.exports = {
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, 'src'),
      '~components': path.resolve(__dirname, 'src/components'),
    };

    return config;
  },
};
