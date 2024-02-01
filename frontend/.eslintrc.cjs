module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "@imaginary-cloud/react",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "tailwind.config.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json"
  },
  plugins: [
    "react-refresh",
    "@typescript-eslint",
    "prettier",
    "@tanstack/eslint-plugin-query"
  ],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "react/jsx-props-no-spreading": 0,
    "@typescript-eslint/no-shadow": 0,
    "@typescript-eslint/comma-dangle": 0,
    "import/prefer-default-export": 0,
    "react/jsx-one-expression-per-line": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "import/no-extraneous-dependencies": 0,
    semi: [2, "always"],
    quotes: [2, "double"],
    "@typescript-eslint/quotes": 0,
    "prettier/prettier": ["error", { singleQuote: false }],
    "import/no-unresolved": 0,
    "react/react-in-jsx-scope": "off",
    "no-shadow": "off",
    "react/button-has-type": 0,
    "consistent-return": 0,
    "react/prop-types": 0,
    "@typescript-eslint/no-empty-function": 0,
    "no-useless-return": 0,
    "no-nested-ternary": "off",
    "react/no-array-index-key": 2,
    "@tanstack/query/exhaustive-deps": 2,
    "@tanstack/query/no-rest-destructuring": 1,
    "@tanstack/query/stable-query-client": 2,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function"
      }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "react-hooks/exhaustive-deps": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "modules/**",
            group: "internal"
          },
          {
            pattern: "common/**",
            group: "internal"
          },
          {
            pattern: "pages/**",
            group: "internal"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/common",
            from: "./src/modules",
            message: "Modules -> Common are not allowed."
          }
        ]
      }
    ],
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  }
};
