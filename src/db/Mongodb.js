/**
 * Created by Szane on 2016/7/6.
 */
var mongoClient = require('mongodb').MongoClient;
var server = require('mongodb').Server;
var sysConfig = require('../config/SystemConfig.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('Mongodb.js');

var db = null;
mongoClient.connect(sysConfig.mongoConfig.connect, function (err, dbInstance) {
    if (err) {
        logger.error(' connect Mongodb failed ' + err.message);
    } else {
        db = dbInstance;
    }
});

var getDb = function (callback) {
    if (db == null) {
        logger.info(' getDb attempt to create mongodb connection');
        mongoClient.connect(sysConfig.mongoConfig.connect, function (err, dbInstance) {
            if (err) {
                logger.error(' connect Mongodb failed ' + err.message);
                return callback(err, null);
            } else {
                return callback(null, dbInstance);
            }
        });
    } else {
        callback(null, db);
    }
};
exports.getDb = getDb;

module.exports = {
    getDb: getDb
};
