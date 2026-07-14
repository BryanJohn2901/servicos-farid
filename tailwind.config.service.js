/** Tailwind build config for the 4 service landing pages (shared design system) */
module.exports = {
  content: [
    "abdominoplastia-hd-raft.html",
    "cirurgia-mamaria.html",
    "lipo-hd.html",
    "mommy-makeover.html"
  ],
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
