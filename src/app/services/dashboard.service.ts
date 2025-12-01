import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface DashboardResponse {
  status: string;
  data: {
    task: string;
    status: boolean;
    pdf_count: number;
  }[];
}

export interface DashboardItem {
  id: string;
  name: string;
  status: 'Pending' | 'Completed';
  lastUpdated: string;
  pdfCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://us-central1-premier-ikon.cloudfunctions.net/dashboard-data-provider';

  constructor(private http: HttpClient) {}

  getDashboardItems(): Observable<DashboardItem[]> {
    return this.http.post<DashboardResponse>(this.apiUrl, {}).pipe(
      map((response) =>
        response.data.map((item, index) => ({
          id: String(index + 1), // ⚡ backend doesn't return id, so use index for now
          name: item.task,
          status: item.status ? 'Completed' : 'Pending',
          lastUpdated: new Date().toLocaleDateString(), // replace with real column if available
          pdfCount: item.pdf_count || 0,
        }))
      )
    );
  }
}
