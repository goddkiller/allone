var hogan = require("hogan.js");

var template = hogan.compile("{{name}}");
console.log(template.render({name:123}));