export interface CreateTransactionDto {
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: { id: string };
}
