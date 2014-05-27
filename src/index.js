var requester = require('request');
var http = require('http');

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var httpProxy = require('http-proxy');
var _proxy = new httpProxy.RoutingProxy();

var serverList = {};
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
    if (serverList.hasOwnProperty(port)) {
        return 'proxy already listened on port:' + port;
    }

    var server = http.createServer(function (req, resp) {
        req.query = require('url').parse(req.url, true);
        emitter.emit('request', req);
        if (req.handler == 'proxy' ) {
            service.proxy(req, resp);
        } else {
            service.direct(req, resp);
        }
    });

    try {
        server.listen(port);
        serverList[port] = server;
    } catch (ex) {
        return '';
    }
};

var currenFiddle = null;
var fiddleMap = {};

exports.close = function (port) {
    var list = [];
    if (port && serverList.hasOwnProperty(port)) {
        list.push(port);
        serverList[port].close();
    } else {
        for (var port in serverList) {
            list.push(port);
            serverList[port].close();
        }
    }
    return 'close service on ' + list.join(', ');
};

exports.ports = function () {
    var ports = Object.keys(serverList);
    return 'proxy ports on ' + ports.join(', ');
};

exports.fiddle = function (fiddle) {
    if (typeof fiddle == 'string' && fiddleMap.hasOwnProperty(fiddle)) {
        console.log('fiddle %s', fiddle);
        return exports.fiddle(fiddleMap[fiddle]);
    }

    if (fiddle && typeof fiddle.request == 'function') {
        if (currenFiddle) {
            emitter.removeListener('request', currenFiddle.request);
        }
        emitter.on('request', fiddle.request);
        currenFiddle = fiddle;
    }
    return JSON.stringify(fiddleMap, '\t', 4);;
};

exports.on = function (ename, func) {
    emitter.on(ename, func);
};

exports.remove = function (ename, func) {
    emitter.removeListener(ename, func);
};

exports.addFiddle = function (fiddle) {
    fiddleMap[fiddle.name] = fiddle;
    if (fiddle && fiddle.proxyPort) {
        exports.listen(fiddle.proxyPort);
    }
};

