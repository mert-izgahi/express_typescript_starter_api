export interface RegisterModel {
    name: string;
    email: string;
    password: string;
}

export interface LoginModel {
    email: string;
    password: string;
}

export interface TokenPayload {
    _id: string;
    name: string;
    email: string;
    role: string;
}
