var conser = require('conser');
var pipe = require('./index');

function includeFile(modFile) {
    var absPath = require('path').resolve(process.cwd(), modFile);
    try {
        var fiddle = require(absPath);
        pipe.addFiddle(fiddle);
    } catch(ex) {
        console.error(ex);
    }
}

function log(request) {
   var query = request.query;
   console.log('%s [%s]', request.method, request.url);
}

function showLog() {
    pipe.on('request', log);
    return 'showlog';
}

function hideLog() {
    pipe.remove('request', log);
    return 'hidelog';
}

function debug(type) {
    process.debugType = type;
};

function mod(mod) {
    process.modType = mod;
};


// cli inter
exports.main = function (argv) {
    var fengchao = require('../rules/fengchao');
    pipe.addFiddle(fengchao);

    conser.include({
        include: includeFile,
        showlog: showLog,
        hidelog: hideLog,
        debug: debug,
        mod: mod
    });

    conser.include(pipe);

    var context = {};
    for (var i = 2; i < argv.length; i++) {
        var term = argv[i];
        var sterm = term.split('=');
        if (sterm.length == 2) {
            context[sterm[0]] = sterm[1];
        } else if (i < option.length) {
            context[option[i]] = term;
        }
    }

    if (context.mod) {
        mod(context.mod);
        pipe.fiddle(context.mod);
    }

    if (context.debug) {
        debug(context.debug);
    }

    pipe.listen(context.port || 8188);
    conser.start();
}

if (process.argv[1] == __filename) {
    exports.main(process.argv);
}
