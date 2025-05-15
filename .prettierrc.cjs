module.exports = {
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'always',
    overrides: [
        {
            files: '*.scss',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
