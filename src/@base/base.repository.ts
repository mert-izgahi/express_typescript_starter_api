import { Model, Document, FilterQuery } from "mongoose";
import { IFilterOptions } from "./base.types";
export class BaseRepository<T extends Document> {
    constructor(protected model: Model<T>) {}

    async createRecord(data: any): Promise<T> {
        try {
            const record = new this.model(data);
            await record.save();

            return record;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getRecordById(id: string): Promise<T | null> {
        try {
            return await this.model.findById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateRecordById(id: string, data: any): Promise<T | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteRecordById(id: string): Promise<T | null> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getRecords(
        filter: FilterQuery<T>,
        options?: IFilterOptions
    ): Promise<{ results: T[]; total: number; totalPages: number }> {
        try {
            const { page, limit, sort, order } = options as IFilterOptions;
            const skip = (page - 1) * limit;
            const results = await this.model
                .find(filter)
                .sort({ [sort]: order === "asc" ? 1 : -1 })
                .skip(skip)
                .limit(limit);

            const total = await this.model.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);
            return { results, total, totalPages };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
