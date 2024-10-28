---

title: eslint 在项目中的使用
date: 2016-09-27 01:04:33
tags:
---

前段一段时间，组里搞了jslint，但是，jslint好像没有eslint的配置灵活一些，并且webstrom 也支持eslint，所以就自己搞了一套eslint的检测配置，虽然提交了代码，但是并不强制要求使用。

<!--more-->
```
/**
***
***
Rules 规则说明
'off' 或者 0  - 关闭规则
'warn' 或者 1 - 开启规则，使用警告级别的错误，warn 不会导致程序退出
'error' 或者 2 - 开启规则，使用错误级别的错误，error 当被触发的时候，程序会退出

 @link http://eslint.cn/docs/rules/
 @link http://eslint.org/docs/rules/
*/


{
  "env": {
    "browser": false,
    "node":true,
    "es6": true
  },
  "globals": {

  },
  "rules": {
    "camelcase": 2,
    "curly": 0,
    "brace-style": [2, "1tbs"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "array-bracket-spacing": [2, "never"],

    "space-infix-ops": 2,

    "no-unused-vars": ["error", { "vars": "all", "args": "all" }],

    "comma-dangle": [2, "only-multiline"],
    "no-cond-assign": 2,
    "no-console": 2,
    "no-constant-condition": 0, // 待确定
    "no-control-regex": 0,
    "no-debugger": 2,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty": 2,
    "no-empty-character-class": 2,
    "no-ex-assign": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-semi": 2,
    "no-func-assign": 2,
    "no-inner-declarations": 2,
    "no-prototype-builtins": 2,
    "use-isnan": 2,
    "valid-jsdoc": 2,
    "valid-typeof": 2,
    "accessor-pairs": 2,
    "array-callback-return": 2,
    "block-scoped-var": 2, // Fix me 是否有必要开启
    "complexity": [2, {'max': 4}],
    "consistent-return": 0,
    "default-case": 2,
    "dot-location": [2, "property"],
    "eqeqeq": 2,
    "guard-for-in": 2, //  不建议使用for in 循环
    "no-alert": 2,
    "no-case-declarations": 2,
    "no-else-return": 0,
    "no-empty-function": 2,
    "no-eq-null": 2,
    "no-eval": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-implicit-coercion": 0,
    "no-implicit-globals": 2,
    "no-implied-eval": 2,
    "no-invalid-this": 0,
    "no-lone-blocks": 2,
    "no-loop-func": 2,
    "no-magic-numbers": 2,
    "no-multi-spaces": 2,
    "no-multi-str": 2,
    "no-native-reassign": 2,
    "no-new": 2,
    "no-new-func": 2,
    "no-new-wrappers": 2,
    "no-octal": 2,
    "no-octal-escape": 2,
    "no-param-reassign": [2, { "props": false }],
    "no-redeclare": 2,
    "no-return-assign": 2,
    "no-script-url": 2,
    "no-self-assign": 2,
    "no-self-compare": 2,
    "no-useless-call": 2,
    "wrap-iife": 2,
    "block-spacing": 0,
    "indent": [2, "tab"]
  }
}
```
