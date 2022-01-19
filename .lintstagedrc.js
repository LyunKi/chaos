module.exports = {
    '**/**/*.{js,ts,jsx,tsx,scss,css,json,md,gql,graphql}': [
        'prettier --write',
        'git add .',
    ],
    '**/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'stylelint --fix', 'git add .'],
    '**/**/*.{css,less,scss}': ['stylelint --fix', 'git add .'],
}
