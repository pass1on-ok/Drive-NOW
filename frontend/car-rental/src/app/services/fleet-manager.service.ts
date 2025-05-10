// src/app/services/fleet-manager.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class FleetManagerService {
  private apiUrl = environment.apiUrl;
  // private apiUrl = 'http://127.0.0.1:8000/api';

  

  constructor(private http: HttpClient) {}

  getFleetManager(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/fleet-managers/me/`);
  }

  getVehicleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles/vehicles/${id}/`);
  }

  addVehicle(fleetManagerId: number, vehicleId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/fleet-managers/${fleetManagerId}/`, {
      managedVehicles: [vehicleId]
    });
  }

  createVehicle(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicles/`, data);
  }

  removeVehicle(fleetManagerId: number, vehicleId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/fleet-managers/${fleetManagerId}/remove_vehicle/`, {
      vehicleId
    });
  }

  updateVehicleStatus(vehicleId: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/vehicles/vehicles/${vehicleId}/`, { status });
  }

  scheduleMaintenance(vehicleId: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/maintenance/`, {
      vehicle: vehicleId,
      ...data
    });
  }
}
