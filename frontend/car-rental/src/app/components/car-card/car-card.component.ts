import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class CarCardComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() imageUrl!: string;
  @Input() vehicleID!: number;
}
