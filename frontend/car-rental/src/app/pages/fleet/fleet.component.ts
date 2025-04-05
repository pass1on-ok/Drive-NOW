import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { Vehicle, CarService } from '../../services/car.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css'],
  standalone: true,
  imports: [CommonModule, CarCardComponent, RouterModule]
})
export class FleetComponent implements OnInit {
  cars: Vehicle[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getVehicles().subscribe(data => {
      this.cars = data;
    });
  }
}
