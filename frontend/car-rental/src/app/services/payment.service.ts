import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Booking } from './booking.service';
import { environment } from '../../environments/environment'



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
  
  // private apiUrl = 'http://localhost:8000/api/payments/payments/';
  // private apiUrlBookings = 'http://localhost:8000/api/bookings/bookings/';

  private apiUrl = `${environment.apiUrl}/payments/payments/`;  // Адаптировано под environment
  private apiUrlBookings = `${environment.apiUrl}/bookings/bookings/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Получаем токен из AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Добавляем токен в заголовки
    });
  }
  createPayment(payment: Payment): Observable<Payment> {
    const token = this.authService.getToken();  // Получаем токен из AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Payment>(this.apiUrl, payment, { headers });
  }

  getPayment(id: number): Observable<Payment> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Payment>(`${this.apiUrl}${id}/`, { headers });
  }

  makePayment(data: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, data, { headers });
  }

  getAllPayments(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getPaymentsByUser(): Observable<Payment[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Payment[]>(`${environment.apiUrl}/payments/my-payments/`, { headers });  // Адаптировано под environment
  }

  getBookingsByUser(): Observable<Booking[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Booking[]>(`${environment.apiUrl}/bookings/my-bookings/`, { headers });  // Адаптировано под environment
  }

  // getPaymentsByUser(): Observable<Payment[]> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<Payment[]>('http://localhost:8000/api/payments/my-payments/', { headers });
  // }

  // getBookingsByUser(): Observable<Booking[]> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<Booking[]>('http://localhost:8000/api/bookings/my-bookings/', { headers });
  // }

  // createPayment(payment: Payment): Observable<Payment> {
  //   return this.http.post<Payment>(this.apiUrl, payment, {
  //     headers: this.getAuthHeaders()
  //   });
  // }

  // getPayment(id: number): Observable<Payment> {
  //   return this.http.get<Payment>(`${this.apiUrl}${id}/`, {
  //     headers: this.getAuthHeaders()
  //   });
  // }

  // makePayment(data: any): Observable<any> {
  //   return this.http.post(this.apiUrl, data, {
  //     headers: this.getAuthHeaders()
  //   });
  // }

  // getAllPayments(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl, {
  //     headers: this.getAuthHeaders()
  //   });
  // }

  // getPaymentsByUser(): Observable<Payment[]> {
  //   return this.http.get<Payment[]>('http://localhost:8000/api/payments/my-payments/', {
  //     headers: this.getAuthHeaders()  // Добавляем заголовки с токеном
  //   });
  // }

  // getBookingsByUser(): Observable<Booking[]> {
  //   return this.http.get<Booking[]>('http://localhost:8000/api/bookings/my-bookings/', {
  //     headers: this.getAuthHeaders()  // Добавляем заголовки с токеном
  //   });
  // }

  // createPayment(payment: Payment): Observable<Payment> {
  //   return this.http.post<Payment>(this.apiUrl, payment);
  // }

  // getPayment(id: number): Observable<Payment> {
  //   return this.http.get<Payment>(`${this.apiUrl}${id}/`);
  // }
  // makePayment(data: any): Observable<any> {
  //   return this.http.post(this.apiUrl, data);
  // }

  // getAllPayments(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  // getPaymentsByUser(): Observable<Payment[]> {
  //   return this.http.get<Payment[]>('http://localhost:8000/api/payments/my-payments/');
  // }

  // getBookingsByUser(): Observable<Booking[]> {
  //   return this.http.get<Booking[]>('http://localhost:8000/api/bookings/my-bookings/');
  // }

}
