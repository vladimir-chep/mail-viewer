module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
        webextensions: true,
    },
    extends: ['plugin:vue/essential'],
    plugins: [
        'vue'
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}