const baseConfig = require('../../jest.config.base.js');

const pack = require('./package');

module.exports = {
  ...baseConfig,
  displayName: pack.name,
};
