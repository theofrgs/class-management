export interface Account {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface Profile {
    id: string;
    account: string;
    university: string;
}

export interface Student {
    id: string;
    profile: string;
}

export interface Professor {
    id: string;
    profile: string;
}
