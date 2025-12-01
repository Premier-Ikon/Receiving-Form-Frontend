import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { KpiService, KpiResponse } from '../../services/kpi.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-bulk-operations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bulk-operations.html',
  styleUrls: ['./bulk-operations.scss'],
})
export class BulkOperationsComponent implements OnInit {
  private apiUrl = 'https://us-central1-premier-ikon.cloudfunctions.net/all-forms-generation';

  loading = false;
  kpis: KpiResponse | null = null;
  error: string | null = null;
  success: boolean = false;

  constructor(private http: HttpClient, private kpiService: KpiService) {}

  ngOnInit(): void {
    // Fetch KPIs once component loads
    this.kpiService.getKpis().subscribe({
      next: (data) => (this.kpis = data),
      error: (err) => {
        console.error('❌ Error fetching KPIs:', err);
        this.error = 'Failed to load KPI data.';
      },
    });
  }

  generateAllPending() {
    if (!this.kpis || this.syncDisabled || this.loading) return;

    this.loading = true;
    this.error = null;
    this.success = false;

    // Call the backend API with extended timeout (10 minutes = 600000ms)
    // The backend processes synchronously, so we need a long timeout
    this.http.post<{ status: string; processed?: any[] }>(this.apiUrl, {})
      .pipe(timeout(600000)) // 10 minute timeout
      .subscribe({
        next: (res) => {
          console.log('✅ Forms generation completed:', res);
          this.loading = false;
          this.success = true;
          
          // Refresh KPIs and reload page after a short delay to show success message
          setTimeout(() => {
            this.kpiService.getKpis().subscribe({
              next: (data) => {
                this.kpis = data;
                window.location.reload();
              },
              error: () => {
                // Even if KPI refresh fails, reload the page
                window.location.reload();
              },
            });
          }, 1500);
        },
        error: (err) => {
          console.error('❌ Error generating forms:', err);
          this.loading = false;
          
          // Check if it's a timeout error
          if (err.name === 'TimeoutError' || err.message?.includes('timeout') || err.message?.includes('Timeout')) {
            this.error = 'Request timed out. The processing may still be running on the server. Please wait a few minutes and refresh the page to check if forms were generated.';
          } else {
            this.error = err.error?.message || 'Failed to generate forms. Please try again.';
          }
        },
      });
  }

  exportReport() {
    console.log('Exporting report...');
    // TODO: Implement export functionality
  }

  // Helper → returns true if sync not needed
  get syncDisabled(): boolean {
    return !!this.kpis && this.kpis.totalItems === this.kpis.completed;
  }
}
