import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Vehicle } from '../../services/car.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fleet-details',
  templateUrl: './fleet-details.component.html',
  styleUrls: ['./fleet-details.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FleetDetailsComponent implements OnInit {
  vehicle: Vehicle | null = null;
  selectedVehicleID: number | null = null;

  constructor(private carService: CarService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');  
    console.log('Vehicle ID:', vehicleId);
    if (vehicleId) {
      this.carService.getVehicleById(vehicleId).subscribe(data => {
        this.vehicle = data;
      });
    }
  }
  openBooking(vehicleID: number) {
    // навигация на страницу бронирования
    this.router.navigate(['/booking'], { queryParams: { vehicleID } });
  }
}