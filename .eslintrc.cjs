/*global __dirname,module*/

module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:typescript-sort-keys/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended"
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
                "@typescript-eslint/no-unused-vars": ["off", {}],
                "react-hooks/exhaustive-deps": "off"
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
        "simple-import-sort/imports": "error"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
