/**
 * Created by Szane on 2016/6/30.
 */
var server = require('./server.js');
var serverLogger = require('./util/ServerLogger.js');
var logger = serverLogger.createLogger('main.js');

(function main() {
    var mainServer = server.createServer();
    mainServer.listen(8066, function onListening() {
        logger.debug('listening at %s', mainServer.url);
    })
})();