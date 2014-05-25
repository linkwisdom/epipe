epipe
=====

> epipe是一个方便Web项目调试、检测的开源项目；

- 监听http请求，观察网络web请求、及参数、数据响应

- 分析网络性能

- 调试项目、请求改写、转发

- 自定义路由


### 安装

> npm install epipe -g

### 使用

> epipe port=8188 mod=fengchao

- 使用自定义规则文件

> epipe port=8188 mod=fengchao file=fengchao-pipe.js

- 使用交互命令设置参数

```js
    epipe
    > listen 8188
    > mod fengchao
    > debug true
    > fiddle fengchao
    > include ./rules/fengchao
```
