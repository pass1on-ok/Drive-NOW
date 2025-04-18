import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';  // Импортируем CommonModule
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-my-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-payments.component.html',
  styleUrl: './my-payments.component.css',
  providers: [DatePipe, CurrencyPipe]
})
export class MyPaymentsComponent implements OnInit {
  payments: any[] = [];
  message: string = '';
  // userID: number | null = null;
  userID: number = 1;

  constructor(private paymentService: PaymentService, private authService: AuthService, private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {}

  // ngOnInit(): void {
  //   this.loadPayments(); рабочий
  // }

  ngOnInit(): void {
    this.loadUserPayments();  // Загружаем платежи при инициализации компонента
  }



  // loadPayments(): void {
  //   // Получаем профиль текущего пользователя
  //   this.authService.getUserProfile().subscribe({
  //     next: (user) => {
  //       this.userID = user.userID; // Сохраняем userID
  //       this.loadUserPayments(); // Загружаем платежи для этого пользователя
  //     },
  //     error: (err) => {
  //       this.message = '❗ Ошибка при получении данных пользователя.';
  //       console.error(err);
  //     }
  //   });
  // }
  loadPayments(): void {
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.userID = user.userID;
        this.paymentService.getAllPayments().subscribe({
          next: (allPayments) => {
            // фильтрация по customer в booking
            this.payments = allPayments.filter(
              (payment: any) => payment.booking?.customer?.id === this.userID
            );
          },
          error: (err) => {
            this.message = '❗ Не удалось загрузить платежи.';
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.message = '❗ Ошибка при получении данных пользователя.';
        console.error(err);
      }
    });
  }

  loadUserPayments(): void {
    // Сначала получаем бронирования пользователя
    this.paymentService.getBookingsByUser(this.userID).subscribe({
      next: (bookings) => {
        if (bookings.length > 0) {
          // Теперь получаем платежи, связанные с бронированиями
          const bookingIDs = bookings.map(booking => booking.bookingID);
          this.paymentService.getPaymentsByUser(this.userID).subscribe({
            next: (payments) => {
              // Фильтруем платежи, чтобы они были связаны с этими бронированиями
              this.payments = payments.filter(payment =>
                bookingIDs.includes(payment.booking)
              );
              if (this.payments.length === 0) {
                this.message = '❗ У вас нет платежей.';
              }
            },
            error: (error) => {
              this.message = '❗ Не удалось загрузить платежи.';
              console.error(error);
            }
          });
        } else {
          this.message = '❗ У вас нет бронирований.';
        }
      },
      error: (error) => {
        this.message = '❗ Не удалось загрузить бронирования.';
        console.error(error);
      }
    });
  }
  // loadUserPayments(): void {
  //   if (this.userID !== null) {
  //     // If userID is available, fetch the user's payments
  //     this.paymentService.getPaymentsByUser(this.userID).subscribe({ рабочий
  //       next: (data) => {
  //         this.payments = data;
  //       },
  //       error: (error) => {
  //         this.message = '❗ Не удалось загрузить платежи.';
  //         console.error(error);
  //       }
  //     });
  //   } else {
  //     this.message = '❗ Не удалось получить ID пользователя.';
  //   }
  // }

  // loadUserPayments(): void {
  //   if (this.userID !== null) {
  //     // Получаем платежи по userID
  //     this.paymentService.getPaymentsByUser(this.userID).subscribe({
  //       next: (data) => {
  //         this.payments = data;
  //       },
  //       error: (error) => {
  //         this.message = '❗ Не удалось загрузить платежи.';
  //         console.error(error);
  //       }
  //     });
  //   } else {
  //     this.message = '❗ Не удалось получить ID пользователя.';
  //   }
  // }
}
