import { Model, Document, FilterQuery } from "mongoose";
import { IFilterOptions } from "./types";

export class BaseRepository<T extends Document> {
    constructor(private model: Model<T>) {}

    async createRecord(data: any): Promise<T> {
        try {
            return await this.model.create(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getRecordBySlug(slug: string): Promise<T | null> {
        try {
            return await this.model.findOne({ slug });
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
    ): Promise<T[]> {
        try {
            const { page, limit, sort, order } = options as IFilterOptions;
            const skip = (page - 1) * limit;
            return await this.model
                .find(filter)
                .sort({ [sort]: order === "asc" ? 1 : -1 })
                .skip(skip)
                .limit(limit);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
