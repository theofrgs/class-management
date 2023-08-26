import { CreateProfile } from '@/interface/api';
import { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';
import { default as cki } from 'js-cookie';

const { publicRuntimeConfig: config } = getConfig();

function createProfile(body: CreateProfile): AxiosRequestConfig {
    return {
        method: 'post',
        url: `${config.API_URL}/profile`,
        data: body,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function getProfile(id: string): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/profile/${id}/`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function getStudent(id: string): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/student/${id}/`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function getProfessor(id: string): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/professor/${id}/`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

export { createProfile, getProfile, getProfessor, getStudent };
