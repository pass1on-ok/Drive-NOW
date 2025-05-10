import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { StorageHelperService } from './storage-helper.service';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment'
// Интерфейс для User
export interface User {
  userID: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  userType: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private apiUrl = 'http://localhost:8000/api/auth/';
  // private apiUrl2 = 'http://localhost:8000/api/users/users/';
  private apiUrl = `${environment.apiUrl}/auth/`; 
  private apiUrl2 = `${environment.apiUrl}/users/users/`;

  constructor(private http: HttpClient, private storageHelper: StorageHelperService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + 'login/', { username, password }).pipe(
      tap((res: any) => {
        
        this.storageHelper.setItem('token', res.access); 
        this.storageHelper.setItem('user', JSON.stringify(res.user));

        
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'register/', data);
  }

  logout(): void {
    this.storageHelper.removeItem('token');  
//
    this.storageHelper.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.storageHelper.getItem('token');  
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl2 + 'me/');
  }
  updateProfile(data: Partial<User>): Observable<User> {
    const token = this.getToken();
  
    return this.http.put<User>(this.apiUrl2 + 'me/', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  // getToken(): string | null {
  //   // Проверяем, что localStorage доступен
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //     return localStorage.getItem('auth_token');
  //   }
  //   return null;
  // }
  getToken(): string | null {
  return this.storageHelper.getItem('token');  // ✅ вместо 'auth_token'
}

  // getToken(): string | null {
  //   return this.storageHelper.getItem('token'); 
  // }

//   getCurrentUser(): User | null {
//     const user = this.storageHelper.getItem('user');
//     console.log(user);
//     return user ? JSON.parse(user) : null; // Если user не существует, вернуть null
// }

  getUserRole(): Observable<string | null> {
  const token = this.getToken();
  if (!token) return of(null);

  return this.http.get<User>(this.apiUrl2 + 'me/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).pipe(
    map(user => {
      this.storageHelper.setItem('user', JSON.stringify(user)); // Обновляем localStorage
      return user.userType;
    }),
    catchError(() => of(null))
  );
}




}
