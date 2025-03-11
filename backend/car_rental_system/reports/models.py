from django.db import models
from bookings.models import Booking
from vehicles.models import Vehicle
from payments.models import Payment
from django.db.models import Sum

class Report(models.Model):
    REPORT_TYPES = [
        ('booking', 'Booking Report'),
        ('revenue', 'Revenue Report'),
    ]

    reportID = models.AutoField(primary_key=True)
    type = models.CharField(max_length=20, choices=REPORT_TYPES)
    generatedDate = models.DateTimeField(auto_now_add=True)
    content = models.TextField()

    def generateReport(self, content):
        self.content = content
        self.save()

    def viewReport(self):
        return f"Report {self.reportID}: {self.type} - {self.generatedDate}"

    def __str__(self):
        return f"Report {self.reportID} - {self.type}"


class BookingReport(Report):
    totalBookings = models.IntegerField()
    popularVehicles = models.TextField() 

    def generateBookingReport(self):
        self.totalBookings = Booking.objects.count()
        popular = Vehicle.objects.raw(
            "SELECT vehicle_id, COUNT(*) AS count FROM bookings_booking GROUP BY vehicle_id ORDER BY count DESC LIMIT 5"
        )
        self.popularVehicles = ", ".join([f"{v.brand} {v.model}" for v in popular])
        self.generateReport(f"Total Bookings: {self.totalBookings}, Popular Vehicles: {self.popularVehicles}")

class RevenueReport(Report):
    totalRevenue = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    period = models.CharField(max_length=50) 

    def generateRevenueReport(self, period):
        self.period = period
        self.totalRevenue = Payment.objects.aggregate(Sum('amount'))['amount__sum'] or 0
        self.generateReport(f"Total Revenue for {self.period}: {self.totalRevenue}")