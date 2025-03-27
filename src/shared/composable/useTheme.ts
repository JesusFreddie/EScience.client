type Theme = "light" | "dark";

export const useTheme = () => {
    const theme = useCookie<Theme>('theme', {
        default: () => 'light',
        watch: true,
    });

    const setTheme = (newTheme: Theme): string => {
        theme.value = newTheme;
        if (process.client) {
            document.documentElement.classList.toggle('dark', newTheme === "dark");
        }
        return newTheme;
    }

    const toggleTheme = () => {
        setTheme(theme.value === "light" ? "dark" : "light");
    }

    return {
        theme,
        setTheme,
        toggle: toggleTheme,
    }
}