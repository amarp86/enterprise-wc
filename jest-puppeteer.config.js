module.exports = {
  server: {
    command: 'PORT=4444 node server.js',
    port: 4444,
    launchTimeout: 50000
  },
  // https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#puppeteerlaunchoptions
  launch: {
    headless: true,
    devtools: false,
    ignoreHTTPSErrors: true,
    dumpio: false
  }
};
