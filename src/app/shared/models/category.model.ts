import {IUser} from "./user.model";

export interface ICategory {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
}

export interface CreateCategoryDto {
  title: string;
  userId?: string;
}
