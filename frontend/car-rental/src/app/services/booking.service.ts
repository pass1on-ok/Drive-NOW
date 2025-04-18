import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageHelperService } from './storage-helper.service';
import { tap } from 'rxjs/operators';

export interface Booking {
  bookingID?: number;
  customer: number;
  vehicle: number;
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

  constructor(private http: HttpClient, private storageHelper: StorageHelperService) {}

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  getUserBookings(customerId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}?customer=${customerId}`);
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}${id}/`);
    
  }

  getBookingsByUser(): Observable<Booking[]> {
    const userData = this.storageHelper.getItem('user');
    if (!userData) {
      console.error('User data not found in localStorage');
      return of([]);
    }
  
    let userId: number;
    try {
      const parsedUser = JSON.parse(userData);
      userId = parsedUser?.userID;
    } catch (e) {
      console.error('Error parsing user data from localStorage:', e);
      return of([]);
    }
  
    const token = this.storageHelper.getItem('token');
    if (!token) {
      console.error('No token found, user not authenticated!');
      return of([]);
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Booking[]>(`${this.apiUrl}?customer=${userId}`, { headers }).pipe(
      tap(data => {
        console.log('Bookings from API:', data);
      })
    );
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
