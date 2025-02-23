import axios from "axios";

export const apiInstance = axios.create({
    baseURL: 'https://localhost:7099/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const createInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    return apiInstance({
        ...config,
        ...options
    }).then(d => d.data);
}