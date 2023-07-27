module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    globals: {
        uni: true,
        getApp: true,
        getCurrentPages: true,
        wx: true
    },
    env: {
        node: true,
        es6: true,
        browser: true,
        'vue/setup-compiler-macros': true
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': 'off',
        'no-extend-native': 'off',
        'no-debugger': 'off',
        'no-empty': 'off',
        'no-prototype-builtins': 'off',
        'no-console': 'off',
        'vue/multi-word-component-names': 'off'
    }
};
