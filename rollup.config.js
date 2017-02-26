import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	dest: 'index.js',
	format: 'umd',
	moduleName: 'configrrr',
	plugins: [ babel() ],
};
