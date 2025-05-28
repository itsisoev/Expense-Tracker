import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {CreateTransactionDto, Transaction, UpdateTransactionDto} from "../../../shared/models/transaction.model";
import {Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly baseAPI = `${environment.baseAPI}transaction`;
  private readonly http = inject(HttpClient);

  private _transactionsChanged = new Subject<void>();

  transactionsChanged$ = this._transactionsChanged.asObservable();

  createTransaction(dto: CreateTransactionDto) {
    return this.http.post(this.baseAPI, dto).pipe(
      tap(() => {
        this._transactionsChanged.next();
      })
    );
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseAPI);
  }

  updateTransaction(id: string, type: string, dto: UpdateTransactionDto) {
    return this.http.patch(`${this.baseAPI}/${type}/${id}`, dto).pipe(
      tap(() => this._transactionsChanged.next())
    );
  }

  deleteTransaction(id: string, type: string) {
    return this.http.delete(`${this.baseAPI}/${type}/${id}`).pipe(
      tap(() => this._transactionsChanged.next())
    );
  }
}
