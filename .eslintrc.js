module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "react-app",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "prettier", "react", "@typescript-eslint", "jsx-a11y"],
  rules: {
    'no-shadow': 'off',
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn",
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".jsx", ".tsx", ".ts", ".js"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "webpack.config.js",
      },
    },
  },
};
