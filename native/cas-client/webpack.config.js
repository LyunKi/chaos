const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, args) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components'],
      },
    },
    args
  )
  return config
}
