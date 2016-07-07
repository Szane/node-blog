/**
 * Created by Szane on 2016/6/30.
 */
var restify = require('restify');
var restifyError = require('restify-errors');
var sysMsg = require('./util/SystemMsg.js');

function createServer(options) {
    var server = restify.createServer({
        name: 'NODE-BLOG',
        version: '1.0.0'
    });
    // Clean up sloppy paths like
    server.pre(restify.pre.sanitizePath());

    // Handles annoying user agents (curl)
    server.pre(restify.pre.userAgentConnection());

    server.use(restify.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));
    restify.CORS.ALLOW_HEADERS.push('auth-token');
    restify.CORS.ALLOW_HEADERS.push('client-id');
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Origin");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Credentials");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "GET");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "POST");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "PUT");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "DELETE");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Headers", "accept,api-version, content-length, content-md5,x-requested-with,content-type, date, request-id, response-time");
    server.use(restify.CORS({headers: ['auth-token'], origins: ['*']}));
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());
    server.use(restify.fullResponse());

    server.get('/', function (req, res, next) {
        next(new restifyError.BadRequestError(sysMsg.SYS_AUTH_TOKEN_ERROR));
    });

    server.on('NotFound', function (req, res, next) {
        res.send(404);
        next();
    });
    return (server);
}
module.exports = {
    createServer: createServer
};