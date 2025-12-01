import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface KpiResponse {
  totalItems: number;
  pendingForms: number;
  completed: number;
  successRate: string;
}

@Injectable({
  providedIn: 'root',
})
export class KpiService {
  private apiUrl = 'https://us-central1-premier-ikon.cloudfunctions.net/kpi-data-provider';

  constructor(private http: HttpClient) {}

  getKpis(): Observable<KpiResponse> {
    return this.http
      .post<{ status: string; kpis: { kpis: KpiResponse; status: string } }>(this.apiUrl, {})
      .pipe(
        map((response) => {
          return response.kpis.kpis; // ✅ go one level deeper
        })
      );
  }
}
