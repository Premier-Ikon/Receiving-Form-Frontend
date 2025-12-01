import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiService, KpiResponse } from '../../services/kpi.service';

@Component({
  selector: 'app-header-kpi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-kpi.html',
  styleUrls: ['./header-kpi.scss'],
})
export class HeaderKpiComponent implements OnInit {
  kpis: KpiResponse | null = null;
  loading = true;
  error: string | null = null;

  constructor(private kpiService: KpiService) {}

  ngOnInit(): void {
    this.kpiService.getKpis().subscribe({
      next: (data) => {
        this.kpis = data; // data is now { totalItems, pendingForms, completed, successRate }
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        console.error('❌ Error fetching KPI data:', err);
        this.loading = false;
        this.error = 'Failed to load KPI data';
      },
    });
  }
}
