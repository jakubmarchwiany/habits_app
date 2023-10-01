/*global __dirname,module*/

module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:typescript-sort-keys/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier"
	],
	overrides: [
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking"
			],
			files: ["**/*.{ts,tsx}"],
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ["./tsconfig.json"]
			},
			rules: {
				// I only disabled these so that we wouldn't see later rules
				// show up in earlier files... Don't copy these disables! 😉
				"@typescript-eslint/await-thenable": "off",
				"@typescript-eslint/no-floating-promises": "off",
				"@typescript-eslint/no-misused-promises": "off",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/explicit-function-return-type": "error",
				"react-hooks/exhaustive-deps": "off",
				"@typescript-eslint/no-explicit-any": "error",
				"@typescript-eslint/no-non-null-assertion": "error",
				"@typescript-eslint/consistent-type-definitions": ["error", "type"],
				"react/prop-types": "error",
				curly: "error",
				"jsx-a11y/no-autofocus": "off"
			}
		},
		{
			files: "*.json",
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/sort-keys": "error"
			},
			extends: ["plugin:jsonc/recommended-with-json"]
		}
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"react",
		"react-hooks",
		"simple-import-sort",
		"typescript-sort-keys"
	],
	root: true,
	rules: {
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
			{ blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
			{ blankLine: "always", prev: "directive", next: "*" },
			{ blankLine: "any", prev: "directive", next: "directive" },
			{ blankLine: "always", prev: "expression", next: "*" },
			{ blankLine: "any", prev: "expression", next: "break" }
			// { blankLine: "any", prev: "expression", next: "" }
		]
	},
	settings: {
		react: {
			version: "detect"
		}
	}
};
