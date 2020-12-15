let utils = {
  serverHost () {
    // 线上host
    if (process.env.NODE_ENV === 'production') {
      return '//47.105.41.75:3000/'
    } else {
      // 本地host
      return '//localhost:3000/'
    }
  }
}

module.exports = utils
