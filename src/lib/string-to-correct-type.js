import { isNumeric } from './is-numeric';

export function stringToCorrectType(x) {
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
