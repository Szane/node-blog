/**
 * Created by Szane on 2016/7/4.
 */
var sysConfig = require('../config/SystemConfig.js');
var log4js = require('log4js');
function createLogger(name) {
    log4js.configure(sysConfig.loggerConfig.config);
    var logger = log4js.getLogger(name);
    logger.setLevel(sysConfig.loggerConfig.level);
    return logger;
}
module.exports = {
    createLogger: createLogger
};

