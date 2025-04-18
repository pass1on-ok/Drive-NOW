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

  // getPaymentsByUser(userID: number): Observable<any[]> {
  //   const token = this.authService.getAuthToken(); // Получаем токен из AuthService
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Добавляем токен в заголовок

  //   return this.http.get<any[]>(`${this.apiUrl}?userID=${userID}`, { headers });
  // }
  // getPaymentsByUser(userID: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}?customer=${userID}`);
  // }

  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getPaymentsByUser(userID: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}?customer=${userID}`);
  }

  // Получить все бронирования для пользователя
  getBookingsByUser(userID: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrlBookings}?customerID=${userID}`);
  }

  // getPaymentsByUser(userID: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}?customer=${userID}`);
  // }
}
