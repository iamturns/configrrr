import { getEnvVars } from './get-env-vars';
import { getArgVals } from './get-arg-vals';

export class Config {

	constructor(initConfig) {
		this.keys = Object.keys(initConfig);
		this.keysSafePrefix = this.keys.map(k => `CONFIG_${k}`);
		this._baseConfig = this._calculateBaseConfig(initConfig);
		this._setConfig = {};
		this._defineProperties();
	}

	toJSON() {
		return this.keys.reduce((json, key) => {
			json[key] = this[key];
			return json;
		}, {});
	}

	get values() {
		return this.keys.map(key => this[key]);
	}

	_calculateBaseConfig(initConfig) {
		return Object.assign(
			{},
			initConfig,
			getEnvVars(this.keysSafePrefix),
			getArgVals(this.keysSafePrefix)
		);
	}

	_defineProperties() {
		this.keys.forEach((key) => this._defineProperty(key));
	}

	_defineProperty(key) {
		Object.defineProperty(this, key, {
			get: () => this._getValue(key),
			set: (value) => this._setValue(key, value),
		});
	}

	_setValue(key, value) {
		this._setConfig[key] = value;
	}

	_getValue(key) {
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
}
