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

  constructor(
    private paymentService: PaymentService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPaymentsByUser().subscribe({
      next: (data) => {
        this.payments = data;
        this.message = this.payments.length ? '' : '❗ У вас нет платежей.';
      },
      error: (error) => {
        console.error('Ошибка при загрузке платежей:', error);
        this.message = '❗ Не удалось загрузить платежи.';
      }
    });
  }
}