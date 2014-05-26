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


## 参数说明

<table>
<tr>
<td>port</td> <td>代理端口</td> <td>默认8188</td>
<td>file</td> <td>规则文件</td> <td>以当前路径为相对路径；或指定为绝对路径位置</td>
<td>mod</td> <td>规则模块名</td> <td>指定当前使用规则集合 mod=fengchao</td>
<td>debug</td> <td>调试方式</td> <td>再规则中利用debug切换调试模式 默认debug=false</td>
</tr>
</table>

- 使用自定义规则文件

> epipe port=8188 mod=fengchao file=fengchao-pipe.js

## 交互命令

- 使用交互命令设置参数、可以动态增加服务、加载规则、切换显示方式、改变调试方式

```js
    epipe
    > listen 8188
    > mod fengchao
    > debug true
    > fiddle fengchao
    > include ./rules/fengchao
```

<table>
    <tr>
    <td>listen</td> <td>在监听端口创建服务</td> <td>listen 8181 ; 创建新的监听端口</td>
    <td>include</td> <td>加载规则文件</td> <td>include fc.js 将规则文件加入规则库</td>
    <td>mod</td> <td>规则模块名</td> <td>mod fengchao 指定当前使用规则集合</td>
    <td>debug</td> <td>调试方式</td> <td>debug true 改变调试模式</td>
    <td>showlog</td> <td>显示访问日志</td> <td></td>
    <td>hidelog</td> <td>隐藏访问日志</td> <td>默认即隐藏访问日志</td>
    <td>help</td> <td>显示可用命令及帮助</td> <td></td>
    </tr>
</table>
