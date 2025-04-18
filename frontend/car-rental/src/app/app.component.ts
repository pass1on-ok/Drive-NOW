import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'car-rental';
  isLoggedIn = false;
  

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!this.storageService.getToken();
  }

  logout(): void {
    this.storageService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
