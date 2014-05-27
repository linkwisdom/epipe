var conser = require('conser');
var pipe = require('./index');

var ext = require('./extension');
var help = require('./help');

for (var h in help) {
    if (pipe.hasOwnProperty(h)) {
        pipe[h].help = '\t >\t' + help[h];
    } else if (ext.hasOwnProperty(h)) {
        ext[h].help = '\t >\t' + help[h];
    }
}

// cli inter
exports.main = function (argv) {
    var context = {};
    for (var i = 2; i < argv.length; i++) {
        var term = argv[i];
        var sterm = term.split('=');
        if (sterm.length == 2) {
            context[sterm[0]] = sterm[1];
        } else if (i < argv.length) {
            context[term] = true;
        }
    }

    // 指定规则文件
    if (context.file) {
        var name = ext.include(context.file);
        if (name) {
            pipe.fiddle(name);
        }
    } else {
        ext.include('../rules/fengchao', __dirname);
    }

    // 指定模块名称
    if (context.mod) {
        ext.mod(context.mod);
        pipe.fiddle(context.mod);
    }

    // 调试模式
    if (context.debug) {
        ext.debug(context.debug);
    }

    // 代理端口
    if (context.port) {
        pipe.listen(context.port);
    }

    process.debugType = false;

    // 打开终端命令交互
    if (context.conser) {
        conser.include(ext);
        conser.include(pipe);
        conser.start();
    }
}

if (process.argv[1] == __filename) {
    exports.main(process.argv);
}
