import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageHelperService } from './storage-helper.service';
import { tap } from 'rxjs/operators';
import { Vehicle } from './car.service';

export interface Booking {
  bookingID?: number;
  customer: number;
  vehicle_id: number;
  startDate: string;
  endDate: string;
  totalAmount?: number;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8000/api/bookings/bookings/';
  private apiUrl2 = 'http://127.0.0.1:8000/api/bookings/';

  constructor(private http: HttpClient, private storageHelper: StorageHelperService) {}

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }


  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}${id}/`);
    
  }

  getBookingsByUser(): Observable<Booking[]> {
    return this.http.get<Booking[]>('http://localhost:8000/api/bookings/my-bookings/');
  }

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getBookingById(id: number) {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }
  
  updateBookingStatus(id: number, status: string) {
    return this.http.patch(`${this.apiUrl}${id}/`, { status });
  }
}
