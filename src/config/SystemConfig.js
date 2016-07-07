/**
 * Created by Szane on 2016/7/4.
 */
var loggerConfig = {
    level: 'debug',
    config: {
        appenders: [
            {type: 'console'},
            {
                "type": "file",
                "filename": "../node-blog.log",
                "maxLogSize": 52100,
                "backups": 1
            }
        ]
    }
};
var mongoConfig = {
    connect: 'mongodb://127.0.0.1:27017/node-blog'
};

module.exports = {
    loggerConfig: loggerConfig,
    mongoConfig: mongoConfig
};