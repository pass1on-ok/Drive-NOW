import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { Car, CarService } from '../../services/car.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css'],
  standalone: true,
  imports: [CommonModule, CarCardComponent]
})
export class FleetComponent {
  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars = this.carService.getCars();
  }
}
