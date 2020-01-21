module.exports = {
  "plugins": [
    "react-hooks",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "useJSXTextNode": true,
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    },
  },
  "ignorePatterns": ["node_modules/"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error"
  }
}