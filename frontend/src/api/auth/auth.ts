import { LoginCredentials, LogoutCredentials } from '@/interface/api';
import { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

function login(body: LoginCredentials): AxiosRequestConfig {
    return {
        method: 'post',
        url: `${config.API_URL}/auth/connect`,
        data: body,
    } as AxiosRequestConfig;
}
function logout(body: LogoutCredentials): AxiosRequestConfig {
    return {
        method: 'post',
        url: `${config.API_URL}/auth/logout`,
        data: body,
    } as AxiosRequestConfig;
}

export { login, logout };
