from django.db import models
from users.models import Customer
from vehicles.models import Vehicle
from django.core.exceptions import ValidationError
from datetime import timedelta
from django.utils.timezone import now

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('canceled', 'Canceled'),
    ]

    bookingID = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    bookingDate = models.DateTimeField(auto_now_add=True)
    startDate = models.DateField()
    endDate = models.DateField()
    totalAmount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def clean(self):
        overlapping_bookings = Booking.objects.filter(
            vehicle=self.vehicle,
            status__in=['pending', 'confirmed'],
        ).exclude(bookingID=self.bookingID).filter(
            startDate__lt=self.endDate,  
            endDate__gt=self.startDate  
        )
        if overlapping_bookings.exists():
            raise ValidationError(f"🚫 Это авто уже забронировано с {overlapping_bookings.first().startDate} по {overlapping_bookings.first().endDate}")

    def save(self, *args, **kwargs):
        if not self.pk:  
            self.status = 'pending' 
            
        if self.startDate and self.endDate and self.vehicle:
            self.totalAmount = self.calculateTotalAmount()
        super().save(*args, **kwargs)

        if not hasattr(self, 'invoice'):
            from payments.models import Invoice 
            Invoice.objects.create(booking=self, customer=self.customer, totalAmount=self.totalAmount)

    def updateStatus(self):
        if self.status == 'pending' and now() - self.bookingDate > timedelta(minutes=2):
            self.status = 'canceled'
            self.vehicle.updateAvailability('available')  
            self.save()

    def confirmBooking(self):
        self.status = 'confirmed'
        self.save()
    
    def cancelBooking(self):
        self.status = 'canceled'
        self.vehicle.updateAvailability('available')
        self.save()

    def calculateTotalAmount(self):
        rental_days = (self.endDate - self.startDate).days
        return rental_days * self.vehicle.rentalPrice if rental_days > 0 else self.vehicle.rentalPrice

    def __str__(self):
        return f"Booking {self.bookingID} - {self.customer} - {self.vehicle} ({self.status})"

