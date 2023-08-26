import { Account, Professor, Student } from './table';

export interface LoginCredentials {
    authorisation_code: string;
}

export interface LogoutCredentials {
    user_id: string;
}

export interface ApiResponse {
    code: string;
    message: string;
    data: null;
}

export interface CreateProfile {
    profile_type: string;
    university: string;
}

export interface CreateClasse {
    title: string;
    description: string;
    professors: [string] | [];
    students: [string] | [];
    university: number;
}

export interface AddClasse {
    student_id: string;
    classe_id: string;
}

export interface AddGrade {
    student: string;
    classe: string;
    note: number;
}

export interface UserData {
    account: Account;
    students: [
        Student & {
            university: string;
        },
    ];
    professors: [
        Professor & {
            university: string;
        },
    ];
}
