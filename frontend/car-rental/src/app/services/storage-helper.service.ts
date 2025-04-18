import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageHelperService {
  private getLocalStorage(): Storage | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    return null;
  }

  getItem(key: string): string | null {
    const localStorage = this.getLocalStorage();
    return localStorage ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    const localStorage = this.getLocalStorage();
    if (localStorage) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    const localStorage = this.getLocalStorage();
    if (localStorage) {
      localStorage.removeItem(key);
    }
  }
}
