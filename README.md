**前端集成开发管理工具 AllOne**
===


AllOne 是一个集成的前端开发管理工具包，集成了当前主流的组件、类库、框架。
能够无忧的快捷的引入backbone.js、jquery、underscore、mustache、bootstrap
未来会支持越来越多的流行库，框架。
AllOne 的代码是用seajs来管理依赖

安装
---

首先，安装[node.js](http://nodejs.org/).
在命令行下，执行

		npm install -g allone

好了，已经完成安装了。很简单吧。

入门
---

第一步,初始化你的web root

在web目录下,执行

		aio init		

输入1，选择front-frame-template.root和name都随意输入，这个没用的。

生成的目录如下：

		webroot/
		  |--js
		  |   |--sea-modules
		  |   |--src
		  |   |--seajs-config-dev.js

js：所有js的集散地
sea-modules：seajs 模块的所在目录（包括jquery\backbone等等的类库），也是未来src代码部署好后的所在地
src：自己代码的所在
## 讨论和报告 Bug

* [查看所有 issue](https://github.com/spmjs/spm/issues)
* [新建 issue](https://github.com/spmjs/spm/issues/new)





