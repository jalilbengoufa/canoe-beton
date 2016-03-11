var extend = require('config-extend');
var config = {
  host: '127.0.0.1',
  port: 1025,
  secure: false,
  auth: {
    user: '',
    pass: ""
  }
};

var env = process.env.NODE_ENV;
if(env) {
  var envConfig = require('./config.' + env);
  config = extend(config, envConfig);
}

module.exports = config;
