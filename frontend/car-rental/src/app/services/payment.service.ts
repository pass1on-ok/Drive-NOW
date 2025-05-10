import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Booking } from './booking.service';


export interface Payment {
  paymentID?: number;
  booking: number;
  amount?: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  private apiUrl = 'http://localhost:8000/api/payments/payments/';
  private apiUrlBookings = 'http://localhost:8000/api/bookings/bookings/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}${id}/`);
  }
  makePayment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getPaymentsByUser(): Observable<Payment[]> {
    return this.http.get<Payment[]>('http://localhost:8000/api/payments/my-payments/');
  }

  getBookingsByUser(): Observable<Booking[]> {
    return this.http.get<Booking[]>('http://localhost:8000/api/bookings/my-bookings/');
  }

}
