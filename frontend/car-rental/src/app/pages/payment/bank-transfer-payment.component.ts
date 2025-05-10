import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-bank-transfer-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-transfer-payment.component.html',
  styleUrls: ['./bank-transfer-payment.component.css']
})
export class BankTransferPaymentComponent {
  bookingID!: number;
  amount = 0;
  accountNumber = '';
  bankName = '';
  accountHolder = '';
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

  submitBankTransferPayment(): void {
    if (!this.accountNumber || !this.bankName || !this.accountHolder) {
      this.message = '❗ Пожалуйста, заполните все поля банковского перевода.';
      return;
    }

    const accountNumberRegex = /^\d{16}$/;

  if (
    !this.accountNumber ||
    !accountNumberRegex.test(this.accountNumber) ||
    !this.bankName ||
    !this.accountHolder
  ) {
    this.message = '❗ Убедитесь, что номер счета содержит ровно 16 цифр и все поля заполнены.';
    return;
  }

    this.loading = true;
    this.message = '';

    const paymentData = {
      booking: this.bookingID,
      amount: this.amount,
      paymentMethod: 'Bank Transfer',
      accountNumber: this.accountNumber,
      bankName: this.bankName,
      accountHolder: this.accountHolder,
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
        this.message = '❌ Ошибка при оплате. Проверьте данные банковского перевода.';
        this.loading = false;
      }
    });
  }
  isAccountNumberValid(): boolean {
  return /^\d{16}$/.test(this.accountNumber);
}
}
