import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment'

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
  private apiUrl = `${environment.apiUrl}/vehicles/cars/`;

  constructor(private http: HttpClient) {}

  // getVehicles(): Observable<Vehicle[]> {
  //   return this.http.get<Vehicle[]>(this.apiUrl);
  // }
  getVehicles(): Observable<Vehicle[]> {
  return this.http.get<Vehicle[]>(this.apiUrl).pipe(
    map(vehicles =>
      vehicles.map(v => ({
        ...v,
        image: v.image.startsWith('http')
          ? v.image
          : `${environment.mediaUrl}vehicle_images/${v.image}` // <== добавь эту строку
      }))
    )
  );
}

  getVehicleByName(name: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}?name=${name}`);
  }

  getVehicleById(vehicleId: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}${vehicleId}/`);
  }
  createVehicle(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  updateVehicle(id: number, vehicle: Partial<Vehicle>) {
  return this.http.patch(`${this.apiUrl}${id}/`, vehicle); // ✅ PATCH
}
}
