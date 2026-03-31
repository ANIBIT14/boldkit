const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Watch the library source directly so Metro picks up changes without a publish step
const libSrc = path.resolve(__dirname, '../src')

config.watchFolders = [...(config.watchFolders ?? []), libSrc]

// Resolve @boldkit/react-native to the local source
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@boldkit/react-native': libSrc,
}

module.exports = config
