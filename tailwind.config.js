module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  },
  theme: {
    extend: {},
  },
  variants: {
    margin: ['responsive', 'last'],
    margin: ['responsive', 'hover'],
  },
  plugins: [],
}
