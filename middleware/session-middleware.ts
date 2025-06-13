import type { ProfileDto } from "~/src/shared/api/model";
import ROUTE from "~/src/shared/consts/ROUTE";
import { apiInstance } from "~/src/shared/api/api-instance";
import { useCookie } from '#app';

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('session-middleware')
    try {
        // Получаем токен из cookie
        const cookie = useCookie('access-token');
        const token = cookie.value;

        if (!token) {
            return navigateTo(ROUTE.LOGIN);
        }

        // Добавляем токен в заголовок запроса
        const { data } = await apiInstance.get<ProfileDto>('/account/session', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(data)
        if (!data) {
            return navigateTo(ROUTE.LOGIN);
        }

        return true;
    } catch (error) {
        console.error('Session check failed:', error);
        return navigateTo(ROUTE.LOGIN);
    }
});
