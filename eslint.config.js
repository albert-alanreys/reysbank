import js from '@eslint/js';

export default [
	js.configs.recommended,

	{
		ignores: ['**/.fttemplates/*', '**/dist/*'],
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				window: 'readonly',
				console: 'readonly',
				document: 'readonly',
				HTMLElement: 'readonly',
				require: 'readonly',
				process: 'readonly',
				module: 'readonly',
				__dirname: 'readonly',
			},
		},
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		rules: {
			'no-console': 'off',
			'require-jsdoc': 'off',
			'no-tabs': 'off',
			'no-trailing-spaces': 'off',
			indent: 'off',
			'no-debugger': 'off',
			'padded-blocks': 'off',
			'prefer-default-export': 'off',
			'no-prototype-builtins': 'off',
			'no-mixed-spaces-and-tabs': 'off',
		},
		settings: {
			'import/resolver': {
				alias: {
					map: [['@', './src']],
					extensions: ['.js'],
				},
			},
		},
	},
];
