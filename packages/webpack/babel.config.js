module.exports = (api) => {
  api.cache.forever()
  return {
    presets: [
      require('@babel/preset-env'),
      require('@babel/preset-react')
    ]
  }
}
