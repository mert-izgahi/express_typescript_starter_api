import { Model } from "mongoose";
import { BaseRepository } from "../../@base";
import { ICategory } from "./model";

class CategoryRepository extends BaseRepository<ICategory> {
    constructor(model: Model<ICategory>) {
        super(model);
    }

    // Add custom methods here
    getOneBySlug = async (slug: string) => {
        return await this.model.findOne({ slug });
    };
}

export { CategoryRepository };
