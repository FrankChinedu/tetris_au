module.exports = {
    purge: {
        enabled: true,
        content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
        options: {
            safelist: {
                standard: [/red$/, /green$/, /pink$/, /purple$/, /indigo$/, /blue$/,/yellow$/],
                deep: [/red$/, /green$/, /pink$/, /purple$/, /indigo$/, /blue$/,/yellow$/],
                greedy:[/red$/, /green$/, /pink$/, /purple$/, /indigo$/, /blue$/,/yellow$/],
              },
      },
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
