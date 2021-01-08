module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "drift-blue": "#28AAE1",
        "drift-light-blue": "rgba(40, 170, 225, 0.1)",
        "drift-lighter-blue": "rgba(40,170,225,0.3)",
        "drift-salmon": "#FF8966",
        "drift-green": "#34C759"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
