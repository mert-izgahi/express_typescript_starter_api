import { Model } from "mongoose";
import { BaseRepository } from "../../@base";
import { ICategory } from "./model";

export class CategoryRepository extends BaseRepository<ICategory> {
    constructor(model: Model<ICategory>) {
        super(model);
    }
}

export default CategoryRepository;
