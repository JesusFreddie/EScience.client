// tailwind.config.js
module.exports = {
    darkMode: 'class', // Включаем переключение тем через классы
    content: [
        './src/**/*.{js,vue,ts}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1A3174', // Пример основного цвета
                    dark: '#1A3174', // Темный вариант основного цвета
                    light: '#1A3174', // Темный вариант основного цвета
                },
                sky: {
                    DEFAULT: '#fff',
                    dark: '#fff',
                    light: '#fff',
                },
                background: {
                    DEFAULT: '#020617', // Светлый фон
                    dark: '#020617', // Темный фон,
                    light: '#ffffff',
                },
                bg: {
                    100: "#090F1F"
                }
            },
        },
    },
    plugins: [],
}