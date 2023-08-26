import { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';
import { default as cki } from 'js-cookie';

const { publicRuntimeConfig: config } = getConfig();

function getAllUniversity(): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/university`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function getUniversity(id: string): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/university/${id}/`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

export { getAllUniversity, getUniversity };
