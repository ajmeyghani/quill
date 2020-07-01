module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-trailing-spaces": [
      "error",
      { "ignoreComments": false, "skipBlankLines": false }
    ],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"]
  }
}
