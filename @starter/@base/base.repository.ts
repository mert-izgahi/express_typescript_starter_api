import { Model, Document, FilterQuery } from "mongoose";
import { IFilterOptions, IRepository } from "../@types";
import { IUser } from "./users/model";

export class BaseRepository<T extends Document> implements IRepository<T> {
    constructor(protected model: Model<T>) {}
    deleteRecord(filter: FilterQuery<T>): Promise<T | null> {
        try {
            return this.model.findOneAndDelete(filter);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    getRecord(filter: FilterQuery<T>): Promise<T | null> {
        try {
            return this.model.findOne(filter);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

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
    ): Promise<{ rows: T[]; total: number; totalPages: number }> {
        try {
            const { page, limit, sort, order } = options as IFilterOptions;
            const skip = (page - 1) * limit;
            const rows = await this.model
                .find(filter)
                .sort({ [sort]: order === "asc" ? 1 : -1 })
                .skip(skip)
                .limit(limit);

            const total = await this.model.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);
            return { rows, total, totalPages };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
