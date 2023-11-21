module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic',
		'plugin:solid/typescript'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json'
	},
	plugins: ['@typescript-eslint', 'solid'],
	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '_' }],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs']
	}
};
