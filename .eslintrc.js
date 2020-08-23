module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'eslint-config-prettier'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always'
      }
    }]
  }
}
