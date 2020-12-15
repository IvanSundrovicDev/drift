module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "drift-blue": "#28AAE1",
        "drift-salmon": "#FF8966"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
