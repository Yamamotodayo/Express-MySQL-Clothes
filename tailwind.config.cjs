/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs", './views/partials/*.ejs', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
