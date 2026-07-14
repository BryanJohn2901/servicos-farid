/** Tailwind build config for index.html (its own custom classes, separate from service pages) */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1e293b',
          accent: '#2c3e50',
          gold: '#C0A063',
          light: '#f8f5f0',
          textDark: '#333333',
          textLight: '#e5e7eb'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Lato', 'sans-serif']
      }
    }
  },
  plugins: []
};
