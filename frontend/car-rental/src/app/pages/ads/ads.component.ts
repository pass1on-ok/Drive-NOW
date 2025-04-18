import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService, Vehicle } from '../../services/car.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  ads: Vehicle[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getVehicles().subscribe(data => {
      this.ads = data;
    });
  }
}
