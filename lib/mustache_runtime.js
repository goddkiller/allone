function test (view) {
  var r = {};
  r._objValue = function (name, context, callback) {
  	var view = context.view;
  	if (!name) {
  	 	return	"";
  	} else if (name == '.') {
  		return view.key;
  	} else if (name == '..') {
  		return view.value;
  	} else {
  		return view.parent[name];
  	}
  }
  
  
  r._section = function (name, context, callback) {
    var value = context.lookup(name);
    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";

        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(context.push(value[i]), this);
        }
        return buffer;
      }
      if (Object.prototype.toString.call(value) == "[object Object]") {	//isObject
        var buffer = "";
        for (var key in value) {
        	buffer += callback(context.push({"key" : key, "value": value[key], "parent": value}), this);
        }
        return buffer;      	
      }
	  // console.log(value)
      return value ? callback(context.push(value), this) : "";
    case "function":
      // TODO: The text should be passed to the callback plain, not rendered.
      var sectionText = callback(context, this),
          self = this;

      var scopedRender = function (template) {
        return self.render(template, context);
      };

      return value.call(context.view, sectionText, scopedRender) || "";
    default:
      if (value) {
        return callback(context, this);
      }
    }

    return "";
  };

  r._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // From the spec: inverted sections may render text once based on the
    // inverse value of the key. That is, they will be rendered if the key
    // doesn't exist, is false, or is an empty list.
    if (value == null || value === false || (isArray(value) && value.length === 0)) {
      return callback(context, this);
    }

    return "";
  };

  r._name = function (name, context, escape) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    var string = (value == null) ? "" : String(value);

    if (escape) {
      return escapeHtml(string);
    }

    return string;
  };



  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
      value = value.call(this.view);
    }

    return value;
  };

  var  c = Context.make(view);
  return "" + "\u003ctable\u0020class\u003d\u0022table\u0020table\u002dbordered\u0022\u003e\u000d\u000a\u003ctr\u003e\u000d\u000a" + r._section("head", c, function (c, r) {
    return "" + "\u0009\u003cth\u003e" + r._name("\u002e", c, false) + "\u003c\u002fth\u003e\u000d\u000a";
  }) + "\u003c\u002ftr\u003e\u000d\u000a\u000d\u000a" + r._section("itemList", c, function (c, r) {
    return "" + "\u003ctr\u003e\u000d\u000a" + r._section("\u002e", c, function (c, r) {
    return "" + "\u003ctd\u003e" + r._name("\u002e", c, false) + "\u003c\u002ftd\u003e\u000d\u000a";
  }) + "\u003c\u002ftr\u003e\u000d\u000a";
  }) + "\u003c\u002ftable\u003e\u000d\u000a" + r._section("pages\u002elength", c, function (c, r) {
    return "" + "\u003cdiv\u0020class\u003d\u0022pagination\u0020pull\u002dright\u0022\u003e\u000d\u000a\u0020\u0020\u003cul\u003e\u000d\u000a\u0020\u0020\u0020\u0020\u003cli\u003e\u003ca\u0020data\u003d\u0022" + r._name("prevNum", c, true) + "\u0022\u0020href\u003d\u0022\u0023\u0022\u003e\u00ab\u003c\u002fa\u003e\u003c\u002fli\u003e\u000d\u000a" + r._section("pages", c, function (c, r) {
    return "" + "\u0020\u0020\u0020\u0020\u003cli\u0020class\u003d\u0022" + r._name("class", c, true) + "\u0022\u003e\u003ca\u0020data\u003d\u0022" + r._name("index", c, true) + "\u0022\u0020href\u003d\u0022\u0023\u0022\u003e" + r._name("index", c, true) + "\u003c\u002fa\u003e\u003c\u002fli\u003e\u000d\u000a";
  }) + "\u0020\u0020\u0020\u0020\u003cli\u003e\u003ca\u0020data\u003d\u0022" + r._name("nextNum", c, true) + "\u0022\u0020href\u003d\u0022\u0023\u0022\u003e\u00bb\u003c\u002fa\u003e\u003c\u002fli\u003e\u000d\u000a\u0020\u0020\u003c\u002ful\u003e\u000d\u000a\u003c\u002fdiv\u003e\u000d\u000a";
  });

}


