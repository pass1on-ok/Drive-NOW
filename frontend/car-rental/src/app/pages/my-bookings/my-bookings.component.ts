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
    this.bookingService.getBookingsByUser().subscribe({
      next: (data) => {
        this.bookings = data;
        this.message = this.bookings.length ? '' : '❗ У вас нет бронирований.';
      },
      error: (error) => {
        this.message = '❗ Не удалось загрузить бронирования.';
      }
    });
  }
}
