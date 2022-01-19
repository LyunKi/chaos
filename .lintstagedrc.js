module.exports = {
  '**/**/*.{js,ts,jsx,tsx,scss,css,json,md,gql,graphql}': ['prettier --write'],
  '**/**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '**/**/*.{css,less,scss}': ['stylelint --fix'],
}
