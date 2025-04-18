import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vehicle {
  vehicleID: number;
  brand: string;
  model: string;
  type: string;
  status: string;
  rentalPrice: number;
  image: string;
  description?: string;
  fuelType?: string;
  seatingCapacity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://127.0.0.1:8000/api/vehicles/cars/';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  getVehicleByName(name: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}?name=${name}`);
  }

  getVehicleById(vehicleId: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}${vehicleId}/`);
  }
}
