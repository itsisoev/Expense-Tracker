import {IUser} from "./user.model";

export interface ICategoryResponse {
  message: string;
  category: ICategory;
}

export interface ICategory {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
  message?: string;
}

export interface CreateCategoryDto {
  title: string;
  userId?: string;
}
