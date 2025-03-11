from django.db import models
from users.models import Customer
from bookings.models import Booking

class Invoice(models.Model):
    invoiceID = models.AutoField(primary_key=True)
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    totalAmount = models.DecimalField(max_digits=10, decimal_places=2)
    paymentStatus = models.CharField(max_length=20, choices=[('paid', 'Paid'), ('unpaid', 'Unpaid')], default='unpaid')

    def generateInvoice(self):
        self.totalAmount = self.booking.totalAmount
        self.paymentStatus = 'unpaid'
        self.save()

    def viewInvoiceDetails(self):
        return f"Invoice {self.invoiceID}: {self.totalAmount} - {self.paymentStatus}"

    def __str__(self):
        return f"Invoice {self.invoiceID} - {self.paymentStatus}"

class Payment(models.Model):
    paymentID = models.AutoField(primary_key=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paymentMethod = models.CharField(max_length=50)
    paymentDate = models.DateTimeField(auto_now_add=True)

    def processPayment(self):
        self.booking.invoice.paymentStatus = 'paid'
        self.booking.invoice.save()
        self.save()

    def refundPayment(self):
        self.booking.invoice.paymentStatus = 'unpaid'
        self.booking.invoice.save()
        self.delete()

    def validatePayment(self):
        return self.amount == self.booking.totalAmount

    def __str__(self):
        return f"Payment {self.paymentID} - {self.amount} ({self.paymentMethod})"
