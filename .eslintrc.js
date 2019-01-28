module.exports = {
  "root": true,
  "env": {
    //"node": true,
    "jest": true
  },
  "extends": [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended'
  ],
  "rules": {
    "prefer-promise-reject-errors": 0,
    "no-new": 0
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
}