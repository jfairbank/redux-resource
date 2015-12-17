if (Object.assign) {
  module.exports = Object.assign;
} else {
  module.exports = require('./assignPolyfill');
}
