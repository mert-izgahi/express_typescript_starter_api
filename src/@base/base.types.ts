export interface IBaseDocument {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    slug?: string;
    deletedAt?: Date;
}

export interface IRoles {
    action: "createOne" | "getAll" | "getOneById" | "updateOne" | "deleteOne";
    role: "*" | "admin" | "user";
}
