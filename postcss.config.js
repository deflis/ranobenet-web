const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./components/**/*.js', './pages/**/*.js'],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];
module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    ['postcss-preset-env', { stage: 1 }],
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
