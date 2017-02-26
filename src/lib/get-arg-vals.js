import {stringToCorrectType} from './string-to-correct-type';

export function getArgVals(keys) {
	if (typeof process === 'undefined' || !process.argv) {
		return {};
	}
	return getArgVals(keys);
}

function getArgVals(keys) {
	return keys
		.reduce((json, key) => {
			const argVal = getArgVal(key);
			if (argVal !== undefined) {
				json[key] = argVal;
			}
			return json;
		}, {});
}

function getArgVal(key) {
	const argIndex = process.argv.indexOf(`--${key}`);
	if (argIndex === -1) {
		return undefined;
	}
	const argVal = process.argv[argIndex + 1];
	return stringToCorrectType(argVal);
}
