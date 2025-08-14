module.exports = {
    root: true,
    extends: [
        '@react-native',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'plugin:@typescript-eslint/recommended',
        'prettier' // Coloque o prettier por último para sobrescrever as regras de formatação
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react',
        'react-native',
        'react-hooks',
        '@typescript-eslint',
        'prettier'
    ],
    rules: {
    // Regras específicas do projeto
        'prettier/prettier': 'error',
        'react/prop-types': 'off', // Geralmente desligado em projetos com TypeScript
        'react-native/no-unused-styles': 'warn',
        'react-native/split-platform-components': 'off', // Desligado se você não quiser arquivos separados para iOS e Android
        'react-native/no-inline-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Desligado para evitar a necessidade de tipar todas as exportações
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
    react: {
        version: 'detect',
    },
    },
    ignorePatterns: [
        'node_modules/',
        'android/',
        'ios/',
        'coverage/',
    ],
    env: {
        jest: true,
    },
    };

