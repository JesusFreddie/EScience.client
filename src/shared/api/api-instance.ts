import axios, { type AxiosRequestConfig } from "axios";
import { useCookie } from '#app';


export const apiInstance = axios.create({
    // baseURL: 'https://localhost:7099',
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
    },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN'
})

// Add response interceptor to handle access token
apiInstance.interceptors.response.use(
    (response) => {
        const accessToken = response.headers['access-token'];
        if (accessToken) {
            // Store the token in cookie
            const cookie = useCookie('access-token', {
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: '/',
                secure: true,
                sameSite: 'lax'
            });
            cookie.value = accessToken;
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add request interceptor to add access token to requests
apiInstance.interceptors.request.use(
    (config) => {
        const cookie = useCookie('access-token');
        const accessToken = cookie.value;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const createInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    return apiInstance({
        ...config,
        ...options
    }).then(d => d.data)
    .catch(error => {
        // Ensure error is properly propagated to Vue Query
        throw error;
    });
}
