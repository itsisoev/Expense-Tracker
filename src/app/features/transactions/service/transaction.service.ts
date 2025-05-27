import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {CreateTransactionDto} from "../../../shared/models/transaction.model";
import {Subject, tap} from "rxjs";

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
}
