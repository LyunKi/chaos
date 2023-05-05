const baseConfig = require('../../jest.config.base.js')

const pack = require('./package.json')

module.exports = {
  ...baseConfig,
  displayName: pack.name,
}
