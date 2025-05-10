import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageHelperService } from './storage-helper.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storageHelper: StorageHelperService) {} 

  getToken(): string | null {
    return this.storageHelper.getItem('token'); 
  }

  setToken(token: string): void {
    this.storageHelper.setItem('token', token);  
  }

  removeToken(): void {
    this.storageHelper.removeItem('token');  
  }

  public logout(): void {
    this.removeToken();
  }


}
