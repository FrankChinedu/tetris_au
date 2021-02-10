module.exports = {
    purge: {
      enabled: true,
      content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "18": "4.5rem",
        "100": "28rem",
        "200": "50rem",
       },
       animation: {
        'ping-slow': 'ping 2s linear infinite',
       }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['disabled'],
      cursor: ['disabled'],
      borderColor: ['disabled'],
    },
  },
  plugins: [],
}
