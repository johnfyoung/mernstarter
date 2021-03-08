module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  //extends: "eslint:recommended",
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true,
      impliedStrict: true,
    },
  },
  plugins: ["babel", "prettier"],
  rules: {
    "prettier/prettier": ["ignore"],
  },
};
