const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}'
    ],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: ["html", "body"]
  }
];
module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    ['postcss-preset-env', { stage: 1 }],
    // ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
