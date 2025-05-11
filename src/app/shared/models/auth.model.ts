import {IUser} from "./user.model";

export interface IAuth {
  status: 'success' | 'error';
  message: string;
  user: IUser;
  token: string;
}

export interface IDecodedToken {
  id: string;
  username: string;
  exp: number;
  iat: number;
}

