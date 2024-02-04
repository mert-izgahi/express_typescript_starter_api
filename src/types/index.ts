import { IBaseDocument } from "@starter";
export interface ICategory extends Document, IBaseDocument {
    _id?: string;
    name: string;
    description: string;
}

export interface IProduct extends Document, IBaseDocument {
    name: string;
    description: string;
    price: number;
    image?: string; // Optional
    color: string;
    size: string;
    category: string;
}

export interface IUser extends Document, IBaseDocument {
    name: string;
    email: string;
    password: string;
    role?: string;
}
