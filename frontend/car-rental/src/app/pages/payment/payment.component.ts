// payment.component.ts
import { Component, Input } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Добавили FormsModule
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  bookingID!: number;
  booking: any = null;
  method = 'Card';
  amount = 0;
  loading = false;
  message = '';

  constructor(private paymentService: PaymentService, private bookingService: BookingService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Получаем параметры из URL
    this.route.queryParams.subscribe((params) => {
      const bookingID = params['bookingID'];
      if (bookingID) {
        this.bookingID = +bookingID;
        console.log('Получен bookingID:', this.bookingID);

        // Загружаем информацию о бронировании по ID
        this.bookingService.getBookingById(this.bookingID).subscribe({
          next: (bookingData) => {
            this.booking = bookingData;
            this.amount = this.booking.totalAmount; // Устанавливаем сумму из бронирования
          },
          error: (error) => {
            console.error(error);
            this.message = '❗ Не удалось загрузить информацию о бронировании.';
          },
        });
      } else {
        this.message = '❗ Не удалось получить ID бронирования.';
      }
    });
  }
  pay() {
  if (this.method === 'Card') {
    this.router.navigate(['/card-payment'], {
      queryParams: { bookingID: this.bookingID, amount: this.amount }
    });
    return;
  }
  if (this.method === 'Bank Transfer') {
    this.router.navigate(['/bank-transfer-payment'], {
      queryParams: { bookingID: this.bookingID, amount: this.amount }
    });
    return;
  }

  // Остальные методы (наличные, перевод)
  this.loading = true;
  const data = {
    booking: this.bookingID,
    amount: this.amount,
    paymentMethod: this.method,
  };

  // pay() {
  //   if (!this.amount || this.amount <= 0) {
  //     this.message = '❗ Убедитесь, что сумма платежа указана правильно.';
  //     return;
  //   }

  //   this.loading = true;
  //   this.message = '';

  //   const data = {
  //     booking: this.bookingID, // ID бронирования
  //     amount: this.amount,      // Сумма из бронирования
  //     paymentMethod: this.method, // Метод оплаты
  //   };

    // Отправляем запрос на создание платежа
    this.paymentService.makePayment(data).subscribe({
      next: () => {
        this.loading = false;
        this.message = '✅ Оплата прошла успешно!';

        // Обновляем статус бронирования на "confirmed"
        this.bookingService.updateBookingStatus(this.bookingID, 'confirmed').subscribe({
          next: () => {
            setTimeout(() => {
              this.router.navigate(['/my-payments']); // Перенаправление на страницу профиля
            }, 2000);
          },
          error: () => {
            this.message = 'Оплата прошла, но ошибка при обновлении статуса бронирования.';
          },
        });
      },
      error: (err: any) => {
        this.loading = false;
        this.message = '❌ Ошибка при оплате: ' + (err.error?.detail || 'Неизвестная ошибка');
      },
    });
  }
}
