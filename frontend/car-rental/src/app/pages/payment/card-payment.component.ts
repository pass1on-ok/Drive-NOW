import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent {
  bookingID!: number;
  amount = 0;
  cardNumber = '';
  expiry = '';
  cvc = '';
  cardHolder = '';
  message = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.bookingID = +params['bookingID'];
      this.amount = +params['amount'];
    });
  }

  submitCardPayment(): void {
    if (!this.cardNumber || !this.expiry || !this.cvc || !this.cardHolder) {
      this.message = '❗ Пожалуйста, заполните все поля карты.';
      return;
    }

    this.loading = true;
    this.message = '';

    const paymentData = {
      booking: this.bookingID,
      amount: this.amount,
      paymentMethod: 'Card'
    };

    this.paymentService.makePayment(paymentData).subscribe({
      next: () => {
        this.bookingService.updateBookingStatus(this.bookingID, 'confirmed').subscribe({
          next: () => {
            this.message = '✅ Оплата прошла успешно!';
            setTimeout(() => {
              this.router.navigate(['/my-payments']);
            }, 2000);
          },
          error: () => {
            this.message = 'Оплата прошла, но ошибка при обновлении статуса.';
          }
        });
      },
      error: () => {
        this.message = '❌ Ошибка при оплате. Проверьте данные карты.';
        this.loading = false;
      }
    });
  }
}
