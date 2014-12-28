/**
 * 建议咱项目目录中保留配置信息
 * - epipe启动位置如果含有`epipe-rules.js`则会作为默认规则加载
 *
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

// 使用fengchao作为测试规则
module.exports = exports = require('./rules/fengchao');

// config字段用于默认启动项目配置
exports.config = {
    port: 8189,
    conser: true,
    mod: 'fengchao',
    debug: false
};

exports.mockPath = ['GET/material'];