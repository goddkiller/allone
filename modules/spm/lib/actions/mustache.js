'use strict';

var path = require('path');
var ActionFactory = require('../core/action_factory.js');
var Commander = require('../utils/commander.js');
var Mustache = require('./lib/mustache.js');
var fsExt = require('../utils/fs_ext.js');

var Must = ActionFactory.create('Mustache');

Must.prototype.registerArgs = function() {
	var opts = this.opts;
	opts.description('编译mustache模板为js函数.');
	opts.option('--file [filename]', 'mustache模板文件名');
};


Must.prototype.execute = function(opts, callback) {
	console.info('开始执行编译任务');
	var path = require.resolve('./lib/mustache_runtime.jst');
	var filename = opts.extras[0];

	var destname = opts.extras[1] || filename + ".js";
	var func_name = (destname || filename).split(".")[0];
	var data = fsExt.readFileSync(filename);
	var jstruntime  = fsExt.readFileSync(path);
	var compiledTpl = Mustache.compile(data).body;
	var jscode = Mustache.render(jstruntime, {name:func_name, body: compiledTpl});
	
  	fsExt.writeFileSync(destname + ".tmp.js", jscode);
  	var yuipath = require.resolve('../compress/yuicompressor-2.4.7.jar');
  	var cmd = "java -jar " + yuipath + " --charset UTF-8 " + destname + ".tmp.js" + " > " + destname;

	exec(cmd, function (err, stdout, stderr) {
		if(err)console.info(err)
		fsExt.rmdirRF(destname + ".tmp.js");
		console.info(filename + '编译成功，编译后文件为' + destname);
	});
};


module.exports = Must;
