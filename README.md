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

入门，例行的Hello World！
---

allone 是常用工具和库的集合，只是对spm和testacular有改进和二次开发。相关的类库都可以参考对应工具的文档。

aio是给spm起的别名，防止已经安装了spm而造成名字冲突。所以有关aio的一切东西都可以参考spm的[文档](https://github.com/spmjs/spm/wiki)

aiotest是testacular的别名，有关aiotest的一切都可以参考testacular的[文档](https://github.com/karma-runner/karma)，已经改名叫karma- -!

##第一步，初始化你的web root

在web目录下,执行

		aio init		

输入1，选择front-frame-template.root和name都随意输入，这个没用的。

生成的目录如下：

		webroot/
		  |--js
		  |   |--sea-modules
		  |   |--src
		  |   |--seajs-config-dev.js
		  |--index.html

js：所有js的集散地

sea-modules：seajs 模块的所在目录（包括jquery\backbone等等的类库），也是未来src代码部署好后的所在地

src：js源代码所在地，可以把此文件夹在上线后删掉...或者干脆不管。

seajs-config-dev.js：开发时引用此文件。这个配置文件维护了模块所对应的js文件和缩写(别名)。在使用seajs中，建议引用模块不建议使用路径，而是使用缩写(别名)，对应关系在一个配置文件中统一管理。在打包压缩后，引用seaj-config.js

index.html：一个示例，方便于模仿上手。


##第二步，创建第一个模块, 就叫它hello吧

进入{{webroot}}/js/src/hello,

		aio init		

输入2，选择module-src-template. root，name都输入hello(your module name)

		aio init

生成的目录如下：

		webroot/
		  |--js
		  |   |--src
		  |   |   |--hello
		  |   |   |   |--dist
		  |   |   |   |--examples
		  |   |   |   |--src
		  |   |   |   |--tests

src：下会生成hello.js，这会是符合seajs要求的模块源文件

dist：在执行打包(build)后的js所在

test：会生成符合jasmine和testacular的单测文件模板

examples：模块的使用示例(不必须)

package.json：打包用的配置文件（就是spm所用的package.json，详细说明见spm的[官方文档](https://github.com/spmjs/spm/wiki/package.json)）

其他：.gitignore、Makefile、README.md，不提了，github相关，不必须

##第三步，写hello模块代码

vi {{webroot}}/js/src/hello/src/hello.js

		define(function(require, exports, module) {

		    var hello;

		    module.exports = function () {
				alert("hello world")
			};
		});

这个代码是一个标准的seajs module，详细说明见seajs的[模块系统官方文档](https://github.com/seajs/seajs/issues/240)、[CMD模块定义](https://github.com/seajs/seajs/issues/242)、[模块标示](https://github.com/seajs/seajs/issues/258)

在js/seajs-config-dev.js中增加模块路径和缩写的对应

		'hello' : '../../js/src/hello/src/hello.js'

暂时这步还是需要手工加一下，马上会把这步增加到aio init中去

在index.html中use hello模块

		seajs.use(['hello'], function (hello) {
		   	hello();
		})

##第四步，打包

目前假设已经开发好了代码，准备打包上线了。

在模块目录下{{webroot}}/js/src/hello下，命令行

		aio build

在dist目录下

		webroot/
		  |--js
		     |--src
		        |--hello
		           |--dist
		           		|--hello-debug.js
		           		|--hello.js

hello-debug.js: debug用js

hello.js：压缩后的源码

aio build与spm的build相同，更新请见[官方文档](https://github.com/spmjs/spm/wiki/SPM-build-%E5%90%88%E5%B9%B6%E6%A8%A1%E5%9D%97%E5%A4%84%E7%90%86%E7%9B%B8%E5%85%B3%E8%AF%B4%E6%98%8E)

##第五步，部署

在模块目录下{{webroot}}/js/src/hello下，命令行

		aio deploy --to=../sea-modules

修改index.html中的sea-debug.js为sea.js

修改引用的配置文件seajs-config-dev.js为正式版seajs-config.js

目前还是需要手动修改，马上会变成自动生成。






