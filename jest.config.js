process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  "transform": {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  "transformIgnorePatterns": [
    "<rootDir>/node_modules/"
  ]
}