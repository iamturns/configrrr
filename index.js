(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.configrrr = global.configrrr || {})));
}(this, (function (exports) { 'use strict';

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function stringToCorrectType(x) {
	if (x === "true") {
		return true;
	}
	if (x === "false") {
		return false;
	}
	if (isNumeric(x)) {
		return Number(x);
	}
	return x;
}

function getEnvVars(keys) {
	if (typeof process === 'undefined' || !process.env) {
		return {};
	}
	return calculateEnvVars(keys);
}

function calculateEnvVars(keys) {
	return keys.reduce(function (json, key) {
		var envVar = getEnvVar(key);
		if (envVar) {
			json[key] = envVar;
		}
		return json;
	}, {});
}

function getEnvVar(key) {
	if (!process.env.hasOwnProperty(key)) {
		return undefined;
	}
	return stringToCorrectType(process.env[key]);
}

function getArgVals(keys) {
	return keys.reduce(function (json, key) {
		var argVal = getArgVal(key);
		if (argVal !== undefined) {
			json[key] = argVal;
		}
		return json;
	}, {});
}

function getArgVal(key) {
	var argIndex = process.argv.indexOf('--' + key);
	if (argIndex === -1) {
		return undefined;
	}
	var argVal = process.argv[argIndex + 1];
	return stringToCorrectType(argVal);
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Config = function () {
	function Config(initConfig) {
		classCallCheck(this, Config);

		this.keys = Object.keys(initConfig);
		this.keysSafePrefix = this.keys.map(function (k) {
			return 'CONFIG_' + k;
		});
		this._baseConfig = this._calculateBaseConfig(initConfig);
		this._setConfig = {};
		this._defineProperties();
	}

	createClass(Config, [{
		key: 'toJSON',
		value: function toJSON() {
			var _this = this;

			return this.keys.reduce(function (json, key) {
				json[key] = _this[key];
				return json;
			}, {});
		}
	}, {
		key: '_calculateBaseConfig',
		value: function _calculateBaseConfig(initConfig) {
			return Object.assign({}, initConfig, getEnvVars(this.keysSafePrefix), getArgVals(this.keysSafePrefix));
		}
	}, {
		key: '_defineProperties',
		value: function _defineProperties() {
			var _this2 = this;

			this.keys.forEach(function (key) {
				return _this2._defineProperty(key);
			});
		}
	}, {
		key: '_defineProperty',
		value: function _defineProperty(key) {
			var _this3 = this;

			Object.defineProperty(this, key, {
				get: function get$$1() {
					return _this3._getValue(key);
				},
				set: function set$$1(value) {
					return _this3._setValue(key, value);
				}
			});
		}
	}, {
		key: '_setValue',
		value: function _setValue(key, value) {
			this._setConfig[key] = value;
		}
	}, {
		key: '_getValue',
		value: function _getValue(key) {
			if (this._setConfig.hasOwnProperty(key)) {
				return this._setConfig[key];
			}
			if (typeof localStorage !== 'undefined' && localStorage.hasOwnProperty(key)) {
				return localStorage[key];
			}
			if (this._baseConfig.hasOwnProperty(key)) {
				return this._baseConfig[key];
			}
			return undefined;
		}
	}, {
		key: 'values',
		get: function get$$1() {
			var _this4 = this;

			return this.keys.map(function (key) {
				return _this4[key];
			});
		}
	}]);
	return Config;
}();

exports.Config = Config;

Object.defineProperty(exports, '__esModule', { value: true });

})));
