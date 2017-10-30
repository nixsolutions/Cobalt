module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
      "babel"
    ],
    "rules": {
      "arrow-parens": 0,
      "babel/generator-star-spacing": 1,
      "babel/arrow-parens": ["error", "as-needed"],
      "comma-dangle": [2, "never"],
      "generator-star-spacing": 0,
      "max-len": [2, 400, 2, {
        "ignoreUrls": true,
        "ignoreComments": false
      }],
      "no-underscore-dangle": 0,
      "react/jsx-handler-names": [2, {
        "eventHandlerPrefix": "handle",
        "eventHandlerPropPrefix": "on"
      }],
      "react/no-unused-prop-types": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "ecmaFeatures": {
      "restParams":  true
    }
  };