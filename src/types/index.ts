import { FilterQuery } from "mongoose";

export interface IFilterOptions {
    page: number;
    limit: number;
    sort: string;
    order: string;
    search: string;
}

export interface IModel<T> {
    createRecord(data: T): Promise<T>;
    updateRecordById(id: string, data: Partial<T>): Promise<T>;
    deleteRecordById(id: string): Promise<T>;
    deleteRecord(filter: FilterQuery<T>): Promise<T>;
    getRecord(filter: FilterQuery<T>): Promise<T>;
    getRecordById(id: string): Promise<T>;
    getRecordBySlug(slug: string): Promise<T>;
    getRecords(
        filter: FilterQuery<T>,
        options?: IFilterOptions
    ): Promise<{ results: T[]; total: number; totalPages: number }>;
}

// Application Models
interface IBase {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    slug?: string; // Auto generated
}

export interface ICategory extends Document, IBase {
    _id?: string;
    name: string;
    description: string;
}

export interface IProduct extends Document, IBase {
    name: string;
    description: string;
    price: number;
    image?: string; // Optional
    color: string;
    size: string;
    category: string;
}
