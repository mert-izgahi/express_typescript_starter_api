// import { FilterQuery, Model } from "mongoose";
// import { IAccountDocument } from "./account.types";
// import { IFilterOptions, IRepository } from "../@types";
// import { BaseRepository } from "../@base";
// import { AccountModel, IAccount } from "./account.model";
// // class AccountRepository<T extends IAccountDocument> implements IRepository<T> {
// //     constructor(protected model: Model<T>) {}
// //     async createRecord(data: T): Promise<T | null> {
// //         try {
// //             return this.model.create(data);
// //         } catch (error) {
// //             console.log(error);
// //             throw error;
// //         }
// //     }
// //     async updateRecordById(id: string, data: Partial<T>): Promise<T | null> {
// //         try {
// //             return this.model.findByIdAndUpdate(id, data, { new: true });
// //         } catch (error) {
// //             console.log(error);
// //             throw error;
// //         }
// //     }
// //     async deleteRecordById(id: string): Promise<T | null> {
// //         try {
// //             return this.model.findByIdAndDelete(id);
// //         } catch (error) {
// //             console.log(error);
// //             throw error;
// //         }
// //     }
// //     async deleteRecord(filter: FilterQuery<T>): Promise<T | null> {
// //         try {
// //             return this.model.findOneAndDelete(filter);
// //         } catch (error) {
// //             console.log(error);
// //             throw error;
// //         }
// //     }
// //     async getRecord(filter: FilterQuery<T>): Promise<T | null> {
// //         try {
// //             return this.model.findOne(filter);
// //         } catch (error) {
// //             console.log(error);
// //             throw error;
// //         }
// //     }
// //     async getRecordById(id: string): Promise<T | null> {
// //         try {
// //             return this.model.findById(id);
// //         } catch (error) {
// //             console.log(error);
// //             throw error;
// //         }
// //     }
// //     async getRecords(
// //         filter: FilterQuery<[] | T>,
// //         options?: IFilterOptions | undefined
// //     ): Promise<{ rows: T[]; total: number; totalPages: number }> {
// //         try {
// //             const { page, limit, sort, order } = options as IFilterOptions;
// //             const skip = (page - 1) * limit;
// //             const rows = await this.model
// //                 .find(filter)
// //                 .sort({ [sort]: order === "asc" ? 1 : -1 })
// //                 .skip(skip)
// //                 .limit(limit);

// //             const total = await this.model.countDocuments(filter);
// //             const totalPages = Math.ceil(total / limit);
// //             return { rows, total, totalPages };
// //         } catch (error) {
// //             console.log(error);
// //             throw error;
// //         }
// //     }

// //     // async register(
// //     //     data: RegisterInputModel
// //     // ): Promise<{ account: T; token: string } | undefined> {
// //     //     try {
// //     //         const existingAccount = await this.model.findOne({
// //     //             email: data.email,
// //     //         });

// //     //         if (existingAccount) {
// //     //             throw new AuthenticationError("Account already exists");
// //     //         }
// //     //         const account: T = await this.model.create(data);
// //     //         const token = await account.generateAuthToken();

// //     //         return {
// //     //             account,
// //     //             token,
// //     //         };
// //     //     } catch (error) {
// //     //         console.log(error);
// //     //         throw error;
// //     //     }
// //     // }

// //     // async login(
// //     //     data: LoginInputModel
// //     // ): Promise<{ account: T; token: string } | undefined> {
// //     //     try {
// //     //         const account = await this.model
// //     //             .findOne({ email: data.email })
// //     //             .select("+password");

// //     //         if (!account) {
// //     //             throw new AuthenticationError("User not found");
// //     //         }

// //     //         const validPassword = await account.comparePassword(data.password);
// //     //         if (!validPassword) {
// //     //             throw new AuthenticationError("Invalid password");
// //     //         }
// //     //         const token = await account.generateAuthToken();

// //     //         return {
// //     //             account,
// //     //             token,
// //     //         };
// //     //     } catch (error) {
// //     //         console.log(error);
// //     //         throw error;
// //     //     }
// //     // }
// // }

// class AccountRepository {}

// export default AccountRepository;
