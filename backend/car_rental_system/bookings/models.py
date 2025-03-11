from django.db import models
from users.models import Customer
from vehicles.models import Vehicle

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

    def createBooking(self, customer, vehicle, start_date, end_date):
        self.customer = customer
        self.vehicle = vehicle
        self.startDate = start_date
        self.endDate = end_date
        self.totalAmount = self.calculateTotalAmount()
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

