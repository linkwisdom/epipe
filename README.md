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

- 1. 建议用法：在项目目录中建立规则文件`epipe-rules.js`直接执行命令`epipe`即可，规则文件参考`epipe/epipe-rules.js`
- 2. 制定规则文件用法、执行命令`epipe file=custom-rule.js`, 文件相对命令当前目录

- 3. 使用规则集合，自由切换

> epipe port=8189 mod=fengchao conser

## 参数说明

<table>
<tr>
    <td>port</td> <td>代理端口</td> <td>默认8188</td>
</tr>
<tr>
    <td>file</td> <td>规则文件</td> <td>以当前路径为相对路径；或指定为绝对路径位置</td>
</tr>
<tr>
    <td>mod</td> <td>规则模块名</td> <td>指定当前使用规则集合 mod=fengchao</td>
</tr>
<tr>
    <td>debug</td> <td>调试方式</td> <td>再规则中利用debug切换调试模式 默认false</td>
</tr>
<tr>
    <td>conser</td> <td>打开命令行交互</td> <td> epipe conser 无需参数</td>
</tr>
</table>

- 使用自定义规则文件

> epipe port=8189 mod=fengchao file=fengchao-pipe.js

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
        <td>listen</td> <td width="200px">在监听端口创建服务</td> <td width="300px">listen 8181 ; 创建新的监听端口</td>
    </tr>
    <tr>
        <td>include</td> <td>加载规则文件</td> <td>include fc.js 将规则文件加入规则库</td>
    </tr>
    <tr>
        <td>mod</td> <td>规则模块名</td> <td>mod fengchao 指定当前使用规则集合</td>
    </tr>
    <tr>
        <td>debug</td> <td>调试方式</td> <td>debug true 改变调试模式</td>
    </tr>
    <tr>
        <td>showlog</td> <td>显示访问日志</td> <td></td>
    </tr>
    <tr>
        <td>hidelog</td> <td>隐藏访问日志</td> <td>默认即隐藏访问日志</td>
    </tr>
    <tr>
        <td>help</td> <td>显示可用命令及帮助</td> <td></td>
    </tr>
</table>


### nirvana / phoenix 用法说明

- 启动本地开发环境，确定能够正常访问
    - 访问 [phoenix](http://localhost:8848/nirvana-workspace/phoenix/home.html?userid=1233#/app/index)   

- 启动 `epipe port=8189 mod=fengchao conser`
    - port 表示代理端口
    - mod 表示规则集合 nirvana/ phoenix 通用为fengchao
    - conser 表示进入epipe命令交互方式

- 配置本地http代理服务器，不要配置https代理
    - http 代理 `127.0.0.1 8189`
    - 确保'跳过本地地址的代理服务器'
    - 建议用pac方式配置
    - 参考内部代理pac http://uedc.baidu.com/proxy [内部bae不稳定]；
    - 改为线上服务[http://liandong.org/proxy.pac](http://liandong.org/proxy.pac)[稳定线上地址]
    - 联调 fctest配置host为对应服务器IP地址即可

- 访问任意网站，在epipe命令中输入`showlog`检查是否显示历史记录

- 访问nirvana / phoenix 是否能够正常访问及显示log

- 进入联调模式，在epipe 中输入 `debug true`
    - 输入info 查看状态信息
    - `debug false` 退出联调模式




