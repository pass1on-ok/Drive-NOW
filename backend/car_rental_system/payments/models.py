from django.db import models
from users.models import Customer
from bookings.models import Booking
from decimal import Decimal
from django.core.exceptions import ValidationError

class Invoice(models.Model):
    invoiceID = models.AutoField(primary_key=True)
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="invoice")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    totalAmount = models.DecimalField(max_digits=10, decimal_places=2)
    paymentStatus = models.CharField(max_length=20, choices=[('paid', 'Paid'), ('unpaid', 'Unpaid')], default='unpaid')

    def save(self, *args, **kwargs):

        if not self.totalAmount:
            self.totalAmount = self.booking.totalAmount
        super().save(*args, **kwargs)

    def markPaid(self):

        self.paymentStatus = 'paid'
        self.save()

    def markUnpaid(self):
       
        self.paymentStatus = 'unpaid'
        self.save()

    def __str__(self):
        return f"Invoice {self.invoiceID} - {self.paymentStatus} ({self.totalAmount})"

class Payment(models.Model):
    paymentID = models.AutoField(primary_key=True)
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="payment")
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0)
    paymentMethod = models.CharField(max_length=50)
    paymentDate = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        
        if Payment.objects.filter(booking=self.booking).exists() and not self.pk:
            raise ValidationError("Payment with this booking already exists.")
        if self.amount is None:
            self.amount = self.booking.totalAmount
        elif isinstance(self.amount, str):  
            self.amount = Decimal(self.amount)

        if self.amount > self.booking.totalAmount:
            raise ValueError("Payment amount cannot exceed the booking total amount.")

        super().save(*args, **kwargs)
        self.updateBookingStatus()

    def updateBookingStatus(self):
        """ Если платеж совершен, обновляем статус бронирования и счета """
        if self.amount == self.booking.totalAmount:
            self.booking.confirmBooking()
            self.booking.invoice.markPaid()

    def refundPayment(self):
        """ Возвращаем платеж и меняем статус бронирования обратно на `pending` """
        self.booking.invoice.markUnpaid()
        self.booking.status = 'pending'
        self.booking.save()
        self.delete()

    def __str__(self):
        return f"Payment {self.paymentID} - {self.amount} ({self.paymentMethod})"
