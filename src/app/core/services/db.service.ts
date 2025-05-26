import {Injectable} from '@angular/core';
import Dexie from 'dexie';

export interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  title: string;
  type: string;
  amount: number;
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  users!: Dexie.Table<User, string>;
  categories!: Dexie.Table<Category, string>;
  transactions!: Dexie.Table<Transaction, string>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      users: 'id, username',
      categories: 'id, userId, title',
      transactions: 'id, userId, categoryId, type',
    });
  }
}
