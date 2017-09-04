exports.config = {
  specs: [
    './test/uiautomation/specs/**/*.js'
  ],

  maxInstances: 10,

  capabilities: [{
    maxInstances: 5,
    browserName: 'phantomjs'
  }],

  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './test/uiautomation/errorShots/',
  baseUrl: 'http://localhost:4000',
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',

  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  },

  before: function (capabilities, specs) {
    var chai = require('chai');
    global.expect = chai.expect;
  },

  beforeTest: function (test) {
    browser.url(this.baseUrl);
  },

  afterTest: function (test) {
    browser.end();
  }
}
