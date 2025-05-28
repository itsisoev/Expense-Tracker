export interface CreateTransactionDto {
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: { id: string };
}

export type TransactionType = 'income' | 'expense';

export interface TransactionCategory {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTransactionDto {
  title?: string;
  amount?: number;
  type?: TransactionType;
  category?: { id: string };
}
