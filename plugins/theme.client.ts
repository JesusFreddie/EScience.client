import {useTheme} from "~/src/shared/composable/useTheme";

export default defineNuxtPlugin(nuxtApp => {
    const { theme } = useTheme();

    nuxtApp.hook('app:created', () => {
        if (process.server) {
            const event = nuxtApp.ssrContext?.event;
            const cookieTheme = event?.req?.cookies?.theme;
            if (cookieTheme) {
                theme.value = cookieTheme;
            } else {
                theme.value = 'light'; // Светлая тема по умолчанию
            }
        }
    });
})