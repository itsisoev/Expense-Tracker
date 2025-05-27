import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private readonly baseAPI = `${environment.baseAPI}transaction`;
  private readonly http = inject(HttpClient);

  getSplitTransactions() {
    return this.http.get<{ income: any[]; expense: any[] }>(`${this.baseAPI}/split`);
  }

  getBalance(): Observable<number> {
    return this.http.get<number>(`${this.baseAPI}/balance`);
  }

}
