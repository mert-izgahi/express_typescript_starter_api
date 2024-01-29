export interface IFilterOptions {
    page: number;
    limit: number;
    sort: string;
    order: string;
    search: string;
}

export interface IBaseDocument {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    slug?: string;
    deletedAt?: Date;
}
