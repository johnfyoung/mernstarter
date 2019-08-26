module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true,
      impliedStrict: true
    }
  },
  plugins: ["prettier", "babel"],
  rules: {
    "prettier/prettier": "error"
  }
};
