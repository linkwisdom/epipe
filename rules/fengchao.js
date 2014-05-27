/**
 * @file 百度凤巢前端配置
 * - 支持nirvana/phoenix两个模块
 * - 其它模块参照配置即可；同时使用file参数导入
 *
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

/**
 * 指定规则集名称
 * 
 * @type {string}
 */
exports.name = 'fengchao';

/** 
 * 指定代理端口
 * 
 * @type {number}
 */
// exports.proxyPort = 8189;

/**
 * 请求劫持方法
 * - 再正式请求处理前执行
 * - 监听请求信息
 * - 修改请求内容或参数
 * - 指定请求处理方法
 * 
 * @param {Request} req 请求对象
 */
exports.request = function (req) {
    var query = req.query;

    if (req.query.hostname.match(/\.baidu\.com/)) {
        req.handler = 'proxy';
    }

    if (query.hostname == 'fengchao.baidu.com'
        || query.hostname == 'fc-offline.baidu.com'
        || query.hostname == 'fctest.baidu.com'
        ) {
        exports.ajaxRequest(req)
        && exports.staticRequest(req);
    }
};

/**
 * 指定需要转为本地mock的ajax接口
 * - 通过本地命令可以增加 mockPath
 * > addmock GET/nikon/coreworddetail
 * 
 * @type {Array}
 */
exports.mockPath = [];

/** 
 * 处理ajax请求
 * 
 * @param {Request} req 请求对象
 * @return {boolean} 是否继续处理
 */
exports.ajaxRequest = function (req) {
    var query = req.query;
    if ( query.pathname == '/nirvana/request.ajax' 
        || query.pathname == '/nirvana/zebra') {

        if (process.debugType 
            && exports.mockPath
            && exports.mockPath.indexOf(query.query.path) > -1
        ) {
            req.url = req.url.replace(query.host, 'localhost:8848');
            req.query = query = require('url').parse(req.url);
        }
        req.handler = 'proxy';
        return false;
    }
    return true;
};

/**
 * 静态资源请求
 * 
 * @param {Request} req 请求对象
 */
exports.staticRequest = function (req) {
    var query = req.query;

    // modType 指定的是访问的模块名
    var modType = process.modType;

    // debugType 指定是否进入debug模式
    var debugType = process.debugType;
    
    // 如果进入的是phoenix模块
    if (modType == 'phoenix' && debugType) {
        req.url = req.url.replace(query.host, 'localhost:8848');
        req.url = req.url.replace('nirvana', 'nirvana-workspace/phoenix');

    // 如果当前是nirvana模块
    } else if (modType == 'nirvana' && debugType) {
        req.url = req.url.replace(query.host, 'localhost:8848');
        req.url = req.url.replace('nirvana', 'nirvana-workspace/nirvana');
    }

    // 通过引导页改变模块名称
    if (query.pathname == '/nirvana/main.html') {
        process.modType = 'nirvana';
        // 如果参数有指定debug模式
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
    }

    // 需要重新解析为修改后的URL
    req.query = query = require('url').parse(req.url);
};
