module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/strict-type-checked",
      "plugin:react-hooks/recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:react/jsx-runtime",
   ],
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parser: "@typescript-eslint/parser",
   plugins: ["react-refresh"],
   rules: {
      "react-refresh/only-export-components": [
         "warn",
         { allowConstantExport: true },
      ],
      "@typescript-eslint/array-type": ["warn", { default: "generic" }],
   },

   parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: [
         "./tsconfig.json",
         "./tsconfig.node.json",
         "./assembly/tsconfig.json",
      ],
      tsconfigRootDir: __dirname,
   },
}

