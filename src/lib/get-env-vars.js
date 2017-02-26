import { stringToCorrectType } from './string-to-correct-type';

export function getEnvVars(keys) {
	if (typeof process === 'undefined' || !process.env) {
		return {};
	}
	return calculateEnvVars(keys);
}

function calculateEnvVars(keys) {
	return keys
		.reduce((json, key) => {
			const envVar = getEnvVar(key);
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
