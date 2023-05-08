const baseConfig = require('../../jest.config.base.js');

const pack = require('./package.js');

module.exports = {
  ...baseConfig,
  displayName: pack.name,
};
