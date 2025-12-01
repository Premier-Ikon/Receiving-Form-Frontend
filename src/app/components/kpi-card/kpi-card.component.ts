import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule], // 👈 Add this
  templateUrl: './kpi-card.html',
  styleUrls: ['./kpi-card.scss'],
})
export class KpiCardComponent {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() color: string = 'blue';
}
