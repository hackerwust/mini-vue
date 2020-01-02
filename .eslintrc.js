module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2018,
    },
    "extends": [
        "ttdefault",
    ],
    "rules": {
        "react/prop-types": ["off"],
        "comma-dangle": ["error", "never"],
        "no-eval": 0,
        "no-console": "warn",
        "operator-linebreak": "off",
        "eqeqeq": ["off"],
        "no-empty-function":"off",
        "no-useless-escape":"off",
        "max-depth": [2, 10],
        "@typescript-eslint/interface-name-prefix": "never",
        "@typescript-eslint/no-object-literal-type-assertion": false,
        "@typescript-eslint/no-explicit-any": false,
        "@typescript-eslint/explicit-function-return-type": false
    },
    "globals": {
        "expect": true,
        "jest": true
    }
};