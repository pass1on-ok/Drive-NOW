import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../services/booking.service';
import { CarService } from '../../services/car.service';  
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  booking: Booking = {
    customer: 0,
    vehicle: 0,
    startDate: '',
    endDate: '',
  };

  message = '';
  vehicleID: number | null = null;
  vehicle: any = null;  

  constructor(
    private bookingService: BookingService,
    private carService: CarService, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
    if (!this.authService.isAuthenticated()) {
      this.message = '❗ Вы не авторизованы. Пожалуйста, войдите в систему.';
      return; 
    }

    
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.booking.customer = user.userID; 
      },
      error: () => {
        this.message = '❗ Не удалось загрузить информацию о пользователе.';
        return; 
      }
    });

    
    this.route.queryParams.subscribe(params => {
      const id = params['vehicleID'];
      if (id) {
        this.booking.vehicle = +id;
        this.vehicleID = +id;

        this.carService.getVehicleById(id).subscribe(data => {
          this.vehicle = data;  
        }, error => {
          this.message = '❗ Не удалось загрузить информацию о машине.';
        });
      } else {
        this.message = '❗ Не указан ID автомобиля для бронирования.';
      }
    });
  }

  submitBooking() {
    if (!this.booking.startDate || !this.booking.endDate) {
      this.message = '❗ Пожалуйста, выберите даты аренды.';
      return;
    }

    const startDate = new Date(this.booking.startDate);
    const endDate = new Date(this.booking.endDate);

    if (startDate > endDate) {
      this.message = '❗ Дата окончания аренды не может быть раньше даты начала.';
      return;
    }

    if (startDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0]) {
      endDate.setDate(startDate.getDate() + 1); 
    }

    this.booking.startDate = startDate.toISOString().split('T')[0];
    this.booking.endDate = endDate.toISOString().split('T')[0];

    this.bookingService.createBooking(this.booking).subscribe({
      next: (createdBooking) => {
        this.message = '✅ Бронирование успешно создано!';
        // Передаем ID бронирования в URL для страницы оплаты
        this.router.navigate(['/payment'], {
          queryParams: { bookingID: createdBooking.bookingID }
        });
      },
      error: (error) => {
        console.error(error);
        this.message = '🚫 Ошибка при бронировании. Возможно, авто уже занято или данные неверны.';
      }
    });
  }
}
