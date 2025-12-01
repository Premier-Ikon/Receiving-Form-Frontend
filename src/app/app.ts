import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BulkOperationsComponent } from './components/bulk-operations/bulk-operations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent, BulkOperationsComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
