var localPath = [
   'jupiter/GET/toolcenter/toolsInfo',
   'GET/nikon/coreworddetail'
];

exports.name = 'fengchao';

exports.ajaxRequest = function (req) {
    var query = req.query;
    if ( query.pathname == '/nirvana/request.ajax' 
        || query.pathname == '/nirvana/zebra') {

        if (process.debugType == 'true' 
            && localPath.indexOf(query.query.path) > -1 ) {
            req.url = req.url.replace(query.host, 'localhost:8848');
            req.query = query = require('url').parse(req.url);
        }
        req.handler = 'proxy';
    }
};

exports.staticRequest = function (req) {
    var query = req.query;

    var modType = process.modType;
    var debugType = process.debugType;
    
    if (modType == 'phoenix' && debugType == 'true') {
        req.url = req.url.replace(query.host, 'localhost:8848');
        req.url = req.url.replace('nirvana', 'nirvana-workspace/phoenix');

    } else if (modType == 'nirvana' && debugType == 'true') {
        req.url = req.url.replace(query.host, 'localhost:8848');
        req.url = req.url.replace('nirvana', 'nirvana-workspace/nirvana');
    }

    if (query.pathname == '/nirvana/main.html') {
        process.modType = 'nirvana';
        if (query.query.debug 
            || query.query.modType == 'debug') {
            process.debugType = true;
        }

    } else if (query.pathname == '/nirvana/home.html') {
        process.modType = 'phoenix';
        if (query.query.debug
            || query.query.modType == 'debug') {
            process.debugType = true;
        }
    } else if (query.pathname.match(/^\/library/) ) {
        req.url = req.url.replace(query.host, 'localhost:8848');
    }

    req.query = query = require('url').parse(req.url);
};

exports.request = function (req) {
    var query = req.query;

    if (req.query.hostname.match(/\.baidu\.com/)) {
        req.handler = 'proxy';
    }

    if (query.hostname == 'fengchao.baidu.com'
        || query.hostname == 'fc-offline.badiu.com'
        ) {
        exports.ajaxRequest(req);
        exports.staticRequest(req);
    }
};