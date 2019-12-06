module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/botV2/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}