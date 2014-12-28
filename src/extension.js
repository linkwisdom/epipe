var pipe = require('./index');

exports.include = function (modFile, cwd) {
    var absPath = require('path').resolve(cwd || process.cwd(), modFile);
    try {
        var fiddle = require(absPath);
        pipe.addFiddle(fiddle);

        if (fiddle.mockPath) {
            process.mockPath =  fiddle.mockPath;
        }
        if (pipe.name) {
            pipe.fiddle(fiddle.name);
        }
        return fiddle;
    } catch(ex) {
        console.error(ex);
    }
}

function log(request) {
   var query = request.query;
   console.log('%s [%s]', request.method, request.url);
}

exports.showlog = function () {
    pipe.on('request', log);
    return 'showlog';
}

exports.hidelog = function() {
    pipe.remove('request', log);
    return 'hidelog';
};

exports.mock = function (path) {
    if (process.mockPath) {
        process.mockPath.push(path);
    } else {
        process.mockPath = [];
    }
    return process.mockPath;
};

exports.debug = function (type) {
    if (type !== undefined) {
        process.debugType = (type == 'false') ? false : true ;
    }
    return process.debugType;
};

exports.mod = function (mod) {
    if (mod !== undefined) {
        process.modType = mod;
    }
    return process.modType;
};

exports.info = function () {
    return {
        debugType: process.debugType,
        modType: process.modType,
        mockPath: process.mockPath
    };
};