import { Component, OnInit } from '@angular/core';
import { FleetManagerService } from '../../services/fleet-manager.service';
import { CommonModule } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-fleet-dashboard',
  standalone: true,
  templateUrl: './fleet-dashboard.component.html',
  styleUrls: ['./fleet-dashboard.component.css'],
  imports: [CommonModule]
})
export class FleetDashboardComponent implements OnInit {
  vehicles: any[] = [];
  message: string = '';
  managerId: number | null = null;

  constructor(private fleetService: FleetManagerService) {}

  ngOnInit(): void {
    this.loadFleet();
  }

  loadFleet(): void {
    this.fleetService.getFleetManager().subscribe({
      next: (manager) => {
        this.managerId = manager.id;
  
        const requests: Observable<any>[] = manager.managedVehicles.map((id: number) =>
          this.fleetService.getVehicleById(id)
        );
  
        forkJoin(requests).subscribe({
          next: (vehicles: any[]) => this.vehicles = vehicles,
          error: () => this.message = 'Ошибка при загрузке автомобилей.'
        });
      },
      error: () => this.message = 'Не удалось загрузить профиль менеджера.'
    });
  }

  updateStatus(vehicleId: number, status: string) {
    this.fleetService.updateVehicleStatus(vehicleId, status).subscribe(() => {
      this.loadFleet();
    });
  }

  remove(vehicleId: number) {
    if (this.managerId) {
      this.fleetService.removeVehicle(this.managerId, vehicleId).subscribe(() => {
        this.loadFleet();
      });
    }
  }
}
