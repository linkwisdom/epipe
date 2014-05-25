var requester = require('request');
var http = require('http');

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var httpProxy = require('http-proxy');
var _proxy = new httpProxy.RoutingProxy();

var service = {};

service.proxy = function (request, response) {
    var query = request.query;
    _proxy.proxyRequest(request, response, {
        host: query.hostname,
        port: query.port || 80
    });
};

/**
 * 直接通过http-request 请求连接
 */
service.direct = function (req, resp) {
    try {
        var x = requester(req.url);
        req.pipe(x);
        x.pipe(resp);
    } catch(ex) {
        console.log(ex);
    }
    
};

emitter.setMaxListeners(120);

exports.listen = function (port) {
    http.createServer(function (req, resp) {
        req.query = require('url').parse(req.url, true);
        emitter.emit('request', req);
        if (req.handler == 'proxy' ) {
            service.proxy(req, resp);
        } else {
            service.direct(req, resp);
        }
    }).listen(port);
};

var currenFiddle = null;
var fiddleMap = {};

exports.fiddle = function (fiddle, isOne) {
    if (typeof fiddle == 'string' && fiddleMap.hasOwnProperty(fiddle)) {
        console.log('fiddle %s', fiddle);
        return exports.fiddle(fiddleMap[fiddle], isOne);
    }

    if (typeof fiddle.request == 'function') {
        if (currenFiddle && isOne) {
            emitter.removeListener('request', currenFiddle.request);
        }

        emitter.on('request', fiddle.request);
        currenFiddle = fiddle;
    }
    return fiddleMap;
};

exports.on = function (ename, func) {
    emitter.on(ename, func);
};

exports.remove = function (ename, func) {
    emitter.removeListener(ename, func);
};

exports.addFiddle = function (fiddle) {
    fiddleMap[fiddle.name] = fiddle;
};

