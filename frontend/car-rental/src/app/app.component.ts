import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'car-rental';
  isLoggedIn = false;
  isFleetManager = false;
  

  constructor(private storageService: StorageService, private router: Router, private authService: AuthService) {}
  

  // ngOnInit(): void {
  //   this.isLoggedIn = !!this.storageService.getToken();
  // }

  ngOnInit(): void {
    this.isLoggedIn = !!this.storageService.getToken();
    if (this.isLoggedIn) {
    this.authService.getUserRole().subscribe(role => {
      this.isFleetManager = role === 'fleet_manager';
    });
  }
  }

  


  logout(): void {
    this.storageService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    
  }

  openWhatsApp(): void {
  const phone = '77073592980'; // без +
  const message = 'Здравствуйте! Хочу арендовать авто';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}


}
