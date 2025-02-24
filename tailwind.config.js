// tailwind.config.js
module.exports = {
    darkMode: 'class', // Включаем переключение тем через классы
    content: [
        './src/**/*.{js,vue,ts}',
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    DEFAULT: '#1A3174',
                    400: '#1A3174',
                    500: '#1A3174',
                },

                bg: {
                    100: "#090F1F"
                }
            },
        },
    },
    plugins: [],
}