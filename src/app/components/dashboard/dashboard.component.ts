import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService, DashboardItem } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  items: DashboardItem[] = [];
  filteredItems: DashboardItem[] = [];
  loading = true;
  error: string | null = null;
  searchQuery: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadItems();
  }
  
  refreshPage(): void {
    window.location.reload();
  }

  loadItems(): void {
    this.loading = true;
    this.error = null;
    this.dashboardService.getDashboardItems().subscribe({
      next: (data) => {
        this.items = data;
        this.applySearch();
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading dashboard items:', err);
        this.error = 'Failed to load dashboard items. Please try again.';
        this.loading = false;
      },
    });
  }

  reload(): void {
    this.loadItems();
  }

  onSearchChange(): void {
    this.applySearch();
  }

  private applySearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredItems = this.items;
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredItems = this.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    );
  }
}
