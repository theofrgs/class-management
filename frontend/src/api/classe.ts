import { AddClasse, AddGrade, CreateClasse } from '@/interface/api';
import { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';
import { default as cki } from 'js-cookie';

const { publicRuntimeConfig: config } = getConfig();

function getAllClasse(): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/classe`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function getUniversityClasse(university_id: string): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/classe/university/${university_id}/`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function createClasse(body: CreateClasse): AxiosRequestConfig {
    return {
        method: 'post',
        url: `${config.API_URL}/classe`,
        data: body,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function deleteClasse(classe_id: string): AxiosRequestConfig {
    return {
        method: 'delete',
        url: `${config.API_URL}/classe/${classe_id}/`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function addClasse(body: AddClasse): AxiosRequestConfig {
    return {
        method: 'post',
        url: `${config.API_URL}/classe/add`,
        data: body,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function removeClasse(body: AddClasse): AxiosRequestConfig {
    return {
        method: 'post',
        url: `${config.API_URL}/classe/remove`,
        data: body,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function getClasseProfessorDetails(
    classe_id: string,
    professor_id: string,
): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/classe/${classe_id}/professor/${professor_id}/`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function getClasseStudentDetails(
    student_id: string,
    classe_id: string,
): AxiosRequestConfig {
    return {
        method: 'get',
        url: `${config.API_URL}/classe/${classe_id}/student/${student_id}/`,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function addGrade(body: AddGrade): AxiosRequestConfig {
    return {
        method: 'post',
        url: `${config.API_URL}/grade`,
        data: body,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

function patchGrade(body: AddGrade, id: string): AxiosRequestConfig {
    return {
        method: 'patch',
        url: `${config.API_URL}/grade/${id}/`,
        data: body,
        headers: {
            Authorization: `Bearer ${cki.get('token')}`,
        },
    } as AxiosRequestConfig;
}

export {
    getAllClasse,
    createClasse,
    addClasse,
    getUniversityClasse,
    deleteClasse,
    removeClasse,
    getClasseStudentDetails,
    getClasseProfessorDetails,
    addGrade,
    patchGrade,
};
