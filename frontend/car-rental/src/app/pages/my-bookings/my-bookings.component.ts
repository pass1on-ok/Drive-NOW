import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  message: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getBookingsByUser().subscribe(
      (data) => {
        console.log('Bookings from service:', data);
        this.bookings = data;
        if (this.bookings.length === 0) {
          this.message = 'У вас нет бронирований.';
        }
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        this.message = 'Ошибка при загрузке бронирований.';
      }
    );
  }
}
