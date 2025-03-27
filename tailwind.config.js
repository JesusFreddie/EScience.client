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
                    DEFAULT: '#0A6BDD',
                    400: '#0A6BDD',
                    500: '#0A6BDD',
                    dark: {
                        400: '#1A3174',
                        500: '#1A3174',
                    }
                },
                bg: {
                    100: "#fff",
                    150: "#F9F9F9",
                    200: "#F5F4F4",
                    dark: {
                        100: "#020617",
                        150: "#0A1021",
                        200: "#090F1F"
                    }
                },
                text: {
                    500: "#020202",
                    400: "#696969",
                    dark: {
                        500: "#FFFFFF",
                        400: "#C7C7C7"
                    }
                }
            },
        },
    },
    plugins: [],
}